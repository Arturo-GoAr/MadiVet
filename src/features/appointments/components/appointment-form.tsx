"use client";

import { toast } from "sonner";
import { Field, fieldClass, inputClass, NativeSelect, SubmitButton } from "@/shared/forms";
import { useT } from "@/shared/i18n";
import { cn } from "@/shared/lib/utils";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { MY_PETS } from "../mocks";

export function AppointmentForm({ onDone }: { onDone: () => void }) {
  const a = useT().appointments;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: conectar con el backend cuando exista
    toast.success(a.created);
    onDone();
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <Field id="pet" label={a.pet} className="sm:col-span-2">
        <NativeSelect id="pet" options={MY_PETS.map((p) => ({ value: p.id, label: p.name }))} />
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
