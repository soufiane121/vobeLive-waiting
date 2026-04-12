"use client";

import { useState, useCallback } from "react";
import NavBar from "./components/NavBar";
import HeroVisual from "./components/HeroVisual";
import SignupForm from "./components/SignupForm";
import QueuePositionCard from "./components/QueuePositionCard";
import LaunchProgress from "./components/LaunchProgress";
import ReferralModal from "./components/ReferralModal";
import FeatureCards from "./components/FeatureCards";
import LaunchCities from "./components/LaunchCities";
import { hero } from "./lib/waitlistContent";

export default function WaitlistPage() {
  const [referralData, setReferralData] = useState<{
    referralCode: string;
    queuePosition: number;
  } | null>(null);

  const handleSuccess = useCallback(
    (data: { referralCode: string; queuePosition: number }) => {
      setReferralData(data);
    },
    []
  );

  return (
		<>
			{/* ═══════ BACKGROUND LAYERS ═══════ */}
			<div className="page-bg" />
			<div className="heat-blob-a" />
			<div className="heat-blob-b" />

			{/* ═══════ PAGE WRAPPER — centered, max-width for desktop ═══════ */}
			<div className="relative z-[2] min-h-screen w-full max-w-[1200px] mx-auto">
				{/* Navbar — full width */}
				<NavBar />

				{/* Mobile: iPhone mockup above hero */}
				<div className="flex lg:hidden justify-center pt-6 pb-2 fixed mr-2 right-0">
					<HeroVisual />
				</div>

				{/* Two-column layout on desktop */}
				<div className="flex flex-col lg:flex-row lg:items-start lg:gap-16 xl:gap-24 px-6 lg:px-10">
					{/* LEFT COLUMN — form content */}
					<main className="flex-1 flex flex-col max-w-[480px]">
						{/* Hero */}
						<section style={{ padding: "24px 0 24px" }}>
							{/* Eyebrow */}
							<p
								className="uppercase animate-fade-in"
								style={{
									fontSize: "11px",
									letterSpacing: "0.1em",
									color: "rgba(255,255,255,0.3)",
									marginBottom: "20px",
								}}
							>
								{hero.launchBadgePrefix}{" "}
								<span style={{ color: "var(--accent-secondary)" }}>
									{hero.launchBadgeCity}
								</span>{" "}
								{hero.launchBadgeSuffix}
							</p>

							{/* Headline */}
							<h1
								className="animate-fade-in"
								style={{ fontSize: "3.5rem", fontWeight: 600, lineHeight: 1.1 }}
							>
								<span className="text-white whitespace-pre-line">
									{hero.headlineWhite}
								</span>
								<br />
								<span style={{ color: hero.headlineAccentColor }}>
									{hero.headlineAccentPrefix}
									<span style={{ color: "var(--accent-secondary)" }}>
										{hero.headlineAccentHighlight}
									</span>
									{hero.headlineAccentSuffix}
								</span>
							</h1>

							{/* Subheadline */}
							<p
								className="animate-fade-in"
								style={{
									marginTop: "16px",
									fontSize: "14px",
									color: "var(--text-secondary)",
									maxWidth: "360px",
									lineHeight: 1.65,
									animationDelay: "0.15s",
								}}
							>
								{hero.subheadline}
							</p>
						</section>

						{/* Form section */}
						<section className="flex flex-col gap-4">
							{referralData && (
								<QueuePositionCard
									position={referralData.queuePosition}
									totalCount={referralData.queuePosition * 2}
								/>
							)}

							<LaunchProgress />

							{referralData ? (
								<ReferralModal
									referralCode={referralData.referralCode}
									queuePosition={referralData.queuePosition}
								/>
							) : (
								<SignupForm onSuccess={handleSuccess} />
							)}
						</section>

						{/* Below the fold */}
						<div>
							<div
								style={{
									borderTop: "0.5px solid rgba(255,255,255,0.05)",
									margin: "32px 0",
								}}
							/>
							<FeatureCards />
							<div
								style={{ borderTop: "0.5px solid rgba(255,255,255,0.05)" }}
							/>
							<LaunchCities />
						</div>
					</main>

					{/* RIGHT COLUMN — iPhone mockup with radar (desktop only) */}
					<div className="hidden lg:flex flex-1 items-start justify-center pt-16 sticky top-8">
						<HeroVisual />
					</div>
				</div>
			</div>
		</>
	);
}
