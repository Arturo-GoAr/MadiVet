"use client";

import { useSyncExternalStore } from "react";

export type Role = "client" | "staff";
export type Session = { id: string; name: string; email: string; phone: string | null; role: Role };

const TOKEN = "token";
const USER = "user";
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());
const subscribe = (l: () => void) => (listeners.add(l), () => void listeners.delete(l));

export const getToken = () => localStorage.getItem(TOKEN);

type ApiUser = { id: string; nombre: string; correo: string; telefono: string | null; rol: Role };

export function saveAuth(token: string, u: ApiUser) {
  const s: Session = { id: u.id, name: u.nombre, email: u.correo, phone: u.telefono, role: u.rol };
  localStorage.setItem(TOKEN, token);
  localStorage.setItem(USER, JSON.stringify(s));
  emit();
}

export function clearAuth() {
  localStorage.removeItem(TOKEN);
  localStorage.removeItem(USER);
  emit();
}

// useSyncExternalStore exige un snapshot estable: se compara el string crudo y se parsea aparte.
const raw = () => localStorage.getItem(USER);
const parse = (s: string | null) => (s ? (JSON.parse(s) as Session) : null);
let cache: { raw: string | null; value: Session | null } = { raw: null, value: null };
function snapshot() {
  const r = raw();
  if (r !== cache.raw) cache = { raw: r, value: parse(r) };
  return cache.value;
}

// undefined = aún sin hidratar (no redirigir todavía); null = sin sesión.
export function useSession(): Session | null | undefined {
  return useSyncExternalStore<Session | null | undefined>(subscribe, snapshot, () => undefined);
}
