"use client";

import { useEffect, useState } from "react";

const CONSENT_KEY = "ga-consent";
const CONSENT_DURATION_MS = 12 * 30 * 24 * 60 * 60 * 1000; // 12 mois en millisecondes

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

// Fonction pour sauvegarder le consentement avec expiration
const saveConsent = (value: "accepted" | "declined"): void => {
  if (typeof window === "undefined") return;
  
  const expiresAt = new Date(Date.now() + CONSENT_DURATION_MS);
  const consentData = {
    value,
    expiresAt: expiresAt.toISOString(),
  };
  
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consentData));
};

interface ConsentBannerProps {
  language: "fr" | "en";
}

export function ConsentBanner({ language }: ConsentBannerProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Détecter mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Vérifier si le consentement est valide (non expiré)
    const consent = getConsentValue();
    if (!consent) {
      // Attendre un peu avant d'afficher pour une meilleure UX
      setTimeout(() => setShowBanner(true), 500);
    }
  }, []);

  const handleAccept = () => {
    saveConsent("accepted");
    setShowBanner(false);
    // Déclencher un événement pour que GoogleAnalytics se charge
    window.dispatchEvent(new Event("ga-consent-given"));
  };

  const handleDecline = () => {
    saveConsent("declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  const texts = {
    fr: {
      message: "Nous utilisons des cookies pour analyser le trafic de notre site et améliorer votre expérience. En continuant à naviguer, vous acceptez notre utilisation des cookies.",
      accept: "Accepter",
      decline: "Refuser",
    },
    en: {
      message: "We use cookies to analyze our website traffic and improve your experience. By continuing to browse, you accept our use of cookies.",
      accept: "Accept",
      decline: "Decline",
    },
  };

  const t = texts[language];

  return (
    <div 
      className={`fixed z-50 animate-[fadeInSlideUp_0.4s_ease-out_0.5s_forwards] opacity-0 ${
        isMobile ? "left-1/2 -translate-x-1/2 w-[calc(100%-40px)]" : ""
      }`}
      style={{ 
        bottom: "50px",
        right: isMobile ? "auto" : "70px"
      }}
    >
      <div className={`bg-[#F0EEE9] border border-charcoal/10 shadow-lg rounded-lg p-5 backdrop-blur-sm bg-[#F0EEE9]/95 ${
        isMobile ? "w-full" : "max-w-sm"
      }`}>
        <p className="text-sm text-foreground mb-4 font-body leading-relaxed">
          {t.message}
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={handleDecline}
            className="glass-pill-link glass-pill-link-standalone glass-pill-link-standalone-light cursor-pointer px-4 py-2 text-sm"
          >
            {t.decline}
          </button>
          <button
            onClick={handleAccept}
            className="glass-pill-link glass-pill-link-orange cursor-pointer px-5 py-2 text-sm"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}

