import type { Metadata } from "next";
import { Suspense } from "react";
import { Arvo, Baloo_2, Geist, Geist_Mono } from "next/font/google";
import "@/shared/styles/globals.css";
import { TooltipProvider } from "@/shared/ui/tooltip";
import { Toaster } from "@/shared/ui/sonner";
import { I18nProvider } from "@/shared/i18n";
import { getDictionary, getLocale } from "@/shared/i18n/server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const arvo = Arvo({
  variable: "--next-arvo",
  subsets: ["latin"],
  weight: "400",
});

const baloo = Baloo_2({
  variable: "--next-baloo",
  subsets: ["latin"],
  weight: "800",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  return { title: "VetMadi", description: (await getDictionary()).meta.description };
}

async function LocaleShell({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider locale={await getLocale()}>
      <TooltipProvider>{children}</TooltipProvider>
    </I18nProvider>
  );
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${arvo.variable} ${baloo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-arvo">
        <Suspense>
          <LocaleShell>{children}</LocaleShell>
        </Suspense>
        <Toaster />
      </body>
    </html>
  );
}
