create table if not exists public.tutor_daily_usage (
  user_id uuid not null references auth.users(id) on delete cascade,
  usage_date date not null default current_date,
  question_count integer not null default 0 check (question_count >= 0),
  primary key (user_id, usage_date)
);

alter table public.tutor_daily_usage enable row level security;

create policy "Users can read their own tutor usage"
on public.tutor_daily_usage
for select
to authenticated
using ((select auth.uid()) = user_id);

create or replace function public.consume_tutor_question(p_daily_limit integer default 15)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  current_user_id uuid := auth.uid();
  updated_count integer;
begin
  if current_user_id is null then
    raise exception 'Authentication required';
  end if;

  if p_daily_limit < 1 or p_daily_limit > 100 then
    raise exception 'Invalid daily limit';
  end if;

  insert into public.tutor_daily_usage (user_id, usage_date, question_count)
  values (current_user_id, current_date, 1)
  on conflict (user_id, usage_date)
  do update
    set question_count = public.tutor_daily_usage.question_count + 1
    where public.tutor_daily_usage.question_count < p_daily_limit
  returning question_count into updated_count;

  if updated_count is null then
    return jsonb_build_object('allowed', false, 'used', p_daily_limit, 'limit', p_daily_limit);
  end if;

  return jsonb_build_object('allowed', true, 'used', updated_count, 'limit', p_daily_limit);
end;
$$;

revoke all on function public.consume_tutor_question(integer) from public;
grant execute on function public.consume_tutor_question(integer) to authenticated;
