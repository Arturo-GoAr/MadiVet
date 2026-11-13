"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useT } from "@/shared/i18n";
import { PetForm } from "../components/pet-form";

export function NewPetView() {
  const t = useT();
  return (
    <div className="grid gap-4">
      <Link href="/mascotas" className="flex w-fit items-center gap-1.5 text-sm text-vet-gray hover:text-foreground">
        <ArrowLeft className="size-4" />
        {t.screens.pets}
      </Link>
      <PetForm />
    </div>
  );
}
