"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Activity, ArrowLeftRight, BarChart3, CircleHelp, LayoutDashboard, ReceiptText, Settings2, WalletCards } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "Overview", href: "/", icon: LayoutDashboard },
  { label: "Accounts", href: "/my-banks", icon: WalletCards },
  { label: "Activity", href: "/transaction-history", icon: Activity },
  { label: "Transfers", href: "/payment-transfer", icon: ArrowLeftRight },
  { label: "Bills", href: "/bills", icon: ReceiptText },
  { label: "Insights", href: "/insights", icon: BarChart3 },
];

function Navigation({ close }: { close?: () => void }) {
  const pathname = usePathname();
  return <nav aria-label="Main navigation" className="space-y-1">{navigation.map(({ label, href, icon: Icon }) => {
    const active = href === "/" ? pathname === href : pathname.startsWith(href);
    return <Link key={href} href={href} onClick={close} aria-current={active ? "page" : undefined} className={cn("flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors", active ? "bg-violet-50 text-violet-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950")}><Icon className="h-4 w-4" />{label}</Link>;
  })}</nav>;
}

function SidebarBody({ close }: { close?: () => void }) {
  return <div className="flex h-full flex-col">
    <Link href="/" className="mb-9 flex items-center gap-2.5 px-1" onClick={close}>
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-violet-600 text-white"><WalletCards className="h-[18px] w-[18px]" /></span>
      <span className="text-lg font-semibold tracking-tight">Ledgerly</span>
    </Link>
    <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[.12em] text-slate-400">Workspace</p>
    <Navigation close={close} />
    <div className="mt-auto space-y-1 border-t pt-5">
      <Link href="/settings" onClick={close} className="flex h-9 items-center gap-3 rounded-lg px-3 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-950"><CircleHelp className="h-4 w-4" />Help center</Link>
      <Link href="/settings" onClick={close} className="flex h-9 items-center gap-3 rounded-lg px-3 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-950"><Settings2 className="h-4 w-4" />Settings</Link>
      <div className="mt-4 flex items-center gap-2.5 rounded-xl bg-slate-50 p-3">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-violet-100 text-xs font-semibold text-violet-700">HS</span>
        <span className="min-w-0"><span className="block truncate text-xs font-semibold text-slate-800">Hasnain Saeed</span><span className="block truncate text-[11px] text-slate-500">Personal workspace</span></span>
      </div>
    </div>
  </div>;
}

export function AppSidebar() {
  const [open, setOpen] = useState(false);
  return <>
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 border-r bg-white px-4 py-6 lg:block"><SidebarBody /></aside>
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild><Button variant="outline" size="icon" aria-label="Open navigation"><span className="flex flex-col gap-1"><span className="h-0.5 w-4 bg-slate-700" /><span className="h-0.5 w-4 bg-slate-700" /><span className="h-0.5 w-4 bg-slate-700" /></span></Button></SheetTrigger>
        <SheetContent side="left" className="p-5"><SheetTitle className="sr-only">Ledgerly navigation</SheetTitle><SheetDescription className="sr-only">Navigate between your demo finance pages.</SheetDescription><SidebarBody close={() => setOpen(false)} /></SheetContent>
      </Sheet>
    </div>
  </>;
}
