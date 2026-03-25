# Database Setup & SQL Commands

## Task 1: Update All Users to Admin

Run this SQL query in your Supabase SQL Editor to make all existing users admins:

```sql
-- Update all users in the profiles table to have admin role
UPDATE profiles 
SET role = 'admin' 
WHERE role = 'user' OR role IS NULL OR role != 'admin';
```

## Task 4: Fix Registration Form 400 Error

The 400 error occurs because the `registrations` table likely has Row Level Security (RLS) enabled without proper policies for anonymous users to insert data.

### Solution: Run these SQL commands in Supabase SQL Editor

```sql
-- Create a policy to allow anonymous users to insert registrations
CREATE POLICY "Allow anonymous registration inserts"
ON registrations
FOR INSERT
TO anon
WITH CHECK (true);

-- If you also want authenticated users to insert
CREATE POLICY "Allow authenticated registration inserts"
ON registrations
FOR INSERT
TO authenticated
WITH CHECK (true);
```

### Alternative: If RLS is too restrictive, disable it (NOT RECOMMENDED for production)

```sql
-- Only use this if you want to completely disable RLS on registrations table
ALTER TABLE registrations DISABLE ROW LEVEL SECURITY;
```

### Verify the registrations table exists

If the table doesn't exist, create it with this schema:

```sql
CREATE TABLE IF NOT EXISTS registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- Personal Information
  fullname TEXT NOT NULL,
  nationality TEXT NOT NULL,
  id_number TEXT NOT NULL,
  city TEXT NOT NULL,
  profession TEXT NOT NULL,
  age INTEGER,
  phone TEXT NOT NULL,
  whatsapp TEXT,
  
  -- Service
  music TEXT DEFAULT 'Non',
  music_role TEXT,
  commission TEXT DEFAULT 'Non',
  commission_name TEXT,
  
  -- Logistics
  arrival TEXT NOT NULL,
  departure TEXT NOT NULL,
  
  -- Football
  football TEXT DEFAULT 'Non',
  foot_level TEXT,
  
  -- T-shirt
  tshirt_size TEXT NOT NULL,
  tshirt_color TEXT NOT NULL,
  
  -- Remarks
  remarks TEXT
);

-- Enable RLS on the table
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Create the insert policy
CREATE POLICY "Allow anonymous registration inserts"
ON registrations
FOR INSERT
TO anon
WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX idx_registrations_created_at ON registrations(created_at DESC);
CREATE INDEX idx_registrations_fullname ON registrations(fullname);
```

## Quick Troubleshooting Steps

1. **Check if table exists:**
   ```sql
   SELECT * FROM information_schema.tables WHERE table_name = 'registrations';
   ```

2. **Check actual column names in your table:**
   ```sql
   SELECT column_name, data_type, is_nullable
   FROM information_schema.columns
   WHERE table_name = 'registrations'
   ORDER BY ordinal_position;
   ```

3. **Check RLS status:**
   ```sql
   SELECT tablename, rowsecurity 
   FROM pg_tables 
   WHERE tablename = 'registrations';
   ```

4. **Check existing policies:**
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'registrations';
   ```

5. **Test insert manually:**
   ```sql
   INSERT INTO registrations (fullname, nationality, id_number, city, profession, phone, arrival, departure, tshirt_size, tshirt_color)
   VALUES ('Test User', 'Morocco', '12345', 'Casablanca', 'Developer', '+212600000000', '2026-05-15', '2026-05-17', 'M', 'Bleu');
   ```

## Fix Missing Columns Error

If you get an error like "column 'nationality' does not exist", add the missing columns to your existing table:

```sql
-- Add missing columns to existing registrations table
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS nationality TEXT;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS id_number TEXT;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS profession TEXT;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS age INTEGER;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS whatsapp TEXT;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS music TEXT DEFAULT 'Non';
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS music_role TEXT;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS commission TEXT DEFAULT 'Non';
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS commission_name TEXT;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS arrival TEXT;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS departure TEXT;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS football TEXT DEFAULT 'Non';
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS foot_level TEXT;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS tshirt_size TEXT;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS tshirt_color TEXT;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS remarks TEXT;
```
