import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type Contract = { product_type: string; insurer: string; status: string; annual_premium: number; start_date: string };
type RelatedPerson = { relation: string; first_name: string; last_name: string; date_of_birth: string };
type Interaction = { date: string; type: string; summary: string; outcome: string };

export async function POST(req: NextRequest) {
  try {
    const { clientId } = await req.json();
    if (!clientId) return NextResponse.json({ error: "clientId requis" }, { status: 400 });

    const supabase = await createSupabaseServerClient();
    if (!supabase) return NextResponse.json({ error: "Connexion Supabase non disponible." }, { status: 500 });

    const [clientRes, contractsRes, interactionsRes, relatedPersonsRes] = await Promise.all([
      supabase.from("clients").select("*").eq("id", clientId).single(),
      supabase.from("contracts").select("*").eq("client_id", clientId),
      supabase.from("client_interactions").select("*").eq("client_id", clientId).order("date", { ascending: false }).limit(10),
      supabase.from("client_related_persons").select("*").eq("client_id", clientId),
    ]);

    const client = clientRes.data;
    if (!client) return NextResponse.json({ error: "Client introuvable" }, { status: 404 });

    const contracts = (contractsRes.data || []) as Contract[];
    const interactions = (interactionsRes.data || []) as Interaction[];
    const relatedPersons = (relatedPersonsRes.data || []) as RelatedPerson[];

    const clientData = `
CLIENT: ${client.first_name} ${client.last_name}
Né(e) le: ${client.date_of_birth || "N/A"} | Email: ${client.email} | Tél: ${client.phone || "N/A"}
Statut: ${client.status} | Source: ${client.source || "N/A"}
Situation familiale: ${client.family_context || "N/A"} | Situation: ${client.marital_status || "N/A"}
Profession: ${client.profession || "N/A"}
Notes: ${client.notes || "Aucune"}

CONTRATS (${contracts.length}):
${contracts.map((c) => `- ${c.product_type} chez ${c.insurer} — ${c.status} — Prime: ${c.annual_premium}€/an — Début: ${c.start_date || "N/A"}`).join("\n") || "Aucun contrat"}

PERSONNES LIÉES (${relatedPersons.length}):
${relatedPersons.map((p) => `- ${p.relation}: ${p.first_name} ${p.last_name} (né(e) le ${p.date_of_birth || "N/A"})`).join("\n") || "Aucune"}

HISTORIQUE INTERACTIONS (${interactions.length}):
${interactions.slice(0, 8).map((i) => `- ${new Date(i.date).toLocaleDateString("fr-FR")} [${i.type}]: ${i.summary || "N/A"} → Résultat: ${i.outcome || "N/A"}`).join("\n") || "Aucune interaction"}
`;

    const systemPrompt = `Tu es IaGO, l'assistant IA du cabinet EJ Partners Assurances.
Tu dois synthétiser le dossier d'un client en 5 points clés pour préparer un courtier avant un appel ou un rendez-vous.

Réponds UNIQUEMENT en JSON valide avec cette structure exacte:
{
  "client_name": "Prénom Nom",
  "points": [
    {
      "titre": "Titre court du point",
      "contenu": "Explication détaillée en 2-3 phrases",
      "priorite": "haute|normale|info"
    }
  ],
  "recommandations": ["Recommandation 1", "Recommandation 2", "Recommandation 3"],
  "ton_suggere": "Chaleureux et professionnel",
  "duree_estimee": "15-20 min"
}

Les 5 points doivent couvrir: situation actuelle, contrats en place, besoins non couverts, historique relationnel, point d'attention.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Synthétise ce dossier client:\n${clientData}` },
      ],
      max_tokens: 1200,
      temperature: 0.5,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) return NextResponse.json({ error: "Réponse vide de l'IA" }, { status: 500 });

    const parsed = JSON.parse(content);
    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Resume client error:", error);
    return NextResponse.json({ error: "Erreur lors de la génération de la synthèse." }, { status: 500 });
  }
}
