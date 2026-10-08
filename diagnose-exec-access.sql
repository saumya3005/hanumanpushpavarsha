-- Read-only: run in Supabase SQL Editor to inspect Executive Members access.
-- This does not grant access or modify members, policies, or payments.
SELECT u.email AS login_email,
       EXISTS (SELECT 1 FROM public.admins a WHERE a.email = u.email) AS exact_admin_match,
       EXISTS (SELECT 1 FROM public.admins a WHERE lower(trim(a.email)) = lower(trim(u.email))) AS normalized_admin_match
FROM auth.users u
ORDER BY u.email;

SELECT tablename, policyname, roles, cmd, qual, with_check
FROM pg_policies
WHERE schemaname = 'public' AND tablename IN ('admins', 'executive_members')
ORDER BY tablename, policyname;

SELECT table_name, grantee, privilege_type
FROM information_schema.role_table_grants
WHERE table_schema = 'public'
  AND table_name IN ('admins', 'executive_members')
  AND grantee IN ('anon', 'authenticated')
ORDER BY table_name, grantee, privilege_type;
