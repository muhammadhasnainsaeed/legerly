"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Check, CircleAlert, Info, LoaderCircle, LockKeyhole, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PageHeader } from "@/components/dashboard/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { accounts } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/formatters";

const transferSchema = z.object({
  source: z.string().min(1, "Choose a source account."),
  recipient: z.string().trim().min(2, "Enter the recipient’s name.").max(80, "Name must be under 80 characters."),
  email: z.string().trim().email("Enter a valid email address."),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, "Enter an amount with up to two decimal places.").refine((value) => Number(value) > 0 && Number(value) <= 5000, "Enter an amount between $0.01 and $5,000."),
  note: z.string().max(120, "Note must be 120 characters or less."),
});

type TransferValues = z.infer<typeof transferSchema>;
type TransferView = "form" | "review" | "processing" | "complete" | "attention";

export function TransferPage() {
  const [view, setView] = useState<TransferView>("form");
  const [transfer, setTransfer] = useState<TransferValues | null>(null);
  const form = useForm<TransferValues>({
    resolver: zodResolver(transferSchema),
    defaultValues: { source: accounts[0].id, recipient: "", email: "", amount: "", note: "" },
  });

  useEffect(() => {
    if (view !== "processing") return;
    const timer = window.setTimeout(() => setView("complete"), 1150);
    return () => window.clearTimeout(timer);
  }, [view]);

  const reset = () => {
    form.reset({ source: accounts[0].id, recipient: "", email: "", amount: "", note: "" });
    setTransfer(null);
    setView("form");
  };

  if (view === "review" && transfer) return <TransferReview transfer={transfer} onEdit={() => setView("form")} onConfirm={() => setView("processing")} onAttention={() => setView("attention")} />;
  if (view === "processing" && transfer) return <TransferProcessing transfer={transfer} />;
  if (view === "complete" && transfer) return <TransferComplete transfer={transfer} onAnother={reset} />;
  if (view === "attention" && transfer) return <TransferAttention transfer={transfer} onEdit={() => setView("form")} onBack={() => setView("review")} />;

  return <>
    <PageHeader eyebrow="Move money, thoughtfully" title="Transfers" description="Preview a complete transfer flow using fictional demo data." />
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,.8fr)]">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between"><CardTitle>New transfer</CardTitle><Badge variant="secondary">Demo</Badge></div>
          <CardDescription>Enter a fictional recipient to review this sample transfer.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit((values) => { setTransfer(values); setView("review"); })} className="space-y-5">
              <FormField control={form.control} name="source" render={({ field }) => <FormItem><FormLabel>From account</FormLabel><FormControl><Select value={field.value} onValueChange={field.onChange}><SelectTrigger><SelectValue placeholder="Select account" /></SelectTrigger><SelectContent>{accounts.filter((account) => account.type !== "Credit card").map((account) => <SelectItem key={account.id} value={account.id}>{account.name} · {formatCurrency(account.balance)}</SelectItem>)}</SelectContent></Select></FormControl><FormMessage /></FormItem>} />
              <FormField control={form.control} name="recipient" render={({ field }) => <FormItem><FormLabel>Recipient name</FormLabel><FormControl><Input placeholder="e.g. Alex Morgan" autoComplete="name" {...field} /></FormControl><FormMessage /></FormItem>} />
              <FormField control={form.control} name="email" render={({ field }) => <FormItem><FormLabel>Recipient email</FormLabel><FormControl><Input type="email" placeholder="alex@example.com" autoComplete="email" {...field} /></FormControl><FormDescription>Only used locally to make the demo review realistic.</FormDescription><FormMessage /></FormItem>} />
              <div className="grid gap-5 sm:grid-cols-2"><FormField control={form.control} name="amount" render={({ field }) => <FormItem><FormLabel>Amount</FormLabel><FormControl><Input inputMode="decimal" placeholder="$0.00" {...field} /></FormControl><FormMessage /></FormItem>} /><FormField control={form.control} name="note" render={({ field }) => <FormItem><FormLabel>Note <span className="font-normal text-slate-400">(optional)</span></FormLabel><FormControl><Textarea placeholder="What’s it for?" rows={1} className="min-h-10 resize-none" {...field} /></FormControl><FormMessage /></FormItem>} /></div>
              <div className="rounded-xl border border-violet-100 bg-violet-50/60 p-3.5"><p className="flex items-start gap-2 text-xs leading-5 text-violet-950"><Info className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" /><span><strong>Demo only.</strong> This flow never sends a payment or contacts a bank. You’ll review every fictional detail before confirmation.</span></p></div>
              <Button type="submit" className="w-full"><Send className="mr-2 h-4 w-4" />Review transfer</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <aside className="space-y-5"><Card className="border-violet-100 bg-violet-50/50 shadow-none"><CardHeader><CardTitle className="text-base">A considered transfer flow</CardTitle><CardDescription>Every step has a clear next action.</CardDescription></CardHeader><CardContent className="space-y-4">{[["1", "Add sample details", "Use fictional recipient information."], ["2", "Review before confirming", "Check amount, destination, and arrival."], ["3", "See the outcome", "Explore complete and recovery states."]].map(([number, title, description]) => <div key={number} className="flex gap-3"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-sm font-semibold text-violet-700 shadow-sm">{number}</span><div><p className="text-sm font-medium text-slate-800">{title}</p><p className="mt-1 text-xs leading-5 text-slate-500">{description}</p></div></div>)}</CardContent></Card><Card className="bg-slate-50 shadow-none"><CardContent className="flex gap-3 p-4"><LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" /><p className="text-xs leading-5 text-slate-600">No login, bank connection, payment network, or real money movement is part of Ledgerly.</p></CardContent></Card></aside>
    </div>
  </>;
}

function TransferReview({ transfer, onEdit, onConfirm, onAttention }: { transfer: TransferValues; onEdit: () => void; onConfirm: () => void; onAttention: () => void }) {
  const source = accounts.find((account) => account.id === transfer.source);
  return <><PageHeader eyebrow="Transfers / New transfer" title="Review your transfer." description="Take one final look before confirming this fictional transfer." /><div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(290px,.85fr)]"><Card><CardContent className="p-6 sm:p-7"><div className="mb-6 flex items-center justify-between"><span className="text-sm font-semibold">Transfer details</span><Badge variant="secondary">Demo only</Badge></div><div className="space-y-0 divide-y rounded-xl border"><Detail label="From" value={`${source?.name ?? "Everyday checking"} · ${source?.number ?? "•••• 4508"}`} /><Detail label="To" value={transfer.recipient} subvalue={transfer.email} /><Detail label="Amount" value={formatCurrency(Number(transfer.amount))} prominent /><Detail label="Arrives" value="In moments" /><Detail label="Fee" value="$0.00" />{transfer.note && <Detail label="Note" value={transfer.note} />}</div><div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between"><Button variant="outline" onClick={onEdit}><ArrowLeft className="mr-2 h-4 w-4" />Edit transfer</Button><Button onClick={onConfirm}>Confirm transfer <ArrowRight className="ml-2 h-4 w-4" /></Button></div></CardContent></Card><aside className="space-y-5"><Card className="border-emerald-100 bg-emerald-50/60 shadow-none"><CardHeader><span className="mb-2 grid h-9 w-9 place-items-center rounded-full bg-white text-emerald-600 shadow-sm"><Check className="h-4 w-4" /></span><CardTitle className="text-lg">Everything looks right.</CardTitle><CardDescription className="leading-5">The recipient, amount, and arrival timing are ready for the local demo confirmation.</CardDescription></CardHeader></Card><Card><CardContent className="p-5"><p className="text-sm font-semibold">Need to see a recovery state?</p><p className="mt-1.5 text-xs leading-5 text-slate-500">This prototype includes a clear next step when a transfer needs attention.</p><Button className="mt-4" variant="ghost" size="sm" onClick={onAttention}>Preview recovery state <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></Button></CardContent></Card></aside></div></>;
}

