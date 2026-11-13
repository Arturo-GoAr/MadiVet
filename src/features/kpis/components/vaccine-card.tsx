"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, parseISO } from "date-fns";
import { enUS, es } from "date-fns/locale";
import { cn } from "@/shared/lib/utils";
import { useLocale, useT } from "@/shared/i18n";
// TODO: una feature no importa de otra; mover mascotas a shared/ o a la API
import { SCHEDULE } from "../schedule";
import { PETS, type Pet } from "@/features/pets/mocks";

const locales = { es, en: enUS };
const arrow = "rounded-full p-2 hover:bg-vet-surface disabled:opacity-30";

// `fixed`: ficha de una sola mascota, sin selector.
export function VaccineCard({ fixed }: { fixed?: Pet }) {
  const t = useT();
  const lang = useLocale();
  const locale = locales[lang];
  const [i, setI] = useState(0);
  const pet = fixed ?? PETS[i];
  const day = (d: string) => format(parseISO(d), "P", { locale });

  return (
    <section className="rounded-xl bg-card p-5 shadow-sm">
      <h2 className="text-2xl uppercase">{t.kpis.records}</h2>
      <div className="mt-3 flex items-center justify-between">
        <button type="button" aria-label={t.kpis.prevPet} hidden={!!fixed} disabled={i === 0} onClick={() => setI(i - 1)} className={arrow}>
          <ChevronLeft className="size-5" />
        </button>
        <div className="text-center">
          <p className="text-xl">{pet.name}</p>
          <p className="text-sm text-vet-gray">
            {t.appointments[pet.species]} · {t.appointments[pet.sex]} · {pet.ageYears} {t.pets.years}
          </p>
        </div>
        <button type="button" aria-label={t.kpis.nextPet} hidden={!!fixed} disabled={i === PETS.length - 1} onClick={() => setI(i + 1)} className={arrow}>
          <ChevronRight className="size-5" />
        </button>
      </div>
      <h3 className="mt-4 rounded bg-vet-lilac/40 py-1 text-center text-sm uppercase">{t.kpis.schedule}</h3>
      <div className="overflow-x-auto">
        <table className="mt-2 w-full text-left text-xs">
          <thead className="uppercase text-vet-gray">
            <tr>
              {[t.kpis.vaccine, t.kpis.diseases, t.kpis.dose, t.kpis.age, t.kpis.date].map((h) => (
                <th key={h} className="p-1.5 font-normal">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SCHEDULE[pet.species].map((g) =>
              g.doses.map((d, k) => (
                <tr key={`${g.id}-${d.id}`} className="border-t border-card">
                  {k === 0 && (
                    <>
                      <th rowSpan={g.doses.length} className={cn("p-1.5 font-normal", g.color)}>{g.name[lang]}</th>
                      <td rowSpan={g.doses.length} className={cn("p-1.5", g.color)}>{g.diseases[lang]}</td>
                    </>
                  )}
                  <td className="bg-vet-field p-1.5">{d.dose[lang]}</td>
                  <td className="bg-vet-field p-1.5">{d.age[lang]}</td>
                  <td className="bg-vet-field p-1.5">{pet.applied[`${g.id}-${d.id}`] ? day(pet.applied[`${g.id}-${d.id}`]) : "—"}</td>
                </tr>
              )),
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
