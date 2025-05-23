-- Create movies table
CREATE TABLE IF NOT EXISTS movies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  image_url TEXT,
  video_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable row level security
ALTER TABLE movies ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Allow admins full access" ON movies;
CREATE POLICY "Allow admins full access"
ON movies
USING (auth.jwt() ->> 'role' = 'admin');

DROP POLICY IF EXISTS "Allow public read access" ON movies;
CREATE POLICY "Allow public read access"
ON movies FOR SELECT
USING (true);

-- Enable realtime
alter publication supabase_realtime add table movies;
