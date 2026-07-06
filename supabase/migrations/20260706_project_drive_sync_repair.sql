-- Repair Drive synchronization for projects.
-- The production database was missing the project trigger and the public URL column.

create extension if not exists pg_net;

alter table public.projects
  add column if not exists google_drive_folder_id text,
  add column if not exists google_drive_folder_url text generated always as (
    case
      when google_drive_folder_id is not null
      then 'https://drive.google.com/drive/folders/' || google_drive_folder_id
      else null
    end
  ) stored;

create index if not exists idx_projects_drive_folder
  on public.projects(google_drive_folder_id)
  where google_drive_folder_id is not null;

create or replace function public.on_project_created_create_drive_folder()
returns trigger as $$
declare
  anon_key text := 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1bmV1a2NtcWFmdHdoaWR5ZWdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2MDE3MDQsImV4cCI6MjA5NzE3NzcwNH0.PSP_vEvqjJkBuQPNHHwLHNZz9jqKCTheSaiu5ebmUQM';
begin
  perform net.http_post(
    url := 'https://huneukcmqaftwhidyegi.supabase.co/functions/v1/create-drive-folder',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || anon_key
    ),
    body := jsonb_build_object(
      'table', 'projects',
      'record', jsonb_build_object(
        'id', NEW.id,
        'client_id', NEW.client_id,
        'title', NEW.title,
        'project_type', NEW.project_type
      )
    )
  );

  insert into public.drive_sync_events (
    event_type,
    client_id,
    project_id,
    status,
    payload
  )
  values (
    'drive.project_folder_requested',
    NEW.client_id,
    NEW.id,
    'queued',
    jsonb_build_object(
      'source', 'projects_after_insert_trigger',
      'project_type', NEW.project_type,
      'expected_folder_prefix',
        case
          when NEW.project_type = 'assurance_emprunteur' then 'DOX_ADP'
          when NEW.project_type = 'assurance_trottinette' then 'DOX_TROT'
          when NEW.project_type = 'prevoyance' then 'DOX_PREV'
          else 'DOX_PROJET'
        end
    )
  );

  return NEW;
end;
$$ language plpgsql security definer;

drop trigger if exists trigger_project_drive_folder on public.projects;

create trigger trigger_project_drive_folder
  after insert on public.projects
  for each row
  execute function public.on_project_created_create_drive_folder();

-- Backfill: relaunch Drive creation for projects already created without folder id.
do $$
declare
  anon_key text := 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1bmV1a2NtcWFmdHdoaWR5ZWdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2MDE3MDQsImV4cCI6MjA5NzE3NzcwNH0.PSP_vEvqjJkBuQPNHHwLHNZz9jqKCTheSaiu5ebmUQM';
  project_record record;
begin
  for project_record in
    select id, client_id, title, project_type
    from public.projects
    where google_drive_folder_id is null
    order by created_at desc
    limit 100
  loop
    perform net.http_post(
      url := 'https://huneukcmqaftwhidyegi.supabase.co/functions/v1/create-drive-folder',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || anon_key
      ),
      body := jsonb_build_object(
        'table', 'projects',
        'record', jsonb_build_object(
          'id', project_record.id,
          'client_id', project_record.client_id,
          'title', project_record.title,
          'project_type', project_record.project_type
        )
      )
    );

    insert into public.drive_sync_events (
      event_type,
      client_id,
      project_id,
      status,
      payload
    )
    values (
      'drive.project_folder_backfill_requested',
      project_record.client_id,
      project_record.id,
      'queued',
      jsonb_build_object('source', '20260706_project_drive_sync_repair')
    );
  end loop;
end;
$$;
