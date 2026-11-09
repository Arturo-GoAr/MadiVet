"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Ellipsis } from "lucide-react";
import { useT } from "@/shared/i18n";
import { cn } from "@/shared/lib/utils";
import type { Role } from "@/shared/session";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/ui/sheet";
import { isActive, navFor } from "./nav";

const tab = "flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] text-vet-gray";

export function BottomBar({ role }: { role: Role }) {
  const t = useT();
  const pathname = usePathname();
  const items = navFor(role);
  const more = items.filter((i) => !i.bar);

  return (
    <nav aria-label={t.shell.mainNav} className="flex border-t bg-white md:hidden">
      {items
        .filter((i) => i.bar)
        .map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            aria-current={isActive(pathname, href) ? "page" : undefined}
            className={cn(tab, isActive(pathname, href) && "font-bold text-black")}
          >
            <Icon className="size-6" />
            {t.screens[label]}
          </Link>
        ))}
      <Sheet>
        <SheetTrigger className={tab}>
          <Ellipsis className="size-6" />
          {t.shell.more}
        </SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>{t.shell.more}</SheetTitle>
          </SheetHeader>
          <ul className="grid gap-1 p-2 pt-0">
            {more.map(({ href, icon: Icon, label }) => (
              <li key={href}>
                <SheetClose
                  render={
                    <Link
                      href={href}
                      className={cn(
                        "flex items-center gap-3 rounded-xl p-3 text-base hover:bg-vet-surface",
                        isActive(pathname, href) && "bg-vet-lilac",
                      )}
                    />
                  }
                >
                  <Icon className="size-5" />
                  {t.screens[label]}
                </SheetClose>
              </li>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
