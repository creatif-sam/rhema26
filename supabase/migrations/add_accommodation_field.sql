-- Add accommodation field to registrations table
-- This migration adds a new column to track if registrants want to use accommodation solutions

ALTER TABLE registrations 
ADD COLUMN accommodation VARCHAR(3) DEFAULT 'Non';

-- Add a comment to the column
COMMENT ON COLUMN registrations.accommodation IS 'Indicates if the registrant plans to use accommodation solutions (Oui/Non)';

-- Optional: Create an index if you plan to filter by this field frequently
-- CREATE INDEX idx_registrations_accommodation ON registrations(accommodation);
