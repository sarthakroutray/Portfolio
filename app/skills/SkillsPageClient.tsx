"use client";

import { useState } from "react";
import SkillsSection from "@/components/hero/SkillsSection";
import GsapProvider from "@/components/animations/GsapProvider";
import Navbar from "@/components/navbar/Navbar";

export default function SkillsPageClient() {
  const [selectedTag, setSelectedTag] = useState("all");

  const scrollToId = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <GsapProvider>
      <Navbar activeSection="skills" scrollToId={scrollToId} />
      <main className="flex-grow relative z-10 pt-24">
        <h1 className="sr-only">Technical Skills - Sarthak Routray</h1>
        <SkillsSection selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
      </main>
    </GsapProvider>
  );
}
