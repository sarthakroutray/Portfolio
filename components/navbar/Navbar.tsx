"use client";

import { useState } from "react";
import Link from "next/link";
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
        <div className="flex justify-between items-stretch h-16 sm:h-20">
          <button
            onClick={() => handleNav("home")}
            className="flex items-center px-4 sm:px-10 border-r-4 border-ink-black bg-ink-black relative overflow-hidden group"
            aria-label="Go to home"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
            <span className="text-paper-gray font-ransom text-2xl sm:text-4xl tracking-widest transform -rotate-2">
              SARTHAK ROUTRAY
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
            className="md:hidden flex items-center px-6 border-l-4 border-ink-black hover:bg-ink-black hover:text-white cursor-pointer bg-sharpie-blue text-white"
            aria-label="Open menu"
          >
            <span className="material-symbols-outlined text-3xl">menu</span>
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-ink-black/90 backdrop-blur-sm md:hidden flex flex-col items-center justify-center gap-6" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <button className="absolute top-6 right-6 text-white" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
            <span className="material-symbols-outlined text-4xl">close</span>
          </button>
          {["home", "projects", "about", "resume", "skills", "contact"].map((id) => (
            <button key={id} onClick={() => handleNav(id)} className="text-3xl font-ransom text-paper-gray">
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
