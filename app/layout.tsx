import type { Metadata } from "next";
import { Courier_Prime, Anton, Permanent_Marker, Inter } from "next/font/google";

import { ThemeProvider } from "@/components/theme-toggle/ThemeProvider";
import "@/styles/globals.css";

/* ===== Optimised fonts via next/font ===== */
const courierPrime = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-courier-prime",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-permanent-marker",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = "https://sarthakroutray.vercel.app";

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sarthak Routray",
    url: siteUrl,
    jobTitle: "Full Stack Developer",
    description:
      "Full Stack Developer specializing in Next.js, React, AI systems and modern web applications.",
    image: `${siteUrl}/og-image.png`,
    sameAs: [
      "https://github.com/sarthakroutray",
      "https://www.linkedin.com/in/sarthak-routray-020583323/",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Sarthak Routray Portfolio",
    url: siteUrl,
  },
];

/* ===== Global metadata ===== */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sarthak Routray | Full Stack Developer",
    template: "Sarthak Routray | %s",
  },
  description:
    "Portfolio of Sarthak Routray - Full Stack Developer specializing in Next.js, React, AI systems, and scalable backend applications.",
  keywords: [
    "Sarthak Routray",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "AI Developer",
    "Web Developer Portfolio",
  ],
  authors: [{ name: "Sarthak Routray" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sarthak Routray | Full Stack Developer",
    description:
      "Portfolio of Sarthak Routray - Full Stack Developer specializing in Next.js, React, AI systems, and scalable backend applications.",
    url: siteUrl,
    siteName: "Sarthak Routray Portfolio",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sarthak Routray | Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sarthak Routray | Full Stack Developer",
    description:
      "Portfolio of Sarthak Routray - Full Stack Developer specializing in Next.js, React, AI systems, and scalable backend applications.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${courierPrime.variable} ${anton.variable} ${permanentMarker.variable} ${inter.variable}`}
    >
      <head>
        {/* Material Symbols for icons used in existing design */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        {/* Rubik Glitch isn't in next/font, load externally */}
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik+Glitch&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-body">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
