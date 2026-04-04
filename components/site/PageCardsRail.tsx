"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PAGE_CARDS = [
  {
    title: "THRIVE",
    href: "/thrive",
    image: "/images/page-cards/thrive.jpg",
  },
  {
    title: "Community",
    href: "/community",
    image: "/images/page-cards/community.jpg",
  },
  {
    title: "Retreats",
    href: "/retreats",
    image: "/images/page-cards/retreats.jpg",
  },
  {
    title: "Coaching",
    href: "/coaching",
    image: "/images/page-cards/coaching.jpg",
  },
  {
    title: "Stay Connected",
    href: "/stay-connected",
    image: "/images/page-cards/stay-connected.jpg",
  },
];

export default function PageCardsRail() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".page-rail-card");
        const images = gsap.utils.toArray<HTMLElement>(".page-rail-image");
        const labels = gsap.utils.toArray<HTMLElement>(".page-rail-label");

        const getDistance = () =>
          Math.max(0, track.scrollWidth - section.clientWidth);

        const railTween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getDistance() + window.innerWidth * 0.25}`,
            pin: true,
            scrub: 1.15,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { scale: 0.92, y: 28 },
            {
              scale: 1,
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: railTween,
                start: "left center+=12%",
                end: "center center",
                scrub: 1,
              },
            }
          );

          gsap.to(card, {
            scale: 0.95,
            y: 16,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: railTween,
              start: "center center",
              end: "right center-=12%",
              scrub: 1,
            },
          });
        });

        images.forEach((image) => {
          const card = image.closest(".page-rail-card");
          if (!card) return;

          gsap.fromTo(
            image,
            { scale: 1.14, xPercent: -6 },
            {
              scale: 1.04,
              xPercent: 6,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: railTween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        });

        labels.forEach((label) => {
          const card = label.closest(".page-rail-card");
          if (!card) return;

          gsap.fromTo(
            label,
            { y: 26, opacity: 0.45 },
            {
              y: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: railTween,
                start: "left center+=18%",
                end: "center center",
                scrub: 1,
              },
            }
          );
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#060606] py-20 md:py-24 lg:py-0"
    >
      {/* mobile heading */}
      <div className="mx-auto mb-8 max-w-7xl px-6 lg:hidden">
        <p className="text-[11px] uppercase tracking-[0.28em] text-white/55">
          Explore
        </p>
        <h2 className="mt-3 max-w-xl text-3xl font-medium tracking-[-0.03em] text-white md:text-5xl">
          Move through each part of THRIVE.
        </h2>
      </div>

      {/* fixed editorial copy on desktop */}
      <div className="pointer-events-none absolute left-0 top-0 z-20 hidden h-full w-[30rem] items-center bg-gradient-to-r from-[#060606] via-[#060606]/98 to-transparent lg:flex">
        <div className="px-10">
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/55">
            Explore
          </p>
          <h2 className="mt-3 max-w-sm text-5xl font-medium leading-[0.95] tracking-[-0.04em] text-white">
            Move through each part of THRIVE.
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-6 text-white/60">
            Each card is a direct path into a main section of the site.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:overflow-visible">
        <div
          ref={trackRef}
          className="flex w-max gap-5 px-6 pb-2 pr-[12vw] lg:gap-8 lg:px-10 lg:pl-[32rem] lg:pr-[18vw] lg:py-[18vh]"
        >
          {PAGE_CARDS.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="page-rail-card group relative h-[60svh] w-[80vw] max-w-[420px] flex-shrink-0 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] shadow-[0_24px_80px_rgba(0,0,0,0.35)] will-change-transform lg:h-[68vh] lg:w-[38vw] lg:max-w-[560px]"
            >
              <div className="absolute inset-0">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 1024px) 80vw, 560px"
                  className="page-rail-image object-cover"
                  priority={card.title === "THRIVE"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/22 to-black/10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_38%)]" />
              </div>

              <div className="page-rail-label absolute bottom-0 left-0 z-10 p-6 md:p-7">
                <h3 className="text-3xl font-medium tracking-[-0.03em] text-white md:text-4xl">
                  {card.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}