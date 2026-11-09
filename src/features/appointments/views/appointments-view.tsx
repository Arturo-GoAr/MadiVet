"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CalendarDays, ChevronLeft, ChevronRight, List, Plus } from "lucide-react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  isValid,
  parse,
  parseISO,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { enUS, es } from "date-fns/locale";
import { useLocale, useT } from "@/shared/i18n";
import { cn } from "@/shared/lib/utils";
import { useOpenModal } from "@/shared/modal";
import { APPOINTMENTS } from "../mocks";

const locales = { es, en: enUS };
const iconLink = "grid size-10 place-items-center rounded-lg text-vet-gray hover:bg-vet-surface hover:text-black";

export function AppointmentsView() {
  const t = useT();
  const a = t.appointments;
  const locale = locales[useLocale()];
  const params = useSearchParams();
  const openModal = useOpenModal();

  const view = params.get("vista") === "lista" ? "lista" : "calendario";
  const parsed = parse(params.get("mes") ?? "", "yyyy-MM", new Date());
  const month = startOfMonth(isValid(parsed) ? parsed : new Date());
  const q = (params.get("q") ?? "").toLowerCase();

  const href = (patch: Record<string, string>) => {
    const p = new URLSearchParams(params);
    for (const [k, v] of Object.entries(patch)) p.set(k, v);
    return `/citas?${p}`;
  };
  const monthHref = (m: Date) => href({ mes: format(m, "yyyy-MM") });

  const matches = APPOINTMENTS.filter((x) =>
    `${a.types[x.type]} ${x.pet} ${x.subject}`.toLowerCase().includes(q),
  );
  const days = eachDayOfInterval({
    start: startOfWeek(month, { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(month), { weekStartsOn: 1 }),
  });
  const inMonth = matches
    .filter((x) => isSameMonth(parseISO(x.date), month))
    .sort((x, y) => x.date.localeCompare(y.date));

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex rounded-xl bg-white p-1 shadow-sm">
          <Link
            href={href({ vista: "calendario" })}
            aria-label={a.viewCalendar}
            aria-current={view === "calendario" ? "page" : undefined}
            className={cn(iconLink, view === "calendario" && "bg-vet-surface text-black")}
          >
            <CalendarDays className="size-5" />
          </Link>
          <Link
            href={href({ vista: "lista" })}
            aria-label={a.viewList}
            aria-current={view === "lista" ? "page" : undefined}
            className={cn(iconLink, view === "lista" && "bg-vet-surface text-black")}
          >
            <List className="size-5" />
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Link href={monthHref(addMonths(month, -1))} aria-label={a.prevMonth} className={iconLink}>
            <ChevronLeft className="size-5" />
          </Link>
          <h1 className="min-w-40 text-center text-xl capitalize">{format(month, "LLLL yyyy", { locale })}</h1>
          <Link href={monthHref(addMonths(month, 1))} aria-label={a.nextMonth} className={iconLink}>
            <ChevronRight className="size-5" />
          </Link>
        </div>
        <button
          type="button"
          onClick={() => openModal("newAppointment")}
          className="ml-auto flex items-center gap-1.5 rounded-full bg-vet-teal px-4 py-2 text-sm text-white hover:bg-vet-teal/90"
        >
          <Plus className="size-4" />
          {t.screens.newAppointment}
        </button>
      </div>

      {view === "calendario" ? (
        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
          <div className="grid grid-cols-7 border-b text-center text-sm uppercase">
            {days.slice(0, 7).map((d) => (
              <div key={d.getDay()} className="py-2">
                {format(d, "EEE", { locale })}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {days.map((d) => {
              const key = format(d, "yyyy-MM-dd");
              return (
                <div
                  key={key}
                  className={cn(
                    "min-h-24 min-w-0 border-b border-r p-1.5 text-xs",
                    !isSameMonth(d, month) && "text-vet-gray/60",
                  )}
                >
                  {format(d, "d")}
                  {matches
                    .filter((x) => x.date === key)
                    .map((x) => (
                      <Link
                        key={x.id}
                        href={`/citas/${x.id}`}
                        className="mt-1 block truncate rounded-full bg-vet-teal px-2 py-0.5 text-white"
                      >
                        {a.types[x.type]}
                      </Link>
                    ))}
                </div>
              );
            })}
          </div>
        </div>
      ) : inMonth.length === 0 ? (
        <p className="rounded-xl bg-white p-6 text-center text-vet-gray shadow-sm">{a.noResults}</p>
      ) : (
        <ul className="divide-y rounded-xl bg-white shadow-sm">
          {inMonth.map((x) => (
            <li key={x.id}>
              <Link href={`/citas/${x.id}`} className="flex items-center gap-4 p-4 hover:bg-vet-surface">
                <span className="w-16 text-sm uppercase text-vet-gray">{format(parseISO(x.date), "d MMM", { locale })}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate">
                    {x.pet} · {a.types[x.type]}
                  </span>
                  <span className="block truncate text-sm text-vet-gray">{x.subject}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
