"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/shared/api";
import { saveAuth } from "@/shared/session";
import { RegisterDialog } from "./register-dialog";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { useT } from "@/shared/i18n";

import { fieldClass, labelClass, primaryButtonClass } from "./field-styles";

export function LoginForm() {
  const t = useT();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    try {
      const { token, usuario } = await api<{ token: string; usuario: Parameters<typeof saveAuth>[1] }>("auth/login", {
        method: "POST",
        body: JSON.stringify({ correo: data.get("email"), password: data.get("password") }),
      });
      saveAuth(token, usuario);
      router.replace("/dashboard");
    } catch (err) {
      setError((err as Error).message);
    }
  }
  return (
    <section className="flex min-h-[714px] w-full max-w-[558px] flex-col rounded-2xl bg-card px-[43px] pt-[40px] pb-[46px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <header className="text-center">
        <h1 className="font-baloo text-[72px] leading-[1.1] text-foreground">
          VETMADI
        </h1>
        <p className="-mt-3 text-[32px] text-vet-gray">{t.auth.loginTitle}</p>
      </header>

      <form id="login-form" onSubmit={onSubmit} className="mt-[70px] grid gap-[18px]">
        <div className="grid gap-1.5">
          <Label htmlFor="email" className={labelClass}>
            {t.common.email}
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder={t.auth.emailPlaceholder}
            autoComplete="email"
            required
            className={fieldClass}
          />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="password" className={labelClass}>
            {t.common.password}
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder={t.auth.passwordPlaceholder}
            autoComplete="current-password"
            required
            className={fieldClass}
          />
        </div>
        {error && (
          <p role="alert" className="text-base text-destructive">
            {error}
          </p>
        )}
      </form>

      <div className="mt-[56px] flex flex-1 flex-col items-center gap-[36px]">
        <p className="text-center text-2xl leading-tight text-vet-gray">
          {t.auth.noAccount}
          <br />
          <RegisterDialog />
        </p>
        <Button
          type="submit"
          form="login-form"
          className={primaryButtonClass}
        >
          {t.auth.signIn}
        </Button>
      </div>
    </section>
  );
}
