-- Family Protection OS - internal EJ Assurances module.
-- Apply after supabase/schema.sql.

do $$
begin
  create type public.assessment_status as enum (
    'draft',
    'sent_to_client',
    'needs_completion',
    'analysis',
    'recommendation_ready',
    'admin_review',
    'signed',
    'converted',
    'archived'
  );
exception when duplicate_object then null;
end $$;

do $$
begin
  create type public.risk_severity as enum ('low', 'medium', 'high', 'critical');
exception when duplicate_object then null;
end $$;

create table if not exists public.needs_assessments (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete set null,
  created_by uuid references public.profiles(id) on delete set null,
  assigned_to uuid references public.profiles(id) on delete set null,
  mandataire_id uuid references public.mandataires(id) on delete set null,
  status public.assessment_status not null default 'draft',
  family_situation text,
  legal_status text,
  protection_goal text,
  client_objectives jsonb not null default '[]'::jsonb,
  family_context jsonb not null default '{}'::jsonb,
  financial_summary jsonb not null default '{}'::jsonb,
  risk_tolerance text,
  needs_summary text,
  family_protection_score integer check (family_protection_score between 0 and 100),
  advisor_notes text,
  signed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.family_members (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid not null references public.needs_assessments(id) on delete cascade,
  full_name text,
  relationship_label text not null,
  affective_link boolean not null default true,
  legal_link boolean not null default false,
  heir_link boolean not null default false,
  dependent boolean not null default false,
  protection_priority integer check (protection_priority between 0 and 5),
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.patrimonial_items (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid not null references public.needs_assessments(id) on delete cascade,
  item_type text not null,
  label text not null,
  estimated_value numeric(14, 2),
  outstanding_debt numeric(14, 2),
  ownership_details text,
  beneficiary_details text,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.borrower_insurance_requests (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid not null references public.needs_assessments(id) on delete cascade,
  loan_type text,
  bank_name text,
  loan_amount numeric(14, 2),
  loan_duration_months integer,
  borrowers_count integer,
  requested_guarantees jsonb not null default '[]'::jsonb,
  quotity jsonb not null default '{}'::jsonb,
  deadline date,
  medical_context text,
  professional_risks text,
  sport_risks text,
  delegation_or_substitution text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.risk_findings (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid not null references public.needs_assessments(id) on delete cascade,
  risk_category text not null,
  risk_label text not null,
  risk_score integer not null check (risk_score between 0 and 100),
  severity public.risk_severity not null default 'medium',
  explanation text not null,
  consequence text,
  detected_by text not null default 'advisor',
  advisor_validation_status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists public.recommendations (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid not null references public.needs_assessments(id) on delete cascade,
  risk_finding_id uuid references public.risk_findings(id) on delete set null,
  recommendation_type text not null,
  title text not null,
  need_expressed text,
  current_situation text,
  recommendation_reason text not null,
  alternatives jsonb not null default '[]'::jsonb,
  limits text,
  requires_external_expert boolean not null default false,
  advisor_validation_status text not null default 'draft',
  client_decision text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.dda_reports (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid not null references public.needs_assessments(id) on delete cascade,
  generated_by uuid references public.profiles(id) on delete set null,
  report_type text not null default 'dda_summary',
  storage_path text,
  report_payload jsonb not null default '{}'::jsonb,
  version integer not null default 1,
  created_at timestamptz not null default now()
);

create table if not exists public.client_consents (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid references public.needs_assessments(id) on delete cascade,
  client_id uuid references public.clients(id) on delete cascade,
  consent_type text not null,
  consent_text text not null,
  accepted boolean not null default false,
  accepted_at timestamptz,
  ip_address text,
  created_at timestamptz not null default now()
);

create table if not exists public.ai_analysis_runs (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid not null references public.needs_assessments(id) on delete cascade,
  initiated_by uuid references public.profiles(id) on delete set null,
  model_name text,
  prompt_version text,
  input_snapshot jsonb not null default '{}'::jsonb,
  output_snapshot jsonb not null default '{}'::jsonb,
  confidence_level text,
  created_at timestamptz not null default now()
);

create trigger touch_needs_assessments
  before update on public.needs_assessments
  for each row execute function app_private.touch_updated_at();

create trigger touch_borrower_insurance_requests
  before update on public.borrower_insurance_requests
  for each row execute function app_private.touch_updated_at();

create trigger touch_recommendations
  before update on public.recommendations
  for each row execute function app_private.touch_updated_at();

grant select, insert, update, delete on
  public.needs_assessments,
  public.family_members,
  public.patrimonial_items,
  public.borrower_insurance_requests,
  public.risk_findings,
  public.recommendations,
  public.dda_reports,
  public.client_consents,
  public.ai_analysis_runs
to authenticated;

alter table public.needs_assessments enable row level security;
alter table public.family_members enable row level security;
alter table public.patrimonial_items enable row level security;
alter table public.borrower_insurance_requests enable row level security;
alter table public.risk_findings enable row level security;
alter table public.recommendations enable row level security;
alter table public.dda_reports enable row level security;
alter table public.client_consents enable row level security;
alter table public.ai_analysis_runs enable row level security;

create policy "Assessment access by staff client or mandataire"
on public.needs_assessments for select
to authenticated
using (
  app_private.is_staff()
  or created_by = auth.uid()
  or assigned_to = auth.uid()
  or exists (select 1 from public.clients c where c.id = needs_assessments.client_id and c.profile_id = auth.uid())
  or exists (select 1 from public.mandataires m where m.id = needs_assessments.mandataire_id and m.profile_id = auth.uid())
);

create policy "Staff and mandataires create assessments"
on public.needs_assessments for insert
to authenticated
with check (
  app_private.is_staff()
  or exists (select 1 from public.mandataires m where m.id = needs_assessments.mandataire_id and m.profile_id = auth.uid())
);

create policy "Staff and assigned users update assessments"
on public.needs_assessments for update
to authenticated
using (
  app_private.is_staff()
  or created_by = auth.uid()
  or assigned_to = auth.uid()
  or exists (select 1 from public.mandataires m where m.id = needs_assessments.mandataire_id and m.profile_id = auth.uid())
)
with check (
  app_private.is_staff()
  or created_by = auth.uid()
  or assigned_to = auth.uid()
  or exists (select 1 from public.mandataires m where m.id = needs_assessments.mandataire_id and m.profile_id = auth.uid())
);

create policy "Child assessment records follow assessment access"
on public.family_members for all
to authenticated
using (exists (select 1 from public.needs_assessments a where a.id = family_members.assessment_id))
with check (exists (select 1 from public.needs_assessments a where a.id = family_members.assessment_id));

create policy "Patrimony records follow assessment access"
on public.patrimonial_items for all
to authenticated
using (exists (select 1 from public.needs_assessments a where a.id = patrimonial_items.assessment_id))
with check (exists (select 1 from public.needs_assessments a where a.id = patrimonial_items.assessment_id));

create policy "Borrower requests follow assessment access"
on public.borrower_insurance_requests for all
to authenticated
using (exists (select 1 from public.needs_assessments a where a.id = borrower_insurance_requests.assessment_id))
with check (exists (select 1 from public.needs_assessments a where a.id = borrower_insurance_requests.assessment_id));

create policy "Risk findings follow assessment access"
on public.risk_findings for all
to authenticated
using (exists (select 1 from public.needs_assessments a where a.id = risk_findings.assessment_id))
with check (exists (select 1 from public.needs_assessments a where a.id = risk_findings.assessment_id));

create policy "Recommendations follow assessment access"
on public.recommendations for all
to authenticated
using (exists (select 1 from public.needs_assessments a where a.id = recommendations.assessment_id))
with check (exists (select 1 from public.needs_assessments a where a.id = recommendations.assessment_id));

create policy "DDA reports follow assessment access"
on public.dda_reports for all
to authenticated
using (exists (select 1 from public.needs_assessments a where a.id = dda_reports.assessment_id))
with check (exists (select 1 from public.needs_assessments a where a.id = dda_reports.assessment_id));

create policy "Consents follow related assessment"
on public.client_consents for all
to authenticated
using (
  app_private.is_staff()
  or exists (select 1 from public.needs_assessments a where a.id = client_consents.assessment_id)
  or exists (select 1 from public.clients c where c.id = client_consents.client_id and c.profile_id = auth.uid())
)
with check (
  app_private.is_staff()
  or exists (select 1 from public.needs_assessments a where a.id = client_consents.assessment_id)
  or exists (select 1 from public.clients c where c.id = client_consents.client_id and c.profile_id = auth.uid())
);

create policy "AI runs visible to staff and assigned users"
on public.ai_analysis_runs for all
to authenticated
using (exists (select 1 from public.needs_assessments a where a.id = ai_analysis_runs.assessment_id))
with check (exists (select 1 from public.needs_assessments a where a.id = ai_analysis_runs.assessment_id));
