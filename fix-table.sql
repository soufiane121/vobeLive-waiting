-- Fix the waitlist table - add missing columns

-- First, check what columns exist
-- Then add the missing ones

-- Add referral_code if missing
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='waitlist' AND column_name='referral_code') THEN
        ALTER TABLE waitlist ADD COLUMN referral_code TEXT UNIQUE;
        -- Set default for existing rows
        UPDATE waitlist SET referral_code = generate_referral_code() WHERE referral_code IS NULL;
        -- Make it not null for future rows
        ALTER TABLE waitlist ALTER COLUMN referral_code SET NOT NULL;
        ALTER TABLE waitlist ALTER COLUMN referral_code SET DEFAULT generate_referral_code();
    END IF;
END $$;

-- Add queue_position if missing
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='waitlist' AND column_name='queue_position') THEN
        ALTER TABLE waitlist ADD COLUMN queue_position INTEGER;
        CREATE SEQUENCE IF NOT EXISTS waitlist_position_seq;
        UPDATE waitlist SET queue_position = nextval('waitlist_position_seq');
        ALTER TABLE waitlist ALTER COLUMN queue_position SET NOT NULL;
    END IF;
END $$;

-- Add referral_count if missing
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='waitlist' AND column_name='referral_count') THEN
        ALTER TABLE waitlist ADD COLUMN referral_count INTEGER DEFAULT 0;
    END IF;
END $$;

-- Add referred_by if missing
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='waitlist' AND column_name='referred_by') THEN
        ALTER TABLE waitlist ADD COLUMN referred_by TEXT REFERENCES waitlist(referral_code);
    END IF;
END $$;

-- Add city if missing
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='waitlist' AND column_name='city') THEN
        ALTER TABLE waitlist ADD COLUMN city TEXT;
    END IF;
END $$;

-- Add consented if missing
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='waitlist' AND column_name='consented') THEN
        ALTER TABLE waitlist ADD COLUMN consented BOOLEAN DEFAULT true;
    END IF;
END $$;

-- Add consented_at if missing
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='waitlist' AND column_name='consented_at') THEN
        ALTER TABLE waitlist ADD COLUMN consented_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
END $$;

-- Add signed_up_at if missing
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='waitlist' AND column_name='signed_up_at') THEN
        ALTER TABLE waitlist ADD COLUMN signed_up_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
END $$;

-- Add source if missing
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='waitlist' AND column_name='source') THEN
        ALTER TABLE waitlist ADD COLUMN source TEXT DEFAULT 'website';
    END IF;
END $$;

-- Add ip_address if missing
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='waitlist' AND column_name='ip_address') THEN
        ALTER TABLE waitlist ADD COLUMN ip_address TEXT;
    END IF;
END $$;

-- Add user_agent if missing
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='waitlist' AND column_name='user_agent') THEN
        ALTER TABLE waitlist ADD COLUMN user_agent TEXT;
    END IF;
END $$;

-- Add timestamps if missing
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='waitlist' AND column_name='created_at') THEN
        ALTER TABLE waitlist ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='waitlist' AND column_name='updated_at') THEN
        ALTER TABLE waitlist ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
END $$;

-- Create the generate_referral_code function if not exists
CREATE OR REPLACE FUNCTION generate_referral_code()
RETURNS TEXT AS $$
DECLARE
    code TEXT;
    exists_check BOOLEAN;
BEGIN
    LOOP
        code := (
            SELECT string_agg(chr(65 + floor(random() * 26)::int), '')
            FROM generate_series(1, 4)
        ) || (
            SELECT string_agg(floor(random() * 10)::text, '')
            FROM generate_series(1, 4)
        );
        SELECT EXISTS(SELECT 1 FROM waitlist WHERE referral_code = code) INTO exists_check;
        EXIT WHEN NOT exists_check;
    END LOOP;
    RETURN code;
END;
$$ LANGUAGE plpgsql;
