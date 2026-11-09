"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Cat, Dog } from "lucide-react";
import { useT } from "@/shared/i18n";
import { PETS } from "../mocks";

export function PetsView() {
  const t = useT();
  const q = (useSearchParams().get("q") ?? "").toLowerCase();
  const pets = PETS.filter((p) => p.name.toLowerCase().includes(q));

  if (pets.length === 0) return <p className="rounded-xl bg-white p-6 text-center text-vet-gray shadow-sm">{t.pets.empty}</p>;

  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-4">
      {pets.map((p) => {
        const Icon = p.species === "dog" ? Dog : Cat;
        return (
          <li key={p.id}>
            <Link href={`/mascotas/${p.id}`} className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm transition-colors hover:bg-vet-lilac/30">
              <span className="grid size-14 place-items-center rounded-full bg-vet-surface text-vet-gray">
                <Icon className="size-7" aria-hidden />
              </span>
              <span>
                <span className="block text-lg">{p.name}</span>
                <span className="block text-sm text-vet-gray">
                  {t.appointments[p.species]} · {p.ageYears} {t.pets.years}
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
