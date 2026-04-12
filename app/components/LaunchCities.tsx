import { launchCities } from "../lib/waitlistContent";

export default function LaunchCities() {
  return (
    <section style={{ padding: "32px 0" }}>
      {/* Section eyebrow */}
      <p
        className="uppercase"
        style={{
          fontSize: "10px",
          letterSpacing: "0.1em",
          color: "var(--text-tertiary)",
          marginBottom: "14px",
        }}
      >
        {launchCities.sectionLabel}
      </p>

      {/* City pills — flex-wrap */}
      <div className="flex flex-wrap" style={{ gap: "8px" }}>
        {launchCities.cities.map((city, i) => (
          <span
            key={i}
            className="inline-flex items-center"
            style={{
              fontSize: "12px",
              borderRadius: "20px",
              padding: "5px 12px",
              gap: "6px",
              ...(city.isPrimary
                ? {
                    background: "var(--accent-bg)",
                    border: "0.5px solid var(--accent-border-strong)",
                    color: "var(--accent-secondary)",
                  }
                : {
                    background: "rgba(255,255,255,0.03)",
                    border: "0.5px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.25)",
                  }),
            }}
          >
            {city.isPrimary && (
              <span
                className="live-pulse inline-block shrink-0"
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "var(--accent-secondary)",
                }}
              />
            )}
            {city.name}
            {city.suffix && (
              <span style={{ opacity: 0.7, fontSize: "11px" }}>
                — {city.suffix}
              </span>
            )}
          </span>
        ))}
      </div>
    </section>
  );
}
