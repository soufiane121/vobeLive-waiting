import { navbar } from "../lib/waitlistContent";

export default function NavBar() {
  const accentStart = navbar.logoText.indexOf(navbar.logoAccent);
  const before = navbar.logoText.slice(0, accentStart);
  const accent = navbar.logoAccent;

  return (
    <nav
      className="w-full flex items-center justify-between relative z-20"
      style={{
        padding: "14px 26px",
        borderBottom: "0.5px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Logo — 15px weight 500 */}
      <span className="text-[15px] font-medium text-white tracking-tight">
        {before}
        <span className="text-[var(--accent-secondary)]">{accent}</span>
      </span>

      {/* Coming soon pill */}
      <span
        className="text-[10px] font-normal uppercase tracking-[0.1em] rounded-[20px]"
        style={{
          color: "var(--accent-secondary)",
          background: "var(--accent-bg)",
          border: "0.5px solid var(--accent-border-strong)",
          padding: "4px 10px",
        }}
      >
        {navbar.badgeText}
      </span>
    </nav>
  );
}
