"use client";

import Link from "next/link";
import { useState } from "react";
import { notFound } from "next/navigation";
import { ArrowLeft, ImagePlus } from "lucide-react";
import { format, parseISO } from "date-fns";
import { useT } from "@/shared/i18n";
import { PhotoCarousel } from "@/shared/files";
// TODO: una feature no importa de otra; mover citas y cartilla a shared/
import { VaccineCard } from "@/features/kpis";
import { APPOINTMENTS } from "@/features/appointments";
import { PETS } from "../mocks";

export function PetDetailView({ id }: { id: string }) {
  const t = useT();
  // shortcut: fotos nuevas solo en memoria (se pierden al salir), subir a la API cuando exista
  const [added, setAdded] = useState<string[]>([]);
  const pet = PETS.find((p) => p.id === id);
  if (!pet) notFound();
  const photos = [...pet.photos, ...added];
  const appts = APPOINTMENTS.filter((a) => a.pet === pet.name);

  return (
    <div className="grid gap-4">
      <Link href="/mascotas" className="flex w-fit items-center gap-1.5 text-sm text-vet-gray hover:text-foreground">
        <ArrowLeft className="size-4" />
        {t.screens.pets}
      </Link>
      <div className="grid items-start gap-4 lg:grid-cols-2">
        <div className="grid gap-4">
          <section className="rounded-xl bg-card p-5 shadow-sm">
            <h1 className="text-2xl">{pet.name}</h1>
            <p className="mt-1 text-vet-gray">
              {t.appointments[pet.species]} · {t.appointments[pet.sex]} · {pet.ageYears} {t.pets.years}
            </p>
          </section>
          <section className="rounded-xl bg-card p-5 shadow-sm">
            <h2 className="mb-2 text-2xl uppercase">{t.screens.appointments}</h2>
            {appts.length === 0 ? (
              <p className="text-vet-gray">{t.pets.noAppointments}</p>
            ) : (
              <ul className="grid gap-1">
                {appts.map((a) => (
                  <li key={a.id} className="flex justify-between gap-2">
                    <span>{a.subject}</span>
                    <span className="text-vet-gray">{format(parseISO(a.date), "P")}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
          <VaccineCard fixed={pet} />
        </div>
        <section className="grid gap-3 rounded-xl bg-card p-5 shadow-sm">
          <PhotoCarousel photos={photos} alt={pet.name} />
          <label className="flex w-fit cursor-pointer items-center gap-1.5 rounded-full bg-vet-teal px-4 py-2 text-sm text-white hover:bg-vet-teal/90">
            <ImagePlus className="size-4" />
            {t.pets.addPhotos}
            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={(e) => {
                setAdded((a) => [...a, ...Array.from(e.target.files ?? [], (f) => URL.createObjectURL(f))]);
                e.target.value = "";
              }}
            />
          </label>
        </section>
      </div>
    </div>
  );
}
