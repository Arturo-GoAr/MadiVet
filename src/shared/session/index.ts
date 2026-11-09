import "server-only";
import { cookies } from "next/headers";

export type Role = "client" | "staff";
export type Session = { name: string; role: Role };

// shortcut: sesión falsa por cookie `role`, reemplazar al conectar el backend de auth
export async function getSession(): Promise<Session> {
  const role = (await cookies()).get("role")?.value === "staff" ? "staff" : "client";
  return { name: role === "staff" ? "Personal Mädi" : "Ian Guillermo", role };
}
