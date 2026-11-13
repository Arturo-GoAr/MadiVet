"use client";

import { useT } from "@/shared/i18n";
import type { Dictionary } from "@/shared/i18n";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog";

export function FormModal({
  title,
  onClose,
  children,
}: {
  title: keyof Dictionary["screens"];
  onClose: () => void;
  children: React.ReactNode;
}) {
  const t = useT();
  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90dvh] gap-6 overflow-y-auto rounded-2xl bg-card p-8 ring-0 shadow-[0_4px_4px_rgba(0,0,0,0.25)] sm:max-w-xl">
        <DialogHeader className="items-center">
          <DialogTitle className="font-arvo text-3xl font-normal uppercase">{t.screens[title]}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
