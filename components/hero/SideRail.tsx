"use client";

import { Mail, Code, AtSign } from "lucide-react";

interface SideRailProps {
  activeSection: string;
  scrollToId: (id: string) => void;
}

export default function SideRail({ activeSection, scrollToId }: SideRailProps) {
  return (
    <aside className="fluid-glass reveal-glass w-full lg:w-[80px] bg-ink-black text-white flex flex-row lg:flex-col justify-between items-center py-4 px-2 lg:py-8 lg:px-0 border-t-4 lg:border-t-0 lg:border-l-4 border-ink-black sticky bottom-0 lg:top-0 lg:h-screen z-30" aria-label="Social links sidebar">
      <div className="hidden lg:block w-full text-center">
        <div className="w-4 h-4 bg-sharpie-blue border-2 border-white mx-auto transform rotate-45 animate-pulse" />
      </div>

      <div className="flex-grow flex items-center justify-center py-4">
        <button
          onClick={() => scrollToId(activeSection === "home" ? "contact" : "home")}
          className="lg:vertical-text font-ransom uppercase text-2xl sm:text-4xl lg:text-5xl tracking-widest whitespace-nowrap hover:text-sharpie-blue transition-colors cursor-pointer select-none"
        >
          {activeSection === "home"
            ? "LETS_MAKE_NOISE"
            : `IN_${activeSection.replace(/-/g, "_").toUpperCase()}`}
        </button>
      </div>

      <nav className="glass-dock flex lg:flex-col gap-6 text-2xl" aria-label="Social links">
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
