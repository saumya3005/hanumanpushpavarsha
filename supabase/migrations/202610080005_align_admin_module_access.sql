BEGIN;
-- Requested access model: every authenticated account may manage members.
-- Prerequisite: disable public signup in Supabase Authentication settings first.
-- Only owner-provisioned Auth accounts should exist in this project.
-- Live Event and payment policies/data are not modified.
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

CREATE OR REPLACE FUNCTION public.can_manage_main_members()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = ''
AS $$
    SELECT auth.uid() IS NOT NULL AND auth.role() = 'authenticated';
$$;
REVOKE ALL ON FUNCTION public.can_manage_main_members() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.can_manage_main_members() TO authenticated;

ALTER TABLE public.executive_members ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admin Manage Executive Members" ON public.executive_members;
CREATE POLICY "Admin Manage Executive Members" ON public.executive_members
    FOR ALL TO authenticated
    USING ((SELECT public.can_manage_executive_members()))
    WITH CHECK ((SELECT public.can_manage_executive_members()));
GRANT SELECT, INSERT, UPDATE, DELETE ON public.executive_members TO authenticated;

ALTER TABLE public.main_members ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admin Update Main Members" ON public.main_members;
CREATE POLICY "Admin Update Main Members" ON public.main_members
    FOR UPDATE TO authenticated
    USING ((SELECT public.can_manage_main_members()))
    WITH CHECK ((SELECT public.can_manage_main_members()));
GRANT SELECT, UPDATE ON public.main_members TO authenticated;
-- Existing Main Members photo policies already use can_manage_main_members().

-- Gallery: signed-in operators can manage albums and photo records.
ALTER TABLE public.gallery_albums ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admin Manage Gallery Albums" ON public.gallery_albums;
CREATE POLICY "Admin Manage Gallery Albums" ON public.gallery_albums
    FOR ALL TO authenticated
    USING (auth.uid() IS NOT NULL AND auth.role() = 'authenticated')
    WITH CHECK (auth.uid() IS NOT NULL AND auth.role() = 'authenticated');
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gallery_albums TO authenticated;

ALTER TABLE public.gallery_photos ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admin Manage Gallery Photos" ON public.gallery_photos;
CREATE POLICY "Admin Manage Gallery Photos" ON public.gallery_photos
    FOR ALL TO authenticated
    USING (auth.uid() IS NOT NULL AND auth.role() = 'authenticated')
    WITH CHECK (auth.uid() IS NOT NULL AND auth.role() = 'authenticated');
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gallery_photos TO authenticated;

-- Membership administration: list, approval, lead-member flag and removal.
-- No payment columns, payment policies or checkout behavior are changed.
ALTER TABLE public.join_members ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admin Select Join Members" ON public.join_members;
CREATE POLICY "Admin Select Join Members" ON public.join_members
    FOR SELECT TO authenticated USING (auth.uid() IS NOT NULL AND auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Admin Update Join Members" ON public.join_members;
CREATE POLICY "Admin Update Join Members" ON public.join_members
    FOR UPDATE TO authenticated
    USING (auth.uid() IS NOT NULL AND auth.role() = 'authenticated')
    WITH CHECK (auth.uid() IS NOT NULL AND auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Admin Delete Join Members" ON public.join_members;
CREATE POLICY "Admin Delete Join Members" ON public.join_members
    FOR DELETE TO authenticated USING (auth.uid() IS NOT NULL AND auth.role() = 'authenticated');
GRANT SELECT, DELETE ON public.join_members TO authenticated;
GRANT UPDATE (member_status, is_lead_member) ON public.join_members TO authenticated;

-- Gallery uploads/deletes use only this bucket. Existing public policies stay.
DROP POLICY IF EXISTS "Authenticated Manage Gallery Storage" ON storage.objects;
CREATE POLICY "Authenticated Manage Gallery Storage" ON storage.objects
    FOR ALL TO authenticated
    USING (bucket_id = 'gallery-photos' AND auth.uid() IS NOT NULL AND auth.role() = 'authenticated')
    WITH CHECK (bucket_id = 'gallery-photos' AND auth.uid() IS NOT NULL AND auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Authenticated Read Member Photos" ON storage.objects;
CREATE POLICY "Authenticated Read Member Photos" ON storage.objects
    FOR SELECT TO authenticated
    USING (bucket_id = 'member-photos' AND auth.uid() IS NOT NULL AND auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Authenticated Delete Member Photos" ON storage.objects;
CREATE POLICY "Authenticated Delete Member Photos" ON storage.objects
    FOR DELETE TO authenticated
    USING (bucket_id = 'member-photos' AND auth.uid() IS NOT NULL AND auth.role() = 'authenticated');

NOTIFY pgrst, 'reload schema';
COMMIT;
