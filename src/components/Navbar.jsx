import React, { useEffect, useState } from "react";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
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
    setToggle(false);
  };

  return (
    <nav
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${scrolled ? "w-[90%] md:w-[80%] lg:w-[70%]" : "w-[95%] md:w-[85%] lg:w-[75%]"
        }`}
    >
      <div className={`flex justify-between items-center px-6 py-3 rounded-full border border-white/10 bg-primary/70 backdrop-blur-md shadow-xl transition-all duration-300 ${scrolled ? "bg-primary/90" : ""}`}>
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

        <ul className='list-none hidden sm:flex flex-row gap-2'>
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${active === nav.title
                  ? "text-primary bg-white font-bold"
                  : "text-secondary hover:text-white hover:bg-white/10"
                } px-4 py-2 rounded-full text-[14px] cursor-pointer transition-all duration-300`}
              onClick={() => handleSmoothScroll(nav.id)}
            >
              {nav.title}
            </li>
          ))}
        </ul>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className='w-[24px] h-[24px] object-contain cursor-pointer'
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${!toggle ? "hidden" : "flex"
              } p-6 black-gradient absolute top-16 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl border border-white/10`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${active === nav.title ? "text-white" : "text-secondary"
                    } hover:text-white transition-colors`}
                  onClick={() => handleSmoothScroll(nav.id)}
                >
                  {nav.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;