"use client";

import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import * as dataEn from "./data";
import * as dataDe from "./data-de";

type Language = "en" | "de";

// Use a more flexible type that accepts both language data structures
type DataType = typeof dataEn | typeof dataDe;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  data: DataType;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps): React.ReactElement {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("language") as Language | null;
    if (stored && (stored === "en" || stored === "de")) {
      setLanguageState(stored);
    }
  }, []);

  function setLanguage(lang: Language): void {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  }

  const data = language === "de" ? dataDe : dataEn;

  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ language: "en", setLanguage, data: dataEn }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, data }}>
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
