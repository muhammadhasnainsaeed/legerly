"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Building2, CheckCircle2, ChevronRight, Landmark, LoaderCircle, LockKeyhole, ShieldCheck, UserRound, WalletCards } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { demoBanks } from "@/lib/mock-data";

type Step = "profile" | "payment" | "connect" | "choose" | "connecting" | "connected";

const steps: { id: Step; label: string }[] = [
  { id: "profile", label: "Profile" },
  { id: "payment", label: "Payment profile" },
  { id: "connect", label: "Connect bank" },
];

const banks: { name: (typeof demoBanks)[number]; detail: string; color: string }[] = [
  { name: demoBanks[0], detail: "Checking and savings", color: "bg-violet-100 text-violet-700" },
  { name: demoBanks[1], detail: "Personal accounts", color: "bg-emerald-100 text-emerald-700" },
  { name: demoBanks[2], detail: "Checking and credit", color: "bg-sky-100 text-sky-700" },
];

export function BankConnectionFlow() {
  const [step, setStep] = useState<Step>("profile");
  const [selectedBank, setSelectedBank] = useState(banks[0].name);

  useEffect(() => {
    if (step !== "connecting") return;
    const timer = window.setTimeout(() => {
      window.localStorage.setItem("ledgerly-connected-bank", selectedBank);
      setStep("connected");
    }, 1200);
    return () => window.clearTimeout(timer);
  }, [selectedBank, step]);

  const current = step === "profile" ? 1 : step === "payment" ? 2 : 3;
  const back = () => setStep(step === "payment" ? "profile" : step === "connect" ? "payment" : step === "choose" ? "connect" : "profile");
  const handleBankKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].includes(event.key)) return;
    event.preventDefault();
    const currentIndex = banks.findIndex((bank) => bank.name === selectedBank);
    const direction = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (currentIndex + direction + banks.length) % banks.length;
    setSelectedBank(banks[nextIndex].name);
    event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="radio"]')[nextIndex]?.focus();
  };

  return <div className="mx-auto max-w-3xl pb-12">
    <div className="mb-7 flex items-center justify-between"><Link href="/my-banks" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-violet-700"><ArrowLeft className="h-4 w-4" />Accounts</Link><span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">Demo connection</span></div>
    {step !== "choose" && step !== "connecting" && step !== "connected" && <ol className="mb-9 grid grid-cols-3 gap-3" aria-label="Connection progress">{steps.map((item, index) => <li key={item.id} className="flex items-center gap-2"><span className={`grid h-7 w-7 place-items-center rounded-full text-xs font-semibold ${index + 1 <= current ? "bg-violet-600 text-white" : "bg-slate-100 text-slate-500"}`}>{index + 1 < current ? <CheckCircle2 className="h-4 w-4" /> : index + 1}</span><span className={`hidden text-xs font-medium sm:inline ${index + 1 <= current ? "text-slate-800" : "text-slate-400"}`}>{item.label}</span></li>)}</ol>}
    {step === "profile" && <FlowCard icon={<UserRound className="h-5 w-5" />} eyebrow="STEP 1 OF 3" title="Tell us a little about you." description="This only personalizes the demo experience. Use fictional information."><div className="grid gap-4 sm:grid-cols-2"><Field id="first-name" label="First name" placeholder="Hasnain" /><Field id="last-name" label="Last name" placeholder="Saeed" /></div><Field id="phone" label="Phone number" placeholder="+92 300 0000000" /><FlowActions onContinue={() => setStep("payment")} /></FlowCard>}
    {step === "payment" && <FlowCard icon={<WalletCards className="h-5 w-5" />} eyebrow="STEP 2 OF 3" title="Set up your payment profile." description="This lets us show realistic transfer states without collecting a real card or account."><div className="rounded-xl border border-violet-100 bg-violet-50/60 p-4"><p className="text-sm font-semibold text-slate-800">Personal workspace</p><p className="mt-1 text-xs leading-5 text-slate-500">Use this space to preview your accounts, transfer journey, bills, and insights.</p></div><div className="grid gap-3 sm:grid-cols-2"><Choice active title="Personal" description="Manage your own day-to-day money." /><Choice title="Shared" description="Preview a future shared workspace." /></div><FlowActions onBack={back} onContinue={() => setStep("connect")} /></FlowCard>}
    {step === "connect" && <FlowCard icon={<Landmark className="h-5 w-5" />} eyebrow="STEP 3 OF 3" title="Connect an account." description="Choose a sample institution to preview adding a fictional account."><div className="rounded-xl border bg-slate-50 p-4"><div className="flex gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-violet-600 shadow-sm"><ShieldCheck className="h-5 w-5" /></span><p className="text-sm leading-6 text-slate-600"><strong className="text-slate-800">Private and demo-only.</strong> Ledgerly does not open a bank window, share data, or connect a financial institution.</p></div></div><FlowActions onBack={back} onContinue={() => setStep("choose")} continueLabel="Choose your bank" /></FlowCard>}
    {step === "choose" && <FlowCard icon={<Building2 className="h-5 w-5" />} eyebrow="DEMO CONNECTION" title="Choose a sample bank." description="Select a fictional institution to add a demo account to this browser."><div role="radiogroup" aria-label="Sample bank" onKeyDown={handleBankKeyDown} className="space-y-3">{banks.map((bank) => <button type="button" role="radio" aria-checked={selectedBank === bank.name} tabIndex={selectedBank === bank.name ? 0 : -1} key={bank.name} onClick={() => setSelectedBank(bank.name)} className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 ${selectedBank === bank.name ? "border-violet-400 bg-violet-50/70 ring-1 ring-violet-200" : "border-slate-200 bg-white hover:border-slate-300"}`}><span className={`grid h-10 w-10 place-items-center rounded-xl text-sm font-bold ${bank.color}`}>{bank.name.charAt(0)}</span><span className="flex-1"><span className="block text-sm font-semibold text-slate-800">{bank.name}</span><span className="mt-0.5 block text-xs text-slate-500">{bank.detail}</span></span><ChevronRight className="h-4 w-4 text-slate-400" /></button>)}</div><div className="mt-5 flex gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-3.5 text-xs leading-5 text-emerald-900"><LockKeyhole className="mt-0.5 h-4 w-4 shrink-0" />Only fictional sample data is used. No bank connection is made.</div><FlowActions onBack={back} onContinue={() => setStep("connecting")} continueLabel="Add demo account" /></FlowCard>}
    {step === "connecting" && <FlowCard icon={<LoaderCircle className="h-5 w-5 animate-spin" />} eyebrow="DEMO CONNECTION" title={`Adding ${selectedBank}.`} description="We are preparing a fictional account for your demo."><div className="rounded-2xl border bg-slate-50 p-5"><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-violet-100 text-violet-700"><LoaderCircle className="h-5 w-5 animate-spin" /></span><div><p className="text-sm font-semibold">Preparing sample account</p><p className="mt-1 text-xs text-slate-500">This takes a moment in the prototype.</p></div></div><div className="mt-6 space-y-4 border-t pt-5">{["Preparing sample account", "Adding fictional details", "Ready in your accounts"].map((item, index) => <div className="flex items-center gap-3 text-sm" key={item}><span className={`grid h-6 w-6 place-items-center rounded-full text-xs ${index === 0 ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-500"}`}>{index === 0 ? <CheckCircle2 className="h-4 w-4" /> : index + 1}</span><span className={index === 0 ? "font-medium text-slate-800" : "text-slate-500"}>{item}</span></div>)}</div></div></FlowCard>}
    {step === "connected" && <FlowCard icon={<CheckCircle2 className="h-5 w-5" />} eyebrow="ALL SET" title="Your demo account is ready." description={`${selectedBank} is represented by a fictional sample account in your Ledgerly workspace.`}><div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5"><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-emerald-600 shadow-sm"><Landmark className="h-5 w-5" /></span><span><span className="block text-sm font-semibold text-slate-800">{selectedBank} checking</span><span className="mt-0.5 block text-xs text-slate-500">Demo account · •••• 0192</span></span></div></div><div className="mt-6 flex gap-3"><Button asChild className="flex-1"><Link href="/my-banks">View accounts <ArrowRight className="ml-2 h-4 w-4" /></Link></Button><Button variant="outline" asChild><Link href="/">Go to overview</Link></Button></div></FlowCard>}
  </div>;
}

function FlowCard({ icon, eyebrow, title, description, children }: { icon: ReactNode; eyebrow: string; title: string; description: string; children: ReactNode }) {
  return <Card className="overflow-hidden border-slate-200 shadow-sm"><CardHeader className="border-b bg-white p-6 sm:p-8"><span className="mb-5 grid h-10 w-10 place-items-center rounded-xl bg-violet-100 text-violet-700">{icon}</span><p className="text-[11px] font-bold uppercase tracking-[.15em] text-violet-600">{eyebrow}</p><CardTitle className="mt-2 text-2xl">{title}</CardTitle><CardDescription className="mt-2 max-w-xl leading-6">{description}</CardDescription></CardHeader><CardContent className="space-y-5 p-6 sm:p-8">{children}</CardContent></Card>;
}

function Field({ id, label, placeholder }: { id: string; label: string; placeholder: string }) {
  return <div className="space-y-2"><Label htmlFor={id}>{label}</Label><Input id={id} placeholder={placeholder} /></div>;
}

function Choice({ active = false, title, description }: { active?: boolean; title: string; description: string }) {
  return <div className={`rounded-xl border p-4 ${active ? "border-violet-300 bg-violet-50/60" : "border-slate-200"}`}><p className="text-sm font-semibold text-slate-800">{title}</p><p className="mt-1 text-xs leading-5 text-slate-500">{description}</p></div>;
}

function FlowActions({ onBack, onContinue, continueLabel = "Continue" }: { onBack?: () => void; onContinue: () => void; continueLabel?: string }) {
  return <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-between">{onBack ? <Button variant="ghost" type="button" onClick={onBack}><ArrowLeft className="mr-2 h-4 w-4" />Back</Button> : <span />}{<Button type="button" onClick={onContinue}>{continueLabel}<ArrowRight className="ml-2 h-4 w-4" /></Button>}</div>;
}
