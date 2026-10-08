-- SQL Schema for Hanuman Pushpavarsha Admin Dashboard
-- Run this in your Supabase SQL Editor to set up the required tables and security.

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ADMINS TABLE
CREATE TABLE IF NOT EXISTS public.admins (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    email text UNIQUE NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed default admin email
INSERT INTO public.admins (email)
VALUES ('saumyaagrahari262730@gmail.com')
ON CONFLICT (email) DO NOTHING;

-- 2. EVENTS TABLE
CREATE TABLE IF NOT EXISTS public.events (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title_en text NOT NULL,
    title_hi text NOT NULL,
    description_en text,
    description_hi text,
    event_date date NOT NULL,
    event_time text NOT NULL,
    venue_en text NOT NULL,
    venue_hi text NOT NULL,
    image_url text,
    is_featured boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. LIVE EVENT SETTINGS TABLE (used by Live Page & Admin)
CREATE TABLE IF NOT EXISTS public.live_event_settings (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    is_live boolean DEFAULT false,
    live_url text,
    title text,
    description text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed initial live event row if not exists
INSERT INTO public.live_event_settings (is_live, live_url, title, description)
VALUES (
  false, 
  'https://www.youtube.com/embed/dQw4w9WgXcQ', 
  'Maha Aarti & Pushpavarsha', 
  'Official live stream of Maha Aarti & Pushpavarsha'
)
ON CONFLICT DO NOTHING;

-- 4. JOIN MEMBERS TABLE
CREATE TABLE IF NOT EXISTS public.join_members (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name text NOT NULL,
    fathers_name text,
    age integer,
    gender text,
    occupation text,
    phone_number text NOT NULL,
    email text,
    address text,
    message text,
    interest_role text,
    city text,
    state text,
    photo_url text,
    photo_path text,
    aadhaar_path text,
    razorpay_payment_id text,
    razorpay_order_id text,
    payment_status text DEFAULT 'PENDING',
    member_status text DEFAULT 'pending',
    is_lead_member boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. EXECUTIVE MEMBERS TABLE
CREATE TABLE IF NOT EXISTS public.executive_members (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name_en text NOT NULL,
    name_hi text NOT NULL,
    display_order integer DEFAULT 0 NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed initial 6 Executive Members if not present
INSERT INTO public.executive_members (name_en, name_hi, display_order, is_active)
VALUES 
  ('Amit Gupta', 'अमित गुप्ता', 1, true),
  ('Ravi Tiwari', 'रवि तिवारी', 2, true),
  ('Pankaj Sharma', 'पंकज शर्मा', 3, true),
  ('Deepak Gupta', 'दीपक गुप्ता', 4, true),
  ('Ankit Mishra', 'अंकित मिश्रा', 5, true),
  ('Manoj Gupta', 'मनोज गुप्ता', 6, true)
ON CONFLICT DO NOTHING;

-- 5. JOIN MEMBERS TABLE
CREATE TABLE IF NOT EXISTS public.gallery_albums (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    year text NOT NULL,
    title text NOT NULL,
    title_en text,
    title_hi text,
    description_en text,
    description_hi text,
    cover_image text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. GALLERY PHOTOS TABLE
CREATE TABLE IF NOT EXISTS public.gallery_photos (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    album_id uuid REFERENCES public.gallery_albums(id) ON DELETE CASCADE,
    image_url text NOT NULL,
    image_path text,
    src text,
    category text,
    caption text,
    caption_en text,
    caption_hi text,
    date_str text,
    aspect_ratio text DEFAULT 'aspect-[4/3]',
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_event_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.join_members ENABLE ROW LEVEL SECURITY;

-- 1. Admins Table Policies
CREATE POLICY "Allow authenticated read of admins" ON public.admins
    FOR SELECT TO authenticated USING (true);

-- 2. Events Policies
CREATE POLICY "Public Read Events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Admin Manage Events" ON public.events FOR ALL TO authenticated
    USING (EXISTS (SELECT 1 FROM public.admins WHERE email = auth.jwt() ->> 'email'))
    WITH CHECK (EXISTS (SELECT 1 FROM public.admins WHERE email = auth.jwt() ->> 'email'));

-- 3. Live Event Settings Policies
CREATE POLICY "Public Read Live Event Settings" ON public.live_event_settings FOR SELECT USING (true);
CREATE POLICY "Admin Manage Live Event Settings" ON public.live_event_settings FOR ALL TO authenticated
    USING (EXISTS (SELECT 1 FROM public.admins WHERE email = auth.jwt() ->> 'email'))
    WITH CHECK (EXISTS (SELECT 1 FROM public.admins WHERE email = auth.jwt() ->> 'email'));

-- 4. Gallery Albums Policies
CREATE POLICY "Public Read Gallery Albums" ON public.gallery_albums FOR SELECT USING (true);
CREATE POLICY "Admin Manage Gallery Albums" ON public.gallery_albums FOR ALL TO authenticated
    USING (EXISTS (SELECT 1 FROM public.admins WHERE email = auth.jwt() ->> 'email'))
    WITH CHECK (EXISTS (SELECT 1 FROM public.admins WHERE email = auth.jwt() ->> 'email'));

-- 5. Gallery Photos Policies
CREATE POLICY "Public Read Gallery Photos" ON public.gallery_photos FOR SELECT USING (true);
CREATE POLICY "Admin Manage Gallery Photos" ON public.gallery_photos FOR ALL TO authenticated
    USING (EXISTS (SELECT 1 FROM public.admins WHERE email = auth.jwt() ->> 'email'))
    WITH CHECK (EXISTS (SELECT 1 FROM public.admins WHERE email = auth.jwt() ->> 'email'));

-- 6. Join Members Policies: public insert, admin full control
CREATE POLICY "Public Insert Join Members" ON public.join_members FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin Select Join Members" ON public.join_members FOR SELECT TO authenticated
    USING (EXISTS (SELECT 1 FROM public.admins WHERE email = auth.jwt() ->> 'email'));
CREATE POLICY "Admin Update Join Members" ON public.join_members FOR UPDATE TO authenticated
    USING (EXISTS (SELECT 1 FROM public.admins WHERE email = auth.jwt() ->> 'email'))
    WITH CHECK (EXISTS (SELECT 1 FROM public.admins WHERE email = auth.jwt() ->> 'email'));
CREATE POLICY "Admin Delete Join Members" ON public.join_members FOR DELETE TO authenticated
    USING (EXISTS (SELECT 1 FROM public.admins WHERE email = auth.jwt() ->> 'email'));

-- ==========================================
-- STORAGE BUCKETS & POLICIES SETUP
-- ==========================================

-- Insert buckets if not exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery-photos', 'gallery-photos', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('member-photos', 'member-photos', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('aadhaar-files', 'aadhaar-files', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Public Read Member Photos" ON storage.objects FOR SELECT USING (bucket_id IN ('gallery-photos', 'member-photos'));
CREATE POLICY "Public Insert Member & Aadhaar Storage" ON storage.objects FOR INSERT WITH CHECK (bucket_id IN ('member-photos', 'aadhaar-files'));

CREATE POLICY "Admin Full Storage Access" ON storage.objects FOR ALL TO authenticated
    USING (EXISTS (SELECT 1 FROM public.admins WHERE email = auth.jwt() ->> 'email'))
    WITH CHECK (EXISTS (SELECT 1 FROM public.admins WHERE email = auth.jwt() ->> 'email'));
