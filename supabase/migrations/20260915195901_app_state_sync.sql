-- Estado sincronizado de CyberStudy. Mantiene el JSON local como unidad atómica
-- para que la primera migración a la nube no pierda registros.
create table if not exists public.app_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{"version":1,"dailyGoalMinutes":120,"modules":[],"sessions":[],"frozenDays":[]}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.app_state enable row level security;

create policy "app_state_own_row"
  on public.app_state for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
