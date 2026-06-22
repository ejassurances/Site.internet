import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type ClientRow = { id: string; first_name: string; last_name: string; email: string; family_context: string | null; marital_status: string | null; status: string };
type ContractRow = { client_id: string; product_type: string; status: string };
type Opportunity = { opportunites: { potentiel_ca: string }[] };

export async function POST() {
  try {
    const supabase = await createSupabaseServerClient();
    if (!supabase) return NextResponse.json({ error: "Connexion Supabase non disponible." }, { status: 500 });

    const { data: clients } = await supabase
      .from("clients")
      .select("id, first_name, last_name, email, family_context, marital_status, status")
      .in("status", ["actif", "prospect"])
      .limit(50);

    if (!clients || clients.length === 0) {
      return NextResponse.json({
        total_clients: 0,
        opportunites_detectees: 0,
        ca_potentiel_total: "0 €",
        opportunities: [],
      });
    }

    const clientIds = (clients as ClientRow[]).map((c) => c.id);
    const { data: allContracts } = await supabase
      .from("contracts")
      .select("client_id, product_type, status")
      .in("client_id", clientIds)
      .eq("status", "actif");

    const clientsData = (clients as ClientRow[]).map((client) => {
      const clientContracts = ((allContracts || []) as ContractRow[]).filter((c) => c.client_id === client.id);
      return {
        id: client.id,
        nom: `${client.first_name} ${client.last_name}`,
        email: client.email,
        situation: client.family_context || client.marital_status || "Non précisé",
        contrats: clientContracts.map((c) => c.product_type),
      };
    });

    const systemPrompt = `Tu es IaGO, l'IA d'analyse commerciale du cabinet EJ Partners Assurances.
Tu dois analyser le portefeuille clients et identifier les opportunités de cross-selling.

Les produits disponibles sont: Assurance emprunteur, Prévoyance, Transmission/Succession, Mutuelle, Assurance vie, Protection juridique.

Pour chaque client avec des opportunités, génère une analyse. Réponds UNIQUEMENT en JSON valide:
{
  "opportunities": [
    {
      "client_id": "uuid",
      "client_name": "Prénom Nom",
      "email": "email",
      "score": 85,
      "situation": "Famille homoparentale",
      "contrats_actifs": ["Assurance emprunteur"],
      "opportunites": [
        {
          "produit": "Prévoyance",
          "raison": "Famille avec enfants sans protection en cas d'arrêt de travail",
          "priorite": "haute",
          "potentiel_ca": "~800€/an"
        }
      ],
      "action_recommandee": "Proposer un bilan prévoyance complet lors du prochain contact"
    }
  ]
}

Le score (0-100) représente l'urgence/potentiel: 80+ = très prioritaire, 60-79 = prioritaire, <60 = à surveiller.
Inclure seulement les clients avec au moins une opportunité réelle. Maximum 20 clients.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `Analyse ce portefeuille de ${clients.length} clients:\n${JSON.stringify(clientsData, null, 2)}`,
        },
      ],
      max_tokens: 3000,
      temperature: 0.3,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) return NextResponse.json({ error: "Réponse vide de l'IA" }, { status: 500 });

    const parsed = JSON.parse(content);
    const opportunities: Opportunity[] = parsed.opportunities || [];

    let totalCA = 0;
    opportunities.forEach((opp) => {
      opp.opportunites.forEach((op) => {
        const match = op.potentiel_ca.match(/(\d+)/);
        if (match) totalCA += parseInt(match[1]);
      });
    });

    return NextResponse.json({
      total_clients: clients.length,
      opportunites_detectees: opportunities.reduce((acc, o) => acc + o.opportunites.length, 0),
      ca_potentiel_total: `${totalCA.toLocaleString("fr-FR")} €`,
      opportunities,
    });
  } catch (error) {
    console.error("Cross-selling error:", error);
    return NextResponse.json({ error: "Erreur lors du scan du portefeuille." }, { status: 500 });
  }
}
