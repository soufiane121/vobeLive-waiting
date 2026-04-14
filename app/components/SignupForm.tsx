"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { signupForm, env } from "../lib/waitlistContent";
import VelvetRope from "./VelvetRope";
import { supabaseBrowser } from "../utils/supabase/browser";
import LaunchCities from "./LaunchCities";

interface SignupFormProps {
  onSuccess: (data: { referralCode: string; queuePosition: number }) => void;
}

/** RFC 5322 compliant — stricter than a simple @ check */
const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export default function SignupForm({ onSuccess }: SignupFormProps) {
  const [email, setEmail] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [consented, setConsented] = useState(false);
  const [submitState, setSubmitState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const isEmailValid = EMAIL_RE.test(email.trim());
  const isDisabled = !isEmailValid || !consented || submitState === "loading";

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!consented) return;
      if (!isEmailValid) return;

      setSubmitState("loading");
      setErrorMsg("");

      try {
        const params = new URLSearchParams(window.location.search);
        const ref = params.get("ref") || null;

        // Check if email already exists
        const { data: existingUser } = await supabaseBrowser
          .from("waitlist")
          .select("referral_code, queue_position")
          .eq("email", email.toLowerCase().trim())
          .single();

        if (existingUser) {
          setSubmitState("success");
          onSuccess({
            referralCode: existingUser.referral_code,
            queuePosition: existingUser.queue_position,
          });
          return;
        }

        // Insert new waitlist entry
        const { data: newEntry, error } = await supabaseBrowser
          .from("waitlist")
          .insert({
            email: email.toLowerCase().trim(),
            city: cityInput.trim() || null,
            referred_by: ref,
            consented: true,
            source: "website",
          })
          .select("referral_code, queue_position")
          .single();

        if (error) {
          console.error("Supabase error:", error);
          setSubmitState("error");
          setErrorMsg("Failed to join waitlist. Please try again.");
          return;
        }

        setSubmitState("success");
        onSuccess({
          referralCode: newEntry.referral_code,
          queuePosition: newEntry.queue_position,
        });
      } catch (err) {
        console.error("Signup error:", err);
        setSubmitState("error");
        setErrorMsg("Network error. Please check your connection and try again.");
      }
    },
    [email, cityInput, consented, isEmailValid, onSuccess]
  );

  if (submitState === "success") return null;

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mt-6 animate-fade-in-up"
      noValidate
    >
      {/* Email input */}
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={signupForm.emailPlaceholder}
        autoComplete="email"
        required
        aria-label="Email address"
        className="w-full mb-3 text-[14px] text-white outline-none transition-colors"
        style={{
          background: "var(--surface)",
          border: "0.5px solid var(--border-default)",
          borderRadius: "8px",
          padding: "13px 16px",
        }}
      />

      {/* City input (optional) */}
      <input
        id="city"
        type="text"
        value={cityInput}
        onChange={(e) => setCityInput(e.target.value)}
        placeholder={signupForm.cityPlaceholder}
        autoComplete="address-level2"
        aria-label="Your city"
        className="w-full mb-4 text-[14px] text-white outline-none transition-colors"
        style={{
          background: "var(--surface)",
          border: "0.5px solid var(--border-default)",
          borderRadius: "8px",
          padding: "13px 16px",
        }}
      />

      {/* Consent checkbox — 10px gap, top-aligned */}
      <label className="flex items-start cursor-pointer select-none mb-5" style={{ gap: "10px" }}>
        <input
          type="checkbox"
          checked={consented}
          onChange={(e) => setConsented(e.target.checked)}
          className="consent-checkbox mt-0.5"
          aria-label="I agree to the terms of use"
        />
        <span style={{ fontSize: "12px", lineHeight: 1.55, color: "rgba(255,255,255,0.35)" }}>
          I agree to the{" "}
          <Link
            href={signupForm.consentLinkHref}
            style={{
              color: "rgba(139, 172, 250, 0.8)",
              textDecoration: "underline",
              textUnderlineOffset: "2px",
            }}
          >
            {signupForm.consentLinkText}
          </Link>{" "}
          and understand that {env.APP_NAME} will contact me by email about the
          product.
        </span>
      </label>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isDisabled}
        className="btn-primary flex items-center justify-center gap-2"
      >
        {submitState === "loading" ? (
          <span className="spinner" />
        ) : (
          signupForm.submitLabel
        )}
      </button>

      {/* Micro copy — 11px per spec */}
      <p className="mt-3 text-center" style={{ fontSize: "11px", color: "var(--text-micro)" }}>
        {signupForm.disclaimer(env.CITY)}
      </p>

      {/* Velvet Rope — social proof */}
      <VelvetRope />
      <LaunchCities />

      {/* Error message */}
      {submitState === "error" && errorMsg && (
        <p className="mt-3 text-sm text-[var(--hot-primary)] text-center font-body">
          {errorMsg}
        </p>
      )}
    </form>
  );
}
