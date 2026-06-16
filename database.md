
# Lazoronix Forensic Database Schema

This document outlines the database structure and Row Level Security (RLS) policies required for the Lazoronix Digital Asset Recovery platform.

## SQL Setup (Run this in Supabase SQL Editor)

To ensure the application functions correctly, execute the following SQL in your Supabase project:

```sql
-- 1. Create the cases table
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

-- 2. Enable Row Level Security
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Allow Public Submissions (Insert)
-- This allows the AI-Guided Tool to submit new cases without login.
DROP POLICY IF EXISTS "Allow public insert" ON cases;
CREATE POLICY "Allow public insert" ON cases 
FOR INSERT WITH CHECK (true);

-- 4. Policy: Restrict Read Access (Select)
-- Only authenticated admins can see the data in the Command Center.
DROP POLICY IF EXISTS "Allow authenticated select" ON cases;
CREATE POLICY "Allow authenticated select" ON cases 
FOR SELECT TO authenticated USING (true);

-- 5. Policy: Restrict Updates (Update)
-- Only authenticated admins can update case status.
DROP POLICY IF EXISTS "Allow authenticated update" ON cases;
CREATE POLICY "Allow authenticated update" ON cases 
FOR UPDATE TO authenticated USING (true);

-- 6. Policy: Restrict Deletion (Delete)
-- Only authenticated admins can delete records.
DROP POLICY IF EXISTS "Allow authenticated delete" ON cases;
CREATE POLICY "Allow authenticated delete" ON cases 
FOR DELETE TO authenticated USING (true);
```

## Table: `cases`

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary Key |
| `case_id` | `text` | Human-readable tracking ID (e.g., LRX-12345) |
| `case_type` | `text` | Category of the scam/recovery case |
| `user_name` | `text` | Full name of the participant |
| `user_email` | `text` | Email address |
| `status` | `text` | Operational status (Review Pending, Investigating, Resolved) |
| `result_data` | `jsonb` | AI-generated forensic findings |
| `form_values` | `jsonb` | Categorical intake fields |

---

## Storage Buckets

### `assets` (Public)
1. Go to **Storage** in Supabase.
2. Create a bucket named `assets`.
3. Set the bucket to **Public**.
4. Upload `logo.png` for branding.
5. Upload `{member-id}.png` for team avatars (e.g., `team-1.png`).
