import "./globals.css";

import {
  Cormorant_Garamond,
  Source_Sans_3,
  Inter,
  DM_Serif_Display,
  Oswald,
  Allura,
} from "next/font/google";
import type { ReactNode } from "react";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-source-sans",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
});

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
  title: "THRIVE 30a — Ministry, Discipleship, Encouragement",
  description:
    "A ministry and growth ecosystem for Christian businessmen on the 30A coast of Florida.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Redesign display fonts referenced by name in app/redesign.css */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Italiana&family=Cormorant:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Pinyon+Script&family=JetBrains+Mono:wght@400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${cormorantGaramond.variable} ${sourceSans.variable} ${inter.variable} ${dmSerif.variable} ${wordmark.variable} ${allura.variable} bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
