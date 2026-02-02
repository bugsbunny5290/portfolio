"use client";

import { useState, useCallback } from "react";
import { Analytics } from "@vercel/analytics/next";
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
