function HeroSection({ heroToolkit, scrollToId }) {
  return (
    <section id="home" className="container mx-auto px-4 py-12 sm:py-24 relative z-10">
      <div className="absolute top-20 right-1/4 w-40 h-10 tape z-0 transform rotate-3" />
      <div className="max-w-6xl mx-auto relative">
        <div className="relative bg-paper-gray border-4 border-ink-black p-4 sm:p-12 shadow-cutout transform -rotate-1 mb-20 clip-torn">
          <div className="absolute top-2 left-2 staple transform -rotate-45" />
          <div className="absolute top-2 right-2 staple transform rotate-45" />

          <div className="mb-6 inline-block bg-ink-black text-white px-4 py-2 text-xl font-ransom tracking-widest transform rotate-1 border border-white border-dashed">
            ISSUE #001
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-display uppercase leading-[0.85] sm:leading-[0.85] tracking-tight mb-12 sm:mb-8 text-ink-black mix-blend-multiply relative z-10">
            FULL-STACK
            <br />
            <span className="relative inline-block">
              <span
                className="relative z-10 text-white mix-blend-difference"
                style={{ WebkitTextStroke: "2px black" }}
              >
                ENGINEER
              </span>
              <span className="absolute -bottom-6 right-0 sm:-bottom-2 sm:-right-4 text-xl sm:text-3xl text-sharpie-blue font-marker transform -rotate-12 z-20">
                (AI Systems)
              </span>
            </span>
            <br />BUILDER
          </h1>

          <div className="flex flex-col md:flex-row gap-8 items-start relative">
            <div className="w-full md:w-2/3 bg-white p-6 border-2 border-ink-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] transform rotate-1">
              <p className="text-lg sm:text-xl font-mono leading-relaxed text-ink-black mb-6">
                Full-Stack Engineer building AI-powered systems.
                <span className="font-bold bg-yellow-200 px-1 ml-2">
                  Production-first mindset
                </span>
                focused on backend reliability, model integration, and
                <span className="scribble-box ml-2 px-2 border-2 border-sharpie-blue text-sharpie-blue font-bold">
                  applied ML architecture
                </span>
                .
              </p>

              <p className="font-mono text-sm sm:text-base text-ink-black border-l-4 border-sharpie-blue pl-3 mb-6">
                I build backend services that stay stable under load and wire model inference into APIs teams can deploy and monitor.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <button
                  onClick={() => scrollToId("projects")}
                  className="px-6 py-3 bg-sharpie-blue text-white font-mono font-bold text-lg hover:bg-ink-black transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-ink-black"
                >
                  VIEW_PROJECTS
                </button>
                <button
                  onClick={() => scrollToId("contact")}
                  className="px-6 py-3 bg-white text-ink-black font-mono font-bold text-lg hover:bg-ink-black hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-ink-black"
                >
                  CONTACT_ME
                </button>
                <a
                  href="https://github.com/sarthakroutray"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 bg-ink-black text-white font-mono font-bold text-lg hover:bg-sharpie-blue transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-ink-black"
                >
                  VIEW_GITHUB
                </a>
                <a
                  href="/Sarthak%20Routray%20CV.pdf"
                  download="Sarthak_Routray_CV.pdf"
                  className="px-6 py-3 bg-paper-gray text-ink-black font-mono font-bold text-lg hover:bg-ink-black hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-ink-black"
                >
                  DOWNLOAD_RESUME
                </a>
              </div>
            </div>

            <div className="w-full md:w-1/3 relative mt-8 md:mt-0">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-16 h-8 tape z-20" />
              <div className="border-2 border-ink-black bg-neutral-200 p-4 transform -rotate-2 shadow-cutout">
                <h4 className="font-ransom text-3xl mb-4 text-center border-b-2 border-black pb-2">
                  TOOLKIT
                </h4>
                <ul className="font-mono text-sm space-y-3">
                  {heroToolkit.map((item, index) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-lg">
                        {index === heroToolkit.length - 1 ? "rocket_launch" : "check_box"}
                      </span>
                      <span className={index === 0 ? "font-bold" : ""}>{item}</span>
                      {index === 0 && (
                        <span className="ml-auto text-sharpie-blue font-marker text-xs">Fav!</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
