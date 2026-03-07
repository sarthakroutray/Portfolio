"use client";

import ResumeSection from "@/components/hero/ResumeSection";
import GsapProvider from "@/components/animations/GsapProvider";
import Navbar from "@/components/navbar/Navbar";

export default function EducationPageClient() {
  const scrollToId = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <GsapProvider>
      <Navbar activeSection="resume" scrollToId={scrollToId} />
      <main className="flex-grow relative z-10 pt-24">
        <h1 className="sr-only">Education - Sarthak Routray</h1>
        <ResumeSection />
      </main>
    </GsapProvider>
  );
}
