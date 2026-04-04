import "./globals.css";

import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import VerseBar from "@/components/VerseBar";

import {
  Cormorant_Garamond,
  Source_Sans_3,
  Inter,
  DM_Serif_Display,
  Oswald,
  Allura,
} from "next/font/google";
import type { ReactNode } from "react";

// Existing fonts
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-source-sans",
});

// Collage system fonts
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
});

// HERO fonts (reference match)
const wordmark = Oswald({
  subsets: ["latin"],
  weight: ["300"],
  variable: "--font-wordmark",
});

const allura = Allura({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
});

export const metadata = {
  title: "THRIVE",
  description: "Faith-driven growth for business and life",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${cormorant.variable} ${sourceSans.variable} ${inter.variable} ${dmSerif.variable} ${wordmark.variable} ${allura.variable} bg-black text-white`}
      >
        <Nav />
        <main>{children}</main>
        <VerseBar />
        <Footer />
      </body>
    </html>
  );
}