import { DashboardView } from "@/features/kpis";
import { getSession } from "@/shared/session";

export default async function Page() {
  return <DashboardView role={(await getSession()).role} />;
}
