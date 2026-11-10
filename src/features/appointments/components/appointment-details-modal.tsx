"use client";

import { FormModal, type ModalProps } from "@/shared/modal";
import { AppointmentInfo } from "./appointment-info";

export function AppointmentDetailsModal({ onClose, params }: ModalProps) {
  return (
    <FormModal title="appointmentDetail" onClose={onClose}>
      <AppointmentInfo id={params?.id ?? ""} />
    </FormModal>
  );
}
