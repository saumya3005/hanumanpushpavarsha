BEGIN;

-- Authorize the confirmed Executive Members operator only for this table.
-- Keep the existing admins-table authorization for other administrators.
CREATE OR REPLACE FUNCTION public.can_manage_executive_members()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
    SELECT auth.uid() IS NOT NULL AND (
        lower(auth.jwt() ->> 'email') = 'tayush2703@gmail.com'
        OR EXISTS (
            SELECT 1 FROM public.admins a
            WHERE a.email = auth.jwt() ->> 'email'
        )
    );
$$;
REVOKE ALL ON FUNCTION public.can_manage_executive_members() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.can_manage_executive_members() TO authenticated;

ALTER TABLE public.executive_members ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admin Manage Executive Members" ON public.executive_members;
CREATE POLICY "Admin Manage Executive Members" ON public.executive_members
    FOR ALL TO authenticated
    USING ((SELECT public.can_manage_executive_members()))
    WITH CHECK ((SELECT public.can_manage_executive_members()));
GRANT SELECT, INSERT, UPDATE, DELETE ON public.executive_members TO authenticated;

NOTIFY pgrst, 'reload schema';
COMMIT;
