"use client";

import { useTheme } from "next-themes";
import { Button } from "@/shared/ui/button";
import { useT } from "./provider";

export function ThemeSwitcher() {
  const { theme = "system", setTheme } = useTheme();
  const t = useT();
  const options = [
    ["light", t.common.themeLight],
    ["dark", t.common.themeDark],
    ["system", t.common.themeSystem],
  ] as const;

  return (
    <div role="group" aria-label={t.common.theme} className="flex gap-1">
      {options.map(([value, label]) => (
        <Button
          key={value}
          type="button"
          size="sm"
          variant={value === theme ? "default" : "ghost"}
          aria-pressed={value === theme}
          onClick={() => setTheme(value)}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
