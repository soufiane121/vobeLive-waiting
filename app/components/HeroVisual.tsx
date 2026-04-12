"use client";

import { useEffect, useRef, useCallback, useState } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   iPhone mockup with radar animation inside, rotated 30°.
   Contains: simple map background + animated radar sweep + venue blips.
   ═══════════════════════════════════════════════════════════════════════════ */

const SCREEN_PADDING = 10;
const NOTCH_HEIGHT = 24;
const MAX_RADIUS = 100;
const SWEEP_SPEED = 0.008;
const TRAIL_STEPS = 50;
const TRAIL_ARC = 0.5 * Math.PI;
const RING_RATIOS = [0.3, 0.55, 0.8, 1.0];
const BLIP_TRIGGER_WINDOW = 0.15;
const BLIP_DECAY = 0.012;

// Responsive dimensions
const MOBILE_DIMS = { width: 160, height: 320 };
const DESKTOP_DIMS = { width: 240, height: 480 };

interface Blip {
  angle: number;
  dist: number;
  lit: number;
}

function createBlips(): Blip[] {
  const angles = [0.4, 1.1, 1.8, 2.4, 3.0, 3.8, 4.5, 5.2, 5.9, 0.8];
  const dists = [0.4, 0.7, 0.5, 0.85, 0.35, 0.6, 0.9, 0.45, 0.75, 0.55];
  return angles.map((a, i) => ({ angle: a, dist: dists[i], lit: 0 }));
}

