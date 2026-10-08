BEGIN;

-- Create executive_members table (safe to run multiple times)
CREATE TABLE IF NOT EXISTS public.executive_members (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name_en text NOT NULL,
    name_hi text NOT NULL,
    display_order integer DEFAULT 0 NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.executive_members ENABLE ROW LEVEL SECURITY;

-- Only active members are public. Authenticated accounts can manage members.
DROP POLICY IF EXISTS "Public Read Executive Members" ON public.executive_members;
CREATE POLICY "Public Read Executive Members" ON public.executive_members
    FOR SELECT TO anon, authenticated USING (is_active = true);
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
GRANT SELECT ON public.executive_members TO anon;

-- Seed initial 6 members (safe - no duplicates)
INSERT INTO public.executive_members (name_en, name_hi, display_order, is_active)
SELECT 'Amit Gupta', 'अमित गुप्ता', 1, true
WHERE NOT EXISTS (SELECT 1 FROM public.executive_members WHERE name_en = 'Amit Gupta');

INSERT INTO public.executive_members (name_en, name_hi, display_order, is_active)
SELECT 'Ravi Tiwari', 'रवि तिवारी', 2, true
WHERE NOT EXISTS (SELECT 1 FROM public.executive_members WHERE name_en = 'Ravi Tiwari');

INSERT INTO public.executive_members (name_en, name_hi, display_order, is_active)
SELECT 'Pankaj Sharma', 'पंकज शर्मा', 3, true
WHERE NOT EXISTS (SELECT 1 FROM public.executive_members WHERE name_en = 'Pankaj Sharma');

INSERT INTO public.executive_members (name_en, name_hi, display_order, is_active)
SELECT 'Deepak Gupta', 'दीपक गुप्ता', 4, true
WHERE NOT EXISTS (SELECT 1 FROM public.executive_members WHERE name_en = 'Deepak Gupta');

INSERT INTO public.executive_members (name_en, name_hi, display_order, is_active)
SELECT 'Ankit Mishra', 'अंकित मिश्रा', 5, true
WHERE NOT EXISTS (SELECT 1 FROM public.executive_members WHERE name_en = 'Ankit Mishra');

INSERT INTO public.executive_members (name_en, name_hi, display_order, is_active)
SELECT 'Manoj Gupta', 'मनोज गुप्ता', 6, true
WHERE NOT EXISTS (SELECT 1 FROM public.executive_members WHERE name_en = 'Manoj Gupta');

NOTIFY pgrst, 'reload schema';
COMMIT;

-- Verify
SELECT id, name_en, name_hi, display_order, is_active FROM public.executive_members ORDER BY display_order;
