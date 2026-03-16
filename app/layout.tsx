import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getLocale, getMessages } from "next-intl/server";
import { AnalyticsWrapper } from "@/components/analytics-wrapper";
import "./globals.css";
import { Footer, Header } from "@/components/layout";
import { Providers } from "@/components/providers";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const content = getContent(locale);
  const { personalInfo } = content;

  const title = `${personalInfo.name} — Staff Engineer · Platform & Backend · Heidelberg`;
  const description = personalInfo.metaDescription;
  const ogTitle = `${personalInfo.name} — Staff Engineer`;

  return {
    title: {
      default: title,
      template: `%s | ${personalInfo.name}`,
    },
    description,
    keywords: [
      "Staff Engineer Germany",
      "Platform Engineer Heidelberg",
      "GCP Kubernetes Engineer",
      "Backend Engineer Germany",
      "NestJS Engineer",
      "API Architecture",
    ],
    authors: [{ name: personalInfo.name }],
    creator: personalInfo.name,
    openGraph: {
      type: "website",
      locale: locale === "de" ? "de_DE" : "en_US",
      siteName: personalInfo.name,
      title: ogTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
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
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Providers locale={locale} messages={messages}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:text-sm focus:font-medium focus:outline-none focus:ring-2 focus:ring-ring"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
          <AnalyticsWrapper />
        </Providers>
      </body>
    </html>
  );
}
