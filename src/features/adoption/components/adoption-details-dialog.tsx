"use client";

import { useT } from "@/shared/i18n";
import { useOpenModal } from "@/shared/modal";
import { Dialog, DialogContent, DialogTitle } from "@/shared/ui/dialog";
import type { AdoptablePet } from "../mocks";
import { PhotoCarousel } from "./photo-carousel";

export function AdoptionDetailsDialog({ pet, onClose }: { pet: AdoptablePet | null; onClose: () => void }) {
  const t = useT();
  const openModal = useOpenModal();
  const a = t.adoption;
  const yesNo = (v: boolean) => (v ? a.yes : a.no);
  const rows = pet && [
    [t.appointments.species, t.appointments[pet.species]],
    [a.breed, pet.breed],
    [t.appointments.sex, t.appointments[pet.sex]],
    [a.age, pet.age],
    [a.size, a.sizes[pet.size]],
    [a.vaccinated, yesNo(pet.vaccinated)],
    [a.sterilized, yesNo(pet.sterilized)],
  ];

  return (
    <Dialog open={!!pet} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90dvh] gap-6 overflow-y-auto sm:max-w-3xl md:grid-cols-2">
        {pet && rows && (
          <>
            <PhotoCarousel photos={pet.photos} alt={pet.name} />
            <div className="grid content-start gap-4">
              <DialogTitle className="pr-8 text-2xl">{pet.name}</DialogTitle>
              <dl className="grid grid-cols-2 gap-3">
                {rows.map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-xs uppercase text-vet-gray">{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              <p>{pet.description}</p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  openModal("adoptionRequest", { pet: pet.id });
                }}
                className="rounded-full bg-vet-teal px-4 py-2 text-white hover:bg-vet-teal/90"
              >
                {t.screens.adoptionRequest}
              </button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
