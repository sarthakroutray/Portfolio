function Navbar({ activeSection, scrollToId, mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <>
      <nav className="sticky top-0 z-40 border-b-4 border-ink-black bg-paper-gray bg-paper-texture">
        <div className="flex justify-between items-stretch h-16 sm:h-20">
          <button
            onClick={() => scrollToId("home")}
            className="flex items-center px-4 sm:px-10 border-r-4 border-ink-black bg-ink-black relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
            <span className="text-paper-gray font-ransom text-2xl sm:text-4xl tracking-widest transform -rotate-2">
              SARTHAK ROUTRAY
            </span>
          </button>

          <div className="hidden md:flex flex-1 items-stretch justify-end">
            <button
              onClick={() => scrollToId("projects")}
              className={`flex items-center px-8 text-xl font-bold border-l-4 border-ink-black transition-colors font-mono relative group ${activeSection === "projects"
                  ? "bg-sharpie-blue text-white"
                  : "hover:bg-sharpie-blue hover:text-white"
                }`}
            >
              <span className="z-10 relative">WORK</span>
            </button>
            <button
              onClick={() => scrollToId("about")}
              className={`flex items-center px-8 text-xl font-bold border-l-4 border-ink-black transition-colors font-mono relative group ${activeSection === "about"
                  ? "bg-sharpie-blue text-white"
                  : "hover:bg-sharpie-blue hover:text-white"
                }`}
            >
              <span className="z-10 relative">ABOUT</span>
            </button>
            <button
              onClick={() => scrollToId("contact")}
              className={`flex items-center px-8 text-xl font-bold border-l-4 border-ink-black transition-colors font-mono ${activeSection === "contact"
                  ? "bg-ink-black text-white"
                  : "hover:bg-ink-black hover:text-white"
                }`}
            >
              CONTACT
            </button>
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

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-ink-black/90 backdrop-blur-sm md:hidden flex flex-col items-center justify-center gap-6">
          <button
            className="absolute top-6 right-6 text-white"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <span className="material-symbols-outlined text-4xl">close</span>
          </button>

          <button onClick={() => scrollToId("home")} className="text-3xl font-ransom text-paper-gray">HOME</button>
          <button onClick={() => scrollToId("projects")} className="text-3xl font-ransom text-paper-gray">WORK</button>
          <button onClick={() => scrollToId("about")} className="text-3xl font-ransom text-paper-gray">ABOUT</button>
          <button onClick={() => scrollToId("resume")} className="text-3xl font-ransom text-paper-gray">EXPERIENCE</button>
          <button onClick={() => scrollToId("skills")} className="text-3xl font-ransom text-paper-gray">SKILLS</button>
          <button onClick={() => scrollToId("contact")} className="text-3xl font-ransom text-paper-gray">CONTACT</button>
        </div>
      )}
    </>
  );
}

export default Navbar;
