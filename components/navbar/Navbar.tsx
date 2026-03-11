"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle/ThemeToggle";

interface NavbarProps {
  activeSection: string;
  scrollToId: (id: string) => void;
}

export default function Navbar({ activeSection, scrollToId }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (id: string) => {
    scrollToId(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="glass-nav sticky top-0 z-40 border-b-4 border-ink-black bg-paper-gray bg-paper-texture" role="navigation" aria-label="Main navigation">
        <div className="flex justify-between items-stretch h-14 sm:h-20 min-w-0">
          <button
            onClick={() => handleNav("home")}
            className="flex min-w-0 flex-1 items-center px-3 sm:px-10 border-r-4 border-ink-black bg-ink-black relative overflow-hidden group md:flex-none"
            aria-label="Go to home"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
            <span className="text-paper-gray font-brand text-base sm:text-4xl tracking-[0.18em] sm:tracking-widest transform -rotate-2 leading-none truncate">
              <span className="sm:hidden">SARTHAK</span>
              <span className="hidden sm:inline">SARTHAK ROUTRAY</span>
            </span>
          </button>

          <div className="hidden md:flex flex-1 items-stretch justify-end">
            {[
              { id: "projects", label: "WORK" },
              { id: "about", label: "ABOUT" },
              { id: "contact", label: "CONTACT" },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => handleNav(id)}
                className={`flex items-center px-8 text-xl font-bold border-l-4 border-ink-black transition-colors font-mono relative group ${
                  activeSection === id
                    ? "bg-sharpie-blue text-white"
                    : "hover:bg-sharpie-blue hover:text-white"
                }`}
              >
                <span className="z-10 relative">{label}</span>
              </button>
            ))}

            {/* Theme toggle in nav */}
            <div className="flex items-center px-4 border-l-4 border-ink-black">
              <ThemeToggle />
            </div>
          </div>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden flex shrink-0 items-center px-4 sm:px-6 border-l-4 border-ink-black hover:bg-ink-black hover:text-white cursor-pointer bg-sharpie-blue text-white"
            aria-label="Open menu"
          >
            <Menu className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-ink-black/90 backdrop-blur-sm md:hidden flex flex-col items-center justify-center gap-5 px-6 text-center" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <button className="absolute top-6 right-6 text-white" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
            <X className="h-10 w-10" aria-hidden="true" />
          </button>
          {["home", "projects", "about", "resume", "skills", "contact"].map((id) => (
            <button key={id} onClick={() => handleNav(id)} className="text-2xl sm:text-3xl font-brand text-paper-gray break-words">
              {id.toUpperCase()}
            </button>
          ))}
          <div className="mt-4">
            <ThemeToggle />
          </div>
        </div>
      )}
    </>
  );
}
