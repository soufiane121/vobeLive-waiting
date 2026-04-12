"use client";

import { useEffect, useState } from "react";
import { velvetRope } from "../lib/waitlistContent";

interface VelvetRopeProps {
	recentEmails?: string[];
}

/** Generate deterministic initials from email */
function getInitials(email: string): string {
	if (!email || !email.includes("@")) return "?";
	const [local] = email.split("@");
	if (!local) return "?";
	// Get first letter, or first two if we want
	return local.charAt(0).toUpperCase();
}

/** Generate avatar color based on email for consistency */
function getAvatarColor(email: string): string {
	const colors = [
		"#4F7EE8",
		"#6B94F0",
		"#3D6BD4",
		"#aec7e5",
		"#8bacfa",
	];
	let hash = 0;
	for (let i = 0; i < email.length; i++) {
		hash = ((hash << 5) - hash + email.charCodeAt(i)) | 0;
	}
	return colors[Math.abs(hash) % colors.length];
}

export default function VelvetRope({ recentEmails }: VelvetRopeProps) {
	const [count, setCount] = useState(velvetRope.minPeople);
	const [avatars, setAvatars] = useState<{ initial: string; color: string }[]>([]);

	useEffect(() => {
		// Random number between min and max
		const randomCount = Math.floor(Math.random() * (velvetRope.maxPeople - velvetRope.minPeople + 1)) + velvetRope.minPeople;
		setCount(randomCount);

		// Generate avatars from emails or fallback
		const emails = recentEmails?.length
			? recentEmails.slice(0, velvetRope.maxAvatars)
			: velvetRope.fallbackEmails;

		const avatarData = emails.map((email) => ({
			initial: getInitials(email),
			color: getAvatarColor(email),
		}));

		setAvatars(avatarData);
	}, [recentEmails]);

	return (
		<div
			className="flex items-center gap-3 mt-4"
			style={{ animationDelay: "0.3s" }}
		>
			{/* Avatar stack */}
			<div className="flex items-center">
				{avatars.map((avatar, index) => (
					<div
						key={index}
						className="flex items-center justify-center rounded-full text-white font-semibold text-xs"
						style={{
							width: "28px",
							height: "28px",
							backgroundColor: avatar.color,
							border: "2px solid var(--bg-primary)",
							marginLeft: index > 0 ? "-8px" : "0",
							zIndex: avatars.length - index,
							boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
						}}
					>
						{avatar.initial}
					</div>
				))}
			</div>

			{/* Text */}
			<p
				className="text-xs"
				style={{
					color: "rgba(255,255,255,0.5)",
					lineHeight: 1.4,
				}}
			>
				<span style={{ color: "var(--accent-secondary)", fontWeight: 600 }}>
					{count}
				</span>{" "}
				{velvetRope.label(velvetRope.city)}
			</p>
		</div>
	);
}
