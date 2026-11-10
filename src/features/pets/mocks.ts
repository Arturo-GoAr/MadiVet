// TODO: reemplazar por la API cuando exista
export type Vaccine = { name: string; date: string; next?: string }; // yyyy-MM-dd

export type Pet = {
  id: string;
  name: string;
  species: "dog" | "cat";
  sex: "male" | "female";
  ageYears: number;
  photo?: string; // URL de la foto
  vaccines: Vaccine[];
  // Fecha de aplicación por `${grupo}-${dosis}` del esquema de features/kpis/schedule.ts. TODO: unificar con `vaccines` al llegar la API.
  applied: Record<string, string>;
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
    applied: {
      "dhppi-1": "2023-04-02", "dhppi-2": "2023-04-23", "dhppi-3": "2023-05-14", "dhppi-b": "2026-02-10",
      "bordetella-1": "2023-04-02", "bordetella-b": "2026-02-10",
      "rabies-1": "2023-05-14", "rabies-b": "2026-02-10",
      "deworming-1": "2023-03-20", "deworming-b": "2026-08-10",
    },
  },
  {
    id: "2",
    name: "Luna",
    species: "cat",
    sex: "female",
    ageYears: 5,
    vaccines: [{ name: "Triple felina", date: "2025-11-19", next: "2026-11-19" }],
    applied: {
      "triple-1": "2021-03-10", "triple-2": "2021-04-07", "triple-3": "2021-05-05", "triple-b": "2025-11-19",
      "rabies-1": "2021-05-05", "rabies-b": "2025-11-19",
      "neutering-1": "2021-09-15",
    },
  },
];
