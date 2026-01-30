"use client";

import { createContext, useContext, useState, useEffect, useTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "./i18n";
import { getContent, type Content } from "./content";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  content: Content;
  isPending: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  initialLocale: Locale;
}

const COOKIE_NAME = "language";
const COOKIE_MAX_AGE = 31536000; // 1 year in seconds

async function getCookie(name: string): Promise<string | undefined> {
  if ("cookieStore" in window) {
    const cookie = await window.cookieStore.get(name);
    return cookie?.value;
  }
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];
}

async function setCookie(name: string, value: string, maxAge: number): Promise<void> {
  if ("cookieStore" in window) {
    await window.cookieStore.set({
      name,
      value,
      path: "/",
      maxAge,
      sameSite: "lax",
    });
    return;
  }
  // biome-ignore lint/suspicious/noDocumentCookie: Fallback for browsers without Cookie Store API
  document.cookie = `${name}=${value};path=/;max-age=${maxAge};samesite=lax`;
}

export function LanguageProvider({ children, initialLocale }: LanguageProviderProps): React.ReactElement {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    getCookie(COOKIE_NAME).then((stored) => {
      if (stored && (stored === "en" || stored === "de")) {
        setLocaleState(stored);
      }
    });
  }, []);

  function setLocale(newLocale: Locale): void {
    setCookie(COOKIE_NAME, newLocale, COOKIE_MAX_AGE);
    setLocaleState(newLocale);
    startTransition(() => {
      router.refresh();
    });
  }

  const content = getContent(locale);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, content, isPending }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
