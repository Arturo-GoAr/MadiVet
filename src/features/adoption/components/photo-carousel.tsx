"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useT } from "@/shared/i18n";

const nav = "absolute top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow disabled:opacity-40";

// Carrusel con scroll-snap (flechas del teclado y gesto táctil funcionan nativos) y botones.
export function PhotoCarousel({ photos, alt }: { photos: string[]; alt: string }) {
  const t = useT();
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const go = (dir: number) => track.current?.scrollBy({ left: dir * track.current.clientWidth, behavior: "smooth" });

  return (
    <div className="relative">
      <div
        ref={track}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label={alt}
        onScroll={(e) => setIndex(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
        className="flex snap-x snap-mandatory overflow-x-auto rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-vet-lilac [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
      >
        {photos.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={i} src={src} alt={`${alt} ${i + 1}/${photos.length}`} className="aspect-[4/3] w-full shrink-0 snap-center object-cover" />
        ))}
      </div>
      {photos.length > 1 && (
        <>
          <button type="button" aria-label={t.adoption.prevPhoto} disabled={index === 0} onClick={() => go(-1)} className={`${nav} left-2`}>
            <ChevronLeft className="size-5" />
          </button>
          <button type="button" aria-label={t.adoption.nextPhoto} disabled={index === photos.length - 1} onClick={() => go(1)} className={`${nav} right-2`}>
            <ChevronRight className="size-5" />
          </button>
          <p className="absolute bottom-2 right-2 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white" aria-hidden>
            {index + 1} / {photos.length}
          </p>
        </>
      )}
    </div>
  );
}
