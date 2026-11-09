import { SettingsView } from "@/features/settings";
import { getSession } from "@/shared/session";

export default async function Page() {
  const { name, role } = await getSession();
  return <SettingsView name={name} role={role} />;
}
