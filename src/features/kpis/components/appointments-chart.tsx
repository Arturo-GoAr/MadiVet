"use client";

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { differenceInCalendarMonths, format, parseISO, startOfMonth, subMonths } from "date-fns";
import { enUS, es } from "date-fns/locale";
import { useLocale, useT } from "@/shared/i18n";
import { ChartContainer, ChartTooltip } from "@/shared/ui/chart";
// TODO: una feature no importa de otra; mover citas a shared/ o a la API
import { APPOINTMENTS } from "@/features/appointments/mocks";

const locales = { es, en: enUS };
const MONTHS = 6;
const PET_NAMES = [...new Set(APPOINTMENTS.map((a) => a.pet))];
// TODO: fecha de creación de la cuenta, vendrá de la sesión/API
const ACCOUNT_CREATED = "2026-07-01";

export function AppointmentsChart() {
  const t = useT();
  const locale = locales[useLocale()];
  const now = startOfMonth(new Date());
  // Hasta 6 meses, recortado a los que lleva la cuenta.
  const n = Math.min(MONTHS, differenceInCalendarMonths(now, parseISO(ACCOUNT_CREATED)) + 1);
  const data = Array.from({ length: n }, (_, k) => {
    const m = subMonths(now, n - 1 - k);
    const key = format(m, "yyyy-MM");
    const inMonth = APPOINTMENTS.filter((a) => a.date.startsWith(key));
    return {
      month: format(m, "MMM", { locale }),
      count: inMonth.length,
      pets: PET_NAMES.map((name) => ({ name, n: inMonth.filter((a) => a.pet === name).length })),
    };
  });

  return (
    <section className="rounded-xl bg-white p-5 shadow-sm">
      <h2 className="text-lg uppercase">{t.kpis.appointmentsByMonth}</h2>
      <ChartContainer config={{ count: { label: t.kpis.appointmentsLabel, color: "var(--color-vet-lilac)" } }} className="mt-3 h-48 w-full">
        <LineChart data={data}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} className="capitalize" />
          <YAxis allowDecimals={false} width={24} tickLine={false} axisLine={false} />
          <ChartTooltip
            content={({ active, payload }) => {
              const row = payload?.[0]?.payload as (typeof data)[number] | undefined;
              if (!active || !row) return null;
              return (
                <div className="rounded-lg border bg-background px-2.5 py-1.5 text-xs shadow-xl">
                  <p className="font-medium capitalize">{row.month} · {row.count}</p>
                  {row.pets.map((p) => (
                    <p key={p.name} className="text-vet-gray">{p.name}: {p.n}</p>
                  ))}
                </div>
              );
            }}
          />
          <Line dataKey="count" type="monotone" stroke="var(--color-count)" strokeWidth={2} dot={{ r: 5, fill: "var(--color-count)" }} activeDot={{ r: 7 }} />
        </LineChart>
      </ChartContainer>
    </section>
  );
}
