"use client";

import { useState } from "react";
import { useT } from "@/shared/i18n";
import { Dialog, DialogContent, DialogTitle } from "@/shared/ui/dialog";
import { FileThumb } from "./file-thumb";

// Miniatura de 200px que al hacer click abre el archivo completo en un visor (imagen o PDF).
export function FilePreview({ file }: { file: File }) {
  const t = useT();
  const [url, setUrl] = useState<string>();

  function onOpenChange(open: boolean) {
    if (open) return setUrl(URL.createObjectURL(file));
    if (url) URL.revokeObjectURL(url);
    setUrl(undefined);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => onOpenChange(true)}
        aria-label={`${t.files.view}: ${file.name}`}
        className="rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-vet-lilac"
      >
        <FileThumb file={file} className="size-[200px]" />
      </button>
      <Dialog open={!!url} onOpenChange={onOpenChange}>
        <DialogContent className="gap-0 p-2 sm:max-w-5xl">
          <DialogTitle className="sr-only">{file.name}</DialogTitle>
          {url &&
            (file.type === "application/pdf" ? (
              <iframe src={url} title={file.name} className="h-[80dvh] w-full rounded-lg" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={url} alt={file.name} className="max-h-[80dvh] w-full rounded-lg object-contain" />
            ))}
        </DialogContent>
      </Dialog>
    </>
  );
}
