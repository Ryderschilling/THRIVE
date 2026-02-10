"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

export default function RetreatGallery(props: {
  images: string[];
  altPrefix?: string;
}) {
  const images = useMemo(() => props.images ?? [], [props.images]);
  const [active, setActive] = useState(0);

  if (!images.length) return null;

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
        <div className="relative aspect-[16/9]">
          <Image
            key={images[active]}
            src={images[active]}
            alt={`${props.altPrefix ?? "Retreat"} image ${active + 1}`}
            fill
            priority
            className="object-cover object-center transition-opacity duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />
        </div>
      </div>

      <div className="flex justify-center gap-3">
        {images.map((src, idx) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(idx)}
            className={[
              "relative h-16 w-24 overflow-hidden rounded-lg border transition",
              idx === active
                ? "border-white/35"
                : "border-white/10 hover:border-white/20",
            ].join(" ")}
            aria-label={`View photo ${idx + 1}`}
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover object-center"
            />
          </button>
        ))}
      </div>
    </div>
  );
}