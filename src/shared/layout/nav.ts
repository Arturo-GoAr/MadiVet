import {
  CalendarDays,
  Dog,
  House,
  Lightbulb,
  type LucideIcon,
  MessagesSquare,
  PawPrint,
  Settings,
  Users,
} from "lucide-react";
import type { Dictionary } from "@/shared/i18n";
import type { Role } from "@/shared/session";

export type NavItem = {
  href: string;
  icon: LucideIcon;
  label: keyof Dictionary["screens"];
  roles?: Role[]; // omitido = todos
  bar?: boolean; // fijo en la bottom bar móvil; el resto va en "Más"
  bottom?: boolean; // anclado abajo en el sidebar
  search?: keyof Dictionary["shell"]["search"]; // la sección filtra con ?q=
  detailSearch?: keyof Dictionary["shell"]["search"]; // idem en sus subrutas (p. ej. el chat de /citas/[id])
  detail?: keyof Dictionary["screens"]; // nombre en el header para sus subrutas (p. ej. /citas/[id])
};

// Añadir una pantalla al menú = una línea aquí.
export const NAV: NavItem[] = [
  { href: "/dashboard", icon: House, label: "dashboard", bar: true },
  { href: "/citas", icon: CalendarDays, label: "appointments", bar: true, search: "appointments", detailSearch: "chats", detail: "appointmentDetail" },
  { href: "/chats", icon: MessagesSquare, label: "chats", bar: true, search: "chats" },
  { href: "/mascotas", icon: Dog, label: "pets", roles: ["client"], bar: true, search: "pets", detail: "petDetail" },
  { href: "/clientes", icon: Users, label: "clients", roles: ["staff"], bar: true, search: "clients", detail: "clientDetail" },
  { href: "/adopcion", icon: PawPrint, label: "adoption", search: "adoption" },
  { href: "/recomendaciones", icon: Lightbulb, label: "tips", search: "default" },
  { href: "/ajustes", icon: Settings, label: "settings", bottom: true },
];

export const navFor = (role: Role) => NAV.filter((i) => !i.roles || i.roles.includes(role));

export const isActive = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

// Nombre de la pantalla actual para el header; undefined fuera del menú (p. ej. login).
export function screenFor(pathname: string) {
  const item = NAV.find((i) => isActive(pathname, i.href));
  return item && (pathname === item.href ? item.label : (item.detail ?? item.label));
}

// TODO: URLs reales de la clínica
export const SOCIAL = { instagram: "#", facebook: "#" };
