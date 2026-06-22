import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type Contract = { product_type: string; insurer: string; contract_number: string; status: string; annual_premium: number; commission_rate: number };
type Interaction = { date: string; type: string; summary: string; outcome: string };
type InactiveClient = { first_name: string; last_name: string; email: string };

export async function POST(req: NextRequest) {
  try {
    const { message, context, clientSearch } = await req.json();
    const supabase = await createSupabaseServerClient();
    if (!supabase) return NextResponse.json({ error: "Connexion Supabase non disponible." }, { status: 500 });

    let crmContext = "";

    if (context === "client" && clientSearch) {
      const { data: clients } = await supabase
        .from("clients")
        .select("id, first_name, last_name, email, phone, status, family_context, notes")
        .or(`first_name.ilike.%${clientSearch}%,last_name.ilike.%${clientSearch}%`)
        .limit(3);

      if (clients && clients.length > 0) {
        const client = clients[0];
        const { data: contracts } = await supabase
          .from("contracts")
          .select("product_type, insurer, contract_number, status, annual_premium, commission_rate")
          .eq("client_id", client.id)
          .limit(10);

        const { data: interactions } = await supabase
          .from("client_interactions")
          .select("type, date, summary, outcome")
          .eq("client_id", client.id)
          .order("date", { ascending: false })
          .limit(5);

        crmContext = `
CONTEXTE CLIENT — ${client.first_name} ${client.last_name}
Email: ${client.email} | Téléphone: ${(client as { phone?: string }).phone || "N/A"}
Statut: ${client.status} | Situation familiale: ${(client as { family_context?: string }).family_context || "N/A"}
Notes: ${(client as { notes?: string }).notes || "Aucune"}

CONTRATS ACTIFS (${contracts?.length || 0}):
${(contracts as Contract[] | null)?.map((c) => `- ${c.product_type} chez ${c.insurer} (N°${c.contract_number}) — ${c.status} — Prime: ${c.annual_premium}€/an — Commission: ${c.commission_rate}%`).join("\n") || "Aucun contrat"}

DERNIÈRES INTERACTIONS:
${(interactions as Interaction[] | null)?.map((i) => `- ${new Date(i.date).toLocaleDateString("fr-FR")} [${i.type}]: ${i.summary || "N/A"} → ${i.outcome || "N/A"}`).join("\n") || "Aucune interaction"}
`;
      }
    } else {
      const { count: clientCount } = await supabase.from("clients").select("*", { count: "exact", head: true });
      const { count: contractCount } = await supabase.from("contracts").select("*", { count: "exact", head: true }).eq("status", "actif");

      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const { data: inactiveClients } = await supabase
        .from("clients")
        .select("first_name, last_name, email")
        .lt("updated_at", thirtyDaysAgo.toISOString())
        .eq("status", "actif")
        .limit(5);

      crmContext = `
CONTEXTE CABINET EJ PARTNERS ASSURANCES
Total clients: ${clientCount || 0}
Contrats actifs: ${contractCount || 0}

CLIENTS INACTIFS RÉCENTS (>30 jours sans contact):
${(inactiveClients as InactiveClient[] | null)?.map((c) => `- ${c.first_name} ${c.last_name} (${c.email})`).join("\n") || "Aucun"}
`;
    }

    const systemPrompt = `Tu es IaGO, l'assistant IA omniscient du cabinet EJ Partners Assurances, spécialisé dans les assurances pour les familles non-traditionnelles (coparentalité, familles homoparentales, familles recomposées, LGBT+).

Tu as accès aux données CRM du cabinet. Tu réponds en français, de manière professionnelle et concise.
Tu proposes des actions concrètes (emails, notes, tâches) sous forme d'objets JSON dans ton message quand c'est pertinent.

RÈGLES IMPORTANTES:
- Tu ne prends JAMAIS d'action sans validation explicite du courtier
- Tu bases tes réponses UNIQUEMENT sur les données CRM fournies
- Si tu n'as pas assez d'informations, tu le dis clairement
- Tu utilises le format Markdown pour structurer tes réponses (** pour gras, ## pour titres, - pour listes)

${crmContext ? `DONNÉES CRM DISPONIBLES:\n${crmContext}` : ""}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content || "Je n'ai pas pu générer une réponse.";

    const actions = [];
    if (response.toLowerCase().includes("email") || response.toLowerCase().includes("envoyer")) {
      actions.push({ label: "Créer un email", type: "email", payload: response });
    }
    if (response.toLowerCase().includes("note") || response.toLowerCase().includes("noter")) {
      actions.push({ label: "Ajouter une note CRM", type: "note", payload: response });
    }
    if (response.toLowerCase().includes("relance") || response.toLowerCase().includes("rappeler")) {
      actions.push({ label: "Créer une tâche de relance", type: "task", payload: response });
    }

    return NextResponse.json({ response, actions });
  } catch (error) {
    console.error("IaGO Copilot error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la communication avec IaGO. Vérifiez que OPENAI_API_KEY est configuré sur Vercel." },
      { status: 500 }
    );
  }
}
