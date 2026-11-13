"use client";

import { useSearchParams } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { useT } from "@/shared/i18n";
import { TIPS } from "../mocks";

// Acordeón con <details>: teclado, lector de pantalla y estado abierto vienen nativos.
export function RecommendationsView() {
  const t = useT();
  const q = (useSearchParams().get("q") ?? "").toLowerCase();
  const tips = TIPS.filter((x) => `${x.title} ${x.body}`.toLowerCase().includes(q));

  if (tips.length === 0) return <p className="rounded-xl bg-card p-6 text-center text-vet-gray shadow-sm">{t.tips.empty}</p>;

  return (
    <ul className="grid gap-3 rounded-xl bg-card p-4 shadow-sm">
      {tips.map((tip) => (
        <li key={tip.id}>
          <details className="group rounded-xl bg-vet-teal/20 shadow-sm">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl p-5 text-lg transition-colors hover:bg-vet-teal/10 [&::-webkit-details-marker]:hidden">
              {tip.title}
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-card">
                <ChevronRight className="size-5 transition-transform group-open:rotate-90" aria-hidden />
              </span>
            </summary>
            <p className="px-5 pb-5">{tip.body}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}
