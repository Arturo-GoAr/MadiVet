import { AdoptionRequestModal } from "@/features/adoption";
import { AppointmentDetailsModal, NewAppointmentModal, NewGroomingModal } from "@/features/appointments";
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
        appointmentDetails: AppointmentDetailsModal,
      }}
    >
      <AppShell session={await getSession()}>{children}</AppShell>
    </ModalProvider>
  );
}
