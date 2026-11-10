"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useT } from "@/shared/i18n";
import { AppointmentInfo } from "../components/appointment-info";

// `chat` llega por slot desde la page para no importar de otra feature.
export function AppointmentDetailView({ id, chat }: { id: string; chat: React.ReactNode }) {
  const t = useT();

  return (
    <div className="grid gap-4">
      <Link href="/citas" className="flex w-fit items-center gap-1.5 text-sm text-vet-gray hover:text-black">
        <ArrowLeft className="size-4" />
        {t.screens.appointments}
      </Link>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
        <section className="content-start rounded-xl bg-white p-5 shadow-sm">
          <AppointmentInfo id={id} />
        </section>
        {chat}
      </div>
    </div>
  );
}
