"use client";

import { useT } from "@/shared/i18n";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Label } from "@/shared/ui/label";

export const fieldClass = "w-full rounded-none border-0 bg-vet-field px-2 text-base text-black placeholder:text-vet-gray";
export const inputClass = `${fieldClass} h-10`;

export function Field({ id, label, className, children }: { id: string; label: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("grid content-start gap-1.5", className)}>
      <Label htmlFor={id} className="text-sm font-normal uppercase text-vet-gray">
        {label}
      </Label>
      {children}
    </div>
  );
}

// <select> nativo: funciona con FormData y `required` sin código extra.
export function NativeSelect({ id, options, defaultValue = "" }: { id: string; options: { value: string; label: string }[]; defaultValue?: string }) {
  const t = useT();
  return (
    <select id={id} name={id} required defaultValue={defaultValue} className={inputClass}>
      <option value="" disabled>
        {t.common.choose}
      </option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function SubmitButton({ className }: { className?: string }) {
  const t = useT();
  return (
    <Button type="submit" className={cn("h-12 rounded-full bg-vet-teal text-lg uppercase text-white hover:bg-vet-teal/90", className)}>
      {t.common.submit}
    </Button>
  );
}
