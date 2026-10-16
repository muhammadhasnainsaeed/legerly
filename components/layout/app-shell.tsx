import type { ReactNode } from "react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { TopNav } from "@/components/layout/top-nav";

export function AppShell({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-[#fafaff]">
    <AppSidebar />
    <div className="min-h-screen lg:pl-60"><TopNav /><main className="mx-auto w-full max-w-[1440px] px-4 py-7 sm:px-7 lg:px-9 lg:py-9">{children}</main><footer className="px-4 pb-6 text-center text-xs text-slate-400 sm:px-7 lg:px-9">Ledgerly is a frontend demo. All balances and activity are fictional.</footer></div>
  </div>;
}
