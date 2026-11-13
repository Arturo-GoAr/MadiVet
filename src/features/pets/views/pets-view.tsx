"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Plus } from "lucide-react";
import { useT } from "@/shared/i18n";
import { PETS } from "../mocks";

export function PetsView() {
  const t = useT();
  const q = (useSearchParams().get("q") ?? "").toLowerCase();
  const pets = PETS.filter((p) => p.name.toLowerCase().includes(q));

  return (
    <div className="grid gap-4">
      <Link
        href="/mascotas/nueva"
        className="ml-auto flex w-fit items-center gap-1.5 rounded-full bg-vet-teal px-4 py-2 text-sm text-white hover:bg-vet-teal/90"
      >
        <Plus className="size-4" />
        {t.screens.newPet}
      </Link>
      {pets.length === 0 ? (
        <p className="rounded-xl bg-card p-6 text-center text-vet-gray shadow-sm">{t.pets.empty}</p>
      ) : (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-4">
          {pets.map((p) => (
            <li key={p.id} className="overflow-hidden rounded-xl bg-card shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.photos.at(-1) ?? "/images/adoption/placeholder-1.svg"} alt={p.name} className="aspect-[4/3] w-full object-cover" />
              <div className="p-4">
                <p className="text-lg">{p.name}</p>
                <p className="text-sm text-vet-gray">
                  {t.appointments[p.species]} · {p.ageYears} {t.pets.years}
                </p>
                <Link href={`/mascotas/${p.id}`} className="mt-3 block w-full text-center rounded bg-vet-field px-3 py-2 text-vet-gray transition-colors hover:bg-vet-lilac/40 hover:text-foreground">
                                    {t.adoption.viewDetails}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
