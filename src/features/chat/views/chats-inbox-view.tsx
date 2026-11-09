"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { format, parseISO } from "date-fns";
import { enUS, es } from "date-fns/locale";
import { useLocale, useT } from "@/shared/i18n";
import { Badge } from "@/shared/ui/badge";
import { CHATS } from "../mocks";

const locales = { es, en: enUS };

export function ChatsInboxView() {
  const t = useT();
  const locale = locales[useLocale()];
  const q = (useSearchParams().get("q") ?? "").toLowerCase();

  const rows = CHATS.map((c) => ({ ...c, last: c.messages.at(-1) }))
    .filter((c) => `${c.title} ${c.last?.text ?? ""}`.toLowerCase().includes(q))
    .sort((a, b) => (b.last?.at ?? "").localeCompare(a.last?.at ?? ""));

  if (rows.length === 0) return <p className="rounded-xl bg-white p-6 text-center text-vet-gray shadow-sm">{t.chat.inboxEmpty}</p>;

  return (
    <ul className="divide-y rounded-xl bg-white shadow-sm">
      {rows.map((c) => (
        <li key={c.appointmentId}>
          <Link href={`/citas/${c.appointmentId}`} className="flex items-center gap-4 p-4 hover:bg-vet-surface">
            <span className="min-w-0 flex-1">
              <span className="block truncate">{c.title}</span>
              <span className="block truncate text-sm text-vet-gray">{c.last?.text ?? t.chat.empty}</span>
            </span>
            {c.last && <span className="text-xs text-vet-gray">{format(parseISO(c.last.at), "d MMM", { locale })}</span>}
            {c.unread > 0 && (
              <Badge aria-label={`${c.unread} ${t.chat.unread}`} className="bg-vet-teal text-white">
                {c.unread}
              </Badge>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
