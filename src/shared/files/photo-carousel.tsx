"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useT } from "@/shared/i18n";
import { Dialog, DialogContent, DialogTitle } from "@/shared/ui/dialog";

const nav = "absolute top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-card/90 shadow disabled:opacity-40";

// Carrusel con scroll-snap (flechas del teclado y gesto táctil funcionan nativos) y botones.
export function PhotoCarousel({ photos, alt }: { photos: string[]; alt: string }) {
  const t = useT();
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState<number>();
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
          <button key={i} type="button" onClick={() => setZoom(i)} className="w-full shrink-0 cursor-zoom-in snap-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={`${alt} ${i + 1}/${photos.length}`} className="aspect-[4/3] w-full object-cover" />
          </button>
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
      <Dialog open={zoom !== undefined} onOpenChange={(open) => !open && setZoom(undefined)}>
        <DialogContent className="max-h-[90dvh] sm:max-w-4xl">
          <DialogTitle className="sr-only">{alt}</DialogTitle>
          {zoom !== undefined && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photos[zoom]} alt={alt} className="max-h-[80dvh] w-full rounded-lg object-contain" />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
