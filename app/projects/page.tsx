import type { Metadata } from "next";
import ProjectsPageClient from "./ProjectsPageClient";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore projects by Sarthak Routray — blood-donation platforms, AI geospatial systems, reinforcement-learning environments, and more.",
  openGraph: {
    title: "Projects | Sarthak Routray",
    description:
      "Explore projects by Sarthak Routray — blood-donation platforms, AI geospatial systems, reinforcement-learning environments, and more.",
  },
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
