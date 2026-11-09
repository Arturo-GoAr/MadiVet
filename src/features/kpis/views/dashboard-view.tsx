"use client";

import { useT } from "@/shared/i18n";
import { useOpenModal } from "@/shared/modal";
import type { Role } from "@/shared/session";

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
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
      <div className="grid content-start gap-4">
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
        <nav aria-label={t.kpis.quickActions} className="grid gap-3">
          {ACTIONS.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => openModal(id)}
              className="rounded-xl bg-white p-5 text-center text-lg uppercase shadow-sm transition-colors hover:bg-vet-lilac/40"
            >
              {t.screens[id]}
            </button>
          ))}
        </nav>
      </div>
      <section className={card}>
        <h2 className="text-2xl uppercase">{t.kpis.records}</h2>
        <p className="mt-2 text-vet-gray">{t.shell.comingSoon}</p>
      </section>
    </div>
  );
}
