"use client";

import { clearAuth, getToken } from "@/shared/session";

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
export const REFRESH_EVENT = "madivet:refresh";

export class ApiError extends Error {
  constructor(message: string, readonly code: string, readonly status: number) {
    super(message);
  }
}

// Las respuestas del backend usan { codigo, mensaje } en los errores.
export async function api<T = unknown>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  const token = getToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);
  if (init.body && !(init.body instanceof FormData)) headers.set("Content-Type", "application/json");

  const res = await fetch(`${API_URL}/api/${path}`, { ...init, headers, cache: "no-store" });
  const payload = res.status === 204 ? null : await res.json().catch(() => null);

  if (!res.ok) {
    if (res.status === 403 && payload?.codigo === "INVALID_TOKEN") {
      clearAuth(); // AppShell redirige a /login al quedar sin sesión
    }
    throw new ApiError(payload?.mensaje ?? `HTTP ${res.status}`, payload?.codigo ?? "API_ERROR", res.status);
  }
  if ((init.method ?? "GET") !== "GET") window.dispatchEvent(new Event(REFRESH_EVENT));
  return payload as T;
}

// Los adjuntos requieren el token, así que no sirven como <img src>: se descargan como blob.
export async function fetchFile(url: string): Promise<Blob> {
  const res = await fetch(`${API_URL}${url}`, { headers: { Authorization: `Bearer ${getToken()}` } });
  if (!res.ok) throw new ApiError(`HTTP ${res.status}`, "FILE_ERROR", res.status);
  return res.blob();
}
