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

-- 3. LIVE STATUS TABLE
CREATE TABLE IF NOT EXISTS public.live_status (
    id integer PRIMARY KEY DEFAULT 1,
    is_live boolean DEFAULT false,
    live_link text,
    title_en text,
    title_hi text,
    venue_en text,
    venue_hi text,
    announcements_en text,
    announcements_hi text,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT single_row CHECK (id = 1)
);

-- Seed initial live status row if not exists
INSERT INTO public.live_status (id, is_live, live_link, title_en, title_hi, venue_en, venue_hi, announcements_en, announcements_hi)
VALUES (
  1, 
  false, 
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 
  'Maha Aarti & Pushpavarsha', 
  'महा आरती एवं पुष्पवर्षा', 
  'Sangam Ghat, Prayagraj', 
  'संगम घाट, प्रयागराज', 
  'Welcome to the live broadcast of Maha Aarti. • Please maintain digital decorum in chat. • Pushpavarsha will commence shortly.', 
  'महा आरती के सीधे प्रसारण में आपका स्वागत है। • कृपया चैट में मर्यादा बनाए रखें। • पुष्पवर्षा शीघ्र ही शुरू होगी।'
)
ON CONFLICT (id) DO NOTHING;

-- 4. GALLERY ALBUMS TABLE
CREATE TABLE IF NOT EXISTS public.gallery_albums (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    year text NOT NULL,
    title_en text NOT NULL,
    title_hi text NOT NULL,
    description_en text,
    description_hi text,
    cover_image text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. GALLERY PHOTOS TABLE
CREATE TABLE IF NOT EXISTS public.gallery_photos (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    album_id uuid REFERENCES public.gallery_albums(id) ON DELETE CASCADE,
    src text NOT NULL,
    category text,
    caption_en text,
    caption_hi text,
    date_str text,
    aspect_ratio text DEFAULT 'aspect-[4/3]',
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS on all new tables
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_photos ENABLE ROW LEVEL SECURITY;

-- 1. Admins Table Policies
CREATE POLICY "Allow authenticated read of admins" ON public.admins
    FOR SELECT TO authenticated USING (true);

-- Helper query check function for policies: returns true if the current user email is in public.admins
-- 2. Events Policies
CREATE POLICY "Public Read Events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Admin Manage Events" ON public.events FOR ALL TO authenticated
    USING (EXISTS (SELECT 1 FROM public.admins WHERE email = auth.jwt() ->> 'email'))
    WITH CHECK (EXISTS (SELECT 1 FROM public.admins WHERE email = auth.jwt() ->> 'email'));

-- 3. Live Status Policies
CREATE POLICY "Public Read Live Status" ON public.live_status FOR SELECT USING (true);
CREATE POLICY "Admin Manage Live Status" ON public.live_status FOR ALL TO authenticated
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

-- 6. Add/Update Policies for Existing Tables to allow Admins to manage members and donations
-- Ensure RLS is enabled (should be already, but safety first)
ALTER TABLE public.join_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Policy for join_members: public can insert (signup), authenticated admins can select, update, delete
CREATE POLICY "Admin Select Join Members" ON public.join_members FOR SELECT TO authenticated
    USING (EXISTS (SELECT 1 FROM public.admins WHERE email = auth.jwt() ->> 'email'));

CREATE POLICY "Admin Update Join Members" ON public.join_members FOR UPDATE TO authenticated
    USING (EXISTS (SELECT 1 FROM public.admins WHERE email = auth.jwt() ->> 'email'))
    WITH CHECK (EXISTS (SELECT 1 FROM public.admins WHERE email = auth.jwt() ->> 'email'));

CREATE POLICY "Admin Delete Join Members" ON public.join_members FOR DELETE TO authenticated
    USING (EXISTS (SELECT 1 FROM public.admins WHERE email = auth.jwt() ->> 'email'));

-- Policy for donations: authenticated admins can select, update, delete
CREATE POLICY "Admin Select Donations" ON public.donations FOR SELECT TO authenticated
    USING (EXISTS (SELECT 1 FROM public.admins WHERE email = auth.jwt() ->> 'email'));

CREATE POLICY "Admin Delete Donations" ON public.donations FOR DELETE TO authenticated
    USING (EXISTS (SELECT 1 FROM public.admins WHERE email = auth.jwt() ->> 'email'));

-- ==========================================
-- STORAGE BUCKETS & POLICIES SETUP
-- ==========================================

-- Insert buckets if not exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('events', 'events', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Public Read Storage" ON storage.objects FOR SELECT USING (bucket_id IN ('gallery', 'events', 'member-photos'));

CREATE POLICY "Admin Insert Storage" ON storage.objects FOR INSERT TO authenticated
    WITH CHECK (
      bucket_id IN ('gallery', 'events', 'member-photos') AND
      EXISTS (SELECT 1 FROM public.admins WHERE email = auth.jwt() ->> 'email')
    );

CREATE POLICY "Admin Update Storage" ON storage.objects FOR UPDATE TO authenticated
    USING (
      bucket_id IN ('gallery', 'events', 'member-photos') AND
      EXISTS (SELECT 1 FROM public.admins WHERE email = auth.jwt() ->> 'email')
    );

CREATE POLICY "Admin Delete Storage" ON storage.objects FOR DELETE TO authenticated
    USING (
      bucket_id IN ('gallery', 'events', 'member-photos') AND
      EXISTS (SELECT 1 FROM public.admins WHERE email = auth.jwt() ->> 'email')
    );
