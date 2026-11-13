"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useT } from "@/shared/i18n";
import { useApi } from "@/shared/api";

type Client = { id: string; nombre: string; mascotas: string[] };

export function ClientsView() {
  const t = useT();
  const q = (useSearchParams().get("q") ?? "").toLowerCase();
  const { data } = useApi<{ clientes: Client[] }>("clients");
  const clients = (data?.clientes ?? []).filter((c) => `${c.nombre} ${c.mascotas.join(" ")}`.toLowerCase().includes(q));

  if (clients.length === 0) return <p className="rounded-xl bg-card p-6 text-center text-vet-gray shadow-sm">{t.clients.empty}</p>;

  return (
    <ul className="divide-y rounded-xl bg-card shadow-sm">
      {clients.map((c) => (
        <li key={c.id}>
          <Link href={`/clientes/${c.id}`} className="block p-4 hover:bg-vet-surface">
            <span className="block">{c.nombre}</span>
            <span className="block text-sm text-vet-gray">{c.mascotas.join(", ")}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
