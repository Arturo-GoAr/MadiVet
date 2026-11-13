"use client";

import { toast } from "sonner";
import { Field, fieldClass, inputClass, NativeSelect, SubmitButton } from "@/shared/forms";
import { useT } from "@/shared/i18n";
import { cn } from "@/shared/lib/utils";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { api, useApi } from "@/shared/api";
import type { AdoptablePet } from "../types";

export function AdoptionRequestForm({ onDone, petId }: { onDone: () => void; petId?: string }) {
  const t = useT();
  const a = t.adoption;
  const { data } = useApi<{ mascotas: AdoptablePet[] }>("adoption/animals");
  const adoptable = data?.mascotas ?? [];
  // `petId` preselecciona la mascota; un id desconocido se ignora.
  const defaultPet = adoptable.some((p) => p.id === petId) ? petId : "";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget));
    try {
      await api("adoption/requests", { method: "POST", body: JSON.stringify({ ...f, adoptableId: f.adoptable }) });
      toast.success(a.sent);
      onDone();
    } catch (err) {
      toast.error((err as Error).message);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <Field id="owner" label={t.common.ownerName}>
        <Input id="owner" name="owner" placeholder={t.common.ownerPlaceholder} autoComplete="name" required className={inputClass} />
      </Field>
      <Field id="pet" label={t.common.petName}>
        <Input id="pet" name="pet" placeholder={t.common.petPlaceholder} required className={inputClass} />
      </Field>
      <Field id="phone" label={a.phone}>
        <Input id="phone" name="phone" type="tel" placeholder={a.phonePlaceholder} autoComplete="tel" required className={inputClass} />
      </Field>
      <Field id="address" label={a.address}>
        <Input id="address" name="address" placeholder={a.addressPlaceholder} autoComplete="street-address" required className={inputClass} />
      </Field>
      <Field id="notes" label={a.notes}>
        <Textarea id="notes" name="notes" className={cn(fieldClass, "min-h-28")} />
      </Field>
      <div className="grid content-start gap-4">
        <Field id="adoptable" label={a.pet}>
          <NativeSelect key={adoptable.length} id="adoptable" defaultValue={defaultPet} options={adoptable.map((p) => ({ value: p.id, label: p.name }))} />
        </Field>
        <SubmitButton />
      </div>
    </form>
  );
}
