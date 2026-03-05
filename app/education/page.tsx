import type { Metadata } from "next";
import EducationPageClient from "./EducationPageClient";

export const metadata: Metadata = {
  title: "Education",
  description:
    "Education and experience of Sarthak Routray — SRM University, internships, and professional experience timeline.",
  openGraph: {
    title: "Education | Sarthak Routray",
    description:
      "Education and experience of Sarthak Routray — SRM University, internships, and professional experience timeline.",
  },
};

export default function EducationPage() {
  return <EducationPageClient />;
}
