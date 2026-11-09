"use client";

import { Button } from "@/shared/ui/button";
import { setLocale } from "./actions";
import { locales } from "./config";
import { useLocale, useT } from "./provider";

export function LocaleSwitcher() {
  const locale = useLocale();
  const t = useT();

  return (
    <div role="group" aria-label={t.common.language} className="flex gap-1">
      {locales.map((l) => (
        <Button
          key={l}
          type="button"
          size="sm"
          variant={l === locale ? "default" : "ghost"}
          aria-pressed={l === locale}
          onClick={() => setLocale(l)}
        >
          {l.toUpperCase()}
        </Button>
      ))}
    </div>
  );
}
