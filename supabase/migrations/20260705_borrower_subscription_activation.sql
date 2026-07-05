-- Workflow souscription assurance emprunteur.
-- Complete les projets existants avec l'etape d'activation et les pieces de fin de parcours.

insert into public.project_workflow_steps (
  project_id,
  step_key,
  label,
  status,
  position,
  delivery_channels,
  requirements
)
select
  p.id,
  'activation',
  'Activation du dossier',
  'todo',
  7,
  array['CRM', 'Espace client', 'Email']::text[],
  jsonb_build_object(
    'deliverables', array['Contrat actif', 'Archivage ACPR', 'Notification client', 'Suivi banque'],
    'description', 'Activer le dossier apres validation compagnie, archiver les preuves et preparer la mise en vigueur du contrat.'
  )
from public.projects p
where p.project_type = 'assurance_emprunteur'
on conflict (project_id, step_key) do nothing;

insert into public.project_document_requirements (
  project_id,
  document_key,
  label,
  required_for_validation,
  status,
  position,
  accepted_sources
)
select
  p.id,
  'bank_equivalence_requirements',
  'Exigences equivalence garanties banque',
  false,
  'missing',
  5,
  array['Courtier', 'Mandataire', 'Import Gmail']::text[]
from public.projects p
where p.project_type = 'assurance_emprunteur'
on conflict (project_id, document_key) do nothing;

insert into public.project_document_requirements (
  project_id,
  document_key,
  label,
  required_for_validation,
  status,
  position,
  accepted_sources
)
select
  p.id,
  'subscription_confirmation',
  'Validation compagnie / certificat adhesion',
  false,
  'missing',
  6,
  array['Compagnie', 'Import Gmail', 'Courtier']::text[]
from public.projects p
where p.project_type = 'assurance_emprunteur'
on conflict (project_id, document_key) do nothing;

grant select, insert, update, delete on public.project_workflow_steps to authenticated;
grant select, insert, update, delete on public.project_document_requirements to authenticated;
grant select, insert, update, delete on public.project_borrower_needs to authenticated;
grant select, insert, update, delete on public.project_deliveries to authenticated;
grant select, insert, update, delete on public.project_signatures to authenticated;
grant select, insert, update, delete on public.project_email_imports to authenticated;
