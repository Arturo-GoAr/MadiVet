// TODO: reemplazar por la API cuando exista
export type AppointmentType = "medical" | "grooming" | "vaccination";

export type Appointment = {
  id: string;
  type: AppointmentType;
  pet: string;
  date: string; // yyyy-MM-dd
  subject: string;
};

// Mascotas del cliente en sesión. TODO: vendrán de la API (mismos ids que features/pets/mocks.ts).
export const MY_PETS = [
  { id: "1", name: "Firulais" },
  { id: "2", name: "Luna" },
];

export const APPOINTMENTS: Appointment[] = [
  { id: "1", type: "grooming", pet: "Firulais", date: "2026-11-01", subject: "Baño y corte" },
  { id: "2", type: "medical", pet: "Firulais", date: "2026-11-05", subject: "Revisión general" },
  { id: "3", type: "medical", pet: "Luna", date: "2026-11-19", subject: "Control de peso" },
  { id: "4", type: "vaccination", pet: "Luna", date: "2026-11-19", subject: "Refuerzo anual" },
  { id: "5", type: "vaccination", pet: "Firulais", date: "2026-12-03", subject: "Rabia" },
  { id: "6", type: "medical", pet: "Luna", date: "2026-10-14", subject: "Alergia en la piel" },
];
