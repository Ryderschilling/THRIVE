"use client";

import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import VerseBar from "@/components/VerseBar";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const launchMode = process.env.NEXT_PUBLIC_LAUNCH_MODE === "retreat";

  return (
    <>
      {!launchMode && <Nav />}
      <main>{children}</main>

      {/* Always keep the verse */}
      <VerseBar />

      {!launchMode && <Footer />}
    </>
  );
}