import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, BookOpen, Lock, Eye, FileCheck, AlertTriangle, CheckCircle, ExternalLink } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "ConformitÃ© rÃ©glementaire â EJ Assurances",
  description:
    "Notre engagement en matiÃ¨re de conformitÃ© : DDA (Directive sur la Distribution d'Assurances), LCB-FT (Lutte contre le Blanchiment), RGPD et protection des donnÃ©es personnelles.",
  alternates: { canonical: "https://www.ej-assurances.fr/conformite" },
};

const pillars = [
  {
    icon: BookOpen,
    color: "#3B82F6",
    tag: "DDA",
    title: "Directive Distribution Assurances",
    description:
      "La DDA (Directive 2016/97/UE, transposÃ©e en droit franÃ§ais) encadre la distribution des produits d'assurance. Elle impose des obligations renforcÃ©es en matiÃ¨re de conseil, de transparence et de protection du client.",
    points: [
      "Recueil systÃ©matique des besoins et exigences du client avant toute recommandation",
      "Devoir de conseil documentÃ© et tracÃ© pour chaque dossier",
      "Information prÃ©contractuelle remise par Ã©crit (IPID, fiche conseil)",
      "Formation continue obligatoire de 15 heures par an pour nos conseillers",
      "RÃ©munÃ©ration transparente : aucun conflit d'intÃ©rÃªt non gÃ©rÃ©",
    ],
  },
  {
    icon: AlertTriangle,
    color: "#8B5CF6",
    tag: "LCB-FT",
    title: "Lutte contre le Blanchiment & le Financement du Terrorisme",
    description:
      "En tant que courtier d'assurances, nous sommes assujettis aux obligations LCB-FT dÃ©finies par le Code monÃ©taire et financier (Art. L.561-2). Nous mettons en Åuvre une vigilance rigoureuse sur l'identitÃ© de nos clients et l'origine des fonds.",
    points: [
      "VÃ©rification d'identitÃ© systÃ©matique (KYC) Ã  l'entrÃ©e en relation",
      "Screening PPE (Personnes Politiquement ExposÃ©es) via des bases certifiÃ©es",
      "VÃ©rification des listes de gel des avoirs (TrÃ©sor franÃ§ais, UE, ONU)",
      "DÃ©claration de soupÃ§on Ã  Tracfin si nÃ©cessaire",
      "Formation annuelle de nos Ã©quipes aux typologies de blanchiment",
    ],
  },
  {
    icon: Lock,
    color: "#10B981",
    tag: "RGPD",
    title: "Protection des DonnÃ©es Personnelles",
    description:
      "Nous appliquons le RÃ¨glement GÃ©nÃ©ral sur la Protection des DonnÃ©es (RGPD â UE 2016/679) et la loi Informatique et LibertÃ©s. Vos donnÃ©es ne sont jamais vendues Ã  des tiers et ne servent qu'Ã  la gestion de votre dossier.",
    points: [
      "Collecte minimale : seules les donnÃ©es strictement nÃ©cessaires sont traitÃ©es",
      "DurÃ©e de conservation limitÃ©e : 5 ans maximum aprÃ¨s la fin de la relation contractuelle",
      "HÃ©bergement des donnÃ©es en Europe (Supabase EU-Central, Vercel EU)",
      "Droit d'accÃ¨s, rectification, effacement et portabilitÃ© sur simple demande",
      "Aucune cession de donnÃ©es Ã  des partenaires commerciaux sans consentement explicite",
    ],
  },
  {
    icon: Eye,
    color: "#F59E0B",
    tag: "TraÃ§abilitÃ©",
    title: "Journal d'Audit & TraÃ§abilitÃ©",
    description:
      "Chaque action significative dans notre CRM est horodatÃ©e et conservÃ©e dans un journal d'audit immuable. Cette traÃ§abilitÃ© garantit la transparence de notre conseil et facilite les contrÃ´les de l'ACPR.",
    points: [
      "Journal d'audit horodatÃ© pour chaque dossier client",
      "Conservation des communications et documents pendant la durÃ©e lÃ©gale",
      "ContrÃ´le interne trimestriel de conformitÃ©",
      "ProcÃ©dure de gestion des rÃ©clamations clients documentÃ©e",
      "Exercices de tests de rÃ©sistance annuels (business continuity)",
    ],
  },
];

