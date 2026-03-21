import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import { getLocale, getMessages } from "next-intl/server";
import { AnalyticsWrapper } from "@/components/analytics-wrapper";
import "./globals.css";
import { CommandPalette } from "@/components/command-palette";
import { DevtoolsEasterEggs } from "@/components/devtools-easter-eggs";
import { Footer, Header } from "@/components/layout";
import { Providers } from "@/components/providers";
import { ScrollAnimations } from "@/components/scroll-animations";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const content = getContent(locale);
  const { personalInfo } = content;

  return {
    title: {
      default: `${personalInfo.name} | ${personalInfo.title}`,
      template: `%s | ${personalInfo.name}`,
    },
    description: personalInfo.tagline,
    keywords: [
      "Software Engineer",
      "Platform Engineer",
      "Full Stack Developer",
      "TypeScript",
      "React",
      "Next.js",
      "GCP",
      "Cloud Architecture",
    ],
    authors: [{ name: personalInfo.name }],
    creator: personalInfo.name,
    openGraph: {
      type: "website",
      locale: locale === "de" ? "de_DE" : "en_US",
      siteName: personalInfo.name,
      title: `${personalInfo.name} | ${personalInfo.title}`,
      description: personalInfo.tagline,
    },
    twitter: {
      card: "summary_large_image",
      title: `${personalInfo.name} | ${personalInfo.title}`,
      description: personalInfo.tagline,
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      languages: {
        en: "/",
        de: "/",
      },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<React.ReactElement> {
  const locale = (await getLocale()) as Locale;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${dmSans.variable} ${jetbrainsMono.variable} min-h-screen flex flex-col`}
        style={{ fontFamily: "var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif" }}
      >
        <Providers locale={locale} messages={messages}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:outline-none focus:ring-2"
            style={{ background: "var(--color-purple)", color: "white" }}
          >
            Skip to main content
          </a>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <AnalyticsWrapper />
          <ScrollAnimations />
          <CommandPalette />
          <DevtoolsEasterEggs />
        </Providers>
      </body>
    </html>
  );
}
