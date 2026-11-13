"use client";

import { differenceInYears, format, parseISO } from "date-fns";
import { useApi } from "./use-api";

export type AppointmentType = "medical" | "grooming" | "vaccination";
export type Appointment = {
  id: string;
  ownerId: string;
  petId: string | null;
  type: AppointmentType;
  pet: string | null;
  date: string; // yyyy-MM-dd
  subject: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
};

export type Vaccine = { name: string; date: string; next?: string | null };
type ApiPet = {
  id: string;
  ownerId: string;
  name: string;
  species: "dog" | "cat" | "other";
  sex: "male" | "female" | "unknown";
  birthDate: string | null;
  vaccines: Vaccine[];
};
export type Pet = {
  id: string;
  ownerId: string;
  name: string;
  species: "dog" | "cat";
  sex: "male" | "female";
  ageYears: number;
  photos: string[];
  vaccines: Vaccine[];
  // Fecha por `${grupo}-${dosis}` del esquema de kpis/schedule.ts: al registrar la vacuna se guarda esa clave como nombre.
  applied: Record<string, string>;
};

// shortcut: el backend no guarda fotos de mascotas; se usa el relleno. Subirlas cuando haya endpoint.
const PLACEHOLDER = ["/images/adoption/placeholder-1.svg"];

const toPet = (p: ApiPet): Pet => ({
  id: p.id,
  ownerId: p.ownerId,
  name: p.name,
  // shortcut: el diseño solo contempla perro/gato (y sexo macho/hembra); lo demás cae al valor por defecto
  species: p.species === "cat" ? "cat" : "dog",
  sex: p.sex === "female" ? "female" : "male",
  ageYears: p.birthDate ? differenceInYears(new Date(), parseISO(p.birthDate)) : 0,
  photos: PLACEHOLDER,
  vaccines: p.vaccines,
  applied: Object.fromEntries(p.vaccines.map((v) => [v.name, v.date])),
});

export const birthDateFromAge = (years: number) => format(new Date(Date.now() - years * 365.25 * 864e5), "yyyy-MM-dd");

export function useAppointments() {
  const { data, ...rest } = useApi<{ citas: Appointment[] }>("appointments");
  return { appointments: data?.citas, ...rest };
}

export function usePets(ownerId?: string) {
  const { data, ...rest } = useApi<{ mascotas: ApiPet[] }>(ownerId ? `pets?ownerId=${ownerId}` : "pets");
  return { pets: data?.mascotas.map(toPet), ...rest };
}

export function usePet(id: string) {
  const { data, ...rest } = useApi<{ mascota: ApiPet }>(`pets/${id}`);
  return { pet: data && toPet(data.mascota), ...rest };
}

export function useAppointment(id: string) {
  const { data, ...rest } = useApi<{ cita: Appointment }>(`appointments/${id}`);
  return { appointment: data?.cita, ...rest };
}
