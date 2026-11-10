"use client";

import { useSyncExternalStore } from "react";

export type Role = "client" | "staff";
export type Session = { name: string; role: Role };

const subscribe = () => () => {};

// shortcut: sesión falsa por cookie `role` (export estático, sin servidor), reemplazar al conectar el backend de auth
export function useSession(): Session {
  const role = useSyncExternalStore<Role>(
    subscribe,
    () => (/(?:^|; )role=staff/.test(document.cookie) ? "staff" : "client"),
    () => "client",
  );
  return { name: role === "staff" ? "Personal Mädi" : "Ian Guillermo", role };
}
