# Lazoronix Forensic Database Schema

This document outlines the database structure and Row Level Security (RLS) policies used for the Lazoronix Digital Asset Recovery platform.

## Table: `cases`

This table stores all forensic intake submissions, AI-generated findings, and investigator management data.

### Schema Definitions

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary Key, default: `gen_random_uuid()` |
| `case_id` | `text` | Human-readable tracking ID (e.g., LRX-12345) |
| `case_type` | `text` | Category of the scam/recovery case |
| `user_name` | `text` | Full name of the participant |
| `user_email` | `text` | Email address for correspondence |
| `user_phone` | `text` | Phone number (optional) |
| `user_country` | `text` | Country of the participant |
| `risk_level` | `text` | AI-determined risk factor (Critical, High, Moderate, Low) |
| `evidence_integrity` | `text` | Assessment of provided data quality (Substantial, Partial, Incomplete) |
| `status` | `text` | Current operational status (Review Pending, Investigating, Resolved) |
| `description` | `text` | Technical narrative provided by the user |
| `result_data` | `jsonb` | Full structured output from the Genkit AI forensic flow |
| `form_values` | `jsonb` | Structured fields from the specific intake category |
| `is_blocked` | `boolean` | Flag indicating if withdrawals are currently restricted |
| `has_access` | `boolean` | Flag indicating if the user still has platform access |
| `best_contact_time` | `text` | User's preferred timeframe for contact |
| `preferred_method` | `text` | User's preferred communication channel |
| `created_at` | `timestamptz` | Timestamp of submission, default: `now()` |

## Row Level Security (RLS) Policies

RLS is enabled on the `cases` table to ensure data privacy and administrative control.

### 1. Allow Public Submissions (Insert)
- **Role**: `anon`
- **Action**: `INSERT`
- **Definition**: Allows the public AI-Guided Tool to submit new case records without authentication.
- **Policy**: `true` (Enabled for all)

### 2. Restrict Read Access to Authorized Personnel (Select)
- **Role**: `authenticated`
- **Action**: `SELECT`
- **Definition**: Only logged-in administrators can view case records in the Forensic Command Center.
- **Policy**: `auth.role() = 'authenticated'`

### 3. Restrict Deletion to Authorized Personnel (Delete)
- **Role**: `authenticated`
- **Action**: `DELETE`
- **Definition**: Only logged-in administrators can remove records from the forensic ledger.
- **Policy**: `auth.role() = 'authenticated'`

### 4. Restrict Updates to Authorized Personnel (Update)
- **Role**: `authenticated`
- **Action**: `UPDATE`
- **Definition**: Only logged-in administrators can modify case statuses or risk levels.
- **Policy**: `auth.role() = 'authenticated'`

---

## Authentication
Administrative access is managed via **Supabase Auth**. Users must be present in the Supabase Project's `auth.users` table to access the `/admin` dashboard.
