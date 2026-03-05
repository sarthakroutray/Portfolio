import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Detect low-end device for Three.js performance scaling.
 */
export function getDeviceCapability(): "high" | "medium" | "low" {
  if (typeof window === "undefined") return "medium";

  const width = window.innerWidth;
  const memory = (navigator as unknown as { deviceMemory?: number })
    .deviceMemory;

  // Mobile or very small screen
  if (width < 768) return "low";

  // Low memory device
  if (memory !== undefined && memory <= 4) return "low";

  // Medium screens or limited memory
  if (width < 1280 || (memory !== undefined && memory <= 8)) return "medium";

  return "high";
}

/**
 * Check if WebGL is supported
 */
export function isWebGLSupported(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl2") || canvas.getContext("webgl")
    );
  } catch {
    return false;
  }
}
