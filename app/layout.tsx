import "./globals.css";

import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import VerseBar from "@/components/VerseBar";

import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import type { ReactNode } from "react";

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

export const metadata = {
  title: "THRIVE",
  description: "Faith-driven growth for business and life",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${cormorant.variable} ${sourceSans.variable} bg-black text-white`}
      >
        <Nav />

        <main>{children}</main>

        {/* Verse directly above footer */}
        <VerseBar />

        <Footer />
      </body>
    </html>
  );
}