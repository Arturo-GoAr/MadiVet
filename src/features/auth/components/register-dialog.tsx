"use client";

import { useState } from "react";
import { toast } from "sonner";
import { api } from "@/shared/api";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { useT } from "@/shared/i18n";
import { fieldClass, labelClass, primaryButtonClass } from "./field-styles";

export function RegisterDialog() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get("password") !== data.get("confirmPassword")) {
      setError(t.auth.passwordMismatch);
      return;
    }
    setError(null);
    try {
      await api("auth/register", {
        method: "POST",
        body: JSON.stringify({ nombre: data.get("fullName"), correo: data.get("email"), password: data.get("password") }),
      });
    } catch (err) {
      setError((err as Error).message);
      return;
    }
    toast.success(t.auth.accountCreated);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <button type="button" className="text-vet-link underline" />
        }
      >
        {t.auth.signUp}
      </DialogTrigger>
      <DialogContent className="max-w-[535px] gap-0 rounded-2xl bg-card px-[44px] py-[40px] ring-0 shadow-[0_4px_4px_rgba(0,0,0,0.25)] sm:max-w-[535px]">
        <DialogHeader className="items-center">
          <DialogTitle className="font-arvo text-[48px] font-normal leading-tight text-foreground">
            {t.auth.registerTitle}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="mt-8 grid gap-[18px]">
          <div className="grid gap-1.5">
            <Label htmlFor="fullName" className={labelClass}>
              {t.auth.fullName}
            </Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder={t.auth.fullNamePlaceholder}
              autoComplete="name"
              required
              className={fieldClass}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="reg-email" className={labelClass}>
              {t.common.email}
            </Label>
            <Input
              id="reg-email"
              name="email"
              type="email"
              placeholder={t.auth.emailPlaceholder}
              autoComplete="email"
              required
              className={fieldClass}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="reg-password" className={labelClass}>
              {t.common.password}
            </Label>
            <Input
              id="reg-password"
              name="password"
              type="password"
              placeholder={t.auth.newPasswordPlaceholder}
              autoComplete="new-password"
              minLength={8}
              required
              className={fieldClass}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="confirmPassword" className={labelClass}>
              {t.auth.confirmPassword}
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder={t.auth.newPasswordPlaceholder}
              autoComplete="new-password"
              required
              className={fieldClass}
            />
            {error && (
              <p role="alert" className="text-base text-destructive">
                {error}
              </p>
            )}
          </div>
          <Button type="submit" className={`${primaryButtonClass} mx-auto mt-2`}>
            {t.auth.register}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
