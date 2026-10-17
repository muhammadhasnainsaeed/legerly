"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { Plus, ShieldCheck } from "lucide-react";
import { AccountCard } from "@/components/dashboard/account-card";
import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { accounts, isDemoBank, type Account } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/formatters";

const DEMO_CONNECTED_ACCOUNT: Account = {
  id: "demo-connected",
  name: "",
  type: "Checking",
  number: "•••• 0192",
  balance: 5640,
  available: 5640,
  color: "account-indigo",
  updated: "Updated just now",
};

let cachedBank: string | null | undefined;
let cachedAccount: Account | null;

function readConnectedAccount(): Account | null {
  if (typeof window === "undefined") return null;
  const bank = window.localStorage.getItem("ledgerly-connected-bank");
  if (bank === cachedBank) return cachedAccount ?? null;
  cachedBank = bank;
  cachedAccount = bank && isDemoBank(bank) ? { ...DEMO_CONNECTED_ACCOUNT, name: `${bank} checking` } : null;
  return cachedAccount;
}

function subscribeToConnectedBank(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
}

export function AccountsPage() {
  const connectedAccount = useSyncExternalStore(
    subscribeToConnectedBank,
    readConnectedAccount,
    () => null,
  );
  const displayedAccounts = connectedAccount ? [...accounts, connectedAccount] : accounts;
  const total = displayedAccounts.reduce((sum, account) => sum + account.balance, 0);
  return <>
    <PageHeader eyebrow="Your money, together" title="Accounts" description="See all your demo accounts and their current balances." action={<Button asChild><Link href="/onboarding"><Plus className="mr-2 h-4 w-4" />Connect account</Link></Button>} />
    <div className="mb-7 grid gap-4 sm:grid-cols-3">
      <Card><CardContent className="p-5"><p className="text-sm text-slate-500">Net account balance</p><p className="mt-2 text-2xl font-semibold">{formatCurrency(total)}</p></CardContent></Card>
      <Card><CardContent className="p-5"><p className="text-sm text-slate-500">Deposit accounts</p><p className="mt-2 text-2xl font-semibold">{displayedAccounts.filter((account) => account.type !== "Credit card").length}</p></CardContent></Card>
      <Card><CardContent className="p-5"><p className="text-sm text-slate-500">Credit accounts</p><p className="mt-2 text-2xl font-semibold">1</p></CardContent></Card>
    </div>
    <div className="mb-3 flex items-center justify-between"><h2 className="text-base font-semibold">All accounts <span className="ml-1 text-sm font-normal text-slate-500">({displayedAccounts.length})</span></h2><span className="flex items-center gap-1.5 text-xs text-slate-500"><ShieldCheck className="h-3.5 w-3.5" />Demo balances</span></div>
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{displayedAccounts.map((account) => <AccountCard key={account.id} account={account} />)}</div>
    <p className="mt-6 text-xs text-slate-500">Account balances update only when the demo is refreshed. No financial institution is connected.</p>
  </>;
}
