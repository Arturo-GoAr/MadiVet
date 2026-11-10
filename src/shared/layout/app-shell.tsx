"use client";

import { useSession } from "@/shared/session";
import { BottomBar } from "./bottom-bar";
import { Footer } from "./footer";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

// Solo <main> hace scroll: topbar, sidebar y bottom bar quedan fijos.
export function AppShell({ children }: { children: React.ReactNode }) {
  const session = useSession();
  return (
    <div className="flex h-dvh flex-col bg-vet-surface">
      <Topbar name={session.name} />
      <div className="flex min-h-0 flex-1">
        <Sidebar role={session.role} />
        <div className="flex min-w-0 flex-1 flex-col">
          <main className="min-h-0 flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
          <Footer />
        </div>
      </div>
      <BottomBar role={session.role} />
    </div>
  );
}
