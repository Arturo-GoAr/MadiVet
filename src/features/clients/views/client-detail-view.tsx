"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useT } from "@/shared/i18n";
import { CLIENTS } from "../mocks";

export function ClientDetailView({ id }: { id: string }) {
  const t = useT();
  const client = CLIENTS.find((c) => c.id === id);
  if (!client) notFound();

  return (
    <div className="grid gap-4">
      <Link href="/clientes" className="flex w-fit items-center gap-1.5 text-sm text-vet-gray hover:text-black">
        <ArrowLeft className="size-4" />
        {t.screens.clients}
      </Link>
      <section className="rounded-xl bg-white p-5 shadow-sm">
        <h1 className="text-2xl">{client.name}</h1>
        <dl className="mt-4 grid gap-3">
          <div>
            <dt className="text-xs uppercase text-vet-gray">{t.clients.phone}</dt>
            <dd>{client.phone}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase text-vet-gray">{t.clients.pets}</dt>
            <dd>{client.pets.join(", ")}</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
