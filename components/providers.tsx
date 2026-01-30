"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";
import type { ReactNode } from "react";
import { LanguageProvider } from "@/lib/language-context";
import type { Locale } from "@/lib/i18n";

interface ProvidersProps {
  children: ReactNode;
  locale: Locale;
  messages: Record<string, unknown>;
}

export function Providers({ children, locale, messages }: ProvidersProps): React.ReactElement {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange={false}
      >
        <LanguageProvider initialLocale={locale}>{children}</LanguageProvider>
      </NextThemesProvider>
    </NextIntlClientProvider>
  );
}
