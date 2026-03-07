import type { Metadata } from "next";
import EducationPageClient from "./EducationPageClient";

export const metadata: Metadata = {
  title: "Education",
  description:
    "Education and experience of Sarthak Routray — SRM University, internships, and professional experience timeline.",
  alternates: {
    canonical: "/education",
  },
  openGraph: {
    title: "Sarthak Routray | Education",
    description:
      "Education and experience of Sarthak Routray — SRM University, internships, and professional experience timeline.",
    url: "https://sarthakroutray.vercel.app/education",
  },
};

export default function EducationPage() {
  return <EducationPageClient />;
}
