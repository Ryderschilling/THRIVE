import "./globals.css";

import { Barlow, Inter } from "next/font/google";
import type { ReactNode } from "react";

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
  title: "THRIVE 30a — Ministry, Discipleship, Encouragement",
  description:
    "A ministry and growth ecosystem for Christian businessmen on the 30A coast of Florida.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${barlow.variable} ${inter.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
