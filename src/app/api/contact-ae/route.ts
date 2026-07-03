import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { prenom, nom, email, telephone, date_naissance, adresse, situation, employeur, revenus, montant_credit, duree_credit, assureur_actuel, motif } = body

    if (!prenom || !nom || !email) {
      return NextResponse.json({ error: "Champs obligatoires manquants" }, { status: 400 })
    }

    // Upsert client
    const { data: client, error: clientError } = await supabase
      .from("clients")
      .upsert({ prenom, nom, email, telephone, date_naissance, adresse, situation_professionnelle: situation }, { onConflict: "email" })
      .select()
      .single()

    if (clientError) throw clientError

    // Create AE project
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .insert({
        client_id: client.id,
        type: "assurance_emprunteur",
        status: "recueil_besoins",
        montant_credit,
        duree_credit,
        assureur_actuel,
        motif_demande: motif,
        employeur,
        revenus
      })
      .select()
      .single()

    if (projectError) throw projectError

    // Send confirmation email via Edge Function
    await supabase.functions.invoke("send-email", {
      body: { type: "contact_ae_confirmation", client_id: client.id, data: { prenom, nom } }
    })

    // Create Drive folders
    await supabase.functions.invoke("create-drive-folder", {
      body: { client_id: client.id, client_name: `${prenom} ${nom}` }
    })

    return NextResponse.json({ success: true, client_id: client.id, project_id: project.id })
  } catch (error) {
    console.error("contact-ae error:", error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
