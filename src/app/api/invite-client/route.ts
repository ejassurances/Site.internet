import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { client_id } = body

    if (!client_id) return NextResponse.json({ error: "client_id required" }, { status: 400 })

    const { data: client, error } = await supabase
      .from("clients")
      .select("*")
      .eq("id", client_id)
      .single()

    if (error || !client) return NextResponse.json({ error: "Client not found" }, { status: 404 })

    // Generate magic link via Supabase Auth
    const { data: inviteData, error: inviteError } = await supabase.auth.admin.inviteUserByEmail(client.email, {
      data: { client_id, prenom: client.prenom, nom: client.nom }
    })

    if (inviteError) throw inviteError

    // Send custom email via send-email Edge Function
    await supabase.functions.invoke("send-email", {
      body: {
        type: "invite_espace_client",
        client_id,
        data: { prenom: client.prenom, nom: client.nom, email: client.email }
      }
    })

    return NextResponse.json({ success: true, user: inviteData.user })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
