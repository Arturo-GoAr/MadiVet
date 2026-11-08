"use client";

import { useState } from "react";
import { toast } from "sonner";
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
import { fieldClass, labelClass, primaryButtonClass } from "./field-styles";

export function RegisterDialog() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get("password") !== data.get("confirmPassword")) {
      setError("Las contraseñas no coinciden");
      return;
    }
    setError(null);
    // TODO: conectar con el backend cuando exista
    toast.success("Cuenta creada");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <button type="button" className="text-vet-link underline" />
        }
      >
        Regístrate
      </DialogTrigger>
      <DialogContent className="max-w-[535px] gap-0 rounded-2xl bg-white px-[44px] py-[40px] ring-0 shadow-[0_4px_4px_rgba(0,0,0,0.25)] sm:max-w-[535px]">
        <DialogHeader className="items-center">
          <DialogTitle className="font-arvo text-[48px] font-normal leading-tight text-black">
            Crear cuenta
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="mt-8 grid gap-[18px]">
          <div className="grid gap-1.5">
            <Label htmlFor="fullName" className={labelClass}>
              Nombre Completo
            </Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="Ej. Ian Guillermo"
              autoComplete="name"
              required
              className={fieldClass}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="reg-email" className={labelClass}>
              Correo Electronico
            </Label>
            <Input
              id="reg-email"
              name="email"
              type="email"
              placeholder="Ej. ian@gmail.com"
              autoComplete="email"
              required
              className={fieldClass}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="reg-password" className={labelClass}>
              Contraseña
            </Label>
            <Input
              id="reg-password"
              name="password"
              type="password"
              placeholder="Ej. IanKwaiWuu123"
              autoComplete="new-password"
              minLength={8}
              required
              className={fieldClass}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="confirmPassword" className={labelClass}>
              Confirmar Contraseña
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Ej. IanKwaiWuu123"
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
            Registrarse
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
