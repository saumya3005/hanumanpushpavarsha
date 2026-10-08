BEGIN;

-- All authenticated accounts may manage Executive Members.
CREATE OR REPLACE FUNCTION public.can_manage_executive_members()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = ''
AS $$
    SELECT auth.uid() IS NOT NULL AND auth.role() = 'authenticated';
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
