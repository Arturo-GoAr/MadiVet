"use client";

import { useEffect, useRef, useState } from "react";
import { FileText } from "lucide-react";
import { cn } from "@/shared/lib/utils";

const THUMB_PX = 400; // 2× de la miniatura más grande (200px) para pantallas retina

// Miniatura de imagen (object URL) o de la 1.ª página de un PDF (pdfjs); otro tipo = icono.
// shortcut: solo recibe File locales, aceptar también URL cuando haya backend de archivos.
export function FileThumb({ file, className }: { file: File; className?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const [pdfFailed, setPdfFailed] = useState(false);
  const isImage = file.type.startsWith("image/");
  const isPdf = file.type === "application/pdf";

  useEffect(() => {
    if (!isImage || !img.current) return;
    const url = URL.createObjectURL(file);
    img.current.src = url;
    return () => URL.revokeObjectURL(url);
  }, [file, isImage]);

  useEffect(() => {
    if (!isPdf) return;
    let cancelled = false;
    (async () => {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
      const task = pdfjs.getDocument({ data: await file.arrayBuffer() });
      const page = await (await task.promise).getPage(1);
      const viewport = page.getViewport({ scale: THUMB_PX / page.getViewport({ scale: 1 }).width });
      const c = canvas.current;
      if (c && !cancelled) {
        c.width = viewport.width;
        c.height = viewport.height;
        await page.render({ canvas: c, viewport }).promise;
      }
      await task.destroy();
    })().catch(() => !cancelled && setPdfFailed(true));
    return () => {
      cancelled = true;
    };
  }, [file, isPdf]);

  return (
    <div title={file.name} className={cn("grid size-24 place-items-center overflow-hidden rounded-lg bg-vet-field", className)}>
      {isImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img ref={img} alt={file.name} className="size-full object-cover" />
      ) : isPdf && !pdfFailed ? (
        <canvas ref={canvas} aria-label={file.name} className="size-full object-cover object-top" />
      ) : (
        <FileText className="size-8 text-vet-gray" aria-label={file.name} />
      )}
    </div>
  );
}
