"use client";

import { useEffect, useState } from "react";

interface SocialProofProps {
  city: string;
}

export default function SocialProof({ city }: SocialProofProps) {
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
        // Silent — counter just won't show
      }
    };

    fetchCount();
    const interval = setInterval(fetchCount, 30_000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  // Hide when count is 0 or not loaded
  if (count === null || count === 0) return null;

  return (
    <div className="animate-fade-in flex items-center gap-2 justify-center mt-6">
      <span className="inline-block w-2 h-2 rounded-full bg-[var(--success-primary)] animate-pulse" />
      <p className="text-sm font-body text-brand-text-secondary tracking-wide">
        <span className="text-brand-text font-medium tabular-nums">
          {count.toLocaleString()}
        </span>{" "}
        people already on the list in {city}
      </p>
    </div>
  );
}
