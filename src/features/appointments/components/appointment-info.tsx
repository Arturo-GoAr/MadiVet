"use client";

import { format, parseISO } from "date-fns";
import { enUS, es } from "date-fns/locale";
import { useLocale, useT } from "@/shared/i18n";
import { useAppointment } from "@/shared/api";
import { Skeleton } from "@/shared/ui/skeleton";

const locales = { es, en: enUS };

export function AppointmentInfo({ id }: { id: string }) {
  const t = useT();
  const a = t.appointments;
  const locale = locales[useLocale()];
  const { appointment, error } = useAppointment(id);
  if (error) return <p className="text-vet-gray">{error.message}</p>;
  if (!appointment) return <Skeleton className="h-40" />;

  const rows = [
    [t.common.petName, appointment.pet ?? "—"],
    [a.date, format(parseISO(appointment.date), "PPP", { locale })],
    [a.subject, appointment.subject],
  ];

  return (
    <>
      <h1 className="text-2xl">{a.types[appointment.type]}</h1>
      <dl className="mt-4 grid gap-3">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs uppercase text-vet-gray">{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}
