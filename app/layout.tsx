import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getLocale, getMessages } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Footer, Header } from "@/components/layout";
import { Providers } from "@/components/providers";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
