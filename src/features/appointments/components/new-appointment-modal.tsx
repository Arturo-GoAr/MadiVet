"use client";

import { FormModal, type ModalProps } from "@/shared/modal";
import { AppointmentForm } from "./appointment-form";
import { GroomingForm } from "./grooming-form";

export function NewAppointmentModal({ onClose }: ModalProps) {
  return (
    <FormModal title="newAppointment" onClose={onClose}>
      <AppointmentForm onDone={onClose} />
    </FormModal>
  );
}

export function NewGroomingModal({ onClose }: ModalProps) {
  return (
    <FormModal title="newGrooming" onClose={onClose}>
      <GroomingForm onDone={onClose} />
    </FormModal>
  );
}
