"use client";

import { useEffect, useRef } from "react";

/**
 * Ambient cursor glow — a soft cyan/purple radial light that trails
 * the pointer. Pure transform updates on rAF; desktop pointers only.
 */
export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on touch devices — no cursor to follow.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const glow = glowRef.current;
    const dot = dotRef.current;
    if (!glow || !dot) return;

    let mouseX = -400;
    let mouseY = -400;
    let glowX = mouseX;
    let glowY = mouseY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };

    const loop = () => {
      // Ease the large glow toward the cursor for a trailing feel.
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      glow.style.transform = `translate(${glowX - 200}px, ${glowY - 200}px)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-[400px] w-[400px] rounded-full opacity-40 mix-blend-screen md:block"
        style={{
          background:
            "radial-gradient(circle, rgba(51,198,255,0.16) 0%, rgba(177,62,255,0.10) 40%, transparent 70%)",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[71] hidden h-2 w-2 rounded-full bg-gradient-brand shadow-glow-cyan md:block"
      />
    </>
  );
}
