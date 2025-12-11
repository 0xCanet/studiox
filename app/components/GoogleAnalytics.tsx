"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const CONSENT_KEY = "ga-consent";

// Fonction pour vérifier si le consentement est valide (non expiré)
const isValidConsent = (): boolean => {
  if (typeof window === "undefined") return false;
  
  const consentData = localStorage.getItem(CONSENT_KEY);
  if (!consentData) return false;

  try {
    const parsed = JSON.parse(consentData);
    if (!parsed.expiresAt) return false; // Ancien format sans expiration
    
    const expiresAt = new Date(parsed.expiresAt);
    const now = new Date();
    
    if (now > expiresAt) {
      // Consentement expiré, le supprimer
      localStorage.removeItem(CONSENT_KEY);
      return false;
    }
    
    return true;
  } catch {
    // Format invalide, supprimer
    localStorage.removeItem(CONSENT_KEY);
    return false;
  }
};

// Fonction pour obtenir la valeur du consentement
const getConsentValue = (): string | null => {
  if (typeof window === "undefined") return null;
  
  if (!isValidConsent()) return null;
  
  const consentData = localStorage.getItem(CONSENT_KEY);
  if (!consentData) return null;

  try {
    const parsed = JSON.parse(consentData);
    return parsed.value || null;
  } catch {
    return null;
  }
};

export function GoogleAnalytics() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Vérifier le consentement au chargement
    const checkConsent = () => {
      const consent = getConsentValue();
      if (consent === "accepted") {
        setHasConsent(true);
      }
    };

    checkConsent();

    // Écouter l'événement de consentement
    const handleConsent = () => {
      setHasConsent(true);
    };

    window.addEventListener("ga-consent-given", handleConsent);

    return () => {
      window.removeEventListener("ga-consent-given", handleConsent);
    };
  }, []);

  if (!GA_MEASUREMENT_ID || !hasConsent) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}

