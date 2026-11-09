"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Paperclip, Send, X } from "lucide-react";
import { format, parseISO } from "date-fns";
import { FilePreview, FileThumb, useFileDrop } from "@/shared/files";
import { useT } from "@/shared/i18n";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { CHATS, type Message } from "../mocks";

export function ChatPanel({ appointmentId }: { appointmentId: string }) {
  const t = useT();
  const [messages, setMessages] = useState<Message[]>(CHATS.find((c) => c.appointmentId === appointmentId)?.messages ?? []);
  const [draft, setDraft] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const list = useRef<HTMLDivElement>(null);
  const q = (useSearchParams().get("q") ?? "").toLowerCase();
  const { getRootProps, getInputProps, open, isDragActive } = useFileDrop((f) => setFiles((p) => [...p, ...f]));

  const shown = q ? messages.filter((m) => m.text.toLowerCase().includes(q)) : messages;

  useEffect(() => {
    list.current?.scrollTo({ top: list.current.scrollHeight });
  }, [messages.length]);

  function send(e: React.FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text && !files.length) return;
    // TODO: enviar al backend cuando exista
    setMessages((m) => [...m, { id: crypto.randomUUID(), from: "me", text, at: format(new Date(), "yyyy-MM-dd'T'HH:mm"), files }]);
    setDraft("");
    setFiles([]);
  }

  return (
    <div
      {...getRootProps()}
      className={cn("flex h-[70dvh] min-h-96 flex-col rounded-xl bg-white shadow-sm", isDragActive && "ring-2 ring-vet-lilac")}
    >
      <input {...getInputProps()} />
      <div ref={list} className="flex flex-1 flex-col gap-3 overflow-y-auto p-4" aria-live="polite">
        {shown.length === 0 && <p className="m-auto text-vet-gray">{q ? t.chat.noMatches : t.chat.empty}</p>}
        {shown.map((m) => (
          <div key={m.id} className={cn("max-w-[80%] rounded-2xl px-4 py-2", m.from === "me" ? "self-end bg-vet-lilac" : "self-start bg-vet-field")}>
            {m.text && <p className="whitespace-pre-wrap break-words">{m.text}</p>}
            {!!m.files?.length && (
              <div className="mt-2 flex flex-wrap gap-2">
                {m.files.map((f, i) => (
                  <FilePreview key={i} file={f} />
                ))}
              </div>
            )}
            <p className="mt-1 text-right text-xs text-vet-gray">{format(parseISO(m.at), "HH:mm")}</p>
          </div>
        ))}
      </div>
      <form onSubmit={send} className="grid gap-2 border-t p-3">
        {!!files.length && (
          <div className="flex flex-wrap gap-2">
            {files.map((f, i) => (
              <div key={i} className="relative">
                <FileThumb file={f} className="size-16" />
                <button
                  type="button"
                  aria-label={`${t.files.remove}: ${f.name}`}
                  onClick={() => setFiles((p) => p.filter((_, j) => j !== i))}
                  className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-black text-white"
                >
                  <X className="size-3" />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center gap-2">
          <Button type="button" variant="ghost" size="icon" aria-label={t.files.attach} onClick={open}>
            <Paperclip className="size-5" />
          </Button>
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={t.chat.placeholder}
            aria-label={t.chat.placeholder}
            className="h-10 flex-1 rounded-full border-0 bg-vet-field px-4"
          />
          <Button type="submit" size="icon" aria-label={t.chat.send} className="rounded-full bg-vet-teal text-white hover:bg-vet-teal/90">
            <Send className="size-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
