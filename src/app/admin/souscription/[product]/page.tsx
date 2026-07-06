import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { requireRole } from "@/lib/auth";
import { AppShell } from "@/components/app-shell";
import { getAccessibleClients, toAssessmentClientOptions } from "@/lib/clients";
import { getProduct } from "@/lib/souscription";
import { SouscriptionRecueilForm } from "@/components/souscription-recueil-form";

type PageProps = {
  params: Promise<{ product: string }>;
  searchParams: Promise<{ client?: string }>;
};

export default async function SouscriptionRecueilPage({ params, searchParams }: PageProps) {
  const user = await requireRole(["admin", "courtier", "mandataire"]).catch(() => null);
  if (!user) redirect("/connexion");

  const { product: productKey } = await params;
  const product = getProduct(productKey);
  if (!product) notFound();

  const { client } = await searchParams;
  const clients = await getAccessibleClients(user);
  const options = toAssessmentClientOptions(clients);
  const lockedClientId = client && options.some((o) => o.id === client) ? client : undefined;

  const shellRole = user.role === "mandataire" ? "mandataire" : user.role === "courtier" ? "courtier" : "admin";

  return (
    <AppShell role={shellRole} user={user}>
      <div className="admin-page-header">
        <div className="admin-page-header-left">
          <Link href="/admin/souscription" className="back-link">
            <ArrowLeft size={16} aria-hidden /> Retour au workbook
          </Link>
        </div>
      </div>
      <SouscriptionRecueilForm product={product} clients={options} lockedClientId={lockedClientId} />
    </AppShell>
  );
}
