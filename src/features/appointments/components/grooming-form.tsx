"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { FileThumb, useFileDrop } from "@/shared/files";
import { Field, inputClass, NativeSelect, SubmitButton } from "@/shared/forms";
import { useT } from "@/shared/i18n";
import { Input } from "@/shared/ui/input";

export function GroomingForm({ onDone }: { onDone: () => void }) {
  const t = useT();
  const a = t.appointments;
  const [reference, setReference] = useState<File>();
  const { getRootProps, getInputProps, open, isDragActive } = useFileDrop((f) => setReference(f[0]));

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: conectar con el backend (enviar también `reference`) cuando exista
    toast.success(a.groomingCreated);
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
