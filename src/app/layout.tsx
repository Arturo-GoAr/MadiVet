import type { Metadata } from "next";
import { Suspense } from "react";
import { Arvo, Baloo_2, Geist, Geist_Mono } from "next/font/google";
import "@/shared/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/shared/ui/tooltip";
import { Toaster } from "@/shared/ui/sonner";
import { defaultLocale, dictionaries, I18nProvider } from "@/shared/i18n";

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

export const metadata: Metadata = {
  title: "VetMadi",
  description: dictionaries[defaultLocale].meta.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${arvo.variable} ${baloo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-arvo">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <I18nProvider>
          <TooltipProvider>
            <Suspense>{children}</Suspense>
          </TooltipProvider>
          <Toaster />
        </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
