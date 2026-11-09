"use client";

import { FormModal, type ModalProps } from "@/shared/modal";
import { AdoptionRequestForm } from "./adoption-request-form";

// params.pet = id de la mascota a preseleccionar.
export function AdoptionRequestModal({ onClose, params }: ModalProps) {
  return (
    <FormModal title="adoptionRequest" onClose={onClose}>
      <AdoptionRequestForm onDone={onClose} petId={params?.pet} />
    </FormModal>
  );
}
