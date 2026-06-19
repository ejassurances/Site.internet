import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import { ClientDirectory360 } from "@/components/client-directory-360";
import { requireRole } from "@/lib/auth";
import { getAccessibleClients } from "@/lib/clients";
import type { ClientWith360 } from "@/components/client-directory-360";

export const metadata: Metadata = { title: "Clients 360° — CRM EJ Partners" };

export default async function AdminClientsPage() {
  const user = await requireRole(["admin", "courtier"]);
  const rawClients = await getAccessibleClients(user);

  // Enrichissement 360° — à connecter à Supabase ultérieurement
  const clients: ClientWith360[] = rawClients.map((c) => ({
    ...c,
    status: "actif" as const,
    family_type: c.family_context ?? null,
    tags: [],
    contracts_count: 0,
    last_interaction: null,
  }));

  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <ClientDirectory360 clients={clients} basePath="/admin/clients" />
    </AppShell>
  );
}
