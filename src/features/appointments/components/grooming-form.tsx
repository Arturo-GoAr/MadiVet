"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { FileThumb, useFileDrop } from "@/shared/files";
import { Field, inputClass, NativeSelect, SubmitButton } from "@/shared/forms";
import { useT } from "@/shared/i18n";
import { Input } from "@/shared/ui/input";
import { MY_PETS } from "../mocks";

export function GroomingForm({ onDone }: { onDone: () => void }) {
  const a = useT().appointments;
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
      <Field id="pet" label={a.pet} className="sm:col-span-2">
        <NativeSelect id="pet" options={MY_PETS.map((p) => ({ value: p.id, label: p.name }))} />
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
