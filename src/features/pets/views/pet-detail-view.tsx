"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useT } from "@/shared/i18n";
// TODO: una feature no importa de otra; mover gráfica y cartilla a shared/
import { AppointmentsChart, VaccineCard } from "@/features/kpis";
import { PETS } from "../mocks";

export function PetDetailView({ id }: { id: string }) {
  const t = useT();
  const pet = PETS.find((p) => p.id === id);
  if (!pet) notFound();

  return (
    <div className="grid gap-4">
      <Link href="/mascotas" className="flex w-fit items-center gap-1.5 text-sm text-vet-gray hover:text-black">
        <ArrowLeft className="size-4" />
        {t.screens.pets}
      </Link>
      <section className="rounded-xl bg-white p-5 shadow-sm">
        <h1 className="text-2xl">{pet.name}</h1>
        <p className="mt-1 text-vet-gray">
          {t.appointments[pet.species]} · {t.appointments[pet.sex]} · {pet.ageYears} {t.pets.years}
        </p>
      </section>
      <div className="grid gap-4 lg:grid-cols-2">
        <AppointmentsChart pet={pet.name} />
        <VaccineCard fixed={pet} />
      </div>
    </div>
  );
}
