import type { Metadata } from "next";
import { Arvo, Baloo_2, Geist, Geist_Mono } from "next/font/google";
import "@/shared/styles/globals.css";
import { TooltipProvider } from "@/shared/ui/tooltip";
import { Toaster } from "@/shared/ui/sonner";

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
  description: "Control de citas para las mascotas de Clínica Veterinaria Mädi",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${arvo.variable} ${baloo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-arvo">
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
      </body>
    </html>
  );
}
