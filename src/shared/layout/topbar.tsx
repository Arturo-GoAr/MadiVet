"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LocaleSwitcher, useT } from "@/shared/i18n";
import { ThemeSwitcher } from "@/shared/i18n/theme-switcher";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { screenFor } from "./nav";
import { SearchBox } from "./search-box";

// TODO: reemplazar por los assets del Figma en public/images/
export const Instagram = () => (
  <svg viewBox="0 0 24 24" className="size-8" aria-hidden>
    <defs>
      <linearGradient id="ig" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stopColor="#fd5" />
        <stop offset=".5" stopColor="#ff543e" />
        <stop offset="1" stopColor="#c837ab" />
      </linearGradient>
    </defs>
    <rect width="24" height="24" rx="6" fill="url(#ig)" />
    <rect x="5" y="5" width="14" height="14" rx="4" fill="none" stroke="#fff" strokeWidth="1.6" />
    <circle cx="12" cy="12" r="3.2" fill="none" stroke="#fff" strokeWidth="1.6" />
    <circle cx="16.2" cy="7.8" r=".9" fill="#fff" />
  </svg>
);

export const Facebook = () => (
  <svg viewBox="0 0 24 24" className="size-8" aria-hidden>
    <circle cx="12" cy="12" r="12" fill="#0866ff" />
    <path fill="#fff" d="M13.3 24v-8.6h2.9l.5-3.4h-3.4V9.9c0-1 .4-1.7 1.8-1.7h1.7V5.1c-.3 0-1.4-.1-2.6-.1-2.6 0-4.3 1.6-4.3 4.4V12H7v3.4h2.9V24z" />
  </svg>
);

export function Topbar({ name }: { name: string }) {
  const t = useT();
  const pathname = usePathname();
  const screen = screenFor(pathname);

  return (
    <header className="flex h-16 shrink-0 items-center gap-3 bg-card px-4 md:h-20 md:px-6">
      <Link href="/dashboard" className="hidden font-baloo text-2xl leading-none sm:block md:text-4xl" aria-label="VetMadi">
        <span className="text-vet-teal">VET</span>
        <span className="text-vet-red">MADI</span>
      </Link>
      {screen && <span className="min-w-0 truncate text-lg sm:border-l sm:pl-3 md:text-xl">{t.screens[screen]}</span>}
      <div className="flex flex-1 justify-center">
        <Suspense>
          <SearchBox key={pathname} />
        </Suspense>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger aria-label={name} className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-vet-lilac">
          <Avatar size="lg">
            <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuLabel>{name}</DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuItem render={<Link href="/ajustes" />}>{t.shell.profile}</DropdownMenuItem>
          <div className="px-1.5 py-1">
            <LocaleSwitcher />
          </div>
          <div className="px-1.5 py-1">
            <ThemeSwitcher />
          </div>
          <DropdownMenuSeparator />
          {/* TODO: cerrar sesión real al conectar el backend de auth */}
          <DropdownMenuItem render={<Link href="/login" />}>{t.shell.signOut}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
