import "./globals.css";
import "./redesign.css";
import "./system.css";

import { Barlow, Inter } from "next/font/google";
import type { ReactNode } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";
import Reveal from "@/components/site/Reveal";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata = {
  metadataBase: new URL("https://www.thriveco.net"),
  title: {
    default: "THRIVE 30A · Brotherhood for Christian businessmen",
    template: "%s · THRIVE 30A",
  },
  description:
    "A ministry and growth ecosystem for Christian businessmen on the 30A coast of Florida. Brotherhood, formation, and kingdom impact.",
  openGraph: {
    title: "THRIVE 30A · Brotherhood for Christian businessmen",
    description:
      "Brotherhood, formation, and kingdom impact for men on Florida's Emerald Coast.",
    url: "https://www.thriveco.net",
    siteName: "THRIVE 30A",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${barlow.variable} ${inter.variable}`}
      >
        <LoadingScreen />
        <SiteNav />
        <Reveal />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
