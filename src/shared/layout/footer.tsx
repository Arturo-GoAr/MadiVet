"use client";

import { useT } from "@/shared/i18n";
import { Instagram, Facebook } from "./topbar";
import { SOCIAL } from "./nav";

export function Footer() {
  const t = useT();
  return (
    <footer className="flex shrink-0 items-center justify-between gap-2 border-t border-black/10 bg-vet-surface px-4 py-2 text-xs text-vet-gray md:px-6 md:text-sm">
      <p>© {new Date().getFullYear()} {t.shell.rights}</p>
      <div className="flex items-center gap-4">
        <a href={SOCIAL.instagram} aria-label={t.shell.instagram}><Instagram /></a>
        <a href={SOCIAL.facebook} aria-label={t.shell.facebook}><Facebook /></a>
      </div>
    </footer>
  );
}
