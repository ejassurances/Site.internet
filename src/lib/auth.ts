import { redirect } from "next/navigation";
import { Role, dashboardConfig } from "@/lib/content";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type CurrentUser = {
  id: string;
  email: string;
  fullName: string;
  role: Role;
};

const fallbackRole: Role = "client";

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return {
      id: "demo-user",
      email: "demo@ej-assurances.fr",
      fullName: "Compte demo EJ Assurances",
      role: fallbackRole,
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .single();

  const role = (profile?.role as Role | undefined) ?? fallbackRole;

  return {
    id: user.id,
    email: user.email ?? "",
    fullName: profile?.full_name ?? user.email ?? "Utilisateur EJ Assurances",
    role,
  };
}

export async function requireRole(allowedRoles: Role[]) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/connexion");
  }

  if (!allowedRoles.includes(user.role)) {
    redirect(dashboardConfig[user.role].home);
  }

  return user;
}
