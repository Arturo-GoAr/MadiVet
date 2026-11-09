"use client";

import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { useT } from "@/shared/i18n";

export const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Arrastrar y soltar (sin click propio): el botón de adjuntar llama a `open`.
export function useFileDrop(onFiles: (files: File[]) => void) {
  const t = useT();
  return useDropzone({
    accept: { "image/*": [], "application/pdf": [".pdf"] },
    maxSize: MAX_FILE_SIZE,
    noClick: true,
    noKeyboard: true,
    onDrop: (accepted) => accepted.length && onFiles(accepted),
    onDropRejected: () => toast.error(t.files.rejected),
  });
}
