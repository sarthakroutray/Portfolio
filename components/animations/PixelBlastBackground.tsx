"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import PixelBlast to avoid SSR issues with WebGL/THREE
const PixelBlast = dynamic(() => import("./PixelBlast"), { ssr: false });

const THEME_CONFIG = {
  dark: {
    variant: "diamond" as const,
    color: "#4d7ddb",
    pixelSize: 4,
    patternScale: 2.5,
    patternDensity: 0.9,
    speed: 0.35,
    edgeFade: 0.2,
    enableRipples: true,
    rippleSpeed: 0.35,
    rippleThickness: 0.13,
    rippleIntensityScale: 1.4,
    pixelSizeJitter: 0.4,
  },
  cyber: {
    variant: "square" as const,
    color: "#00ff9f",
    pixelSize: 4,
    patternScale: 2,
    patternDensity: 1,
    speed: 0.5,
    edgeFade: 0.25,
    enableRipples: true,
    rippleSpeed: 0.4,
    rippleThickness: 0.12,
    rippleIntensityScale: 1.5,
    pixelSizeJitter: 0,
  },
};

export default function PixelBlastBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — only render after mount
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const cfg = resolvedTheme === "dark"
    ? THEME_CONFIG.dark
    : resolvedTheme === "cyber"
    ? THEME_CONFIG.cyber
    : null;

  if (!cfg) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: resolvedTheme === "cyber" ? 0.75 : 0.75 }}
      aria-hidden="true"
    >
      <PixelBlast
        {...cfg}
        liquid={false}
        transparent
        autoPauseOffscreen
      />
    </div>
  );
}
