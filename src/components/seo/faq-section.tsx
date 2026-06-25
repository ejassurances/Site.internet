"use client";

import { useState } from "react";
import { StructuredData } from "./structured-data";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
  title?: string;
}

/**
 * FAQSection — Composant réutilisable affichant une FAQ en accordéon
 * et injectant automatiquement le JSON-LD FAQPage schema.org.
 *
 * Usage :
 * <FAQSection items={[{ question: "...", answer: "..." }]} />
 */
export function FAQSection({ items, title = "Questions fréquentes" }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <StructuredData data={faqSchema} />
      <section className="faq-section">
        <h2 className="faq-section-title">{title}</h2>
        <div className="faq-list">
          {items.map((item, index) => (
            <div
              key={index}
              className={`faq-item${openIndex === index ? " faq-item--open" : ""}`}
            >
              <button
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
              >
                <span>{item.question}</span>
                <svg
                  className="faq-chevron"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
