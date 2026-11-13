"use client";

import { toast } from "sonner";
import { Field, fieldClass, inputClass, NativeSelect, SubmitButton } from "@/shared/forms";
import { useT } from "@/shared/i18n";
import { cn } from "@/shared/lib/utils";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { api, usePets } from "@/shared/api";

export function AppointmentForm({ onDone }: { onDone: () => void }) {
  const a = useT().appointments;
  const { pets = [] } = usePets();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const petId = String(f.get("pet"));
    try {
      await api("appointments", {
        method: "POST",
        body: JSON.stringify({
          type: "medical",
          petId,
          ownerId: pets.find((p) => p.id === petId)?.ownerId, // el backend solo lo usa si quien agenda es personal
          subject: f.get("subject"),
          date: f.get("date"),
        }),
      });
      toast.success(a.created);
      onDone();
    } catch (err) {
      toast.error((err as Error).message);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <Field id="pet" label={a.pet} className="sm:col-span-2">
        <NativeSelect id="pet" options={pets.map((p) => ({ value: p.id, label: p.name }))} />
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
