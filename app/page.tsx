"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Analytics } from "@vercel/analytics/react";

import GsapProvider from "@/components/animations/GsapProvider";
import Navbar from "@/components/navbar/Navbar";
import TopMarquee from "@/components/hero/TopMarquee";
import HeroSection from "@/components/hero/HeroSection";
import SystemMarquee from "@/components/hero/SystemMarquee";
import ProjectsSection from "@/components/project-card/ProjectsSection";
import AboutSection from "@/components/hero/AboutSection";
import ResumeSection from "@/components/hero/ResumeSection";
import SkillsSection from "@/components/hero/SkillsSection";
import EngineeringFocusSection from "@/components/hero/EngineeringFocusSection";
import ContactSection from "@/components/hero/ContactSection";
import SideRail from "@/components/hero/SideRail";
import StickyNote from "@/components/hero/StickyNote";

// Dynamic import for heavy cursor component — only loaded on desktop
const TargetCursor = dynamic(
  () => import("@/components/animations/TargetCursor"),
  { ssr: false }
);

const sectionIds = [
  "home",
  "projects",
  "about",
  "resume",
  "skills",
  "engineering-focus",
  "contact",
];

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedTag, setSelectedTag] = useState("all");

  // Intersection observer for active section highlighting
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
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToId = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <GsapProvider>
      <TargetCursor
        targetSelector="a, button, input, textarea, select, [role='button'], .cursor-target"
        spinDuration={2}
        hideDefaultCursor
        parallaxOn
        hoverDuration={0.2}
      />

      <Navbar activeSection={activeSection} scrollToId={scrollToId} />

      <div className="flex flex-col lg:flex-row flex-grow relative z-10">
        <main className="flex-grow w-full lg:w-[calc(100%-80px)]">
          <h1 className="sr-only">Sarthak Routray - Full Stack Developer</h1>
          <TopMarquee />
          <HeroSection scrollToId={scrollToId} />
          <p className="sr-only">
            Sarthak Routray is a full stack developer specializing in Next.js, React,
            AI systems, and scalable backend architectures. This portfolio showcases
            projects, technical skills, and education.
          </p>
          <SystemMarquee />
          <ProjectsSection selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
          <AboutSection />
          <ResumeSection />
          <SkillsSection selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
          <EngineeringFocusSection />
          <ContactSection />
          <p className="sr-only">
            The Sarthak Routray portfolio highlights production-focused engineering work,
            modern web application development, and AI-backed systems built by Sarthak Routray.
          </p>
        </main>
        <SideRail activeSection={activeSection} scrollToId={scrollToId} />
      </div>

      <StickyNote />
      <Analytics />
    </GsapProvider>
  );
}
