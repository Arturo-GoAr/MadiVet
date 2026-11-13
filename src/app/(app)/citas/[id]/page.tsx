import { Suspense } from "react";
import { AppointmentDetailView } from "@/features/appointments";
import { ChatPanel } from "@/features/chat";
import { Skeleton } from "@/shared/ui/skeleton";

// DESACTIVADO: aún no funciona por el backend. Con `output: "export"` hacía falta pregenerar los ids desde los mocks
// (APPOINTMENTS), que se reemplazaron por la API; sin mocks no hay lista de ids.
// export const generateStaticParams = () => APPOINTMENTS.map(({ id }) => ({ id }));

async function Detail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <AppointmentDetailView id={id} chat={<ChatPanel appointmentId={id} />} />;
}

// `params` se lee dentro de Suspense para que la navegación a la cita sea instantánea.
export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<Skeleton className="h-[70dvh] rounded-xl" />}>
      <Detail params={params} />
    </Suspense>
  );
}