function TransferProcessing({ transfer }: { transfer: TransferValues }) {
  return <div className="mx-auto max-w-2xl py-14"><Card className="overflow-hidden"><CardHeader className="border-b bg-violet-50/60 p-7 sm:p-9"><span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-violet-100 text-violet-700"><LoaderCircle className="h-6 w-6 animate-spin" /></span><p className="text-[11px] font-bold uppercase tracking-[.15em] text-violet-600">Transfer in progress</p><CardTitle className="mt-2 text-2xl">We’re preparing your transfer.</CardTitle><CardDescription className="mt-2 leading-6">{formatCurrency(Number(transfer.amount))} to {transfer.recipient} is being simulated locally.</CardDescription></CardHeader><CardContent className="p-7 sm:p-9"><div className="space-y-5">{["Checking your transfer details", "Preparing the confirmation", "Finalizing your demo outcome"].map((item, index) => <div className="flex items-center gap-3" key={item}><span className={`grid h-7 w-7 place-items-center rounded-full text-xs ${index === 0 ? "bg-emerald-100 text-emerald-700" : index === 1 ? "bg-violet-100 text-violet-700" : "bg-slate-100 text-slate-400"}`}>{index === 0 ? <Check className="h-4 w-4" /> : index === 1 ? <LoaderCircle className="h-3.5 w-3.5 animate-spin" /> : index + 1}</span><span className={index < 2 ? "text-sm font-medium text-slate-800" : "text-sm text-slate-500"}>{item}</span></div>)}</div></CardContent></Card></div>;
}

