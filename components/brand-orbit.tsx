"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { LogoMark } from "@/components/logo";
import { TechGlyph } from "@/components/tech-logo-sprite";
import { orbitRings, type TechMark } from "@/lib/tech-stack";

/**
 * Ring geometry, in percent of the orbit's width (cqi). The outer radius plus
 * half a chip (6.5cqi) has to clear 50, or chips ride the frame edge.
 */
const RINGS = [
  { radius: 26, duration: "52s", reverse: false },
  { radius: 39, duration: "78s", reverse: true },
] as const;

/**
 * Deterministic PRNG. Particle placement must match between server and client
 * render, so `Math.random()` is not an option here.
 */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const PARTICLES = (() => {
  const rand = mulberry32(0x7ec41ab2);
  return Array.from({ length: 26 }, () => ({
    left: rand() * 100,
    top: rand() * 100,
    size: 1.5 + rand() * 2.5,
    delay: rand() * 7,
    duration: 5 + rand() * 6,
    purple: rand() > 0.6,
  }));
})();

/** Chip angles are evenly spaced, offset per ring so the two never line up. */
function angleFor(index: number, count: number, offset: number) {
  return (360 / count) * index + offset;
}

function OrbitChip({ mark, angle, radius }: { mark: TechMark; angle: number; radius: number }) {
  return (
    <div
      className="absolute left-1/2 top-1/2 h-0 w-0"
      style={{ transform: `rotate(${angle}deg) translateX(${radius}cqi) rotate(${-angle}deg)` }}
    >
      {/* Counter-rotates against the ring so the mark stays upright. */}
      <div className="orbit-upright">
        <div className="group flex h-[13cqi] min-h-11 w-[13cqi] min-w-11 items-center justify-center rounded-2xl border border-white/[0.12] bg-night/80 backdrop-blur-md transition-[transform,border-color,box-shadow] duration-500 hover:scale-110 hover:border-brand-cyan/40 hover:shadow-glow-cyan">
          <TechGlyph
            mark={mark}
            className="h-[7.5cqi] min-h-5 w-[7.5cqi] min-w-5"
            wordmarkClassName="text-[2.1cqi] leading-none"
          />
        </div>
      </div>
    </div>
  );
}

/** Traces run from the logo out to each chip, pulsing energy outward. */
function CircuitTraces({ count, radius, offset }: { count: number; radius: number; offset: number }) {
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden focusable="false">
      <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.2" strokeDasharray="0.6 1.8" />
      {Array.from({ length: count }, (_, i) => {
        const rad = (angleFor(i, count, offset) * Math.PI) / 180;
        const x = 50 + Math.cos(rad) * radius;
        const y = 50 + Math.sin(rad) * radius;
        return (
          <g key={i}>
            <line
              x1={50 + Math.cos(rad) * 11}
              y1={50 + Math.sin(rad) * 11}
              x2={x}
              y2={y}
              stroke="url(#orbit-trace)"
              strokeWidth="0.35"
              className="circuit-trace"
              style={{ animationDelay: `${i * 0.28}s` }}
            />
            <circle cx={50 + Math.cos(rad) * (radius / 2)} cy={50 + Math.sin(rad) * (radius / 2)} r="0.55" fill="#56e0a0" opacity="0.55" />
          </g>
        );
      })}
    </svg>
  );
}

/**
 * Interactive brand showcase: the Tech Labz mark floating inside two
 * counter-rotating rings of official technology logos, wired together with
 * pulsing circuit traces and reacting to the cursor in 3D.
 *
 * Rendered in DOM/SVG rather than WebGL — the hero already owns a Three.js
 * context on this page, and these are the same crisp brand-colour marks used
 * by the technology marquee.
 */
