import { featuresSection } from "../lib/waitlistContent";

const emojiMap: Record<string, string> = {
  signal: "⚡",
  neighborhood: "📍",
  alert: "🔔",
};

export default function FeatureCards() {
  return (
    <section style={{ padding: "32px 0" }}>
      {/* Section eyebrow — 10px per spec */}
      <p
        className="uppercase"
        style={{
          fontSize: "10px",
          letterSpacing: "0.1em",
          color: "var(--text-tertiary)",
          marginBottom: "16px",
        }}
      >
        {featuresSection.sectionLabel}
      </p>

      {/* Rows */}
      <div>
        {featuresSection.cards.map((card, i) => (
          <div
            key={i}
            className="flex items-start"
            style={{
              padding: "16px 0",
              gap: "12px",
              borderBottom:
                i < featuresSection.cards.length - 1
                  ? "0.5px solid rgba(255,255,255,0.05)"
                  : "none",
            }}
          >
            {/* Icon container — 32×32 */}
            <div
              className="flex items-center justify-center shrink-0"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "var(--accent-bg)",
                border: "0.5px solid rgba(167,139,250,0.15)",
                fontSize: "14px",
              }}
            >
              {emojiMap[card.icon]}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p style={{ fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.75)" }}>
                {card.title}
              </p>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.28)", lineHeight: 1.55, marginTop: "2px" }}>
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
