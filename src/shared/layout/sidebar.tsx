"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useT } from "@/shared/i18n";
import { cn } from "@/shared/lib/utils";
import type { Role } from "@/shared/session";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { isActive, navFor } from "./nav";

export function Sidebar({ role }: { role: Role }) {
  const t = useT();
  const pathname = usePathname();

  return (
    <nav
      aria-label={t.shell.mainNav}
      className="hidden w-[4.5rem] shrink-0 flex-col items-center gap-3 bg-white py-2 md:flex"
    >
      {navFor(role).map(({ href, icon: Icon, label, bottom }) => {
        const active = isActive(pathname, href);
        const text = t.screens[label];
        return (
          <Tooltip key={href}>
            <TooltipTrigger
              render={
                <Link
                  href={href}
                  aria-label={text}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "grid size-12 place-items-center rounded-2xl bg-vet-surface text-vet-gray transition-colors hover:bg-vet-lilac/50 hover:text-black",
                    active && "bg-vet-lilac text-black",
                    bottom && "mt-auto",
                  )}
                />
              }
            >
              <Icon className="size-6" />
            </TooltipTrigger>
            <TooltipContent side="right">{text}</TooltipContent>
          </Tooltip>
        );
      })}
    </nav>
  );
}
