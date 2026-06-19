import { AppShell } from "@/components/app-shell";
import { AcprDocument, ClientAcprFolder } from "@/components/client-acpr-folder";
import { requireRole } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function ClientDashboardPage() {
  const user = await requireRole(["client"]);
  const supabase = await createSupabaseServerClient();
  let acprDocuments: AcprDocument[] = [];

  if (supabase) {
    const { data: client } = await supabase.from("clients").select("id").eq("profile_id", user.id).maybeSingle();

    if (client) {
      const { data } = await supabase
        .from("documents")
        .select("id, storage_path, document_type, created_at")
        .eq("client_id", client.id)
        .eq("document_type", "classeur_acpr_der")
        .order("created_at", { ascending: false });

      acprDocuments = data ?? [];
    }
  }

  return (
    <AppShell role="client" user={user}>
      <ClientAcprFolder documents={acprDocuments} />
    </AppShell>
  );
}
