import "./globals.css";
import "./redesign.css";

import {
  Playfair_Display,
  Source_Sans_3,
  Inter,
  Oswald,
} from "next/font/google";
import type { ReactNode } from "react";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  style: ["normal", "italic"],
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

const wordmark = Oswald({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-wordmark",
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
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${playfairDisplay.variable} ${sourceSans.variable} ${inter.variable} ${wordmark.variable} bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
