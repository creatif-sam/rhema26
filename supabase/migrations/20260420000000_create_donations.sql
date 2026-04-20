-- Create donations table for tracking donation confirmations
CREATE TABLE IF NOT EXISTS public.donations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  payment_method TEXT,
  message TEXT,
  receipt_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public donation form — no auth required)
CREATE POLICY "Public can insert donations"
  ON public.donations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users (admins) can read donations
CREATE POLICY "Authenticated users can read donations"
  ON public.donations
  FOR SELECT
  TO authenticated
  USING (true);

-- Create storage bucket for donation receipts
INSERT INTO storage.buckets (id, name, public)
VALUES ('donation-receipts', 'donation-receipts', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to upload to donation-receipts bucket
CREATE POLICY "Public can upload receipts"
  ON storage.objects
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'donation-receipts');

-- Allow public read of receipt images
CREATE POLICY "Public can view receipts"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'donation-receipts');
