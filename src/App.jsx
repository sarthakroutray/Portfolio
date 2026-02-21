import { useEffect, useMemo, useState } from "react";
import emailjs from "@emailjs/browser";
import { experiences, projects, technologies } from "./constants";
import { Analytics } from "@vercel/analytics/react";

const sectionIds = ["home", "projects", "about", "resume", "skills", "engineering-focus", "contact"];

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState("all");
  const [expandedProjects, setExpandedProjects] = useState({});
  const [noteIndex, setNoteIndex] = useState(0);

  const stickyNotes = [
    { text: "Ask me about AI + full-stack collabs.", footer: "build > hype" },
    { text: "Try clicking skills to filter my work.", footer: "interaction enabled" },
    { text: "Open for internships & dev roles.", footer: "status: available" },
  ];

  const heroToolkit = [
    "Python",
    "Machine Learning",
    "LLM Systems",
    "RAG Pipelines",
    "Node.js",
    "React",
  ];

  const skillGroups = [
    {
      title: "Frontend",
      items: ["React", "Tailwind", "TypeScript", "Three.js"],
    },
    {
      title: "Backend",
      items: ["Node.js", "REST APIs", "PostgreSQL", "MongoDB"],
    },
    {
      title: "AI / ML",
      items: ["Python", "Machine Learning", "LLMs", "NLP", "RAG systems"],
    },
    {
      title: "Tools",
      items: ["Git", "Docker"],
    },
  ];

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

  const projectFilterTags = useMemo(() => {
    const tags = new Set();
    projects.forEach((project) => {
      project.tags.forEach((tag) => tags.add(tag.name));
    });
    return ["all", ...Array.from(tags)];
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedTag === "all") {
      return projects;
    }

    const normalizedSelected = normalize(selectedTag);
    return projects.filter((project) =>
      project.tags.some((tag) => {
        const normalizedTag = normalize(tag.name);
        return (
          normalizedTag.includes(normalizedSelected) ||
          normalizedSelected.includes(normalizedTag)
        );
      })
    );
  }, [selectedTag]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: 0.1 }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("All fields are required.");
      return;
    }

    if (!validateEmail(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setError("Email service is not configured yet.");
      return;
    }

    setLoading(true);
    emailjs
      .send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Sarthak Routray",
          from_email: form.email,
          to_email: "sarthak.routray2006@gmail.com",
          message: form.message,
        },
        PUBLIC_KEY
      )
      .then(() => {
        setLoading(false);
        alert("Thank you. I will get back to you as soon as possible.");
        setForm({ name: "", email: "", message: "" });
      })
      .catch(() => {
        setLoading(false);
        setError("Something went wrong. Please try again.");
      });
  };

  const scrollToId = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileMenuOpen(false);
    }
  };

  const toggleProjectExpansion = (projectName) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [projectName]: !prev[projectName],
    }));
  };

  return (
    <div className="bg-dark-paper bg-paper-texture font-body text-ink-black min-h-screen flex flex-col overflow-x-hidden selection:bg-sharpie-blue selection:text-white">
      <div className="noise-overlay" />

      <nav className="sticky top-0 z-40 border-b-4 border-ink-black bg-paper-gray bg-paper-texture">
        <div className="flex justify-between items-stretch h-16 sm:h-20">
          <button
            onClick={() => scrollToId("home")}
            className="flex items-center px-6 sm:px-10 border-r-4 border-ink-black bg-ink-black relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
            <span className="text-paper-gray font-ransom text-3xl sm:text-4xl tracking-widest transform -rotate-2">
              SARTHAK ROUTRAY
            </span>
          </button>

          <div className="hidden md:flex flex-1 items-stretch justify-end">
            <button
              onClick={() => scrollToId("projects")}
              className={`flex items-center px-8 text-xl font-bold border-l-4 border-ink-black transition-colors font-mono relative group ${
                activeSection === "projects"
                  ? "bg-sharpie-blue text-white"
                  : "hover:bg-sharpie-blue hover:text-white"
              }`}
            >
              <span className="z-10 relative">WORK</span>
            </button>
            <button
              onClick={() => scrollToId("about")}
              className={`flex items-center px-8 text-xl font-bold border-l-4 border-ink-black transition-colors font-mono relative group ${
                activeSection === "about"
                  ? "bg-sharpie-blue text-white"
                  : "hover:bg-sharpie-blue hover:text-white"
              }`}
            >
              <span className="z-10 relative">ABOUT</span>
            </button>
            <button
              onClick={() => scrollToId("contact")}
              className={`flex items-center px-8 text-xl font-bold border-l-4 border-ink-black transition-colors font-mono ${
                activeSection === "contact"
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

      <div className="flex flex-col lg:flex-row flex-grow relative">
        <main className="flex-grow w-full lg:w-[calc(100%-80px)]">
          <div className="relative w-full overflow-hidden border-b-4 border-ink-black py-3 bg-paper-gray">
            <div className="whitespace-nowrap animate-marquee flex gap-12 items-center font-bold">
              <span className="text-ink-black text-2xl font-mono uppercase tracking-tighter">
                <span className="bg-black text-white px-2">WARNING:</span> Heavy
                construction ahead /// Breaking patterns ///
              </span>
              <span className="text-sharpie-blue text-2xl font-marker uppercase tracking-widest">
                CODING IS PUNK ROCK
              </span>
              <span className="text-ink-black text-2xl font-mono uppercase tracking-tighter">
                <span className="bg-black text-white px-2">WARNING:</span> Heavy
                construction ahead /// Breaking patterns ///
              </span>
              <span className="text-sharpie-blue text-2xl font-marker uppercase tracking-widest">
                CODING IS PUNK ROCK
              </span>
            </div>
          </div>

          <section id="home" className="container mx-auto px-4 py-12 sm:py-24 relative z-10">
            <div className="absolute top-20 right-1/4 w-40 h-10 tape z-0 transform rotate-3" />
            <div className="max-w-6xl mx-auto relative">
              <div className="relative bg-paper-gray border-4 border-ink-black p-6 sm:p-12 shadow-cutout transform -rotate-1 mb-20 clip-torn">
                <div className="absolute top-2 left-2 staple transform -rotate-45" />
                <div className="absolute top-2 right-2 staple transform rotate-45" />

                <div className="mb-6 inline-block bg-ink-black text-white px-4 py-2 text-xl font-ransom tracking-widest transform rotate-1 border border-white border-dashed">
                  ISSUE #001
                </div>

                <h1 className="text-5xl sm:text-7xl md:text-8xl font-display uppercase leading-[0.85] tracking-tight mb-8 text-ink-black mix-blend-multiply relative z-10">
                  FULL-STACK
                  <br />
                  <span className="relative inline-block">
                    <span
                      className="relative z-10 text-white mix-blend-difference"
                      style={{ WebkitTextStroke: "2px black" }}
                    >
                      ENGINEER
                    </span>
                    <span className="absolute -bottom-2 -right-4 text-2xl sm:text-3xl text-sharpie-blue font-marker transform -rotate-12 z-20">
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

          <div className="w-full border-y-4 border-ink-black py-4 bg-ink-black text-paper-gray font-mono overflow-hidden transform -skew-y-1 origin-left">
            <div className="whitespace-nowrap flex gap-16 animate-marquee">
              <span className="text-2xl font-bold font-ransom tracking-widest">
                SYSTEM_FAILURE /// REBOOTING
              </span>
              <span className="text-2xl font-bold font-mono">compiling_assets...</span>
              <span className="text-2xl font-bold font-ransom tracking-widest">
                SYSTEM_FAILURE /// REBOOTING
              </span>
              <span className="text-2xl font-bold font-mono">compiling_assets...</span>
            </div>
          </div>

          <section id="projects" className="container mx-auto px-6 py-24 bg-dark-paper relative">
            <div className="flex flex-col md:flex-row items-end justify-between mb-8 pb-4 border-b-4 border-dashed border-ink-black gap-4">
              <h2 className="text-7xl sm:text-9xl font-ransom text-ink-black tracking-tighter leading-none mix-blend-overlay opacity-80">
                THE
                <br />
                WORK
              </h2>
              <div className="relative bg-white p-4 border-2 border-ink-black transform rotate-2 shadow-[4px_4px_0px_0px_#0022cc]">
                <span className="absolute -top-3 -right-3 w-8 h-8 bg-sharpie-blue rounded-full" />
                <p className="font-marker text-sharpie-blue text-xl">"Stuff I actually built"</p>
              </div>
            </div>

            <div className="mb-8 flex flex-wrap gap-3 items-center">
              {projectFilterTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 border-2 border-ink-black font-mono text-xs uppercase transition-colors ${
                    selectedTag === tag
                      ? "bg-ink-black text-white"
                      : "bg-paper-gray hover:bg-sharpie-blue hover:text-white"
                  }`}
                >
                  {tag}
                </button>
              ))}
              <span className="font-mono text-sm ml-2">
                showing {filteredProjects.length}/{projects.length}
              </span>
            </div>

            {filteredProjects.length === 0 ? (
              <div className="bg-white border-4 border-ink-black p-8 font-mono text-lg">
                No project matches this filter. Try another tag.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                {filteredProjects.map((project, index) => {
                  const isExpanded = !!expandedProjects[project.name];
                  const shortDescription =
                    project.description.length > 155
                      ? `${project.description.slice(0, 155)}...`
                      : project.description;

                  return (
                    <div
                      key={project.name}
                      className={`relative group ${index % 2 === 1 ? "mt-12 md:mt-0" : ""}`}
                    >
                      <div className="absolute -top-6 -left-6 w-full h-full border-4 border-ink-black bg-transparent z-0" />
                      <div className="absolute -top-8 left-1/4 w-32 h-10 tape z-20 transform -rotate-2" />
                      <article className="relative z-10 bg-paper-gray border-4 border-ink-black p-3 shadow-cutout transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1">
                        <div className="bg-white border-2 border-ink-black p-4 h-full flex flex-col">
                          <div className="flex justify-between items-start mb-4 gap-3">
                            <h3 className="text-3xl font-display uppercase">{project.name}</h3>
                            <span className="text-4xl leading-none font-ransom text-sharpie-blue">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                          </div>

                          <div className="mb-4 border-2 border-dashed border-ink-black bg-paper-gray/70 p-3">
                            <div className="flex items-center justify-between gap-3">
                              <span className="font-mono text-xs uppercase tracking-wide">Repository Project</span>
                              <span className="font-mono text-xs uppercase bg-ink-black text-white px-2 py-1">
                                {project.tags.length} tags
                              </span>
                            </div>
                          </div>

                          <p className="text-ink-black font-mono text-sm leading-tight mb-4">
                            {isExpanded ? project.description : shortDescription}
                          </p>

                          <p className="text-ink-black font-mono text-xs border-l-4 border-sharpie-blue pl-3 mb-4">
                            {project.techHighlights}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-5">
                            {project.tags.map((tag) => (
                              <button
                                key={`${project.name}-${tag.name}`}
                                onClick={() => setSelectedTag(tag.name)}
                                className="text-[11px] px-2 py-1 border border-ink-black font-mono uppercase hover:bg-ink-black hover:text-white"
                              >
                                #{tag.name}
                              </button>
                            ))}
                          </div>

                          <div className="mt-auto pt-5 border-t-2 border-dashed border-ink-black flex justify-between items-center gap-4">
                            <button
                              onClick={() => toggleProjectExpansion(project.name)}
                              className="font-bold font-mono text-xs bg-paper-gray border border-ink-black px-2 py-1 uppercase hover:bg-ink-black hover:text-white"
                            >
                              {isExpanded ? "Less" : "More"}
                            </button>
                            <a
                              href={project.source_code_link}
                              target="_blank"
                              rel="noreferrer"
                              className="text-ink-black hover:text-sharpie-blue font-bold font-mono uppercase border-b-2 border-transparent hover:border-sharpie-blue"
                            >
                              {project.ctaLabel} -&gt;
                            </a>
                          </div>
                        </div>
                      </article>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          <section id="about" className="container mx-auto px-6 py-24">
            <div className="max-w-5xl bg-paper-gray border-4 border-ink-black p-6 sm:p-10 shadow-cutout mx-auto transform rotate-[0.5deg] hover:rotate-0 transition-transform duration-300">
              <p className="font-mono text-sm uppercase tracking-[0.25em] mb-3">Introduction</p>
              <h2 className="font-display text-5xl sm:text-6xl uppercase mb-6">Overview</h2>
              <p className="font-mono text-lg leading-relaxed">
                I am an engineering-focused full-stack developer specializing in React, Node.js,
                TypeScript, and AI/ML system integration. I work mostly on product features where
                frontend UX, backend services, and model outputs need to behave as one system.
                <br />
                I care about API clarity, predictable releases, and architecture choices that hold up
                when products move from demos to real usage.
              </p>
            </div>
          </section>

          <section id="resume" className="container mx-auto px-6 py-24">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-ransom text-6xl sm:text-8xl mb-12">EXPERIENCE</h2>
              <div className="space-y-8">
                {experiences.map((experience) => (
                  <article
                    key={experience.title}
                    className="bg-paper-gray border-4 border-ink-black p-6 shadow-cutout hover:shadow-cutout-hover transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="font-display text-3xl uppercase">{experience.title}</h3>
                        <p className="font-mono font-bold">{experience.company_name}</p>
                      </div>
                      <span className="font-marker text-sharpie-blue text-xl">{experience.date}</span>
                    </div>
                    <ul className="list-disc ml-6 font-mono space-y-2">
                      {experience.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="skills" className="container mx-auto px-6 pb-24">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                <h2 className="font-ransom text-6xl sm:text-8xl">SKILLS</h2>
                <button
                  onClick={() => setSelectedTag("all")}
                  className="px-4 py-2 border-2 border-ink-black bg-white font-mono text-xs uppercase hover:bg-ink-black hover:text-white"
                >
                  Reset Project Filter
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skillGroups.map((group) => (
                  <div key={group.title} className="bg-paper-gray border-4 border-ink-black p-4 shadow-cutout">
                    <h3 className="font-display text-3xl uppercase mb-4">{group.title}</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {group.items.map((item) => (
                        <button
                          key={item}
                          onClick={() => setSelectedTag(item)}
                          className={`bg-white border-2 border-ink-black p-3 text-left font-mono text-xs sm:text-sm font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)] hover:-translate-y-1 hover:-translate-x-1 transition-all ${
                            selectedTag !== "all" && normalize(selectedTag) === normalize(item)
                              ? "bg-sharpie-blue text-white"
                              : ""
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="engineering-focus" className="container mx-auto px-6 pb-24">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-ransom text-6xl sm:text-8xl mb-8">ENGINEERING FOCUS</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Scalable backend architecture",
                  "AI model deployment and inference pipelines",
                  "Automation-driven workflows",
                  "API design and deployment for real product use",
                ].map((focus) => (
                  <div key={focus} className="bg-white border-2 border-ink-black p-5 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)]">
                    <p className="font-mono text-base sm:text-lg font-bold">{focus}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="contact" className="container mx-auto px-6 pb-24">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-paper-gray border-4 border-ink-black p-8 shadow-cutout">
                <p className="font-mono text-sm uppercase tracking-[0.25em] mb-2">Get in touch</p>
                <h3 className="font-display text-5xl uppercase mb-8">Contact</h3>
                <p className="font-mono text-sm border-l-4 border-sharpie-blue pl-3 mb-6">
                  Open to AI/ML internships and backend engineering roles.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="bg-white py-3 px-4 border-2 border-ink-black font-mono outline-none focus:border-sharpie-blue"
                  />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    className="bg-white py-3 px-4 border-2 border-ink-black font-mono outline-none focus:border-sharpie-blue"
                  />
                  <textarea
                    rows={6}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Your message"
                    className="bg-white py-3 px-4 border-2 border-ink-black font-mono outline-none focus:border-sharpie-blue resize-none"
                  />

                  {error && <div className="text-red-700 font-mono text-sm">{error}</div>}

                  <button
                    type="submit"
                    className="w-fit px-6 py-3 bg-sharpie-blue text-white border-2 border-ink-black font-mono font-bold hover:bg-ink-black transition-colors"
                  >
                    {loading ? "Sending..." : "Send"}
                  </button>
                </form>
              </div>

              <div className="bg-white border-4 border-ink-black p-8 shadow-cutout flex flex-col justify-between">
                <div>
                  <h4 className="font-ransom text-4xl mb-6">CONNECT</h4>
                  <p className="font-mono mb-6">
                    I am open to internship roles where I can own backend and AI workflow implementation and ship features used by real users.
                  </p>
                  <div className="space-y-4 font-mono">
                    <a
                      href="https://github.com/sarthakroutray"
                      target="_blank"
                      rel="noreferrer"
                      className="block hover:text-sharpie-blue"
                    >
                      GitHub: @sarthakroutray
                    </a>
                    <a
                      href="https://www.linkedin.com/in/sarthak-routray-020583323/"
                      target="_blank"
                      rel="noreferrer"
                      className="block hover:text-sharpie-blue"
                    >
                      LinkedIn: Sarthak Routray
                    </a>
                    <a href="mailto:sarthak.routray2006@gmail.com" className="block hover:text-sharpie-blue">
                      Email: sarthak.routray2006@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

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
      </div>

      <div className="fixed bottom-24 right-6 lg:bottom-12 lg:right-32 z-40 group">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-6 tape z-50" />
        <div className="bg-yellow-300 w-44 h-44 p-4 shadow-[5px_5px_10px_rgba(0,0,0,0.5)] transform rotate-3 group-hover:rotate-0 transition-transform duration-300 flex flex-col justify-between border border-ink-black">
          <p className="font-marker text-sm text-sharpie-blue leading-snug">{stickyNotes[noteIndex].text}</p>
          <div className="text-right">
            <span className="font-mono text-[10px] text-ink-black border-t border-black pt-1 block">
              {stickyNotes[noteIndex].footer}
            </span>
            <button
              onClick={() => setNoteIndex((prev) => (prev + 1) % stickyNotes.length)}
              className="mt-2 px-2 py-1 bg-white border border-ink-black font-mono text-[10px] uppercase hover:bg-ink-black hover:text-white"
            >
              Next Note
            </button>
          </div>
        </div>
      </div>

      <Analytics />
    </div>
  );
}

export default App;
