"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useT } from "@/shared/i18n";
import { useOpenModal } from "@/shared/modal";
import { AdoptionDetailsDialog } from "../components/adoption-details-dialog";
import { ADOPTABLE, type AdoptablePet } from "../mocks";

export function AdoptionView() {
  const t = useT();
  const openModal = useOpenModal();
  const q = (useSearchParams().get("q") ?? "").toLowerCase();
  const [selected, setSelected] = useState<AdoptablePet | null>(null);
  const pets = ADOPTABLE.filter((p) => `${p.name} ${p.breed} ${p.description}`.toLowerCase().includes(q));

  return (
    <div className="grid gap-4">
      <button
        type="button"
        onClick={() => openModal("adoptionRequest")}
        className="ml-auto rounded-full bg-vet-teal px-4 py-2 text-sm text-white hover:bg-vet-teal/90"
      >
        {t.screens.adoptionRequest}
      </button>
      {pets.length === 0 ? (
        <p className="rounded-xl bg-white p-6 text-center text-vet-gray shadow-sm">{t.adoption.empty}</p>
      ) : (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-4">
          {pets.map((p) => (
            <li key={p.id} className="overflow-hidden rounded-xl bg-white shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.photos[0]} alt={p.name} className="aspect-[4/3] w-full object-cover" />
              <div className="p-4">
                <p className="text-lg">{p.name}</p>
                <p className="text-sm text-vet-gray">
                  {t.adoption.age}: {p.age}
                </p>
                <button
                  type="button"
                  onClick={() => setSelected(p)}
                  className="mt-3 w-full rounded bg-vet-field px-3 py-2 text-vet-gray transition-colors hover:bg-vet-lilac/40 hover:text-black"
                >
                  {t.adoption.viewDetails}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <AdoptionDetailsDialog pet={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