export function BrandOrbit() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // -1..1 cursor position, springed for weight.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 90, damping: 20, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 90, damping: 20, mass: 0.6 });

  const rotateY = useTransform(sx, [-1, 1], [-11, 11]);
  const rotateX = useTransform(sy, [-1, 1], [9, -9]);
  // Foreground layers travel further than the backdrop — that's the depth cue.
  const logoShiftX = useTransform(sx, [-1, 1], [-18, 18]);
  const logoShiftY = useTransform(sy, [-1, 1], [-14, 14]);
  const dustShiftX = useTransform(sx, [-1, 1], [10, -10]);
  const dustShiftY = useTransform(sy, [-1, 1], [8, -8]);

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width) * 2 - 1);
    py.set(((e.clientY - r.top) / r.height) * 2 - 1);
  }

  function onPointerLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <div className="mx-auto w-full max-w-[34rem]">
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="orbit-root relative aspect-square w-full"
    >
      {/* Shared gradient for every circuit trace. */}
      <svg className="absolute h-0 w-0" aria-hidden focusable="false">
        <defs>
          <linearGradient id="orbit-trace" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#33c6ff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#b13eff" stopOpacity="0.35" />
          </linearGradient>
        </defs>
      </svg>

      <motion.div
        className="absolute inset-0"
        style={{ rotateX, rotateY, transformPerspective: 1100, transformStyle: "preserve-3d" }}
      >
        {/* --- Backdrop: grid, circuit tile, light rays, holographic lines --- */}
        <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] border border-white/[0.07] bg-night/40">
          <div
            className="absolute inset-0 bg-grid opacity-70 motion-safe:[animation:grid-pan_22s_linear_infinite]"
            aria-hidden
          />
          <div className="absolute inset-0 bg-circuit opacity-[0.06]" aria-hidden />

          {/* Slowly sweeping light rays. */}
          <div
            className="absolute -inset-1/4 opacity-60 blur-2xl motion-safe:[animation:halo-spin_64s_linear_infinite]"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0 18%, rgba(51,198,255,0.16) 24%, transparent 32% 56%, rgba(177,62,255,0.16) 63%, transparent 71%)",
            }}
            aria-hidden
          />

          {/* Radial lighting from the centre. */}
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(circle at 50% 48%, rgba(51,198,255,0.14), transparent 62%)" }}
            aria-hidden
          />

          {/* Holographic scan lines. */}
          <div
            className="absolute -inset-y-16 inset-x-0 opacity-[0.14] motion-safe:[animation:scanline-drift_7s_linear_infinite]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(180deg, rgba(51,198,255,0.5) 0 1px, transparent 1px 4px)",
            }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-noise opacity-[0.05] mix-blend-overlay" aria-hidden />
        </div>

        {/* --- Particles (drift behind the rings) --- */}
        <motion.div className="absolute inset-0 overflow-hidden rounded-[2.5rem]" style={{ x: dustShiftX, y: dustShiftY }} aria-hidden>
          {PARTICLES.map((p, i) => (
            <span
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: p.size,
                height: p.size,
                background: p.purple ? "#b13eff" : "#33c6ff",
                boxShadow: `0 0 ${p.size * 3}px ${p.purple ? "#b13eff" : "#33c6ff"}`,
                opacity: 0.35,
                animation: `particle-drift ${p.duration}s ease-in-out ${p.delay}s infinite`,
              }}
            />
          ))}
        </motion.div>

        {/* --- Orbiting rings --- */}
        {RINGS.map((ring, r) => {
          const marks = orbitRings[r];
          const offset = r === 0 ? -90 : -60;
          return (
            <div
              key={r}
              className={`orbit-ring${ring.reverse ? " orbit-ring--reverse" : ""}`}
              style={{ ["--orbit-duration" as string]: ring.duration }}
            >
              <CircuitTraces count={marks.length} radius={ring.radius} offset={offset} />
              {marks.map((mark, i) => (
                <OrbitChip key={mark.id} mark={mark} angle={angleFor(i, marks.length, offset)} radius={ring.radius} />
              ))}
            </div>
          );
        })}

        {/* --- Centre: the brand mark --- */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ x: logoShiftX, y: logoShiftY }}
        >
          <div className="relative flex items-center justify-center">
            {/* Rotating gradient halo — the "slow rotation" reads here rather
                than on the mark itself, which would hang upside-down. */}
            <div
              className="absolute h-[19cqi] w-[19cqi] rounded-full opacity-70 blur-md motion-safe:[animation:halo-spin_26s_linear_infinite]"
              style={{ background: "conic-gradient(#33c6ff, #b13eff, #56e0a0, #33c6ff)" }}
              aria-hidden
            />
            <div className="absolute h-[16cqi] w-[16cqi] rounded-full bg-night" aria-hidden />
            <div className="absolute h-[26cqi] w-[26cqi] rounded-full bg-brand-cyan/20 blur-3xl" aria-hidden />

            <div className="relative animate-float">
              <LogoMark className="h-[13cqi] w-[13cqi] drop-shadow-[0_0_38px_rgba(51,198,255,0.55)]" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>

      {/* Caption sits below the square — inside it, the outer ring's chips
          sweep straight through the plate. */}
      <div className="glass mt-6 rounded-2xl p-4 text-center">
        <p className="font-display text-sm font-semibold text-white">
          Enterprise engineering. <span className="text-gradient">Startup velocity.</span>
        </p>
      </div>
    </div>
  );
}
