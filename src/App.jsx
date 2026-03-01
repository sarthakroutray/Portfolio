import { useEffect, useMemo, useState } from "react";
import emailjs from "@emailjs/browser";
import { experiences, projects } from "./constants";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar";
import TopMarquee from "./components/TopMarquee";
import HeroSection from "./components/HeroSection";
import SystemMarquee from "./components/SystemMarquee";
import ProjectsSection from "./components/ProjectsSection";
import AboutSection from "./components/AboutSection";
import ResumeSection from "./components/ResumeSection";
import SkillsSection from "./components/SkillsSection";
import EngineeringFocusSection from "./components/EngineeringFocusSection";
import ContactSection from "./components/ContactSection";
import SideRail from "./components/SideRail";
import StickyNote from "./components/StickyNote";
import TargetCursor from "./components/TargetCursor";

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
  const [selectedFocus, setSelectedFocus] = useState("");

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
      <TargetCursor
        targetSelector="a, button, input, textarea, select, [role='button'], .cursor-target"
        spinDuration={2}
        hideDefaultCursor
        parallaxOn
        hoverDuration={0.2}
      />

      <div className="noise-overlay" />

      <Navbar
        activeSection={activeSection}
        scrollToId={scrollToId}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <div className="flex flex-col lg:flex-row flex-grow relative">
        <main className="flex-grow w-full lg:w-[calc(100%-80px)]">
          <TopMarquee />
          <HeroSection heroToolkit={heroToolkit} scrollToId={scrollToId} />
          <SystemMarquee />
          <ProjectsSection
            projects={projects}
            filteredProjects={filteredProjects}
            projectFilterTags={projectFilterTags}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
            expandedProjects={expandedProjects}
            toggleProjectExpansion={toggleProjectExpansion}
          />
          <AboutSection />
          <ResumeSection experiences={experiences} />
          <SkillsSection
            skillGroups={skillGroups}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
            normalize={normalize}
          />
          <EngineeringFocusSection
            selectedFocus={selectedFocus}
            setSelectedFocus={setSelectedFocus}
            normalize={normalize}
          />
          <ContactSection
            form={form}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            error={error}
            loading={loading}
          />
        </main>

        <SideRail activeSection={activeSection} scrollToId={scrollToId} />
      </div>

      <StickyNote stickyNotes={stickyNotes} noteIndex={noteIndex} setNoteIndex={setNoteIndex} />

      <Analytics />
    </div>
  );
}

export default App;
