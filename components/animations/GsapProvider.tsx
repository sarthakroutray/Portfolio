"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ReactNode } from "react";

const PixelBlastBackground = dynamic(() => import("./PixelBlastBackground"), {
  ssr: false,
});

gsap.registerPlugin(ScrollTrigger);

/**
 * Wraps all interactive GSAP animations that run on the whole page:
 * - reveal-glass scroll reveals
 * - floating-glass idle drift
 * - glass-orb parallax
 * - fluid-glass mouse sheen
 * - glass-dock magnification
 * - contact cta pulse
 * - glass-nav blur
 */
export default function GsapProvider({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanupFns: (() => void)[] = [];

    const ctx = gsap.context(() => {
      // Reveal-glass scroll animations
      gsap.utils.toArray<HTMLElement>(".reveal-glass").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 32, scale: prefersReducedMotion ? 1 : 0.985 },
          {
            autoAlpha: 1, y: 0, scale: 1, duration: 0.85, ease: "power2.out",
            scrollTrigger: { trigger: element, start: "top 84%", toggleActions: "play none none none" },
          }
        );
      });

      // Nav blur on scroll
      const nav = root.querySelector(".glass-nav");
      if (nav) {
        gsap.to(nav, {
          "--nav-blur": "20px", "--nav-alpha": 0.62, "--nav-border-alpha": 0.46, ease: "none",
          scrollTrigger: { trigger: root, start: "top top", end: "+=260", scrub: true },
        });
      }

      if (!prefersReducedMotion) {
        // Floating glass idle drift
        gsap.utils.toArray<HTMLElement>(".floating-glass").forEach((panel, index) => {
          gsap.to(panel, {
            y: index % 2 === 0 ? -9 : 9, x: index % 2 === 0 ? 6 : -6,
            rotation: index % 2 === 0 ? -0.8 : 0.8, duration: 4.8 + index * 0.25,
            ease: "sine.inOut", yoyo: true, repeat: -1,
          });
        });

        // Glass orb parallax
        gsap.to(".glass-orb-1", { xPercent: 12, yPercent: -16, ease: "none", scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: true } });
        gsap.to(".glass-orb-2", { xPercent: -9, yPercent: 18, ease: "none", scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: true } });

        // Contact CTA pulse
        gsap.to(".contact-cta", { scale: 1.045, duration: 1.15, ease: "sine.inOut", yoyo: true, repeat: -1 });
        gsap.to(".cta-arrow", { x: 7, duration: 0.85, ease: "sine.inOut", yoyo: true, repeat: -1 });
      }
    }, root);

    // Fluid-glass mouse sheen
    if (!prefersReducedMotion) {
      gsap.utils.toArray<HTMLElement>(".fluid-glass").forEach((card) => {
        const handleMove = (event: PointerEvent) => {
          const rect = card.getBoundingClientRect();
          const x = ((event.clientX - rect.left) / rect.width) * 100;
          const y = ((event.clientY - rect.top) / rect.height) * 100;
          gsap.to(card, { "--sheen-x": `${Math.min(100, Math.max(0, x))}%`, "--sheen-y": `${Math.min(100, Math.max(0, y))}%`, duration: 0.35, ease: "power2.out", overwrite: true });
        };
        const handleLeave = () => {
          gsap.to(card, { "--sheen-x": "50%", "--sheen-y": "50%", duration: 0.45, ease: "power2.out" });
        };
        card.addEventListener("pointermove", handleMove as EventListener);
        card.addEventListener("pointerleave", handleLeave);
        cleanupFns.push(() => { card.removeEventListener("pointermove", handleMove as EventListener); card.removeEventListener("pointerleave", handleLeave); });
      });

      // Glass dock magnification
      gsap.utils.toArray<HTMLElement>(".glass-dock").forEach((dock) => {
        const icons = Array.from(dock.querySelectorAll<HTMLElement>(".dock-icon"));
        if (icons.length === 0) return;
        const influenceRadius = window.innerWidth < 1024 ? 76 : 120;

        const handleMove = (event: PointerEvent) => {
          icons.forEach((icon) => {
            const rect = icon.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distance = Math.hypot(event.clientX - centerX, event.clientY - centerY);
            const ratio = Math.max(0, 1 - distance / influenceRadius);
            gsap.to(icon, { scale: 1 + ratio * 0.65, y: -ratio * 10, duration: 0.2, ease: "power2.out", overwrite: true });
          });
        };
        const handleLeave = () => {
          icons.forEach((icon) => gsap.to(icon, { scale: 1, y: 0, duration: 0.3, ease: "power3.out" }));
        };
        dock.addEventListener("pointermove", handleMove as EventListener);
        dock.addEventListener("pointerleave", handleLeave);
        cleanupFns.push(() => { dock.removeEventListener("pointermove", handleMove as EventListener); dock.removeEventListener("pointerleave", handleLeave); });
      });
    }

    return () => {
      cleanupFns.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="macos-fluid-bg bg-paper-texture font-body text-ink-black dark:text-dark-text min-h-screen flex flex-col overflow-x-hidden selection:bg-sharpie-blue selection:text-white relative z-[1]">
      {/* PixelBlast WebGL background — visible in dark & cyber modes only */}
      <PixelBlastBackground />
      <div className="fluid-aura" aria-hidden="true">
        <div className="glass-orb glass-orb-1" />
        <div className="glass-orb glass-orb-2" />
      </div>
      <div className="noise-overlay" aria-hidden="true" />
      {children}
    </div>
  );
}
