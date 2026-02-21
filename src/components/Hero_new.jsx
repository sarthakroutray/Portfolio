import React from "react";

const Hero = () => {
  const handleScroll = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleProjectsClick = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleContactClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="flex-grow flex items-center justify-center relative z-10 px-6 pt-24 pb-12">
      <div className="max-w-4xl w-full mx-auto text-center">
        <div className="flex flex-col items-center">
          {/* Portfolio Badge */}
          <div className="inline-block px-4 py-1 border border-primary text-primary font-mono text-xs uppercase tracking-[0.3em] mb-8 bg-black/50 backdrop-blur-sm">
            Portfolio 2024
          </div>

          {/* Main Heading */}
          <h1 className="font-display font-black text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tighter mb-8 mix-blend-screen">
            <span className="block text-white">HI, I'M</span>
            <span className="text-primary block">SARTHAK</span>
          </h1>

          {/* Description */}
          <p className="font-mono text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed mb-12 backdrop-blur-sm bg-black/20 p-2 rounded-lg">
            I develop robust{" "}
            <span className="text-white font-bold">full-stack</span> web
            applications. A lifelong learner exploring the intersection of
            design and <span className="text-primary font-bold">AIML</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 w-full max-w-xs mx-auto">
            <button
              onClick={handleProjectsClick}
              className="inline-flex items-center justify-center px-8 py-5 bg-primary text-black font-mono font-bold uppercase tracking-wider shadow-brutalist hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all border-2 border-primary"
            >
              View Projects
              <span className="material-symbols-outlined ml-2">
                arrow_forward
              </span>
            </button>
            <button
              onClick={handleContactClick}
              className="inline-flex items-center justify-center px-8 py-5 bg-black/80 text-white font-mono font-bold uppercase tracking-wider border-2 border-white hover:bg-white hover:text-black transition-colors backdrop-blur-md"
            >
              Contact Me
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none">
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] mb-3 text-gray-500">
          Explore
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent"></div>
      </div>

      {/* Decorative Elements - Bottom Left */}
      <div className="absolute bottom-8 left-8 hidden md:block z-10 pointer-events-none">
        <div className="grid grid-cols-2 gap-1.5">
          <div className="w-2 h-2 bg-white"></div>
          <div className="w-2 h-2 bg-primary"></div>
          <div className="w-2 h-2 bg-white/20"></div>
          <div className="w-2 h-2 bg-white/20"></div>
        </div>
      </div>

      {/* Decorative Elements - Bottom Right */}
      <div className="absolute bottom-8 right-8 hidden md:block z-10 pointer-events-none">
        <div className="font-mono text-[10px] text-right text-gray-500 leading-tight">
          <p>LOCATION: 28.6139° N</p>
          <p>STATUS: OPEN TO WORK</p>
        </div>
      </div>

      {/* Terminal Button - Top Right */}
      <div className="absolute top-24 right-6 z-40 hidden md:block">
        <button className="w-10 h-10 border border-white/10 rounded-none flex items-center justify-center hover:bg-primary hover:text-black transition-colors bg-black/50 backdrop-blur">
          <span className="material-symbols-outlined text-sm">terminal</span>
        </button>
      </div>
    </main>
  );
};

export default Hero;
