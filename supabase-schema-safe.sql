-- ═══════════════════════════════════════════════════════════════════════════
-- VIBELIVE WAITLIST SUPABASE SCHEMA (Safe - handles existing objects)
-- Run this in your Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════════════════

-- Create function to generate referral code (if not exists)
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

-- Create the waitlist table (if not exists)
CREATE TABLE IF NOT EXISTS waitlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    city TEXT,
    referral_code TEXT NOT NULL UNIQUE DEFAULT generate_referral_code(),
    referred_by TEXT REFERENCES waitlist(referral_code),
    referral_count INTEGER DEFAULT 0,
    queue_position SERIAL,
    consented BOOLEAN NOT NULL DEFAULT true,
    consented_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    signed_up_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ip_address TEXT,
    user_agent TEXT,
    source TEXT DEFAULT 'website',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes (if not exists)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_waitlist_email') THEN
        CREATE INDEX idx_waitlist_email ON waitlist(email);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_waitlist_referral_code') THEN
        CREATE INDEX idx_waitlist_referral_code ON waitlist(referral_code);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_waitlist_referred_by') THEN
        CREATE INDEX idx_waitlist_referred_by ON waitlist(referred_by);
    END IF;
END $$;

-- Enable RLS
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS waitlist_insert_anon ON waitlist;
DROP POLICY IF EXISTS waitlist_select_anon ON waitlist;
DROP POLICY IF EXISTS waitlist_update_anon ON waitlist;

-- Create policies for anon (browser client)
CREATE POLICY waitlist_insert_anon ON waitlist FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY waitlist_select_anon ON waitlist FOR SELECT TO anon USING (true);
CREATE POLICY waitlist_update_anon ON waitlist FOR UPDATE TO anon USING (true) WITH CHECK (true);

-- Create view for stats (if not exists)
CREATE OR REPLACE VIEW waitlist_stats AS
SELECT 
    COUNT(*) as total_count,
    COUNT(*) FILTER (WHERE signed_up_at > NOW() - INTERVAL '1 hour') as last_hour_count,
    COUNT(*) FILTER (WHERE signed_up_at > NOW() - INTERVAL '24 hours') as last_24h_count
FROM waitlist;
