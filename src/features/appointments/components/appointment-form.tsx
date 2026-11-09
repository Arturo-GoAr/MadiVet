"use client";

import { toast } from "sonner";
import { Field, fieldClass, inputClass, NativeSelect, SubmitButton } from "@/shared/forms";
import { useT } from "@/shared/i18n";
import { cn } from "@/shared/lib/utils";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";

export function AppointmentForm({ onDone }: { onDone: () => void }) {
  const t = useT();
  const a = t.appointments;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: conectar con el backend cuando exista
    toast.success(a.created);
    onDone();
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <Field id="owner" label={t.common.ownerName} className="sm:col-span-2">
        <Input id="owner" name="owner" placeholder={t.common.ownerPlaceholder} required className={inputClass} />
      </Field>
      <Field id="pet" label={t.common.petName} className="sm:col-span-2">
        <Input id="pet" name="pet" placeholder={t.common.petPlaceholder} required className={inputClass} />
      </Field>
      <Field id="species" label={a.species}>
        <NativeSelect id="species" options={[{ value: "dog", label: a.dog }, { value: "cat", label: a.cat }, { value: "other", label: a.otherSpecies }]} />
      </Field>
      <Field id="sex" label={a.sex}>
        <NativeSelect id="sex" options={[{ value: "male", label: a.male }, { value: "female", label: a.female }]} />
      </Field>
      <Field id="subject" label={a.subject} className="sm:col-span-2">
        <Textarea id="subject" name="subject" placeholder={a.subjectPlaceholder} required className={cn(fieldClass, "min-h-24")} />
      </Field>
      <Field id="date" label={a.date}>
        <Input id="date" name="date" type="date" required className={inputClass} />
      </Field>
      <SubmitButton className="self-end" />
    </form>
  );
}
