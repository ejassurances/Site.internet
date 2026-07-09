import { requireRole } from '@/lib/auth';
import { AppShell } from '@/components/app-shell';
import CentreDocumentaire from '@/components/vente/centre-documentaire';

export const metadata = {
  title: 'Centre Documentaire | EJ Partners Assurances',
  robots: { index: false },
};

export default async function GEDPage() {
  const user = await requireRole(['admin', 'courtier']);

  return (
    <AppShell role={user.role === 'courtier' ? 'courtier' : 'admin'} user={user}>
      <CentreDocumentaire />
    </AppShell>
  );
}
