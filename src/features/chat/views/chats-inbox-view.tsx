"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { format, parseISO } from "date-fns";
import { enUS, es } from "date-fns/locale";
import { useLocale, useT } from "@/shared/i18n";
import { useOpenModal } from "@/shared/modal";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import { ChatPanel } from "../components/chat-panel";
import { useApi } from "@/shared/api";

type Chat = { appointmentId: string; title: string; unread: number; lastMessage: string | null; lastAt: string | null };

const locales = { es, en: enUS };

export function ChatsInboxView() {
  const t = useT();
  const openModal = useOpenModal();
  const locale = locales[useLocale()];
  const [sel, setSel] = useState<string | null>(null);
  const q = (useSearchParams().get("q") ?? "").toLowerCase();

  const { data } = useApi<{ chats: Chat[] }>("chats");
  const rows = (data?.chats ?? [])
    .filter((c) => `${c.title} ${c.lastMessage ?? ""}`.toLowerCase().includes(q))
    .sort((a, b) => (b.lastAt ?? "").localeCompare(a.lastAt ?? ""));

  if (rows.length === 0) return <p className="rounded-xl bg-card p-6 text-center text-vet-gray shadow-sm">{t.chat.inboxEmpty}</p>;

  const current = rows.find((c) => c.appointmentId === sel);

  return (
    <div className="grid gap-4 lg:grid-cols-[22rem_1fr]">
      <ul className={cn("h-fit divide-y rounded-xl bg-card shadow-sm", current && "hidden lg:block")}>
        {rows.map((c) => (
          <li key={c.appointmentId}>
            <button
              type="button"
              onClick={() => setSel(c.appointmentId)}
              className={cn("flex w-full items-center gap-4 p-4 text-left hover:bg-vet-surface", c === current && "bg-vet-surface")}
            >
              <span className="min-w-0 flex-1">
                <span className="block truncate">{c.title}</span>
                <span className="block truncate text-sm text-vet-gray">{c.lastMessage ?? t.chat.empty}</span>
              </span>
              {c.lastAt && <span className="text-xs text-vet-gray">{format(parseISO(c.lastAt), "d MMM", { locale })}</span>}
              {c.unread > 0 && (
                <Badge aria-label={`${c.unread} ${t.chat.unread}`} className="bg-vet-teal text-white">
                  {c.unread}
                </Badge>
              )}
            </button>
          </li>
        ))}
      </ul>
      <div className={cn("grid gap-2", !current && "hidden lg:grid")}>
        {current ? (
          <>
            <button type="button" onClick={() => setSel(null)} className="flex w-fit items-center gap-1.5 text-sm text-vet-gray lg:hidden">
              <ArrowLeft className="size-4" />
              {t.screens.chats}
            </button>
            <div className="flex items-center justify-between gap-2 px-1">
              <h2 className="truncate text-lg">{current.title}</h2>
              <button type="button" onClick={() => openModal("appointmentDetails", { id: current.appointmentId })} className="shrink-0 text-sm text-vet-link hover:underline">
                {t.chat.viewDetails}
              </button>
            </div>
            <ChatPanel key={current.appointmentId} appointmentId={current.appointmentId} />
          </>
        ) : (
          <p className="grid h-[70dvh] place-items-center rounded-xl bg-card text-vet-gray shadow-sm">{t.chat.selectChat}</p>
        )}
      </div>
    </div>
  );
}
