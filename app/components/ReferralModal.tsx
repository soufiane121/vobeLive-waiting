"use client";

import { useEffect, useState, useCallback } from "react";
import { referralModal, env } from "../lib/waitlistContent";
import { supabaseBrowser } from "../utils/supabase/browser";

interface ReferralModalProps {
  referralCode: string;
  queuePosition: number;
}

export default function ReferralModal({
  referralCode,
  queuePosition: initialPosition,
}: ReferralModalProps) {
  const [position, setPosition] = useState(initialPosition);
  const [referralCount, setReferralCount] = useState(0);
  const [copied, setCopied] = useState(false);

  const referralUrl = `${env.BASE_URL}?ref=${referralCode}`;

  // Poll position every 30s
  useEffect(() => {
    let mounted = true;

    const poll = async () => {
      try {
        const { data, error } = await supabaseBrowser
          .from("waitlist")
          .select("queue_position, referral_count")
          .eq("referral_code", referralCode.toUpperCase())
          .single();

        if (error || !data) return;
        
        if (mounted) {
          setPosition(data.queue_position);
          setReferralCount(data.referral_count);
        }
      } catch {
        // Silent
      }
    };

    poll();
    const interval = setInterval(poll, 30_000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [referralCode]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback — select input
    }
  }, [referralUrl]);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: referralModal.shareTitle(env.APP_NAME),
          text: referralModal.shareText,
          url: referralUrl,
        });
      } catch {
        // User cancelled
      }
    } else {
      handleCopy();
    }
  }, [referralUrl, handleCopy]);

  return (
    <div className="w-full animate-fade-in-up text-center">
      {/* Checkmark */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-[var(--success-surface)] border border-[var(--success-border)] flex items-center justify-center animate-scale-check">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--success-primary)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>

      {/* Headline */}
      <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-text mb-2">
        {referralModal.successHeadline}
      </h2>

      {/* Queue position */}
      {/* <p className="text-brand-text-secondary font-body text-base mb-8">
        You are{" "}
        <span className="font-display text-brand-text font-bold text-lg tabular-nums">
          #{position.toLocaleString()}
        </span>{" "}
        in {env.CITY}.
      </p> */}

      {/* Referral section */}
      <div className="bg-[var(--surface-primary)] border border-[var(--border-primary)] rounded-xl p-6 mb-6">
        <p className="font-body text-sm text-brand-text-secondary mb-4">
          {referralModal.shareCta}
        </p>

        {/* URL display */}
        <div className="flex items-center gap-2 bg-[var(--surface-secondary)] rounded-lg px-3 py-2.5 mb-4">
          <input
            readOnly
            value={referralUrl}
            className="flex-1 bg-transparent text-sm text-brand-text font-body outline-none truncate"
            aria-label="Your referral link"
          />
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleCopy}
            className="flex-1 py-2.5 rounded-lg bg-[var(--surface-secondary)] border border-[var(--border-primary)] text-sm font-body text-brand-text hover:bg-[var(--surface-tertiary)] transition-colors"
          >
            {copied ? referralModal.copiedLabel : referralModal.copyLabel}
          </button>
          <button
            onClick={handleShare}
            className="flex-1 py-2.5 rounded-lg bg-[var(--accent-primary)] text-sm font-body text-brand-text hover:opacity-90 transition-opacity"
          >
            {referralModal.shareLabel}
          </button>
        </div>

        {/* Referral count */}
        {/* <p className="mt-4 text-xs text-brand-text-tertiary font-body">
          {referralModal.linkUsedLabel(referralCount)}
        </p> */}

        {/* <p className="mt-2 text-xs text-brand-text-tertiary font-body">
          {referralModal.moveUpText}
        </p> */}
      </div>
    </div>
  );
}
