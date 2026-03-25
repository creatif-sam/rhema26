-- Migration to set your existing user as admin
-- Replace 'your-email@domain.com' with your actual admin email

-- Option 1: Set admin by email (RECOMMENDED)
-- Replace this email with your actual admin email:
UPDATE public.profiles
SET role = 'admin', updated_at = NOW()
WHERE email = 'admin@eeam.org'; -- ⬅️ CHANGE THIS EMAIL

-- Option 2: Set admin by user ID (if you know your user ID)
-- Uncomment and replace with your user ID if needed:
-- UPDATE public.profiles
-- SET role = 'admin', updated_at = NOW()
-- WHERE id = 'your-user-id-here';

-- Option 3: Set the FIRST user as admin (use if only one user exists)
-- Uncomment this if you want to make the first created user admin:
-- UPDATE public.profiles
-- SET role = 'admin', updated_at = NOW()
-- WHERE id = (SELECT id FROM public.profiles ORDER BY created_at LIMIT 1);

-- Verify the admin user was set correctly
-- Run this to see all users and their roles:
-- SELECT id, email, full_name, role, created_at FROM public.profiles;
