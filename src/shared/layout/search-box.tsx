"use client";

import { useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useT } from "@/shared/i18n";
import { isActive, NAV } from "./nav";

// Con `search` en la sección activa filtra en vivo vía ?q=; si no, Enter busca en recomendaciones.
// Remontar con key={pathname} para que el texto se reinicie al cambiar de sección.
export function SearchBox() {
  const t = useT();
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [value, setValue] = useState(params.get("q") ?? "");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const section = NAV.find((i) => i.search && isActive(pathname, i.href));
  const local = section && (pathname === section.href ? section.search : (section.detailSearch ?? section.search));

  function onChange(v: string) {
    setValue(v);
    if (!local) return;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const next = new URLSearchParams(params);
      if (v) next.set("q", v);
      else next.delete("q");
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname);
    }, 300);
  }

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        if (!local && value) router.push(`/recomendaciones?q=${encodeURIComponent(value)}`);
      }}
      className="relative w-full max-w-xl"
    >
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-vet-gray" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t.shell.search[local ?? "default"]}
        aria-label={t.shell.search[local ?? "default"]}
        className="h-10 w-full rounded-full bg-vet-field pl-9 pr-4 text-sm outline-none placeholder:text-vet-gray focus-visible:ring-2 focus-visible:ring-vet-lilac"
      />
    </form>
  );
}
