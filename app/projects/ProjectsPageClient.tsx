"use client";

import { useState } from "react";
import ProjectsSection from "@/components/project-card/ProjectsSection";
import GsapProvider from "@/components/animations/GsapProvider";
import Navbar from "@/components/navbar/Navbar";

export default function ProjectsPageClient() {
  const [selectedTag, setSelectedTag] = useState("all");

  const scrollToId = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <GsapProvider>
      <Navbar activeSection="projects" scrollToId={scrollToId} />
      <main className="flex-grow relative z-10">
        <ProjectsSection selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
      </main>
    </GsapProvider>
  );
}
