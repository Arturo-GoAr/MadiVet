import { Suspense } from "react";
import { PetDetailView } from "@/features/pets";
import { Skeleton } from "@/shared/ui/skeleton";

async function Detail({ params }: { params: Promise<{ id: string }> }) {
  return <PetDetailView id={(await params).id} />;
}

// `params` se lee dentro de Suspense para que la navegación sea instantánea.
export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<Skeleton className="h-64 rounded-xl" />}>
      <Detail params={params} />
    </Suspense>
  );
}
