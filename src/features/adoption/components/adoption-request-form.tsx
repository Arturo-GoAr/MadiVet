"use client";

import { toast } from "sonner";
import { Field, fieldClass, inputClass, NativeSelect, SubmitButton } from "@/shared/forms";
import { useT } from "@/shared/i18n";
import { cn } from "@/shared/lib/utils";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { ADOPTABLE } from "../mocks";

export function AdoptionRequestForm({ onDone, petId }: { onDone: () => void; petId?: string }) {
  const t = useT();
  const a = t.adoption;
  // `petId` preselecciona la mascota; un id desconocido se ignora.
  const defaultPet = ADOPTABLE.some((p) => p.id === petId) ? petId : "";

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: conectar con el backend cuando exista
    toast.success(a.sent);
    onDone();
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
          <NativeSelect id="adoptable" defaultValue={defaultPet} options={ADOPTABLE.map((p) => ({ value: p.id, label: p.name }))} />
        </Field>
        <SubmitButton />
      </div>
    </form>
  );
}