export default function HeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sweepRef = useRef(0);
  const blipsRef = useRef(createBlips());
  const frameRef = useRef(0);
  const [dims, setDims] = useState(DESKTOP_DIMS);

  // Handle responsive dimensions
  useEffect(() => {
    const updateDims = () => {
      setDims(window.innerWidth < 768 ? MOBILE_DIMS : DESKTOP_DIMS);
    };
    updateDims();
    window.addEventListener("resize", updateDims);
    return () => window.removeEventListener("resize", updateDims);
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const screenW = dims.width - SCREEN_PADDING * 2;
    const screenH = dims.height - SCREEN_PADDING * 2 - NOTCH_HEIGHT;

    canvas.width = screenW * dpr;
    canvas.height = screenH * dpr;
    canvas.style.width = `${screenW}px`;
    canvas.style.height = `${screenH}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, screenW, screenH);

    // ── Map background ───────────────────────────────────────────────
    // Dark map with subtle grid lines
    ctx.fillStyle = "#0d1117";
    ctx.fillRect(0, 0, screenW, screenH);

    // Grid lines (streets)
    ctx.strokeStyle = "rgba(255,255,255,0.04)";
    ctx.lineWidth = 0.5;
    for (let x = 0; x < screenW; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, screenH);
      ctx.stroke();
    }
    for (let y = 0; y < screenH; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(screenW, y);
      ctx.stroke();
    }

    // Some "blocks" to simulate a map - scale with screen size
    const scale = Math.min(screenW / 256, screenH / 512);
    ctx.fillStyle = "rgba(255,255,255,0.02)";
    ctx.fillRect(20 * scale, 60 * scale, 80 * scale, 50 * scale);
    ctx.fillRect(120 * scale, 40 * scale, 100 * scale, 70 * scale);
    ctx.fillRect(40 * scale, 150 * scale, 60 * scale, 80 * scale);
    ctx.fillRect(140 * scale, 180 * scale, 90 * scale, 60 * scale);
    ctx.fillRect(30 * scale, 280 * scale, 70 * scale, 50 * scale);
    ctx.fillRect(130 * scale, 300 * scale, 80 * scale, 70 * scale);
    ctx.fillRect(50 * scale, 380 * scale, 100 * scale, 60 * scale);
    ctx.fillRect(170 * scale, 400 * scale, 60 * scale, 80 * scale);

    // ── Radar overlay ────────────────────────────────────────────────
    const cx = screenW / 2;
    const cy = screenH / 2;

    // Range rings
    ctx.strokeStyle = "rgba(79,126,232,0.15)";
    ctx.lineWidth = 0.5;
    for (const r of RING_RATIOS) {
      ctx.beginPath();
      ctx.arc(cx, cy, MAX_RADIUS * r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Crosshairs
    ctx.strokeStyle = "rgba(79,126,232,0.10)";
    ctx.setLineDash([3, 5]);
    ctx.beginPath();
    ctx.moveTo(cx - MAX_RADIUS, cy);
    ctx.lineTo(cx + MAX_RADIUS, cy);
    ctx.moveTo(cx, cy - MAX_RADIUS);
    ctx.lineTo(cx, cy + MAX_RADIUS);
    ctx.stroke();
    ctx.setLineDash([]);

    // Sweep trail
    const sweep = sweepRef.current;
    for (let s = 0; s < TRAIL_STEPS; s++) {
      const frac = s / TRAIL_STEPS;
      const a = sweep - frac * TRAIL_ARC;
      const alpha = frac * 0.25;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, MAX_RADIUS, a - 0.025, a + 0.025);
      ctx.closePath();
      ctx.fillStyle = `rgba(79,126,232,${alpha})`;
      ctx.fill();
    }

    // Leading edge
    ctx.strokeStyle = "rgba(79,126,232,0.85)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(sweep) * MAX_RADIUS, cy + Math.sin(sweep) * MAX_RADIUS);
    ctx.stroke();

    // Center dot
    ctx.fillStyle = "rgba(79,126,232,1)";
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fill();

    // Blips
    const blips = blipsRef.current;
    for (const b of blips) {
      const diff = Math.abs(sweep % (Math.PI * 2) - b.angle);
      const wrapped = Math.min(diff, Math.PI * 2 - diff);
      if (wrapped < BLIP_TRIGGER_WINDOW) {
        b.lit = 1.0;
      } else {
        b.lit = Math.max(0, b.lit - BLIP_DECAY);
      }

      if (b.lit > 0) {
        const bx = cx + Math.cos(b.angle) * b.dist * MAX_RADIUS;
        const by = cy + Math.sin(b.angle) * b.dist * MAX_RADIUS;

        // Outer pulse ring
        const ringR = 3 + (1 - b.lit) * 10;
        ctx.strokeStyle = `rgba(79,126,232,${b.lit * 0.5})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(bx, by, ringR, 0, Math.PI * 2);
        ctx.stroke();

        // Core dot
        ctx.fillStyle = `rgba(107,148,240,${b.lit})`;
        ctx.beginPath();
        ctx.arc(bx, by, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Advance sweep
    sweepRef.current += SWEEP_SPEED;
    if (sweepRef.current > Math.PI * 2) sweepRef.current -= Math.PI * 2;

    frameRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    frameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameRef.current);
  }, [draw, dims]);

  return (
		<div
			className="iphone-mockup"
			style={{
				transform: "rotate(10deg)",
				width: dims.width,
				height: dims.height,
			}}
			aria-hidden="true"
		>
			{/* Phone frame */}
			<div
				style={{
					width: "100%",
					height: "100%",
					borderRadius: "44px",
					background: "linear-gradient(145deg, #1a1a1f 0%, #0d0d12 100%)",
					border: "1px solid rgba(255,255,255,0.08)",
					boxShadow: `
            0 25px 50px -12px rgba(0,0,0,0.5),
            0 0 0 1px rgba(255,255,255,0.05),
            inset 0 1px 0 rgba(255,255,255,0.05)
          `,
					padding: SCREEN_PADDING,
					position: "relative",
				}}
			>
				{/* Notch */}
				<div
					style={{
						position: "absolute",
						top: SCREEN_PADDING,
						left: "50%",
						transform: "translateX(-50%)",
						width: "120px",
						height: NOTCH_HEIGHT,
						background: "#000",
						borderRadius: "0 0 16px 16px",
						zIndex: 10,
					}}
				/>

				{/* Screen */}
				<div
					style={{
						width: "100%",
						height: "100%",
						borderRadius: "32px",
						overflow: "hidden",
						background: "#0d1117",
						position: "relative",
					}}
				>
					{/* Canvas with radar */}
					<canvas
						ref={canvasRef}
						style={{
							position: "absolute",
							top: NOTCH_HEIGHT,
							left: 0,
							// transform: "rotate(-30deg)", // Add this
							// transformOrigin: "center center",
						}}
					/>

					{/* Status bar overlay */}
					<div
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							height: NOTCH_HEIGHT + 8,
							background:
								"linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)",
							zIndex: 5,
						}}
					/>

					{/* Bottom home indicator */}
					<div
						style={{
							position: "absolute",
							bottom: 8,
							left: "50%",
							transform: "translateX(-50%)",
							width: 100,
							height: 4,
							background: "rgba(255,255,255,0.2)",
							borderRadius: 2,
						}}
					/>
				</div>
			</div>
		</div>
	);
}
