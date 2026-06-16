
# Lazoronix Forensic Database Schema

This document outlines the database structure and Row Level Security (RLS) policies required for the Lazoronix Digital Asset Recovery platform.

## SQL Setup (Run this in Supabase SQL Editor)

To ensure the application functions correctly, execute the following SQL in your Supabase project:

```sql
-- 1. Create the cases table (For intake)
CREATE TABLE IF NOT EXISTS cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id text,
  case_type text,
  user_name text,
  user_email text,
  user_phone text,
  user_country text,
  risk_level text,
  evidence_integrity text,
  status text DEFAULT 'Review Pending',
  description text,
  result_data jsonb,
  form_values jsonb,
  is_blocked boolean DEFAULT false,
  has_access boolean DEFAULT true,
  best_contact_time text,
  preferred_method text,
  created_at timestamptz DEFAULT now()
);

-- 2. Create the success_stories table
CREATE TABLE IF NOT EXISTS success_stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id text,
  case_type text,
  amount text,
  status text DEFAULT 'Recovered',
  narrative text,
  icon_name text DEFAULT 'TrendingUp',
  created_at timestamptz DEFAULT now()
);

-- 3. Enable Row Level Security
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE success_stories ENABLE ROW LEVEL SECURITY;

-- 4. Policy: Allow Public Submissions (Insert)
DROP POLICY IF EXISTS "Allow public insert" ON cases;
CREATE POLICY "Allow public insert" ON cases 
FOR INSERT WITH CHECK (true);

-- 5. Policy: Restrict Read Access (Select)
DROP POLICY IF EXISTS "Allow authenticated select" ON cases;
CREATE POLICY "Allow authenticated select" ON cases 
FOR SELECT TO authenticated USING (true);

-- 6. Policy: Restrict Updates (Update)
DROP POLICY IF EXISTS "Allow authenticated update" ON cases;
CREATE POLICY "Allow authenticated update" ON cases 
FOR UPDATE TO authenticated USING (true);

-- 7. Policy: Restrict Deletion (Delete)
DROP POLICY IF EXISTS "Allow authenticated delete" ON cases;
CREATE POLICY "Allow authenticated delete" ON cases 
FOR DELETE TO authenticated USING (true);

-- 8. Policy: Public Read for Success Stories
DROP POLICY IF EXISTS "Allow public select stories" ON success_stories;
CREATE POLICY "Allow public select stories" ON success_stories 
FOR SELECT USING (true);

-- 9. Policy: Admin All for Success Stories
DROP POLICY IF EXISTS "Allow authenticated all stories" ON success_stories;
CREATE POLICY "Allow authenticated all stories" ON success_stories 
FOR ALL TO authenticated USING (true);
```

## Table: `cases`
Used for secure forensic intake submissions.

## Table: `success_stories`
Used for marketing and social proof on the homepage.

---

## Storage Buckets

### `assets` (Public)
1. Go to **Storage** in Supabase.
2. Create a bucket named `assets`.
3. Set the bucket to **Public**.
4. Upload `logo.png` for branding.
5. Upload `{member-id}.png` for team avatars (e.g., `team-1.png`).
