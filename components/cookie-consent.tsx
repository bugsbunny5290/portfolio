"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui";
import { useLanguage } from "@/lib/language-context";

const CONSENT_KEY = "cookie-consent";

type ConsentStatus = "pending" | "accepted" | "declined";

interface CookieConsentProps {
  onAccept: () => void;
  onDecline: () => void;
}

const content = {
  en: {
    title: "Cookie Consent",
    description: "This website uses Vercel Analytics to collect anonymous usage data, including page views, referrers, and device information. No personally identifiable information is collected or shared with third parties.",
    purpose: "Purpose: To understand how visitors use this site and improve the user experience.",
    storage: "Data retention: Analytics data is stored for up to 30 days.",
    rights: "You can withdraw your consent at any time by clearing your browser's local storage.",
    accept: "Accept Analytics",
    decline: "Decline",
    learnMore: "Learn more about",
    vercelPrivacy: "Vercel's privacy practices",
  },
  de: {
    title: "Cookie-Einwilligung",
    description: "Diese Website verwendet Vercel Analytics zur Erfassung anonymer Nutzungsdaten, einschliesslich Seitenaufrufe, Referrer und Gerateinformationen. Es werden keine personenbezogenen Daten erhoben oder an Dritte weitergegeben.",
    purpose: "Zweck: Um zu verstehen, wie Besucher diese Seite nutzen und das Nutzererlebnis zu verbessern.",
    storage: "Datenspeicherung: Analytics-Daten werden bis zu 30 Tage gespeichert.",
    rights: "Sie konnen Ihre Einwilligung jederzeit widerrufen, indem Sie den lokalen Speicher Ihres Browsers loschen.",
    accept: "Analytics akzeptieren",
    decline: "Ablehnen",
    learnMore: "Mehr erfahren uber",
    vercelPrivacy: "Vercels Datenschutzpraktiken",
  },
};

export function CookieConsent({ onAccept, onDecline }: CookieConsentProps): React.ReactElement | null {
  const [status, setStatus] = useState<ConsentStatus>("pending");
  const [mounted, setMounted] = useState(false);
  const { locale } = useLanguage();

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted" || stored === "declined") {
      setStatus(stored);
      if (stored === "accepted") {
        onAccept();
      }
    }
  }, [onAccept]);

  function handleAccept(): void {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setStatus("accepted");
    onAccept();
  }

  function handleDecline(): void {
    localStorage.setItem(CONSENT_KEY, "declined");
    setStatus("declined");
    onDecline();
  }

  if (!mounted || status !== "pending") {
    return null;
  }

  const t = locale === "de" ? content.de : content.en;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-lg">
      <div className="mx-auto max-w-5xl p-4 sm:p-6">
        <h3 className="text-base font-semibold text-foreground mb-2">{t.title}</h3>
        <div className="space-y-2 mb-4">
          <p className="text-sm text-muted-foreground">{t.description}</p>
          <p className="text-sm text-muted-foreground">{t.purpose}</p>
          <p className="text-sm text-muted-foreground">{t.storage}</p>
          <p className="text-sm text-muted-foreground">{t.rights}</p>
          <p className="text-sm text-muted-foreground">
            {t.learnMore}{" "}
            <a
              href="https://vercel.com/docs/analytics/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:no-underline"
            >
              {t.vercelPrivacy}
            </a>
            .
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button size="sm" onClick={handleAccept}>
            {t.accept}
          </Button>
          <Button size="sm" variant="outline" onClick={handleDecline}>
            {t.decline}
          </Button>
        </div>
      </div>
    </div>
  );
}
