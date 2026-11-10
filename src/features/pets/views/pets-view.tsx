"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Cat, Dog, Plus } from "lucide-react";
import { useT } from "@/shared/i18n";
import { PETS } from "../mocks";

export function PetsView() {
  const t = useT();
  const q = (useSearchParams().get("q") ?? "").toLowerCase();
  const pets = PETS.filter((p) => p.name.toLowerCase().includes(q));

  return (
    <>
      <Link
        href="/mascotas/nueva"
        className="mb-4 ml-auto flex w-fit items-center gap-1.5 rounded-full bg-vet-teal px-4 py-2 text-sm text-white hover:bg-vet-teal/90"
      >
        <Plus className="size-4" />
        {t.screens.newPet}
      </Link>
      {pets.length === 0 ? (
        <p className="rounded-xl bg-white p-6 text-center text-vet-gray shadow-sm">{t.pets.empty}</p>
      ) : (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-4">
      {pets.map((p) => {
        const Icon = p.species === "dog" ? Dog : Cat;
        return (
          <li key={p.id}>
            <Link href={`/mascotas/${p.id}`} className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm transition-colors hover:bg-vet-lilac/30">
              <span className="grid size-14 place-items-center overflow-hidden rounded-full bg-vet-surface text-vet-gray">
                {p.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.photo} alt="" className="size-full object-cover" />
                ) : (
                  <Icon className="size-7" aria-hidden />
                )}
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
      )}
    </>
  );
}
