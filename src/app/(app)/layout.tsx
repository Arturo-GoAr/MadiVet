import { AdoptionRequestModal } from "@/features/adoption";
import { AppointmentDetailsModal, NewAppointmentModal, NewGroomingModal } from "@/features/appointments";
import { AppShell } from "@/shared/layout";
import { ModalProvider } from "@/shared/modal";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider
      modals={{
        newAppointment: NewAppointmentModal,
        newGrooming: NewGroomingModal,
        adoptionRequest: AdoptionRequestModal,
        appointmentDetails: AppointmentDetailsModal,
      }}
    >
      <AppShell>{children}</AppShell>
    </ModalProvider>
  );
}
