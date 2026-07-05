import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { createSupabaseServiceClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Non authentifie" }, { status: 401 });
    }

    if (!["admin", "courtier"].includes(user.role)) {
      return NextResponse.json({ error: "Acces refuse" }, { status: 403 });
    }

    const supabase = createSupabaseServiceClient();
    if (!supabase) {
      return NextResponse.json({ error: "Configuration Supabase manquante" }, { status: 500 });
    }

    const body = await req.json();
    const clientId = String(body.client_id ?? body.clientId ?? "");

    if (!clientId) {
      return NextResponse.json({ error: "client_id required" }, { status: 400 });
    }

    const { data: client, error } = await supabase
      .from("clients")
      .select("id, full_name, email, profile_id, supabase_user_id")
      .eq("id", clientId)
      .single();

    if (error || !client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    const email = String(client.email ?? "").trim().toLowerCase();
    if (!email) {
      return NextResponse.json({ error: "Client email missing" }, { status: 400 });
    }

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ??
      process.env.NEXT_PUBLIC_APP_URL ??
      "https://www.ej-assurances.fr";
    const redirectTo = `${siteUrl.replace(/\/$/, "")}/connexion/nouveau-mot-de-passe`;
    const fullName = String(client.full_name ?? "Client EJ Assurances");
    const existingUserId = String(client.profile_id ?? client.supabase_user_id ?? "");

    if (existingUserId) {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
      if (resetError) throw resetError;
    } else {
      const { data: inviteData, error: inviteError } = await supabase.auth.admin.inviteUserByEmail(email, {
        data: { role: "client", client_id: clientId, full_name: fullName },
        redirectTo,
      });

      if (inviteError) throw inviteError;

      const linkedUserId = inviteData.user?.id;
      if (linkedUserId) {
        await supabase.from("users").upsert({ id: linkedUserId, email }, { onConflict: "id" });
        await supabase.from("profiles").upsert(
          { id: linkedUserId, role: "client", full_name: fullName },
          { onConflict: "id" },
        );
        await supabase
          .from("clients")
          .update({ profile_id: linkedUserId, supabase_user_id: linkedUserId })
          .eq("id", clientId);
      }
    }

    await supabase
      .from("clients")
      .update({ invite_sent_at: new Date().toISOString() })
      .eq("id", clientId);

    await supabase.from("audit_logs").insert({
      actor_id: user.id,
      action: "client.portal_invite_sent_from_api",
      target_table: "clients",
      target_id: clientId,
      metadata: { email, redirect_to: redirectTo },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
