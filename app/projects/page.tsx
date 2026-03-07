import type { Metadata } from "next";
import ProjectsPageClient from "./ProjectsPageClient";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore projects by Sarthak Routray — blood-donation platforms, AI geospatial systems, reinforcement-learning environments, and more.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Sarthak Routray | Projects",
    description:
      "Explore projects by Sarthak Routray — blood-donation platforms, AI geospatial systems, reinforcement-learning environments, and more.",
    url: "https://sarthakroutray.vercel.app/projects",
  },
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
