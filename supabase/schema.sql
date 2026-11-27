-- =============================================================
-- Londis Bath Lane – website settings (run once in Supabase:
-- Dashboard → SQL Editor → New query → paste → Run)
-- =============================================================

-- 1) Who is allowed to edit the website
create table if not exists public.admins (
  email text primary key
);
alter table public.admins enable row level security;
-- (no policies = nobody can read/write this table from the website;
--  manage it only in the Supabase dashboard)

-- 2) The settings row (hours, seasonal hours, services) as JSON
create table if not exists public.site_settings (
  id int primary key default 1 check (id = 1),
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.site_settings enable row level security;

-- Helper: is the signed-in user an admin?
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

-- Everyone can read the settings (the public website needs them)
drop policy if exists "settings are public" on public.site_settings;
create policy "settings are public" on public.site_settings
  for select using (true);

-- Only admins can change them
drop policy if exists "admins can insert" on public.site_settings;
create policy "admins can insert" on public.site_settings
  for insert to authenticated with check (public.is_admin());

drop policy if exists "admins can update" on public.site_settings;
create policy "admins can update" on public.site_settings
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

-- Empty starting row: the website uses its built-in defaults until you
-- press Save in /admin for the first time.
insert into public.site_settings (id, data) values (1, '{}'::jsonb)
on conflict (id) do nothing;

-- 3) Add your admin email(s) — CHANGE THIS to the email you will log in with
-- insert into public.admins (email) values ('you@example.com');
