-- Esquema preparado para la etapa con autenticación.
-- No ejecutar todavía sin revisar el proyecto Supabase de destino.

create extension if not exists pgcrypto;

create type public.module_status as enum ('pending', 'in_progress', 'completed', 'review');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text check (char_length(display_name) <= 100),
  daily_goal_minutes integer not null default 120 check (daily_goal_minutes between 15 and 1440),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.study_modules (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 140),
  platform text not null check (char_length(platform) between 1 and 100),
  category text not null check (char_length(category) between 1 and 100),
  difficulty text not null check (char_length(difficulty) between 1 and 60),
  status public.module_status not null default 'pending',
  progress smallint not null default 0 check (progress between 0 and 100),
  started_at date,
  completed_at date,
  source_url text check (source_url is null or char_length(source_url) <= 2048),
  notes_md text not null default '',
  learnings_md text not null default '',
  questions_md text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (completed_at is null or started_at is null or completed_at >= started_at)
);

create table public.study_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  module_id uuid references public.study_modules(id) on delete set null,
  studied_on date not null,
  started_at time,
  ended_at time,
  duration_minutes integer not null check (duration_minutes between 1 and 1440),
  topic text not null check (char_length(topic) between 1 and 160),
  category text not null check (char_length(category) between 1 and 100),
  platform text not null check (char_length(platform) between 1 and 100),
  learned_md text not null default '',
  difficulties_md text not null default '',
  questions_md text not null default '',
  comprehension smallint not null check (comprehension between 1 and 5),
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.frozen_days (
  user_id uuid not null references auth.users(id) on delete cascade,
  frozen_on date not null,
  reason text not null check (char_length(reason) between 1 and 300),
  created_at timestamptz not null default now(),
  primary key (user_id, frozen_on)
);

create index study_modules_user_status_idx on public.study_modules(user_id, status);
create index study_sessions_user_date_idx on public.study_sessions(user_id, studied_on desc);

alter table public.profiles enable row level security;
alter table public.study_modules enable row level security;
alter table public.study_sessions enable row level security;
alter table public.frozen_days enable row level security;

create policy "profiles_own_rows" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "modules_own_rows" on public.study_modules for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "sessions_own_rows" on public.study_sessions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "frozen_days_own_rows" on public.frozen_days for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