function TransferComplete({ transfer, onAnother }: { transfer: TransferValues; onAnother: () => void }) {
  return <div className="mx-auto max-w-2xl py-14"><Card className="overflow-hidden text-center"><CardContent className="p-8 sm:p-12"><span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-100 text-emerald-700"><Check className="h-7 w-7" /></span><p className="mt-7 text-[11px] font-bold uppercase tracking-[.15em] text-emerald-700">Transfer complete</p><h1 className="mt-2 text-3xl font-semibold tracking-tight">Your demo transfer is complete.</h1><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">{formatCurrency(Number(transfer.amount))} to {transfer.recipient} was confirmed in this local prototype. No money moved and no recipient was contacted.</p><div className="mx-auto mt-7 max-w-sm divide-y rounded-xl border text-left"><Detail label="Reference" value="LDG-2048-DEMO" /><Detail label="Arrival" value="Complete" /></div><div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center"><Button onClick={onAnother}>Make another transfer <ArrowRight className="ml-2 h-4 w-4" /></Button><Button variant="outline" asChild><Link href="/">Return to overview</Link></Button></div></CardContent></Card></div>;
}

function TransferAttention({ transfer, onEdit, onBack }: { transfer: TransferValues; onEdit: () => void; onBack: () => void }) {
  return <div className="mx-auto max-w-2xl py-14"><Card className="overflow-hidden"><CardHeader className="border-b border-amber-100 bg-amber-50/70 p-7 sm:p-9"><span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-amber-100 text-amber-700"><CircleAlert className="h-6 w-6" /></span><p className="text-[11px] font-bold uppercase tracking-[.15em] text-amber-700">Transfer needs attention</p><CardTitle className="mt-2 text-2xl">One detail needs a second look.</CardTitle><CardDescription className="mt-2 leading-6">Your fictional transfer to {transfer.recipient} has not been sent. Review the recipient details before you continue.</CardDescription></CardHeader><CardContent className="p-7 sm:p-9"><div className="rounded-xl border border-amber-100 bg-amber-50/50 p-4 text-sm leading-6 text-amber-950">For this demo, the recovery path keeps the amount safe and gives you a direct way to correct the information.</div><div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between"><Button variant="outline" onClick={onBack}><ArrowLeft className="mr-2 h-4 w-4" />Back to review</Button><Button onClick={onEdit}>Edit recipient details <ArrowRight className="ml-2 h-4 w-4" /></Button></div></CardContent></Card></div>;
}

function Detail({ label, value, subvalue, prominent = false }: { label: string; value: string; subvalue?: string; prominent?: boolean }) {
  return <div className="flex items-start justify-between gap-5 p-4"><span className="shrink-0 text-sm text-slate-500">{label}</span><span className={`text-right ${prominent ? "text-lg font-semibold text-slate-950" : "text-sm font-medium text-slate-800"}`}>{value}{subvalue && <span className="mt-1 block text-xs font-normal text-slate-500">{subvalue}</span>}</span></div>;
}
