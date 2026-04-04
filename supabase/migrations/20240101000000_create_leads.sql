-- Create leads table
create table if not exists public.leads (
  id         uuid        primary key default gen_random_uuid(),
  name       text        not null,
  email      text        not null,
  phone      text        not null,
  message    text        not null,
  created_at timestamptz not null default now()
);

-- RLS: only service role can read/write (Edge Function uses service role)
alter table public.leads enable row level security;

-- No public read/write — all access goes through the Edge Function
-- which uses the service role key (bypasses RLS)
comment on table public.leads is 'Lead submissions from the RemboursePro landing page.';
