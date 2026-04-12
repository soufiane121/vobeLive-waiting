import { queueCard, env } from "../lib/waitlistContent";

interface QueuePositionCardProps {
  position: number;
  totalCount: number;
}

export default function QueuePositionCard({
  position,
  totalCount,
}: QueuePositionCardProps) {
  const topPercent =
    totalCount > 0
      ? Math.max(1, Math.round((1 - position / totalCount) * 100))
      : 1;

  return (
    <div
      className="w-full flex items-start gap-4 animate-fade-in-up"
      style={{
        background: "var(--surface-accent)",
        border: "0.5px solid var(--accent-border)",
        borderRadius: "12px",
        padding: "16px 20px",
      }}
    >
      {/* Position number — 28px weight 500 */}
      <span
        className="tabular-nums leading-none shrink-0"
        style={{ fontSize: "28px", fontWeight: 500, color: "var(--accent-secondary)" }}
      >
        #{position.toLocaleString()}
      </span>

      {/* Description */}
      <div className="flex-1 min-w-0">
        <p
          style={{ fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.7)" }}
        >
          You&apos;re {queueCard.topPercentLabel(env.CITY).replace("8", String(topPercent))}
        </p>
        <p
          className="mt-0.5 leading-relaxed"
          style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}
        >
          {queueCard.description}
        </p>
      </div>
    </div>
  );
}
