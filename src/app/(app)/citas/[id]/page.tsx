import { Suspense } from "react";
import { AppointmentDetailView, APPOINTMENTS } from "@/features/appointments";
import { ChatPanel } from "@/features/chat";
import { Skeleton } from "@/shared/ui/skeleton";

// Export estático: solo se generan las rutas de los mocks.
export const generateStaticParams = () => APPOINTMENTS.map(({ id }) => ({ id }));

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
