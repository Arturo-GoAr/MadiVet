import type { Locale } from "@/shared/i18n";

// Esquema de vacunación de referencia por especie. TODO: lo definirá la clínica / vendrá de la API.
// Textos bilingües aquí porque son datos clínicos, no UI.
type L = Record<Locale, string>;
type Dose = { id: string; dose: L; age: L };
export type Group = { id: string; name: L; color: string; diseases: L; doses: Dose[] };

const first = { es: "Primera", en: "First" };
const second = { es: "Segunda", en: "Second" };
const third = { es: "Tercera", en: "Third" };
const booster = { es: "Refuerzo", en: "Booster" };
const single = { es: "Única", en: "Single" };
const weeks = (n: string): L => ({ es: `${n} semanas`, en: `${n} weeks` });
const yearly: L = { es: "Cada año", en: "Yearly" };

const rabies: Group = {
  id: "rabies",
  name: { es: "Rabia", en: "Rabies" },
  color: "bg-red-100 dark:bg-red-900/50",
  diseases: { es: "Rabia", en: "Rabies" },
  doses: [
    { id: "1", dose: first, age: weeks("12") },
    { id: "b", dose: booster, age: yearly },
  ],
};

const deworming: Group = {
  id: "deworming",
  name: { es: "Desparasitación", en: "Deworming" },
  color: "bg-yellow-100 dark:bg-yellow-900/50",
  diseases: { es: "Parásitos internos y externos", en: "Internal and external parasites" },
  doses: [
    { id: "1", dose: first, age: weeks("4") },
    { id: "b", dose: booster, age: { es: "Cada 3 meses", en: "Every 3 months" } },
  ],
};

const neutering: Group = {
  id: "neutering",
  name: { es: "Esterilización", en: "Sterilization" },
  color: "bg-purple-100 dark:bg-purple-900/50",
  diseases: { es: "Procedimiento quirúrgico", en: "Surgical procedure" },
  doses: [{ id: "1", dose: single, age: { es: "6 meses", en: "6 months" } }],
};

export const SCHEDULE: Record<"dog" | "cat", Group[]> = {
  dog: [
    {
      id: "dhppi",
      name: { es: "Séxtuple", en: "DHPPi + L" },
      color: "bg-green-100 dark:bg-green-900/50",
      diseases: {
        es: "Moquillo, hepatitis, parvovirus, parainfluenza, leptospirosis",
        en: "Distemper, hepatitis, parvovirus, parainfluenza, leptospirosis",
      },
      doses: [
        { id: "1", dose: first, age: weeks("6-8") },
        { id: "2", dose: second, age: weeks("10-12") },
        { id: "3", dose: third, age: weeks("14-16") },
        { id: "b", dose: booster, age: yearly },
      ],
    },
    {
      id: "bordetella",
      name: { es: "Bordetella", en: "Bordetella" },
      color: "bg-blue-100 dark:bg-blue-900/50",
      diseases: { es: "Tos de las perreras", en: "Kennel cough" },
      doses: [
        { id: "1", dose: first, age: weeks("8") },
        { id: "b", dose: booster, age: yearly },
      ],
    },
    rabies,
    deworming,
    neutering,
  ],
  cat: [
    {
      id: "triple",
      name: { es: "Triple felina", en: "FVRCP" },
      color: "bg-green-100 dark:bg-green-900/50",
      diseases: {
        es: "Rinotraqueítis, calicivirus, panleucopenia",
        en: "Rhinotracheitis, calicivirus, panleukopenia",
      },
      doses: [
        { id: "1", dose: first, age: weeks("8") },
        { id: "2", dose: second, age: weeks("12") },
        { id: "3", dose: third, age: weeks("16") },
        { id: "b", dose: booster, age: yearly },
      ],
    },
    {
      id: "felv",
      name: { es: "Leucemia felina", en: "FeLV" },
      color: "bg-blue-100 dark:bg-blue-900/50",
      diseases: { es: "Leucemia felina", en: "Feline leukemia" },
      doses: [
        { id: "1", dose: first, age: weeks("9") },
        { id: "2", dose: second, age: weeks("12") },
        { id: "b", dose: booster, age: yearly },
      ],
    },
    rabies,
    deworming,
    neutering,
  ],
};
