import type { Metadata } from "next";
import SkillsPageClient from "./SkillsPageClient";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Technical skills of Sarthak Routray — React, Node.js, TypeScript, Python, Machine Learning, Docker, and more.",
  alternates: {
    canonical: "/skills",
  },
  openGraph: {
    title: "Sarthak Routray | Skills",
    description:
      "Technical skills of Sarthak Routray — React, Node.js, TypeScript, Python, Machine Learning, Docker, and more.",
    url: "https://sarthakroutray.vercel.app/skills",
  },
};

export default function SkillsPage() {
  return <SkillsPageClient />;
}
