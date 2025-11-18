"use client";

import type { ReactNode } from "react";
import ProtectedHeader from "./_components/ProtectedHeader";
import ElmaSideMenu from "./_components/ElmaSideMenu";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider defaultOpen>
      <ElmaSideMenu />
      <SidebarInset className="bg-dots">
        <ProtectedHeader />
        <main className="px-2 py-2">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
 

