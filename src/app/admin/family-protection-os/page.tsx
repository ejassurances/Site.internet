import { AppShell } from "@/components/app-shell";
import { FamilyProtectionWorkspace } from "@/components/family-protection-workspace";
import { requireRole } from "@/lib/auth";

export default async function AdminFamilyProtectionOSPage() {
  const user = await requireRole(["admin", "courtier"]);

  return (
    <AppShell role={user.role === "courtier" ? "courtier" : "admin"} user={user}>
      <FamilyProtectionWorkspace mode="admin" />
    </AppShell>
  );
}
