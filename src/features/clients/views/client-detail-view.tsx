"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useT } from "@/shared/i18n";
import { useApi } from "@/shared/api";
import { Skeleton } from "@/shared/ui/skeleton";

type Client = { id: string; nombre: string; telefono: string | null; mascotas: { id: string; nombre: string }[] };

export function ClientDetailView({ id }: { id: string }) {
  const t = useT();
  const { data, error } = useApi<{ cliente: Client }>(`clients/${id}`);
  const client = data?.cliente;

  return (
    <div className="grid gap-4">
      <Link href="/clientes" className="flex w-fit items-center gap-1.5 text-sm text-vet-gray hover:text-foreground">
        <ArrowLeft className="size-4" />
        {t.screens.clients}
      </Link>
      {error && <p className="text-vet-gray">{error.message}</p>}
      {!client ? (
        !error && <Skeleton className="h-40 rounded-xl" />
      ) : (
      <section className="rounded-xl bg-card p-5 shadow-sm">
        <h1 className="text-2xl">{client.nombre}</h1>
        <dl className="mt-4 grid gap-3">
          <div>
            <dt className="text-xs uppercase text-vet-gray">{t.clients.phone}</dt>
            <dd>{client.telefono ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase text-vet-gray">{t.clients.pets}</dt>
            <dd>{client.mascotas.map((m) => m.nombre).join(", ")}</dd>
          </div>
        </dl>
      </section>
      )}
    </div>
  );
}
