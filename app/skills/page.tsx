import type { Metadata } from "next";
import SkillsPageClient from "./SkillsPageClient";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Technical skills of Sarthak Routray — React, Node.js, TypeScript, Python, Machine Learning, Docker, and more.",
  openGraph: {
    title: "Skills | Sarthak Routray",
    description:
      "Technical skills of Sarthak Routray — React, Node.js, TypeScript, Python, Machine Learning, Docker, and more.",
  },
};

export default function SkillsPage() {
  return <SkillsPageClient />;
}
