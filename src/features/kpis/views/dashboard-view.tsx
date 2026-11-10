"use client";

import Link from "next/link";
import { format } from "date-fns";
import { APPOINTMENTS } from "@/features/appointments/mocks";
import { useT } from "@/shared/i18n";
import { Button } from "@/shared/ui/button";
import { useOpenModal } from "@/shared/modal";
import type { Role } from "@/shared/session";
import { AppointmentsChart } from "../components/appointments-chart";
import { VaccineCard } from "../components/vaccine-card";

// TODO: datos reales cuando exista la API
type Stat = { n: number | null; key: "registered" | "today" | "unread" | "upcoming" | "daysSince" };

// daysSince: días desde la última cita de la mascota con más tiempo sin cita; null = nunca ha tenido.
const STATS: Record<Role, Stat[]> = {
  staff: [
    { n: 67, key: "registered" },
    { n: 5, key: "today" },
    { n: 3, key: "unread" },
  ],
  client: [
    { n: 2, key: "upcoming" },
    { n: 45, key: "daysSince" },
    { n: 1, key: "unread" },
  ],
};

const ACTIONS = ["newAppointment", "adoptionRequest", "newGrooming"] as const;

const card = "rounded-xl bg-white p-5 shadow-sm";

export function DashboardView({ role }: { role: Role }) {
  const t = useT();
  const openModal = useOpenModal();
  const today = format(new Date(), "yyyy-MM-dd");
  // TODO: filtrar por el cliente en sesión cuando exista la API
  const pending = APPOINTMENTS.filter((x) => x.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5);
  return (
    <div className="grid gap-4">
      <nav aria-label={t.kpis.quickActions} className="flex flex-wrap justify-end gap-2">
        {ACTIONS.map((id) => (
          <Button key={id} variant="outline" size="lg" onClick={() => openModal(id)}>
            {t.screens[id]}
          </Button>
        ))}
      </nav>
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
      <div className="grid grid-rows-[auto_1fr] gap-4">
        <div className="grid gap-4 sm:grid-cols-[repeat(auto-fit,minmax(10rem,1fr))]">
          {STATS[role].map(({ n, key }) => (
            <div key={key} className={card}>
              <p className="text-5xl">{n ?? "—"}</p>
              <p className="mt-1 text-sm uppercase text-vet-gray">
                {n === null ? t.kpis.noAppointmentsYet : t.kpis[key]}
              </p>
            </div>
          ))}
        </div>
        <AppointmentsChart />
      </div>
      <VaccineCard />
      </div>
      <section className={card}>
        <h2 className="mb-3 text-lg">{t.kpis.pendingAppointments}</h2>
        <ul className="divide-y">
          {pending.map((x) => (
            <li key={x.id}>
              <Link href={`/citas/${x.id}`} className="flex items-center justify-between gap-4 py-3 hover:bg-vet-surface">
                <span>
                  {t.appointments.types[x.type]} · {x.pet} · {x.subject}
                </span>
                <span className="text-sm text-vet-gray">{x.date}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
