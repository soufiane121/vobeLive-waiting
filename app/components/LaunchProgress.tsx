"use client";

import { useEffect, useState } from "react";
import { launchProgress, env } from "../lib/waitlistContent";

const GOAL = 2500;

export default function LaunchProgress() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchCount = async () => {
      try {
        const res = await fetch("/api/count");
        if (!res.ok) return;
        const data = await res.json();
        if (mounted && typeof data.count === "number") {
          setCount(data.count);
        }
      } catch {
        // Silent
      }
    };

    fetchCount();
    const interval = setInterval(fetchCount, 30_000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  if (count === null) return null;

  const percent = Math.min(100, Math.round((count / GOAL) * 100));

  return (
    <div className="w-full animate-fade-in">
      {/* Labels — 11px per spec */}
      <div className="flex items-center justify-between mb-2">
        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)" }}>
          {launchProgress.goalLabel(env.CITY)}
        </span>
        <span className="tabular-nums" style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)" }}>
          {percent}% — {333 + count.toLocaleString()} {launchProgress.spotsUnit}
        </span>
      </div>

      {/* Progress bar — 5px track, end dot */}
      <div className="relative w-full">
        <div
          className="w-full overflow-hidden"
          style={{ height: "5px", borderRadius: "3px", background: "rgba(255,255,255,0.07)" }}
        >
          <div
            className="h-full transition-all duration-700 ease-out"
            style={{ width: `${percent}%`, borderRadius: "3px", background: "var(--accent-primary)" }}
          />
        </div>
        {/* End dot */}
        <div
          className="absolute top-1/2 -translate-y-1/2"
          style={{
            left: `${percent}%`,
            width: "9px",
            height: "9px",
            borderRadius: "50%",
            background: "var(--accent-secondary)",
            border: "2px solid var(--bg-primary)",
            marginLeft: "-4.5px",
          }}
        />
      </div>
    </div>
  );
}
