import React, { useState } from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSmoothScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4 md:px-12 md:py-6 mix-blend-difference text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <button
          onClick={() => handleSmoothScroll("home")}
          className="flex items-center space-x-2 group"
        >
          <div className="w-8 h-8 bg-primary text-black flex items-center justify-center font-bold text-lg rounded-sm group-hover:bg-white transition-colors">
            S
          </div>
          <span className="font-display font-bold text-xl tracking-tighter">
            SARTHAK
          </span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 font-mono text-sm uppercase tracking-widest">
          <button
            onClick={() => handleSmoothScroll("projects")}
            className="hover:text-primary transition-colors"
          >
            Work
          </button>
          <button
            onClick={() => handleSmoothScroll("about")}
            className="hover:text-primary transition-colors"
          >
            About
          </button>
          <button
            onClick={() => handleSmoothScroll("contact")}
            className="hover:text-primary transition-colors"
          >
            Contact
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="material-symbols-outlined text-3xl">menu</span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/95 backdrop-blur-lg z-50 flex flex-col items-center justify-center">
          <button
            className="absolute top-6 right-6"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>
          
          <div className="flex flex-col items-center space-y-8 font-mono text-lg uppercase tracking-widest">
            <button
              onClick={() => handleSmoothScroll("projects")}
              className="hover:text-primary transition-colors"
            >
              Work
            </button>
            <button
              onClick={() => handleSmoothScroll("about")}
              className="hover:text-primary transition-colors"
            >
              About
            </button>
            <button
              onClick={() => handleSmoothScroll("contact")}
              className="hover:text-primary transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
