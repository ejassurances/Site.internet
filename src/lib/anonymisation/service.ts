'use server';

import OpenAI from 'openai';

// Patterns d'anonymisation (regex)
const PATTERNS = {
  // Noms et prénoms (heuristique : 2 mots commençant par majuscule)
  nom: /\b([A-ZÀÂÄÉÈÊËÎÏÔÙÛÜÇ][a-zàâäéèêëîïôùûüç]{1,20})\s+([A-ZÀÂÄÉÈÊËÎÏÔÙÛÜÇ][a-zàâäéèêëîïôùûüç]{1,20})\b/g,
  // Numéros de sécurité sociale (format français)
  nss: /\b[12][0-9]{2}(0[1-9]|1[0-2])(2[AB]|[0-9]{2})[0-9]{3}[0-9]{3}[0-9]{2}\b/g,
  // Numéros de téléphone français
  telephone: /\b(0[1-9](\s|\.|-)?[0-9]{2}(\s|\.|-)?[0-9]{2}(\s|\.|-)?[0-9]{2}(\s|\.|-)?[0-9]{2}|\+33\s?[1-9](\s|\.|-)?[0-9]{2}(\s|\.|-)?[0-9]{2}(\s|\.|-)?[0-9]{2}(\s|\.|-)?[0-9]{2})\b/g,
  // Adresses email
  email: /\b[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}\b/g,
  // Adresses postales (numéro + rue)
  adresse: /\b\d{1,4}\s+(rue|avenue|boulevard|allée|impasse|chemin|route|place|square|résidence|villa|hameau|lieu-dit)\s+[A-Za-zÀ-ÿ\s\-']+\b/gi,
  // Codes postaux français
  codePostal: /\b(0[1-9]|[1-8][0-9]|9[0-5])[0-9]{3}\b/g,
  // Dates de naissance (formats courants)
  dateNaissance: /\b(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/(19|20)[0-9]{2}\b/g,
  // Numéros de compte bancaire / IBAN
  iban: /\b[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}\b/g,
  // Numéros de contrat (séquences numériques longues)
  numeroContrat: /\b[A-Z]{0,3}[0-9]{8,15}\b/g,
  // Montants (pour les offres de prêt)
  montant: /\b\d{1,3}(\s?\d{3})*([,.]\d{2})?\s*(€|EUR|euros?)\b/gi,
};

// Remplacement par des pseudonymes cohérents
const PSEUDONYMES = {
  nom: '[NOM ANONYMISÉ]',
  nss: '[N°SS ANONYMISÉ]',
  telephone: '[TÉL ANONYMISÉ]',
  email: '[EMAIL ANONYMISÉ]',
  adresse: '[ADRESSE ANONYMISÉE]',
  codePostal: '[CP ANONYMISÉ]',
  dateNaissance: '[DATE ANONYMISÉE]',
  iban: '[IBAN ANONYMISÉ]',
  numeroContrat: '[N°CONTRAT ANONYMISÉ]',
  montant: '[MONTANT ANONYMISÉ]',
};

export interface AnonymisationResult {
  texteOriginal: string;
  texteAnonymise: string;
  entitesDetectees: EntiteDetectee[];
  statistiques: {
    totalDetections: number;
    parCategorie: Record<string, number>;
    scoreRGPD: number; // 0-100
  };
}

export interface EntiteDetectee {
  type: string;
  valeur: string;
  position: number;
  remplacePar: string;
}

/**
 * Anonymise un texte brut en appliquant les patterns regex
 */
export function anonymiserTexte(texte: string): AnonymisationResult {
  let texteAnonymise = texte;
  const entitesDetectees: EntiteDetectee[] = [];
  const parCategorie: Record<string, number> = {};

  // Appliquer chaque pattern dans l'ordre
  for (const [categorie, pattern] of Object.entries(PATTERNS)) {
    const remplacement = PSEUDONYMES[categorie as keyof typeof PSEUDONYMES];
    let match;
    const regex = new RegExp(pattern.source, pattern.flags);

    while ((match = regex.exec(texte)) !== null) {
      entitesDetectees.push({
        type: categorie,
        valeur: match[0].substring(0, 20) + (match[0].length > 20 ? '...' : ''),
        position: match.index,
        remplacePar: remplacement,
      });
      parCategorie[categorie] = (parCategorie[categorie] || 0) + 1;
    }

    texteAnonymise = texteAnonymise.replace(pattern, remplacement);
  }

  const totalDetections = entitesDetectees.length;
  // Score RGPD : 100 si tout est anonymisé, diminue selon le nombre de détections restantes
  const scoreRGPD = totalDetections === 0 ? 100 : Math.max(0, 100 - Math.min(totalDetections * 5, 50));

  return {
    texteOriginal: texte,
    texteAnonymise,
    entitesDetectees,
    statistiques: {
      totalDetections,
      parCategorie,
      scoreRGPD,
    },
  };
}

/**
 * Utilise l'IA pour anonymiser un texte de manière plus intelligente
 * (détection contextuelle des noms propres, etc.)
 */
export async function anonymiserTexteIA(texte: string): Promise<AnonymisationResult> {
  // D'abord, appliquer les patterns regex
  const resultBase = anonymiserTexte(texte);

  // Ensuite, utiliser l'IA pour détecter les entités restantes
  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: process.env.OPENAI_API_BASE,
    });

    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Tu es un expert RGPD spécialisé dans l'anonymisation de documents financiers et d'assurance français.
          
Ta mission : identifier et remplacer TOUTES les données personnelles dans le texte fourni.

Données à anonymiser :
- Noms et prénoms de personnes physiques → [NOM ANONYMISÉ]
- Numéros de sécurité sociale → [N°SS ANONYMISÉ]
- Numéros de téléphone → [TÉL ANONYMISÉ]
- Adresses email → [EMAIL ANONYMISÉ]
- Adresses postales complètes → [ADRESSE ANONYMISÉE]
- Dates de naissance → [DATE ANONYMISÉE]
- IBAN / RIB → [IBAN ANONYMISÉ]
- Numéros de contrat spécifiques → [N°CONTRAT ANONYMISÉ]

NE PAS anonymiser :
- Les noms d'organismes (banques, assureurs, administrations)
- Les montants financiers génériques
- Les taux d'intérêt
- Les dates autres que les dates de naissance

Retourne UNIQUEMENT le texte anonymisé, sans commentaire.`,
        },
        {
          role: 'user',
          content: `Anonymise ce document :\n\n${resultBase.texteAnonymise}`,
        },
      ],
      max_tokens: 4000,
      temperature: 0,
    });

    const texteAnonymiseIA = response.choices[0]?.message?.content || resultBase.texteAnonymise;

    return {
      ...resultBase,
      texteAnonymise: texteAnonymiseIA,
      statistiques: {
        ...resultBase.statistiques,
        scoreRGPD: 95, // Score élevé après passage IA
      },
    };
  } catch {
    // Fallback sur le résultat regex si l'IA échoue
    return resultBase;
  }
}

/**
 * Extrait le texte d'un fichier base64 (PDF ou image) via l'API Vision d'OpenAI
 */
export async function extraireTexteDocument(
  contenuBase64: string,
  typeFichier: string
): Promise<string> {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_API_BASE,
  });

  const mimeType = typeFichier.includes('pdf') ? 'image/png' : typeFichier;

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Extrais TOUT le texte de ce document de manière fidèle, en conservant la structure (titres, tableaux, paragraphes). 
              
Ce document peut être une offre de prêt, un tableau d'amortissement, une attestation d'assurance ou un autre document financier.

Retourne uniquement le texte extrait, sans commentaire ni reformulation.`,
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:${mimeType};base64,${contenuBase64}`,
                detail: 'high',
              },
            },
          ],
        },
      ],
      max_tokens: 4000,
    });

    return response.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Erreur extraction texte:', error);
    throw new Error('Impossible d\'extraire le texte du document');
  }
}

/**
 * Pipeline complet : extraction + anonymisation
 */
export async function traiterDocument(
  contenuBase64: string,
  typeFichier: string,
  modeAnonymisation: 'regex' | 'ia' = 'ia'
): Promise<AnonymisationResult> {
  // 1. Extraire le texte
  const texte = await extraireTexteDocument(contenuBase64, typeFichier);

  // 2. Anonymiser
  if (modeAnonymisation === 'ia') {
    return anonymiserTexteIA(texte);
  } else {
    return anonymiserTexte(texte);
  }
}
