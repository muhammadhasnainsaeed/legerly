"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Bell, CalendarDays, Check, ChevronDown, HelpCircle, LogOut, Settings2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const pageLabels: Record<string, string> = {
  "/": "Overview", "/my-banks": "Accounts", "/transaction-history": "Activity", "/payment-transfer": "Transfers", "/bills": "Bills", "/insights": "Insights", "/settings": "Settings", "/onboarding": "Connect an account",
};

export function TopNav() {
  const [dateRange, setDateRange] = useState("Oct 1 – Oct 31, 2026");
  const pathname = usePathname();
  const page = pageLabels[pathname] ?? "Ledgerly";
  return <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-[#f8f9fc]/95 backdrop-blur">
    <div className="flex h-16 items-center gap-3 px-4 sm:px-7 lg:px-9">
      <div className="lg:hidden"><Link href="/" className="flex items-center gap-2 font-semibold"><span className="grid h-8 w-8 place-items-center rounded-lg bg-violet-600 text-xs text-white">L</span></Link></div>
      <div className="hidden sm:block"><p className="text-xs font-medium text-slate-500">Personal workspace</p><p className="mt-0.5 text-sm font-semibold text-slate-900">{page}</p></div>
      <div className="ml-auto flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild><Button variant="ghost" className="hidden h-9 gap-2 px-2.5 text-xs text-slate-600 sm:inline-flex"><CalendarDays className="h-4 w-4" />{dateRange}<ChevronDown className="h-3.5 w-3.5 text-slate-400" /></Button></DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onSelect={() => setDateRange("Oct 1 – Oct 31, 2026")}><span>This month</span>{dateRange.startsWith("Oct") && <Check className="ml-auto h-3.5 w-3.5" />}</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setDateRange("Sep 1 – Sep 30, 2026")}><span>Last month</span>{dateRange.startsWith("Sep") && <Check className="ml-auto h-3.5 w-3.5" />}</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setDateRange("Oct 10 – Oct 16, 2026")}><span>Last 7 days</span>{dateRange.startsWith("Oct 10") && <Check className="ml-auto h-3.5 w-3.5" />}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" aria-label="Notifications" className="relative text-slate-600"><Bell className="h-4 w-4" /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-violet-500 ring-2 ring-white" /></Button></DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72 p-2">
            <p className="px-2 py-1.5 text-sm font-semibold">Notifications</p><DropdownMenuSeparator />
            <DropdownMenuItem className="items-start gap-2 py-2.5"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-violet-500" /><span><span className="block font-medium">A few bills are coming up</span><span className="mt-0.5 block text-xs text-slate-500">Four demo bills are due this month.</span></span></DropdownMenuItem>
            <DropdownMenuItem className="items-start gap-2 py-2.5"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500" /><span><span className="block font-medium">Spending is trending down</span><span className="mt-0.5 block text-xs text-slate-500">You’re 12% below last month so far.</span></span></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild><Button variant="ghost" className="h-10 gap-2 px-2"><Avatar className="h-8 w-8"><AvatarFallback className="bg-violet-100 text-xs text-violet-700">HS</AvatarFallback></Avatar><span className="hidden text-left sm:block"><span className="block text-xs font-semibold">Hasnain Saeed</span><span className="block text-[11px] text-slate-500">Personal account</span></span><ChevronDown className="hidden h-3.5 w-3.5 text-slate-400 sm:block" /></Button></DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuItem asChild><Link href="/settings"><Settings2 className="mr-2 h-4 w-4" />Settings</Link></DropdownMenuItem>
            <DropdownMenuItem><HelpCircle className="mr-2 h-4 w-4" />Help center</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><Link href="/sign-in" onClick={() => window.localStorage.removeItem("ledgerly-demo")}><LogOut className="mr-2 h-4 w-4" />Exit demo</Link></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </header>;
}
