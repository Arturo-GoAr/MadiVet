"use client";

import { createContext, useContext, useState } from "react";

export type ModalId = "newAppointment" | "newGrooming" | "adoptionRequest";
export type ModalProps = { onClose: () => void; params?: Record<string, string> };

type Registry = Record<ModalId, React.ComponentType<ModalProps>>;
type Open = { id: ModalId; params?: Record<string, string> };

const ModalContext = createContext<((id: ModalId, params?: Record<string, string>) => void) | null>(null);

// Un solo modal a la vez, por estado (la URL no cambia). El registro lo arma app/ para que las
// features abran modales de otras sin importarse entre sí.
export function ModalProvider({ modals, children }: { modals: Registry; children: React.ReactNode }) {
  const [current, setCurrent] = useState<Open | null>(null);
  const Active = current ? modals[current.id] : null;

  return (
    <ModalContext value={(id, params) => setCurrent({ id, params })}>
      {children}
      {Active && <Active onClose={() => setCurrent(null)} params={current?.params} />}
    </ModalContext>
  );
}

export function useOpenModal() {
  const open = useContext(ModalContext);
  if (!open) throw new Error("useOpenModal debe usarse dentro de <ModalProvider>");
  return open;
}
