"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Zap } from "lucide-react";

const themes = [
  { key: "light", label: "Light", Icon: Sun },
  { key: "dark", label: "Dark", Icon: Moon },
  { key: "cyber", label: "Cyber", Icon: Zap },
] as const;

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-10 h-10" aria-hidden />;
  }

  const currentIndex = themes.findIndex((t) => t.key === theme);
  const next = themes[(currentIndex + 1) % themes.length];
  const Current = themes[Math.max(currentIndex, 0)].Icon;

  return (
    <button
      onClick={() => setTheme(next.key)}
      className="relative w-10 h-10 flex items-center justify-center border-2 border-ink-black bg-white dark:bg-dark-surface dark:border-dark-border hover:bg-sharpie-blue hover:text-white transition-colors"
      aria-label={`Switch to ${next.label} theme`}
      title={`Current: ${themes[Math.max(currentIndex, 0)].label}. Click for ${next.label}`}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={theme}
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 90 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Current size={20} />
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
