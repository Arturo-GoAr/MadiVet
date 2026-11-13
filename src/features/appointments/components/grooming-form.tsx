"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { FileThumb, useFileDrop } from "@/shared/files";
import { Field, inputClass, NativeSelect, SubmitButton } from "@/shared/forms";
import { useT } from "@/shared/i18n";
import { Input } from "@/shared/ui/input";
import { api, usePets } from "@/shared/api";

export function GroomingForm({ onDone }: { onDone: () => void }) {
  const a = useT().appointments;
  const { pets = [] } = usePets();
  const [reference, setReference] = useState<File>();
  const { getRootProps, getInputProps, open, isDragActive } = useFileDrop((f) => setReference(f[0]));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const petId = String(f.get("pet"));
    try {
      const { cita } = await api<{ cita: { id: string } }>("appointments", {
        method: "POST",
        body: JSON.stringify({
          type: "grooming",
          petId,
          ownerId: pets.find((p) => p.id === petId)?.ownerId,
          subject: a.types.grooming,
          date: f.get("date"),
        }),
      });
      if (reference) {
        const body = new FormData();
        body.append("files", reference);
        await api(`appointments/${cita.id}/attachments`, { method: "POST", body });
      }
      toast.success(a.groomingCreated);
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
      <Field id="reference" label={a.reference} className="sm:row-span-2">
        <div {...getRootProps()} className={`grid min-h-40 place-items-center gap-2 bg-vet-field p-3 ${isDragActive ? "ring-2 ring-vet-lilac" : ""}`}>
          <input {...getInputProps()} id="reference" />
          {reference && <FileThumb file={reference} className="size-24" />}
          <button type="button" onClick={open} className="flex flex-col items-center gap-1 text-sm text-vet-gray">
            <Upload className="size-6" />
            {a.uploadImage}
          </button>
        </div>
      </Field>
      <Field id="date" label={a.date}>
        <Input id="date" name="date" type="date" required className={inputClass} />
      </Field>
      <SubmitButton className="self-end" />
    </form>
  );
}
