import { AdoptionRequestModal } from "@/features/adoption";
import { NewAppointmentModal, NewGroomingModal } from "@/features/appointments";
import { AppShell } from "@/shared/layout";
import { ModalProvider } from "@/shared/modal";
import { getSession } from "@/shared/session";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider
      modals={{
        newAppointment: NewAppointmentModal,
        newGrooming: NewGroomingModal,
        adoptionRequest: AdoptionRequestModal,
      }}
    >
      <AppShell session={await getSession()}>{children}</AppShell>
    </ModalProvider>
  );
}
