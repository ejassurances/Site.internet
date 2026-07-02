import { requireRole } from '@/lib/auth';
import { AppShell } from '@/components/app-shell';
import AnonymisationTool from '@/components/ia/anonymisation-tool';

export const metadata = {
  title: 'Anonymisation RGPD | IaGO — EJ Assurances',
  robots: { index: false },
};

export default async function AnonymisationPage() {
  const user = await requireRole(['admin', 'courtier']);

  return (
    <AppShell role={user.role === 'courtier' ? 'courtier' : 'admin'} user={user}>
      <AnonymisationTool />
    </AppShell>
  );
}
