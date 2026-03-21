"use client";

import { Analytics } from "@vercel/analytics/next";
import { useCallback, useState } from "react";
import { CookieConsent } from "./cookie-consent";

export function AnalyticsWrapper(): React.ReactElement {
  const [consentGiven, setConsentGiven] = useState(false);

  const handleAccept = useCallback(() => {
    setConsentGiven(true);
  }, []);

  const handleDecline = useCallback(() => {
    setConsentGiven(false);
  }, []);

  return (
    <>
      <CookieConsent onAccept={handleAccept} onDecline={handleDecline} />
      {consentGiven && <Analytics />}
    </>
  );
}
