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
	headlineWhite: "Know the vibe\nbefore you go.",
	headlineAccent: "Know where the <span>FUN<span> actuallyis.",
	headlineAccentPrefix: "Know where the ",
	headlineAccentHighlight: "FUN",
	headlineAccentColor: "#aec7e5",
	headlineAccentSuffix: " actually is.",
	// subheadline: `Some people always end up in the right place on a Friday night.
	// 	It's not luck. They have better information than you.
	// 	Now you will too.`,
	subheadline:
		`Cheat code for real-time signals for your city's best nights out, if it's not the vibe, you'll know. Early access is limited, so secure your spot before we fill up in ${CITY}`,
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
		`No app download. No credit card. ${city} gets it first. Everyone else waits`,
};

/* ── Velvet Rope (social proof under button) ──────────────────────────── */
export const velvetRope = {
	minPeople: 1,
	maxPeople: 15,
	maxAvatars: 4,
	city: CITY,
	label: (city: string) =>
		`people joined the ${city} list in the last hour - spots are going fast`,
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
			description: `Right now in ${CITY} something is peaking.
					Not last week's reviews. Not tomorrow's forecast.
					What's packed tonight. What's about to hit.
					What's already dying. Real people. Right now.`,
		},
		{
			icon: "neighborhood" as const,
			title: "30 Minutes in the group chat. Still no plan.",
			description: `Downtown or Uptown? Everyone's typing, nobody's deciding.
					Know exactly where your group should be
					before anyone opens the chat.`,
		},
		{
			icon: "alert" as const,
			title: "It's not locals. It's people with the right info",
			description: `The ones who always know aren't from here.
					They just have better information.
					One alert. The right place. No guessing.
					No sponsored results. No noise.`,
		},
	],
};

/* ── Launch cities ──────────────────────────────────────────────────────── */
export const launchCities = {
	sectionLabel: "WHERE WE'RE LAUNCHING",
	cities: [
		{ name: CITY, isPrimary: true, suffix: "launching first" },
		{ name: "Atlanta", isPrimary: false, suffix: "Next" },
		{ name: "NYC", isPrimary: false, suffix: null },
		{ name: "Miami", isPrimary: false, suffix: null },
		{ name: "Chicago", isPrimary: false, suffix: null },
		{ name: "Nashville", isPrimary: false, suffix: null },
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
	shareCta: "Help your friends and share",
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
