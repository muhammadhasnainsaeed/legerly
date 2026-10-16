"use client";

import { useState } from "react";
import { CalendarDays, Check, CreditCard, ReceiptText } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { bills as demoBills } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/formatters";

type Bill = (typeof demoBills)[number];

export function BillsPage() {
  const [items, setItems] = useState(demoBills);
  const [selected, setSelected] = useState<Bill | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const upcoming = items.filter((bill) => bill.status === "Upcoming");
  const paid = items.filter((bill) => bill.status === "Paid");
  const closeDialog = (open: boolean) => { if (!open) { setSelected(null); setConfirmed(false); } };
  const markDemoPaid = () => {
    if (!selected) return;
    setItems((current) => current.map((bill) => bill.id === selected.id ? { ...bill, status: "Paid" } : bill));
    setConfirmed(true);
  };
  const billCard = (bill: Bill) => <button key={bill.id} onClick={() => setSelected(bill)} className="w-full rounded-xl border bg-white p-4 text-left transition-colors hover:border-violet-200 hover:bg-violet-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500">
    <div className="flex items-start gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-600"><ReceiptText className="h-4 w-4" /></span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center justify-between gap-2"><span className="font-medium">{bill.name}</span><Badge variant={bill.status === "Paid" ? "success" : "warning"}>{bill.status}</Badge></div><p className="mt-1 text-xs text-slate-500">{bill.provider} · {bill.category}</p><div className="mt-3 flex items-center justify-between"><span className="flex items-center gap-1.5 text-xs text-slate-500"><CalendarDays className="h-3.5 w-3.5" />Due {bill.due}</span><span className="text-sm font-semibold">{formatCurrency(bill.amount)}</span></div></div></div>
  </button>;

  return <>
    <PageHeader eyebrow="Plan ahead" title="Bills & subscriptions" description="Stay ahead of upcoming payments and recurring subscriptions." />
    <div className="mb-6 grid gap-4 sm:grid-cols-3">
      <Card><CardContent className="p-5"><p className="text-sm text-slate-500">Due in the next 14 days</p><p className="mt-2 text-2xl font-semibold">{formatCurrency(upcoming.reduce((total, bill) => total + bill.amount, 0))}</p></CardContent></Card>
      <Card><CardContent className="p-5"><p className="text-sm text-slate-500">Upcoming bills</p><p className="mt-2 text-2xl font-semibold">{upcoming.length}</p></CardContent></Card>
      <Card><CardContent className="p-5"><p className="text-sm text-slate-500">Paid this month</p><p className="mt-2 text-2xl font-semibold">{paid.length}</p></CardContent></Card>
    </div>
    <div className="grid gap-6 lg:grid-cols-2">
      <Card><CardContent className="p-5"><div className="mb-4 flex items-center justify-between"><div><h2 className="font-semibold">Upcoming</h2><p className="mt-1 text-xs text-slate-500">Your next payments</p></div><Badge variant="outline">{upcoming.length}</Badge></div><div className="space-y-3">{upcoming.length ? upcoming.map(billCard) : <div className="rounded-lg border border-dashed p-8 text-center text-sm text-slate-500">You’re all caught up. No upcoming demo bills.</div>}</div></CardContent></Card>
      <Card><CardContent className="p-5"><div className="mb-4 flex items-center justify-between"><div><h2 className="font-semibold">Paid this month</h2><p className="mt-1 text-xs text-slate-500">Completed in this demo</p></div><Badge variant="success">{paid.length} paid</Badge></div><div className="space-y-3">{paid.length ? paid.map(billCard) : <div className="rounded-lg border border-dashed p-8 text-center text-sm text-slate-500">No demo payments yet.</div>}</div></CardContent></Card>
    </div>
    <p className="mt-5 text-xs text-slate-500">Bill confirmations change this screen only. No payment is sent or scheduled.</p>
    <Dialog open={selected !== null} onOpenChange={closeDialog}><DialogContent><DialogHeader><DialogTitle>{confirmed ? "Demo payment recorded" : selected?.name}</DialogTitle><DialogDescription>{confirmed ? "The bill is marked as paid in this temporary demo session. No money moved." : "Review this fictional recurring payment. You can mark it paid in the demo."}</DialogDescription></DialogHeader>{selected && <div className="rounded-lg border p-4"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-md bg-slate-100"><CreditCard className="h-4 w-4" /></span><div className="flex-1"><p className="text-sm font-medium">{selected.provider}</p><p className="text-xs text-slate-500">{selected.category} · Due {selected.due}</p></div><p className="font-semibold">{formatCurrency(selected.amount)}</p></div><Separator className="my-4" /><p className="text-xs leading-5 text-slate-500">Demo only: this action updates the status shown on this page. No bank or payment service is involved.</p></div>}<DialogFooter>{confirmed ? <Button onClick={() => closeDialog(false)}><Check className="mr-2 h-4 w-4" />Done</Button> : selected?.status === "Upcoming" ? <Button onClick={markDemoPaid}>Mark paid in demo</Button> : <Button variant="outline" onClick={() => closeDialog(false)}>Close</Button>}</DialogFooter></DialogContent></Dialog>
  </>;
}
