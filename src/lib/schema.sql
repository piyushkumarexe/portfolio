-- Run this SQL in your Supabase SQL Editor to create the required tables.
-- The app will read/write these tables automatically once they exist.

-- Settings table
CREATE TABLE IF NOT EXISTS settings (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  name TEXT DEFAULT 'PIYUSH EXE',
  subtitle TEXT DEFAULT 'Bot Developer',
  role TEXT DEFAULT 'Bot Developer',
  country TEXT DEFAULT 'India',
  country_code TEXT DEFAULT 'IN',
  avatar_url TEXT DEFAULT '/images/avatar.jpg',
  status TEXT DEFAULT 'Online',
  biography TEXT DEFAULT '',
  socials JSONB DEFAULT '[]'::jsonb,
  theme JSONB DEFAULT '{}'::jsonb,
  video JSONB DEFAULT '{}'::jsonb,
  effects JSONB DEFAULT '{}'::jsonb,
  music_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON settings
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated update" ON settings
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Visitors / analytics table
CREATE TABLE IF NOT EXISTS visitors (
  session_id TEXT PRIMARY KEY,
  last_active TIMESTAMPTZ DEFAULT now(),
  first_visit TIMESTAMPTZ DEFAULT now(),
  visits_count INTEGER DEFAULT 1,
  device TEXT,
  browser TEXT,
  country TEXT,
  timezone TEXT
);

ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public upsert" ON visitors
  FOR ALL TO anon USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated read" ON visitors
  FOR SELECT TO authenticated USING (true);

-- Realtime
BEGIN;
  DROP PUBLICATION IF EXISTS supabase_realtime;
  CREATE PUBLICATION supabase_realtime;
COMMIT;

ALTER PUBLICATION supabase_realtime ADD TABLE settings;

-- Storage bucket for uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio', 'portfolio', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Allow authenticated uploads" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio');

CREATE POLICY "Allow public read" ON storage.objects
  FOR SELECT TO anon USING (bucket_id = 'portfolio');
