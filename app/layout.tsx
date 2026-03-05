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

/* ===== Global metadata ===== */
export const metadata: Metadata = {
  metadataBase: new URL("https://sarthakroutray.vercel.app"),
  title: {
    default: "Sarthak Routray — Full-Stack Engineer",
    template: "%s | Sarthak Routray",
  },
  description:
    "Full-stack engineer building AI-powered systems. Specialising in React, Node.js, Python, and applied ML architecture.",
  keywords: [
    "Sarthak Routray",
    "Full-Stack Developer",
    "AI Engineer",
    "React",
    "Node.js",
    "Python",
    "Machine Learning",
    "Portfolio",
  ],
  authors: [{ name: "Sarthak Routray" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sarthakroutray.vercel.app",
    siteName: "Sarthak Routray Portfolio",
    title: "Sarthak Routray — Full-Stack Engineer",
    description:
      "Full-stack engineer building AI-powered systems with a production-first mindset.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Sarthak Routray Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sarthak Routray — Full-Stack Engineer",
    description:
      "Full-stack engineer building AI-powered systems with a production-first mindset.",
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
      </head>
      <body className="font-body">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
