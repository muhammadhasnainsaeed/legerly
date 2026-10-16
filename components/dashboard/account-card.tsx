"use client";

import { ArrowUpRight, CreditCard, Landmark, Wallet } from "lucide-react";
import type { Account } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/formatters";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const accountIcon = (type: string) => type === "Checking" ? Landmark : type === "Savings" ? Wallet : CreditCard;

export function AccountCard({ account }: { account: Account }) {
  const Icon = accountIcon(account.type);
  return <Dialog>
    <Card className="group overflow-hidden p-5 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-lg bg-slate-100 text-slate-700"><Icon className="h-5 w-5" /></span><div><p className="font-medium text-slate-900">{account.name}</p><p className="mt-0.5 text-xs text-slate-500">{account.type} · {account.number}</p></div></div><DialogTrigger asChild><Button variant="ghost" size="icon" aria-label={`View details for ${account.name}`} className="h-8 w-8"><ArrowUpRight className="h-4 w-4 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Button></DialogTrigger></div>
      <div className="mt-8 flex items-end justify-between"><div><p className="text-xs text-slate-500">{account.type === "Credit card" ? "Current balance" : "Available balance"}</p><p className="mt-1 text-2xl font-semibold tracking-tight">{formatCurrency(Math.abs(account.balance))}</p></div><Badge variant="outline" className="font-normal">•• {account.number.slice(-4)}</Badge></div>
      <div className={`mt-5 h-1.5 rounded-full ${account.color}`} />
    </Card>
    <DialogContent>
      <DialogHeader><DialogTitle>{account.name}</DialogTitle><DialogDescription>Fictional account details for the Ledgerly demo.</DialogDescription></DialogHeader>
      <div className="rounded-lg bg-slate-50 p-4"><p className="text-xs text-slate-500">Current balance</p><p className="mt-1 text-3xl font-semibold">{formatCurrency(Math.abs(account.balance))}</p><div className="mt-4 grid grid-cols-2 gap-3 text-sm"><div><p className="text-xs text-slate-500">Account type</p><p className="mt-1 font-medium">{account.type}</p></div><div><p className="text-xs text-slate-500">Account number</p><p className="mt-1 font-medium">{account.number}</p></div><div><p className="text-xs text-slate-500">Available</p><p className="mt-1 font-medium">{formatCurrency(account.available)}</p></div><div><p className="text-xs text-slate-500">Last updated</p><p className="mt-1 font-medium">{account.updated.replace("Updated ", "")}</p></div></div></div>
    </DialogContent>
  </Dialog>;
}
