import React, { useEffect, useState } from "react";

import { navLinks } from "../constants";
import GlassSurface from "./GlassSurface";
import HamburgerMenuOverlay from "./HamburgerMenuOverlay";
const Navbar = () => {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Update active nav based on scroll position
      for (const nav of navLinks) {
        const section = document.getElementById(nav.id);
        if (section) {
          const { offsetTop, offsetHeight } = section;
          // Adjust offset for the floating navbar
          if (scrollTop >= offsetTop - 200 && scrollTop < offsetTop + offsetHeight - 200) {
            setActive(nav.title);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(
        navLinks.find((nav) => nav.id === id)?.title || ""
      );
    }
  };

  return (
    <nav
      className={`fixed top-10 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        scrolled ? "w-[82%] md:w-[70%] lg:w-[58%]" : "w-[88%] md:w-[74%] lg:w-[62%]"
        }`}
    >
      <GlassSurface
        borderRadius={32}
        opacity={scrolled ? 1.9 : 0.85}
        blur={10}
        saturation={1.4}
        backgroundOpacity={0.4}
        mixBlendMode="normal"
        displace={0.6}
        distortionScale={-60}
        redOffset={2}
        greenOffset={2}
        blueOffset={4}
        className={`w-full flex justify-between items-center px-6 py-3 border border-white/10 shadow-xl transition-all duration-300`}
      >
        <button
          className='flex items-center gap-2'
          onClick={() => {
            handleSmoothScroll("home");
            setActive("");
          }}
        >
          <img src="/vite.svg" alt='logo' className='w-8 h-8 object-contain' />
          <p className='text-white text-[16px] font-bold cursor-pointer flex '>
            Sarthak
          </p>
        </button>

        <div className='flex flex-1 justify-end items-center'>
          <HamburgerMenuOverlay
            buttonPosition="inline"
            buttonSize="sm"
            textColor="#ffffff"
            fontSize="xl"
            items={navLinks.map((nav) => ({
              label: nav.title,
              onClick: () => handleSmoothScroll(nav.id),
            }))}
            buttonClassName="bg-transparent hover:bg-white/10"
          />
        </div>
      </GlassSurface>
    </nav>
  );
};

export default Navbar;