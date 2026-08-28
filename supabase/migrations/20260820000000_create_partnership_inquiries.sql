create table if not exists public.partnership_inquiries (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null unique,
  created_at timestamptz not null default now(),
  full_name text not null,
  role_title text not null,
  company_name text not null,
  company_website text not null,
  company_building text not null,
  future_need text not null,
  work_email text not null,
  source text not null default 'website',
  status text not null default 'new',

  constraint partnership_name_length
    check (char_length(full_name) between 2 and 120),
  constraint partnership_role_length
    check (char_length(role_title) between 2 and 120),
  constraint partnership_company_length
    check (char_length(company_name) between 2 and 160),
  constraint partnership_website_length
    check (char_length(company_website) between 8 and 2048),
  constraint partnership_building_length
    check (char_length(company_building) between 20 and 3000),
  constraint partnership_future_length
    check (char_length(future_need) between 20 and 3000),
  constraint partnership_email_length
    check (char_length(work_email) between 5 and 254),
  constraint partnership_email_shape
    check (work_email ~* '^[^[:space:]@]+@[^[:space:]@]+[.][^[:space:]@]+$'),
  constraint partnership_source_allowed
    check (source = 'website'),
  constraint partnership_status_allowed
    check (status in ('new', 'reviewing', 'contacted', 'closed', 'spam'))
);

alter table public.partnership_inquiries enable row level security;
alter table public.partnership_inquiries force row level security;

revoke all on table public.partnership_inquiries from anon, authenticated;
grant all on table public.partnership_inquiries to service_role;

create index if not exists partnership_inquiries_created_at_idx
  on public.partnership_inquiries (created_at desc);

create index if not exists partnership_inquiries_status_idx
  on public.partnership_inquiries (status, created_at desc);

create index if not exists partnership_inquiries_email_created_at_idx
  on public.partnership_inquiries (work_email, created_at desc);

create or replace function public.submit_partnership_inquiry(
  p_request_id uuid,
  p_full_name text,
  p_role_title text,
  p_company_name text,
  p_company_website text,
  p_company_building text,
  p_future_need text,
  p_work_email text
)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  existing_inquiry public.partnership_inquiries%rowtype;
  recent_count integer;
begin
  perform pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended(p_work_email, 0)
  );

  select *
    into existing_inquiry
    from public.partnership_inquiries
   where request_id = p_request_id;

  if found then
    if row(
      existing_inquiry.full_name,
      existing_inquiry.role_title,
      existing_inquiry.company_name,
      existing_inquiry.company_website,
      existing_inquiry.company_building,
      existing_inquiry.future_need,
      existing_inquiry.work_email
    ) is not distinct from row(
      p_full_name,
      p_role_title,
      p_company_name,
      p_company_website,
      p_company_building,
      p_future_need,
      p_work_email
    ) then
      return 'duplicate';
    end if;

    return 'conflict';
  end if;

  select count(*)
    into recent_count
    from public.partnership_inquiries
   where work_email = p_work_email
     and created_at >= now() - interval '1 hour';

  if recent_count >= 3 then
    return 'rate_limited';
  end if;

  insert into public.partnership_inquiries (
    request_id,
    full_name,
    role_title,
    company_name,
    company_website,
    company_building,
    future_need,
    work_email,
    source
  ) values (
    p_request_id,
    p_full_name,
    p_role_title,
    p_company_name,
    p_company_website,
    p_company_building,
    p_future_need,
    p_work_email,
    'website'
  );

  return 'inserted';
end;
$$;

revoke all on function public.submit_partnership_inquiry(
  uuid, text, text, text, text, text, text, text
) from public, anon, authenticated;

grant execute on function public.submit_partnership_inquiry(
  uuid, text, text, text, text, text, text, text
) to service_role;
