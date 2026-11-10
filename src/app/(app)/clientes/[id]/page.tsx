import { Suspense } from "react";
import { ClientDetailView, CLIENTS } from "@/features/clients";
import { Skeleton } from "@/shared/ui/skeleton";

// Export estático: solo se generan las rutas de los mocks.
export const generateStaticParams = () => CLIENTS.map(({ id }) => ({ id }));

async function Detail({ params }: { params: Promise<{ id: string }> }) {
  return <ClientDetailView id={(await params).id} />;
}

// `params` se lee dentro de Suspense para que la navegación sea instantánea.
export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<Skeleton className="h-64 rounded-xl" />}>
      <Detail params={params} />
    </Suspense>
  );
}
