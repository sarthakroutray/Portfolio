"use client";

import { Mail, Code, AtSign } from "lucide-react";

interface SideRailProps {
  activeSection: string;
  scrollToId: (id: string) => void;
}

export default function SideRail({ activeSection, scrollToId }: SideRailProps) {
  return (
    <aside className="fluid-glass reveal-glass w-full lg:w-[80px] bg-ink-black text-white flex flex-row lg:flex-col justify-between items-center gap-3 py-3 px-3 sm:px-4 lg:py-8 lg:px-0 border-t-4 lg:border-t-0 lg:border-l-4 border-ink-black sticky bottom-0 lg:top-0 lg:h-screen z-30" aria-label="Social links sidebar">
      <div className="hidden lg:block w-full text-center">
        <div className="w-4 h-4 bg-sharpie-blue border-2 border-white mx-auto transform rotate-45 animate-pulse" />
      </div>

      <div className="min-w-0 flex-1 flex items-center justify-start sm:justify-center py-1 lg:py-4">
        <button
          onClick={() => scrollToId(activeSection === "home" ? "contact" : "home")}
          className="font-ransom uppercase text-sm sm:text-4xl lg:text-5xl tracking-[0.18em] sm:tracking-widest max-w-full hover:text-sharpie-blue transition-colors cursor-pointer select-none"
        >
          <span className="sm:hidden truncate block">
            {activeSection === "home"
              ? "CONTACT"
              : activeSection.replace(/-/g, " ").toUpperCase()}
          </span>
          <span className="hidden sm:inline lg:vertical-text whitespace-nowrap">
            {activeSection === "home"
              ? "LETS_MAKE_NOISE"
              : `IN_${activeSection.replace(/-/g, "_").toUpperCase()}`}
          </span>
        </button>
      </div>

      <nav className="glass-dock flex shrink-0 lg:flex-col gap-3 sm:gap-6 text-xl sm:text-2xl" aria-label="Social links">
        <a href="mailto:sarthak.routray2006@gmail.com" className="dock-icon cursor-target hover:text-sharpie-blue transition-colors" aria-label="Send email">
          <Mail size={24} />
        </a>
        <a href="https://github.com/sarthakroutray" target="_blank" rel="noreferrer" className="dock-icon cursor-target hover:text-sharpie-blue transition-colors" aria-label="GitHub profile">
          <Code size={24} />
        </a>
        <a href="https://www.linkedin.com/in/sarthak-routray-020583323/" target="_blank" rel="noreferrer" className="dock-icon cursor-target hover:text-sharpie-blue transition-colors" aria-label="LinkedIn profile">
          <AtSign size={24} />
        </a>
      </nav>
    </aside>
  );
}
