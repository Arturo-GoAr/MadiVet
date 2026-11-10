"use client";

import Image from "next/image";
import { LocaleSwitcher, useT } from "@/shared/i18n";
import { LoginForm } from "../components/login-form";

export function LoginView() {
  const t = useT();
  return (
    <main className="relative grid min-h-screen overflow-hidden bg-vet-surface font-arvo lg:grid-cols-2">
      <div className="relative hidden lg:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/auth/circle.svg`}
          alt=""
          className="absolute -left-px -top-px h-[calc(100%+8px)] w-auto max-w-none"
        />
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/auth/logo.png`}
          alt={t.auth.logoAlt}
          width={599}
          height={599}
          priority
          className="absolute left-1/2 top-1/2 size-[min(599px,55vh)] -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div className="absolute right-4 top-4 z-10">
        <LocaleSwitcher />
      </div>
      <div className="flex items-center justify-center p-6">
        <LoginForm />
      </div>
    </main>
  );
}
