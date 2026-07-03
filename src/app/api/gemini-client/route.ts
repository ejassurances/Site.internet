import { NextRequest, NextResponse } from "next/server"
import { createSupabaseServiceClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  try {
    const supabase = createSupabaseServiceClient()
    if (!supabase) {
      return NextResponse.json({ error: "Configuration Supabase manquante" }, { status: 500 })
    }

    const body = await req.json()
    const { action, ...params } = body

    const { data, error } = await supabase.functions.invoke("ai-agent-gemini", {
      body: { action, ...params }
    })

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
