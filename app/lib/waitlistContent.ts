/* ═══════════════════════════════════════════════════════════════════════════
   SINGLE SOURCE OF TRUTH — All waitlist page copy, labels, and config.
   Nothing is hardcoded in components. Every string comes from here or .env.
   ═══════════════════════════════════════════════════════════════════════════ */

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME!;
const CITY = process.env.NEXT_PUBLIC_LAUNCH_CITY!;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL!;
const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME!;
const COMPANY_ADDRESS = process.env.NEXT_PUBLIC_COMPANY_ADDRESS!;

/* ── Navbar ─────────────────────────────────────────────────────────────── */
export const navbar = {
	logoText: APP_NAME,
	logoAccent: "Live",
	badgeText: "COMING SOON",
};

/* ── Hero ───────────────────────────────────────────────────────────────── */
export const hero = {
	launchBadgePrefix: "LAUNCHING IN",
	launchBadgeCity: CITY.toUpperCase(),
	launchBadgeSuffix: "FIRST",
	headlineWhite: "Your city is\ngoing out.",
	headlineAccent: "Know where the <span>FUN<span> actuallyis.",
	headlineAccentPrefix: "Know where the ",
	headlineAccentHighlight: "FUN",
	headlineAccentColor: "#aec7e5",
	headlineAccentSuffix: " actually is.",
	subheadline: `Real-time nightlife signals — where the energy actually is tonight. We're building it. Get early access when we go live.`,
};

/* ── Queue position card ────────────────────────────────────────────────── */
export const queueCard = {
	topPercentLabel: (city: string) => `in the top 8% in ${city}`,
	description: `You'll get early access before the public launch. We'll email you first.`,
};

/* ── Launch progress ────────────────────────────────────────────────────── */
export const launchProgress = {
	goalLabel: (city: string) => `${city} launch goal`,
	spotsUnit: "spots claimed",
};

/* ── Signup form ────────────────────────────────────────────────────────── */
export const signupForm = {
	emailPlaceholder: "Your email",
	cityPlaceholder: "Your city (Optional)",
	submitLabel: "Get early access",
	consentText: (appName: string) =>
		`I agree to the terms of use and understand that ${appName} will contact me by email about the product.`,
	consentLinkText: "terms of use",
	consentLinkHref: "/terms",
	disclaimer: (city: string) =>
		`No app download. No credit card. We'll only email when ${city} goes live.`,
};

/* ── Velvet Rope (social proof under button) ──────────────────────────── */
export const velvetRope = {
	minPeople: 1,
	maxPeople: 5,
	maxAvatars: 4,
	city: CITY,
	label: (city: string) => `people joined the ${city} list in the last hour`,
	fallbackEmails: [
		"alex@example.com",
		"jordan@example.com",
		"casey@example.com",
		"morgan@example.com",
	],
};

/* ── Feature cards (WHAT VIBELIVE DOES) ─────────────────────────────────── */
export const featuresSection = {
	sectionLabel: `WHAT ${APP_NAME.toUpperCase()} DOES`,
	cards: [
		{
			icon: "signal" as const,
			title:
				"The best night is happening now. Most people miss it, don't be one",
			description: `Right now in ${CITY}, something is peaking. Not tomorrow. Not in last week's reviews. Live signals from real people, show what's packed, what's dead, what's about to pop`,
		},
		{
			icon: "neighborhood" as const,
			title: "30 Minutes in the group chat. Still no plan.",
			description: `Downtown or Uptown? Everyone's typing, nobody's deciding. We cut through the noise with neighborhood intel, know exactly where to go before you leave.`,
		},
		{
			icon: "alert" as const,
			title: "It's not locals. It's people with the right info",
			description: `The ones who go out best arn't guessing. They have real time data, one alert. The right spot. No sponsored venues. No fluff`,
		},
	],
};

/* ── Launch cities ──────────────────────────────────────────────────────── */
export const launchCities = {
	sectionLabel: "LAUNCH CITIES",
	cities: [
		{ name: CITY, isPrimary: true, suffix: "launching first" },
		{ name: "Nashville", isPrimary: false, suffix: 'next' },
		{ name: "Miami", isPrimary: false, suffix: null },
		{ name: "Atlanta", isPrimary: false, suffix: null },
		{ name: "Austin", isPrimary: false, suffix: null },
	],
};

/* ── Referral modal ─────────────────────────────────────────────────────── */
export const referralModal = {
	successHeadline: "You're in.",
	shareTitle: (appName: string) => `Join me on ${appName}`,
	shareText: "Get early access — join the waitlist before everyone else.",
	copyLabel: "Copy link",
	copiedLabel: "Copied!",
	shareLabel: "Share",
	linkUsedLabel: (count: number) =>
		`Your link has been used ${count} ${count === 1 ? "time" : "times"}.`,
	moveUpText: "Each person who joins using your link moves you up 1 spot.",
	shareCta: "Share your link and move up the queue.",
};

/* ── Shared env exports ─────────────────────────────────────────────────── */
export const env = {
	APP_NAME,
	CITY,
	BASE_URL,
	CONTACT_EMAIL,
	COMPANY_NAME,
	COMPANY_ADDRESS,
};
