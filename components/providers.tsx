"use client";

import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import { LanguageProvider } from "@/lib/language-context";

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
