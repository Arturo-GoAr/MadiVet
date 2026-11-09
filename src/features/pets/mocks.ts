// TODO: reemplazar por la API cuando exista
export type Vaccine = { name: string; date: string; next?: string }; // yyyy-MM-dd

export type Pet = {
  id: string;
  name: string;
  species: "dog" | "cat";
  sex: "male" | "female";
  ageYears: number;
  vaccines: Vaccine[];
};

export const PETS: Pet[] = [
  {
    id: "1",
    name: "Firulais",
    species: "dog",
    sex: "male",
    ageYears: 3,
    vaccines: [
      { name: "Rabia", date: "2026-02-10", next: "2027-02-10" },
      { name: "Parvovirus", date: "2026-02-10", next: "2027-02-10" },
    ],
  },
  {
    id: "2",
    name: "Luna",
    species: "cat",
    sex: "female",
    ageYears: 5,
    vaccines: [{ name: "Triple felina", date: "2025-11-19", next: "2026-11-19" }],
  },
];
