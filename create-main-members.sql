BEGIN;
CREATE TABLE IF NOT EXISTS public.main_members (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 seed_key text UNIQUE NOT NULL,
 name_en text NOT NULL CHECK (length(trim(name_en)) > 0),
 name_hi text NOT NULL CHECK (length(trim(name_hi)) > 0),
 role_key text NOT NULL,
 role_en text NOT NULL,
 role_hi text NOT NULL,
 description_en text NOT NULL DEFAULT '',
 description_hi text NOT NULL DEFAULT '',
 photo_url text NOT NULL,
 photo_path text,
 phone text NOT NULL DEFAULT '',
 display_order integer NOT NULL DEFAULT 0,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
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
ALTER TABLE public.main_members ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Main Members" ON public.main_members;
CREATE POLICY "Public Read Main Members" ON public.main_members FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Admin Update Main Members" ON public.main_members;
CREATE POLICY "Admin Update Main Members" ON public.main_members FOR UPDATE TO authenticated
 USING ((SELECT public.can_manage_main_members())) WITH CHECK ((SELECT public.can_manage_main_members()));
GRANT SELECT ON public.main_members TO anon, authenticated;
GRANT UPDATE ON public.main_members TO authenticated;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('main-member-photos', 'main-member-photos', true, 5242880, ARRAY['image/jpeg','image/png','image/webp'])
ON CONFLICT (id) DO UPDATE SET public = true, file_size_limit = EXCLUDED.file_size_limit, allowed_mime_types = EXCLUDED.allowed_mime_types;
DROP POLICY IF EXISTS "Public Main Member Photos" ON storage.objects;
CREATE POLICY "Public Main Member Photos" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'main-member-photos');
DROP POLICY IF EXISTS "Admin Upload Main Member Photos" ON storage.objects;
CREATE POLICY "Admin Upload Main Member Photos" ON storage.objects FOR INSERT TO authenticated
 WITH CHECK (bucket_id = 'main-member-photos' AND (SELECT public.can_manage_main_members()));
DROP POLICY IF EXISTS "Admin Delete Main Member Photos" ON storage.objects;
CREATE POLICY "Admin Delete Main Member Photos" ON storage.objects FOR DELETE TO authenticated
 USING (bucket_id = 'main-member-photos' AND (SELECT public.can_manage_main_members()));

INSERT INTO public.main_members (seed_key,name_en,name_hi,role_key,role_en,role_hi,description_en,description_hi,photo_url,phone,display_order) VALUES ('1','Shobhan Tiwari (Bablu Pandit)','शोभन तिवारी (बब्लू पंडित)','members.role.president','President','अध्यक्ष','Leading the committee with a vision of spreading Hanuman ji''s devotion across the nation.','हनुमान जी की भक्ति को पूरे देश में फैलाने के उद्देश्य से कमेटी का नेतृत्व कर रहे हैं।','https://i.postimg.cc/XvFW5MQh/papa-hpvc.jpg','+91 9415236933',1) ON CONFLICT (seed_key) DO NOTHING;
INSERT INTO public.main_members (seed_key,name_en,name_hi,role_key,role_en,role_hi,description_en,description_hi,photo_url,phone,display_order) VALUES ('2','Lal Bahadur','लाल बहादुर','members.role.priest','Vice President','उपाध्यक्ष','Supporting all committee activities and spiritual events.','कमेटी के सभी कार्यक्रमों एवं धार्मिक आयोजनों में सहयोग प्रदान करते हैं।','https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400','',2) ON CONFLICT (seed_key) DO NOTHING;
INSERT INTO public.main_members (seed_key,name_en,name_hi,role_key,role_en,role_hi,description_en,description_hi,photo_url,phone,display_order) VALUES ('3','Umesh Chandra Gupta (Chappu)','उमेश चंद्र गुप्ता (चप्पू)','members.role.treasurer','Treasurer','कोषाध्यक्ष','Managing committee funds and ensuring transparency in all charitable activities.','कमेटी के धन का प्रबंधन और सभी सेवा कार्यों में पारदर्शिता सुनिश्चित करना।','https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400','',3) ON CONFLICT (seed_key) DO NOTHING;
INSERT INTO public.main_members (seed_key,name_en,name_hi,role_key,role_en,role_hi,description_en,description_hi,photo_url,phone,display_order) VALUES ('4','Sanju Gupta','संजू गुप्ता','members.role.coordinator','General Secretary','महामंत्री','Orchestrating grand events, pushpavarsha, and bhandaras.','भव्य आयोजनों, पुष्पवर्षा और भंडारों का संचालन।','https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400','',4) ON CONFLICT (seed_key) DO NOTHING;
INSERT INTO public.main_members (seed_key,name_en,name_hi,role_key,role_en,role_hi,description_en,description_hi,photo_url,phone,display_order) VALUES ('5','Rishuraj Gupta (Sundar)','ऋषुराज गुप्ता (सुंदर)','members.role.minister','Minister','मंत्री','Actively contributing to committee management and public coordination.','कमेटी संचालन एवं जनसमन्वय में सक्रिय योगदान।','https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400','',5) ON CONFLICT (seed_key) DO NOTHING;

NOTIFY pgrst, 'reload schema';
COMMIT;
SELECT name_en,role_en,display_order FROM public.main_members ORDER BY display_order;
