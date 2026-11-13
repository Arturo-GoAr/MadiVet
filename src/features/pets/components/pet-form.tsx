"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { FileThumb, useFileDrop } from "@/shared/files";
import { Field, inputClass, NativeSelect, SubmitButton } from "@/shared/forms";
import { useLocale, useT } from "@/shared/i18n";
// TODO: una feature no importa de otra; mover el esquema de vacunación a shared/
import { SCHEDULE } from "@/features/kpis";
import { Input } from "@/shared/ui/input";
import { PETS, type Pet } from "../mocks";

export function PetForm() {
  const t = useT();
  const locale = useLocale();
  const router = useRouter();
  const a = t.appointments;
  const [species, setSpecies] = useState<Pet["species"] | "">("");
  const [photo, setPhoto] = useState<File>();
  const { getRootProps, getInputProps, open, isDragActive } = useFileDrop((f) => setPhoto(f[0]));

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    // Fecha vacía = esa dosis no se ha aplicado.
    const applied: Record<string, string> = {};
    if (!species) return;
    for (const g of SCHEDULE[species])
      for (const d of g.doses) {
        const date = String(f.get(`${g.id}-${d.id}`) ?? "");
        if (date) applied[`${g.id}-${d.id}`] = date;
      }
    // shortcut: solo en memoria (se pierde al recargar), reemplazar por la API; `vaccines` queda vacío
    PETS.push({
      id: crypto.randomUUID(),
      name: String(f.get("name")).trim(),
      species,
      sex: f.get("sex") as Pet["sex"],
      ageYears: Number(f.get("age")),
      // shortcut: object URL, vive hasta recargar; subir al backend de archivos cuando exista
      photos: photo ? [URL.createObjectURL(photo)] : [],
      vaccines: [],
      applied,
    });
    toast.success(t.pets.registered);
    router.push("/mascotas");
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-xl bg-card p-6 shadow-sm sm:grid-cols-2">
      <Field id="name" label={t.common.petName} className="sm:col-span-2">
        <Input id="name" name="name" required className={inputClass} />
      </Field>
      <Field id="species" label={a.species}>
        <select
          id="species"
          value={species}
          onChange={(e) => setSpecies(e.target.value as Pet["species"])}
          required
          className={inputClass}
        >
          <option value="" disabled>
            {t.common.choose}
          </option>
          <option value="dog">{a.dog}</option>
          <option value="cat">{a.cat}</option>
        </select>
      </Field>
      <Field id="sex" label={a.sex}>
        <NativeSelect id="sex" options={[{ value: "male", label: a.male }, { value: "female", label: a.female }]} />
      </Field>
      <Field id="age" label={t.pets.age}>
        <Input id="age" name="age" type="number" min={0} max={40} required className={inputClass} />
      </Field>

      <Field id="photo" label={t.pets.photo} className="sm:col-span-2">
        <div {...getRootProps()} className={`grid min-h-32 place-items-center gap-2 bg-vet-field p-3 ${isDragActive ? "ring-2 ring-vet-lilac" : ""}`}>
          <input {...getInputProps()} id="photo" />
          {photo && <FileThumb file={photo} className="size-24" />}
          <button type="button" onClick={open} className="flex flex-col items-center gap-1 text-sm text-vet-gray">
            <Upload className="size-6" />
            {a.uploadImage}
          </button>
        </div>
      </Field>

      {species && <fieldset key={species} className="grid gap-3 sm:col-span-2">
        <legend className="text-lg">{t.pets.vaccines}</legend>
        <p className="text-sm text-vet-gray">{t.pets.vaccinesHint}</p>
        {SCHEDULE[species].map((g) => (
          <div key={g.id} className={`grid gap-2 rounded-lg p-3 ${g.color}`}>
            <p>
              {g.name[locale]} <span className="text-sm text-vet-gray">· {g.diseases[locale]}</span>
            </p>
            <div className="grid gap-2 sm:grid-cols-3">
              {g.doses.map((d) => (
                <Field key={d.id} id={`${g.id}-${d.id}`} label={`${d.dose[locale]} · ${d.age[locale]}`}>
                  <Input id={`${g.id}-${d.id}`} name={`${g.id}-${d.id}`} type="date" className={inputClass} />
                </Field>
              ))}
            </div>
          </div>
        ))}
      </fieldset>}
      <SubmitButton className="sm:col-span-2" />
    </form>
  );
}
