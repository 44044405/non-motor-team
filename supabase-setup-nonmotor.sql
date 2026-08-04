-- ============================================================
-- Non Motor Renewal Manager — Supabase setup
-- Run this ONCE in the SAME Supabase project used by Puspakom Dashboard:
-- SQL Editor -> New query -> paste -> Run
-- (Reuses the existing project/login; this just adds a new table so the
-- two apps' data never mix.)
-- ============================================================

create table if not exists app_state_nonmotor (
  id         int primary key default 1,
  rev        int  not null default 0,
  data       jsonb not null default '[]'::jsonb,
  updated_at timestamptz default now(),
  constraint single_row_nonmotor check (id = 1)
);

-- Seed the single row if it isn't there yet.
insert into app_state_nonmotor (id, rev, data) values (1, 0, '[]'::jsonb)
  on conflict (id) do nothing;

-- Same lock-down as the Puspakom table: only logged-in team members
-- (the same team@chinhock.com login) can read/write it.
alter table app_state_nonmotor enable row level security;

drop policy if exists "authenticated can read"  on app_state_nonmotor;
drop policy if exists "authenticated can write" on app_state_nonmotor;

create policy "authenticated can read"  on app_state_nonmotor
  for select to authenticated using (true);

create policy "authenticated can write" on app_state_nonmotor
  for update to authenticated using (true) with check (true);
