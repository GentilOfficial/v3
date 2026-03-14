create extension if not exists pgcrypto;

insert into storage.buckets (id, name, public)
values ('content', 'content', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Public can read content bucket" on storage.objects;
create policy "Public can read content bucket"
on storage.objects
for select
using (bucket_id = 'content');

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title jsonb not null,
  category jsonb not null,
  summary jsonb not null,
  deliverables jsonb not null default jsonb_build_object('en', jsonb_build_array(), 'it', jsonb_build_array()),
  stack text[] not null default '{}',
  year integer not null,
  status text not null check (status in ('live', 'completed', 'in_progress', 'unfinished', 'archived')),
  featured boolean not null default false,
  published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint projects_title_has_en check (jsonb_typeof(title) = 'object' and title ? 'en'),
  constraint projects_category_has_en check (jsonb_typeof(category) = 'object' and category ? 'en'),
  constraint projects_summary_has_en check (jsonb_typeof(summary) = 'object' and summary ? 'en'),
  constraint projects_deliverables_has_en check (jsonb_typeof(deliverables) = 'object' and deliverables ? 'en')
);

create table if not exists public.project_links (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  label jsonb not null,
  href text not null,
  kind text not null default 'external',
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  constraint project_links_label_has_en check (jsonb_typeof(label) = 'object' and label ? 'en')
);

create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  company text not null,
  location jsonb not null,
  title jsonb not null,
  description jsonb not null,
  company_logo_bucket text,
  company_logo_path text,
  started_at date not null,
  ended_at date,
  published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint experiences_location_has_en check (jsonb_typeof(location) = 'object' and location ? 'en'),
  constraint experiences_title_has_en check (jsonb_typeof(title) = 'object' and title ? 'en'),
  constraint experiences_description_has_en check (jsonb_typeof(description) = 'object' and description ? 'en')
);

create table if not exists public.certifications (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title jsonb not null,
  issuer text not null,
  issued_at date not null,
  badge_bucket text,
  badge_path text,
  badge_alt jsonb,
  credential_url text,
  featured boolean not null default false,
  published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint certifications_title_has_en check (jsonb_typeof(title) = 'object' and title ? 'en'),
  constraint certifications_badge_alt_has_en check (
    badge_alt is null or (jsonb_typeof(badge_alt) = 'object' and badge_alt ? 'en')
  )
);

create index if not exists projects_published_sort_idx
  on public.projects (published, featured desc, sort_order asc, year desc);

create index if not exists project_links_project_id_sort_idx
  on public.project_links (project_id, sort_order asc);

create index if not exists experiences_published_sort_idx
  on public.experiences (published, sort_order asc, started_at desc);

create index if not exists certifications_published_sort_idx
  on public.certifications (published, sort_order asc, issued_at desc);

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
before update on public.projects
for each row
execute function public.set_updated_at();

drop trigger if exists experiences_set_updated_at on public.experiences;
create trigger experiences_set_updated_at
before update on public.experiences
for each row
execute function public.set_updated_at();

drop trigger if exists certifications_set_updated_at on public.certifications;
create trigger certifications_set_updated_at
before update on public.certifications
for each row
execute function public.set_updated_at();

alter table public.projects enable row level security;
alter table public.project_links enable row level security;
alter table public.experiences enable row level security;
alter table public.certifications enable row level security;

drop policy if exists "Public can read published projects" on public.projects;
create policy "Public can read published projects"
on public.projects
for select
using (published = true);

drop policy if exists "Public can read project links for published projects" on public.project_links;
create policy "Public can read project links for published projects"
on public.project_links
for select
using (
  exists (
    select 1
    from public.projects
    where public.projects.id = project_links.project_id
      and public.projects.published = true
  )
);

drop policy if exists "Public can read published experiences" on public.experiences;
create policy "Public can read published experiences"
on public.experiences
for select
using (published = true);

drop policy if exists "Public can read published certifications" on public.certifications;
create policy "Public can read published certifications"
on public.certifications
for select
using (published = true);