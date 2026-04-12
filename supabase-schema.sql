-- ═══════════════════════════════════════════════════════════════════════════
-- VIBELIVE WAITLIST SUPABASE SCHEMA
-- Run this in your Supabase SQL Editor to create the waitlist table
-- ═══════════════════════════════════════════════════════════════════════════

-- Create the waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    city TEXT,
    referral_code TEXT NOT NULL UNIQUE,
    referred_by TEXT REFERENCES waitlist(referral_code),
    referral_count INTEGER DEFAULT 0,
    queue_position INTEGER NOT NULL,
    consented BOOLEAN NOT NULL DEFAULT true,
    consented_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    signed_up_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ip_address TEXT,
    user_agent TEXT,
    source TEXT DEFAULT 'website',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX idx_waitlist_email ON waitlist(email);
CREATE INDEX idx_waitlist_referral_code ON waitlist(referral_code);
CREATE INDEX idx_waitlist_referred_by ON waitlist(referred_by);
CREATE INDEX idx_waitlist_queue_position ON waitlist(queue_position);
CREATE INDEX idx_waitlist_signed_up_at ON waitlist(signed_up_at);

-- Create function to generate referral code
CREATE OR REPLACE FUNCTION generate_referral_code()
RETURNS TEXT AS $$
DECLARE
    code TEXT;
    exists_check BOOLEAN;
BEGIN
    LOOP
        -- Generate 8-character code: 4 letters + 4 numbers
        code := (
            SELECT string_agg(chr(65 + floor(random() * 26)::int), '')
            FROM generate_series(1, 4)
        ) || (
            SELECT string_agg(floor(random() * 10)::text, '')
            FROM generate_series(1, 4)
        );
        
        -- Check if code already exists
        SELECT EXISTS(SELECT 1 FROM waitlist WHERE referral_code = code) INTO exists_check;
        
        EXIT WHEN NOT exists_check;
    END LOOP;
    
    RETURN code;
END;
$$ LANGUAGE plpgsql;

-- Create function to get next queue position
CREATE OR REPLACE FUNCTION get_next_queue_position()
RETURNS INTEGER AS $$
DECLARE
    next_position INTEGER;
BEGIN
    SELECT COALESCE(MAX(queue_position), 0) + 1 INTO next_position FROM waitlist;
    RETURN next_position;
END;
$$ LANGUAGE plpgsql;

-- Create function to update referral count when someone signs up with a referral
CREATE OR REPLACE FUNCTION update_referrer_count()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.referred_by IS NOT NULL THEN
        UPDATE waitlist 
        SET referral_count = referral_count + 1,
            queue_position = queue_position - 1,
            updated_at = NOW()
        WHERE referral_code = NEW.referred_by;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update referrer count
CREATE TRIGGER update_referrer_count_trigger
    AFTER INSERT ON waitlist
    FOR EACH ROW
    EXECUTE FUNCTION update_referrer_count();

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anon (browser client)
CREATE POLICY waitlist_insert_anon ON waitlist
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Create policy to allow reads from anon by referral code
CREATE POLICY waitlist_select_anon ON waitlist
    FOR SELECT
    TO anon
    USING (true);

-- Create policy to allow updates from anon (for referral tracking)
CREATE POLICY waitlist_update_anon ON waitlist
    FOR UPDATE
    TO anon
    USING (true)
    WITH CHECK (true);

-- Keep service_role policies for server-side operations
CREATE POLICY waitlist_insert_service ON waitlist
    FOR INSERT
    TO service_role
    WITH CHECK (true);

CREATE POLICY waitlist_select_service ON waitlist
    FOR SELECT
    TO service_role
    USING (true);

CREATE POLICY waitlist_update_service ON waitlist
    FOR UPDATE
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Create view for public stats (count only, no sensitive data)
CREATE OR REPLACE VIEW waitlist_stats AS
SELECT 
    COUNT(*) as total_count,
    COUNT(*) FILTER (WHERE signed_up_at > NOW() - INTERVAL '1 hour') as last_hour_count,
    COUNT(*) FILTER (WHERE signed_up_at > NOW() - INTERVAL '24 hours') as last_24h_count
FROM waitlist;

-- Insert test data (optional - remove in production)
-- Uncomment below to test the setup:
/*
INSERT INTO waitlist (email, city, referral_code, queue_position, consented, ip_address, user_agent)
VALUES 
    ('test1@example.com', 'London', generate_referral_code(), get_next_queue_position(), true, '127.0.0.1', 'Test'),
    ('test2@example.com', 'Paris', generate_referral_code(), get_next_queue_position(), true, '127.0.0.1', 'Test');
*/
