"use client";

import { Container } from "./Container";
import { Section } from "./Section";

interface OffersSectionProps {
  onCtaClick?: () => void;
}

/**
 * OffersSection Component
 * 
 * Section orientée acquisition avec une offre principale (Landing page déléguée)
 * et deux offres secondaires en upsell.
 * 
 * Usage:
 * ```tsx
 * <OffersSection onCtaClick={() => setIsContactModalOpen(true)} />
 * ```
 */
export function OffersSection({ onCtaClick }: OffersSectionProps) {
  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    }
  };

  return (
    <Section id="offres" variant="base" background="bg" className="relative">
      <Container maxWidth="wide">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text mb-4 md:mb-6">
            Votre site ne convertit pas. On règle ça en 5 jours.
          </h2>
          <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto leading-relaxed">
            Une landing page claire, prête à publier. Sans refonte lourde. Sans promesses vagues.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 mb-12 md:mb-16">
          {/* Carte #1 - FEATURED: Landing page déléguée */}
          <article className="featured relative bg-surface rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 border-2 border-accent shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col md:col-span-2 lg:col-span-1">
            {/* Badge Featured */}
            <div className="absolute -top-3 -right-3 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              Offre principale
            </div>
            
            <div className="flex flex-col h-full">
              {/* Nom */}
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-text mb-3 md:mb-4">
                Landing page déléguée
              </h3>

              {/* Promesse */}
              <p className="text-base md:text-lg text-text mb-6 md:mb-8 font-medium">
                Une page complète, prête à publier, livrée en 5 jours.
              </p>

              {/* Bullets */}
              <ul className="mb-6 md:mb-8 space-y-3 md:space-y-4 flex-grow">
                <li className="flex items-start text-text">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-accent mr-3 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm md:text-base">1 landing page complète (desktop)</span>
                </li>
                <li className="flex items-start text-text">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-accent mr-3 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm md:text-base">Structure + design professionnel</span>
                </li>
                <li className="flex items-start text-text">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-accent mr-3 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm md:text-base">1 aller-retour maximum</span>
                </li>
                <li className="flex items-start text-text">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-accent mr-3 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm md:text-base">Livrée prête à publier</span>
                </li>
                <li className="flex items-start text-text">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-accent mr-3 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm md:text-base">Support technique inclus</span>
                </li>
              </ul>

              {/* Durée & Prix */}
              <div className="mb-6 md:mb-8 space-y-2">
                <div className="text-xs md:text-sm text-muted uppercase tracking-wide">
                  5 jours
                </div>
                <div className="text-2xl md:text-3xl font-heading font-bold text-text">
                  800 € HT
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={handleCtaClick}
                className="mt-auto w-full bg-accent hover:bg-accent-hover text-white font-medium py-3 md:py-4 px-6 rounded-lg md:rounded-xl transition-colors duration-200 text-base md:text-lg"
                aria-label="Discuter de ma landing page"
              >
                Discuter de ma landing page
              </button>
            </div>
          </article>

          {/* Carte #2: Refonte site (secondaire) */}
          <article className="bg-surface rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 border border-border-subtle hover:border-accent/30 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col">
            <div className="flex flex-col h-full">
              {/* Nom */}
              <h3 className="text-xl md:text-2xl font-heading font-bold text-text mb-3 md:mb-4">
                Refonte site
              </h3>

              {/* Promesse */}
              <p className="text-base md:text-lg text-muted mb-6 md:mb-8">
                Un site complet, moderne et cohérent, de A à Z.
              </p>

              {/* Bullets */}
              <ul className="mb-6 md:mb-8 space-y-3 md:space-y-4 flex-grow">
                <li className="flex items-start text-text">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-accent mr-3 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm md:text-base">Audit visuel et structurel</span>
                </li>
                <li className="flex items-start text-text">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-accent mr-3 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm md:text-base">Design de toutes les pages</span>
                </li>
                <li className="flex items-start text-text">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-accent mr-3 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm md:text-base">Intégration responsive</span>
                </li>
                <li className="flex items-start text-text">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-accent mr-3 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm md:text-base">Optimisation performance</span>
                </li>
                <li className="flex items-start text-text">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-accent mr-3 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm md:text-base">Livraison clé en main</span>
                </li>
              </ul>

              {/* Durée & Prix */}
              <div className="mb-6 md:mb-8 space-y-2">
                <div className="text-xs md:text-sm text-muted uppercase tracking-wide">
                  4–6 semaines
                </div>
                <div className="text-2xl md:text-3xl font-heading font-bold text-text">
                  À partir de 5 000 € HT
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={handleCtaClick}
                className="mt-auto w-full bg-transparent hover:bg-accent/10 border-2 border-accent text-accent hover:text-accent font-medium py-3 md:py-4 px-6 rounded-lg md:rounded-xl transition-colors duration-200 text-base md:text-lg"
                aria-label="Discuter de ma landing page"
              >
                Discuter de ma landing page
              </button>
            </div>
          </article>

          {/* Carte #3: Direction continue (secondaire) */}
          <article className="bg-surface rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 border border-border-subtle hover:border-accent/30 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col">
            <div className="flex flex-col h-full">
              {/* Nom */}
              <h3 className="text-xl md:text-2xl font-heading font-bold text-text mb-3 md:mb-4">
                Direction continue
              </h3>

              {/* Promesse */}
              <p className="text-base md:text-lg text-muted mb-6 md:mb-8">
                Votre directeur artistique à la demande, pour maintenir la cohérence.
              </p>

              {/* Bullets */}
              <ul className="mb-6 md:mb-8 space-y-3 md:space-y-4 flex-grow">
                <li className="flex items-start text-text">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-accent mr-3 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm md:text-base">5–10h design / mois</span>
                </li>
                <li className="flex items-start text-text">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-accent mr-3 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm md:text-base">Déclinaisons et nouveaux assets</span>
                </li>
                <li className="flex items-start text-text">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-accent mr-3 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm md:text-base">Optimisations UI continues</span>
                </li>
                <li className="flex items-start text-text">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-accent mr-3 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm md:text-base">Support réactif</span>
                </li>
                <li className="flex items-start text-text">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-accent mr-3 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm md:text-base">Facturation mensuelle simple</span>
                </li>
              </ul>

              {/* Durée & Prix */}
              <div className="mb-6 md:mb-8 space-y-2">
                <div className="text-xs md:text-sm text-muted uppercase tracking-wide">
                  Abonnement mensuel
                </div>
                <div className="text-2xl md:text-3xl font-heading font-bold text-text">
                  À partir de 450 € HT / mois
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={handleCtaClick}
                className="mt-auto w-full bg-transparent hover:bg-accent/10 border-2 border-accent text-accent hover:text-accent font-medium py-3 md:py-4 px-6 rounded-lg md:rounded-xl transition-colors duration-200 text-base md:text-lg"
                aria-label="Discuter de ma landing page"
              >
                Discuter de ma landing page
              </button>
            </div>
          </article>
        </div>

        {/* Micro-ligne de réassurance */}
        <p className="text-center text-sm md:text-base text-muted italic">
          Pas de refonte lourde. Un livrable clair. On commence simple.
        </p>
      </Container>
    </Section>
  );
}

