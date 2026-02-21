function SideRail({ activeSection, scrollToId }) {
  return (
    <aside className="w-full lg:w-[80px] bg-ink-black text-white flex flex-row lg:flex-col justify-between items-center py-4 px-2 lg:py-8 lg:px-0 border-t-4 lg:border-t-0 lg:border-l-4 border-ink-black sticky bottom-0 lg:top-0 lg:h-screen z-30">
      <div className="hidden lg:block w-full text-center">
        <div className="w-4 h-4 bg-sharpie-blue border-2 border-white mx-auto transform rotate-45 animate-pulse" />
      </div>

      <div className="flex-grow flex items-center justify-center py-4">
        <button
          onClick={() => scrollToId(activeSection === "home" ? "contact" : "home")}
          className="vertical-text font-ransom uppercase text-4xl sm:text-5xl tracking-widest whitespace-nowrap hover:text-sharpie-blue transition-colors cursor-pointer select-none"
        >
          {activeSection === "home" ? "LETS_MAKE_NOISE" : `IN_${activeSection.replace(/-/g, "_").toUpperCase()}`}
        </button>
      </div>

      <div className="flex lg:flex-col gap-6 text-2xl">
        <a href="mailto:sarthak.routray2006@gmail.com" className="hover:text-sharpie-blue transition-colors">
          <span className="material-symbols-outlined">mail</span>
        </a>
        <a
          href="https://github.com/sarthakroutray"
          target="_blank"
          rel="noreferrer"
          className="hover:text-sharpie-blue transition-colors"
        >
          <span className="material-symbols-outlined">code</span>
        </a>
        <a
          href="https://www.linkedin.com/in/sarthak-routray-020583323/"
          target="_blank"
          rel="noreferrer"
          className="hover:text-sharpie-blue transition-colors"
        >
          <span className="material-symbols-outlined">alternate_email</span>
        </a>
      </div>
    </aside>
  );
}

export default SideRail;
