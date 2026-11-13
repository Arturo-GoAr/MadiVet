import { Suspense } from "react";
import { ClientDetailView } from "@/features/clients";
import { Skeleton } from "@/shared/ui/skeleton";

// DESACTIVADO: aún no funciona por el backend. Con `output: "export"` hacía falta pregenerar los ids desde los mocks
// (CLIENTS), que se reemplazaron por la API; sin mocks no hay lista de ids.
// export const generateStaticParams = () => CLIENTS.map(({ id }) => ({ id }));

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