const authorities = [
  {
    name: "ORIAS",
    role: "Registre des intermÃ©diaires en assurance",
    url: "https://www.orias.fr",
    description: "Immatriculation obligatoire pour exercer le courtage en assurances.",
  },
  {
    name: "ACPR",
    role: "AutoritÃ© de contrÃ´le prudentiel et de rÃ©solution",
    url: "https://acpr.banque-france.fr",
    description: "Supervision prudentielle et comportementale des intermÃ©diaires.",
  },
  {
    name: "CNIL",
    role: "Commission nationale de l'informatique et des libertÃ©s",
    url: "https://www.cnil.fr",
    description: "ContrÃ´le du respect du RGPD et des droits des personnes.",
  },
  {
    name: "Tracfin",
    role: "Traitement du renseignement et action contre les circuits financiers clandestins",
    url: "https://www.economie.gouv.fr/tracfin",
    description: "Cellule de renseignement financier destinataire de nos dÃ©clarations de soupÃ§on.",
  },
];

export default function ConformitePage() {
  return (
    <>
      <SiteHeader />
      <main className="public-main" style={{ paddingBottom: "80px" }}>

        {/* ââ Hero ââ */}
        <section className="compact-hero" style={{ paddingBottom: "56px", borderBottom: "1px solid var(--line)" }}>
          <p className="eyebrow">Cadre rÃ©glementaire</p>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", marginBottom: "20px" }}>
            Notre engagement<br />
            <span style={{ color: "var(--accent)" }}>conformitÃ©</span>
          </h1>
          <p className="hero-copy" style={{ maxWidth: "620px" }}>
            En tant que courtier en assurances enregistrÃ© Ã  l'ORIAS, EJ Assurances est soumis Ã 
            un cadre rÃ©glementaire strict. Transparence, protection du client et rigueur
            opÃ©rationnelle sont au cÅur de notre activitÃ©.
          </p>
          <div className="hero-proof" style={{ marginTop: "28px" }}>
            <span>
              <ShieldCheck size={13} style={{ display: "inline", marginRight: "6px", verticalAlign: "middle" }} aria-hidden />
              ORIAS nÂ° (en cours)
            </span>
            <span>
              <FileCheck size={13} style={{ display: "inline", marginRight: "6px", verticalAlign: "middle" }} aria-hidden />
              DDA Conforme
            </span>
            <span>
              <Lock size={13} style={{ display: "inline", marginRight: "6px", verticalAlign: "middle" }} aria-hidden />
              RGPD Conforme
            </span>
            <span>
              <AlertTriangle size={13} style={{ display: "inline", marginRight: "6px", verticalAlign: "middle" }} aria-hidden />
              LCB-FT CertifiÃ©
            </span>
          </div>
        </section>

        {/* ââ 4 pilliers conformitÃ© ââ */}
        <section style={{ padding: "56px 0 0" }}>
          <div className="section-heading" style={{ marginBottom: "40px" }}>
            <p className="eyebrow">Les 4 piliers</p>
            <h2>Un cadre de conformitÃ© complet</h2>
            <p style={{ color: "var(--muted)", marginTop: "8px" }}>
              Chaque pilier rÃ©pond Ã  une obligation rÃ©glementaire spÃ©cifique, mise en Åuvre
              dans nos processus quotidiens.
            </p>
          </div>

          <div style={{ display: "grid", gap: "24px" }}>
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <article
                  key={pillar.tag}
                  style={{
                    border: "1px solid var(--line)",
                    borderRadius: "var(--radius)",
                    background: "var(--surface)",
                    boxShadow: "var(--shadow-sm)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      padding: "20px 24px",
                      background: `linear-gradient(135deg, ${pillar.color}14 0%, transparent 100%)`,
                      borderBottom: "1px solid var(--line)",
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        placeItems: "center",
                        width: "44px",
                        height: "44px",
                        borderRadius: "10px",
                        background: `${pillar.color}18`,
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={22} color={pillar.color} aria-hidden />
                    </div>
                    <div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "11px",
                          fontWeight: 800,
                          letterSpacing: ".07em",
                          textTransform: "uppercase",
                          color: pillar.color,
                        }}
                      >
                        {pillar.tag}
                      </p>
                      <h3 style={{ margin: 0, fontSize: "18px" }}>{pillar.title}</h3>
                    </div>
                  </div>

                  <div style={{ display: "grid", gap: "20px", padding: "24px", gridTemplateColumns: "1fr 1fr" }}>
                    <p style={{ color: "var(--muted)", lineHeight: 1.7, margin: 0, gridColumn: "1 / -1" }}>
                      {pillar.description}
                    </p>
                    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: "10px", gridColumn: "1 / -1" }}>
                      {pillar.points.map((pt) => (
                        <li
                          key={pt}
                          style={{
                            display: "flex",
                            gap: "10px",
                            alignItems: "flex-start",
                            fontSize: "14px",
                            color: "var(--fg)",
                            lineHeight: 1.5,
                          }}
                        >
                          <CheckCircle
                            size={15}
                            color={pillar.color}
                            style={{ flexShrink: 0, marginTop: "2px" }}
                            aria-hidden
                          />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ââ AutoritÃ©s de contrÃ´le ââ */}
        <section style={{ padding: "64px 0 0", borderTop: "1px solid var(--line)", marginTop: "64px" }}>
          <div className="section-heading" style={{ marginBottom: "32px" }}>
            <p className="eyebrow">Supervision</p>
            <h2>AutoritÃ©s de contrÃ´le</h2>
            <p style={{ color: "var(--muted)", marginTop: "8px" }}>
              Nos activitÃ©s sont placÃ©es sous la supervision des autoritÃ©s suivantes.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "16px",
            }}
          >
            {authorities.map((auth) => (
              <a
                key={auth.name}
                href={auth.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  padding: "20px",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--radius)",
                  background: "var(--surface)",
                  boxShadow: "var(--shadow-sm)",
                  transition: "box-shadow .2s, transform .2s",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                  <strong style={{ fontSize: "16px", color: "var(--accent)" }}>{auth.name}</strong>
                  <ExternalLink size={14} color="var(--muted)" aria-hidden />
                </div>
                <p style={{ margin: "0 0 6px", fontSize: "12px", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".05em" }}>
                  {auth.role}
                </p>
                <p style={{ margin: 0, fontSize: "14px", color: "var(--muted)", lineHeight: 1.5 }}>
                  {auth.description}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* ââ Exercice des droits ââ */}
        <section
          style={{
            marginTop: "64px",
            padding: "clamp(32px, 4vw, 48px) clamp(24px, 4vw, 48px)",
            borderRadius: "var(--radius)",
            background: "linear-gradient(135deg, var(--navy) 0%, var(--navy-soft) 100%)",
            color: "white",
          }}
        >
          <p className="eyebrow" style={{ color: "var(--accent)" }}>Vos droits</p>
          <h2 style={{ color: "white", margin: "8px 0 16px", fontSize: "clamp(22px, 3vw, 32px)" }}>
            Exercer vos droits RGPD ou dÃ©poser une rÃ©clamation
          </h2>
          <p style={{ color: "rgba(255,255,255,.72)", lineHeight: 1.7, maxWidth: "600px", margin: "0 0 28px" }}>
            Pour toute demande relative Ã  vos donnÃ©es personnelles (accÃ¨s, rectification,
            effacement, portabilitÃ©) ou pour dÃ©poser une rÃ©clamation, contactez-nous directement.
            Nous nous engageons Ã  rÃ©pondre dans un dÃ©lai de 30 jours.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link
              href="/contact"
              className="primary-action"
              style={{ background: "var(--accent)", color: "white", minHeight: "44px", fontSize: "14px", padding: "0 20px" }}
            >
              Contacter le DPO
            </Link>
            <Link
              href="/confidentialite"
              className="secondary-action"
              style={{
                background: "rgba(255,255,255,.1)",
                border: "1px solid rgba(255,255,255,.2)",
                color: "white",
                minHeight: "44px",
                fontSize: "14px",
                padding: "0 20px",
              }}
            >
              Politique de confidentialitÃ©
            </Link>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
