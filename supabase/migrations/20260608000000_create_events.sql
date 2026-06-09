-- Training demo (Class A2-268, MIT): record benign "a submit happened" events.
-- NOTE: by design this table stores NO credentials — only whether each field
-- was filled and when. The login form is a brand/UI exercise; real usernames
-- and passwords are never transmitted or stored.

create table if not exists public.events (
  id                bigint generated always as identity primary key,
  type              text not null default 'demo_submit',
  identifier_filled boolean not null default false,
  password_filled   boolean not null default false,
  created_at        timestamptz not null default now()
);

alter table public.events enable row level security;

-- Inserts come only from the edge function (service role), which bypasses RLS.
-- No public insert/select policy is granted, so the anon key cannot read rows.
