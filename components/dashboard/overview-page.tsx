import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowDownLeft, ArrowRight, ArrowUpRight, CircleHelp, Plus, Send, Sparkles, TrendingDown, TrendingUp, WalletCards } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
import { accounts, spendingCategories, transactions } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/formatters";

function MetricCard({ label, amount, note, icon: Icon, trend, dark = false, action }: { label: string; amount: string; note: string; icon: typeof WalletCards; trend?: "up" | "down"; dark?: boolean; action?: ReactNode }) {
  return <Card className={dark ? "border-slate-900 bg-slate-950 text-white" : "border-slate-200"}><CardContent className="p-5"><div className="flex items-center justify-between"><p className={dark ? "text-sm font-medium text-slate-300" : "text-sm font-medium text-slate-500"}>{label}</p><span className={dark ? "grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-violet-200" : "grid h-9 w-9 place-items-center rounded-lg bg-violet-50 text-violet-600"}><Icon className="h-4 w-4" /></span></div><p className="mt-4 text-2xl font-semibold tracking-tight">{amount}</p><div className="mt-1.5 flex items-center justify-between gap-2"><p className={dark ? "flex items-center gap-1.5 text-xs text-slate-300" : "flex items-center gap-1.5 text-xs text-slate-500"}>{trend === "down" ? <TrendingDown className="h-3.5 w-3.5 text-emerald-500" /> : trend === "up" ? <TrendingUp className="h-3.5 w-3.5 text-emerald-600" /> : null}{note}</p>{action}</div></CardContent></Card>;
}

export function OverviewPage() {
  return <>
    <PageHeader eyebrow="Friday, October 16, 2026" title="Good morning, Hasnain." description="Here is the complete picture of your money today." action={<><Button variant="outline" asChild><Link href="/my-banks"><Plus className="mr-2 h-4 w-4" />Add account</Link></Button><Button asChild><Link href="/payment-transfer"><Send className="mr-2 h-4 w-4" />New transfer</Link></Button></>} />
    <section aria-label="Account summary" className="mb-6 grid gap-4 md:grid-cols-3">
      <MetricCard dark label="Total balance" amount="$40,020.95" note="8.4% more than last month" icon={WalletCards} trend="up" />
      <MetricCard label="Spent this month" amount="$2,562.46" note="12% less than last month" icon={ArrowUpRight} trend="down" />
      <MetricCard label="Upcoming bills" amount="$2,004.15" note="4 bills due in the next 14 days" icon={ArrowDownLeft} action={<Link className="shrink-0 text-xs font-semibold text-violet-700 hover:text-violet-800" href="/bills">View bills</Link>} />
    </section>
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.8fr)]">
      <div className="space-y-6">
        <section><div className="mb-3 flex items-center justify-between"><div><h2 className="text-base font-semibold">Your accounts</h2><p className="mt-1 text-sm text-slate-500">A connected view of your everyday money.</p></div><Button asChild variant="ghost" size="sm"><Link href="/my-banks">All accounts <ArrowRight className="ml-1.5 h-4 w-4" /></Link></Button></div><div className="grid gap-4 sm:grid-cols-2">{accounts.slice(0, 2).map((account, index) => <Card key={account.id} className={`overflow-hidden border-0 p-5 text-white shadow-none ${index === 0 ? "bg-gradient-to-br from-violet-600 via-violet-600 to-indigo-700" : "bg-gradient-to-br from-cyan-600 to-teal-600"}`}><div className="flex items-start justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white/15"><WalletCards className="h-5 w-5" /></span><span className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-medium">{account.type}</span></div><p className="mt-9 text-sm text-white/70">{account.name}</p><p className="mt-1 text-2xl font-semibold tracking-tight">{formatCurrency(account.balance)}</p><div className="mt-7 flex items-center justify-between text-xs text-white/70"><span>{account.number}</span><span>{account.updated.replace("Updated ", "")}</span></div></Card>)}</div></section>
        <Card><CardHeader className="flex-row items-center justify-between space-y-0"><div><CardTitle>Recent activity</CardTitle><CardDescription className="mt-1">Your latest movement across accounts.</CardDescription></div><Button asChild variant="ghost" size="sm"><Link href="/transaction-history">View all <ArrowRight className="ml-1.5 h-4 w-4" /></Link></Button></CardHeader><CardContent className="divide-y pt-0">{transactions.slice(0, 5).map((transaction) => <div key={transaction.id} className="flex items-center gap-3 py-3.5"><span className={`grid h-9 w-9 place-items-center rounded-full ${transaction.amount > 0 ? "bg-emerald-50 text-emerald-600" : "bg-violet-50 text-violet-600"}`}>{transaction.amount > 0 ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}</span><span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium text-slate-800">{transaction.merchant}</span><span className="mt-0.5 block text-xs text-slate-500">{transaction.category} · {transaction.date}</span></span><span className={`text-sm font-semibold ${transaction.amount > 0 ? "text-emerald-600" : "text-slate-900"}`}>{transaction.amount > 0 ? "+" : "−"}{formatCurrency(Math.abs(transaction.amount))}</span></div>)}</CardContent></Card>
      </div>
      <aside className="space-y-6">
        <Card><CardHeader><CardTitle>Spending snapshot</CardTitle><CardDescription>This month’s spending by category.</CardDescription></CardHeader><CardContent className="space-y-5">
          <div className="flex items-end justify-between"><div><p className="text-xs text-slate-500">Total spent</p><p className="mt-1 text-3xl font-semibold tracking-tight">$2,562.46</p></div><Badge variant="success">12% lower</Badge></div>
          <div className="flex h-2 overflow-hidden rounded-full" aria-label="Spending by category">{spendingCategories.map((category) => <div key={category.name} className={category.color} style={{ width: `${category.share}%` }} title={`${category.name}: ${category.share}%`} />)}</div>
          <div className="space-y-3">{spendingCategories.map((category) => <div key={category.name} className="flex items-center justify-between text-sm"><span className="flex items-center gap-2.5 text-slate-600"><span className={`h-2.5 w-2.5 rounded-full ${category.color}`} />{category.name}</span><span className="font-medium text-slate-900">{formatCurrency(category.amount)}</span></div>)}</div>
        </CardContent></Card>
        <Card className="border-violet-100 bg-violet-50/70 shadow-none"><CardHeader><Badge variant="secondary" className="w-fit bg-white text-violet-700"><Sparkles className="mr-1.5 h-3 w-3" />Smart note</Badge><CardTitle className="pt-1">You’re building a steady habit.</CardTitle><CardDescription className="leading-5 text-slate-600">You’ve spent 12% less on subscriptions this month. Your savings plan is on track.</CardDescription></CardHeader><CardContent><Button asChild size="sm" variant="outline" className="border-violet-200 bg-white"><Link href="/insights">Explore insights <ArrowRight className="ml-2 h-3.5 w-3.5" /></Link></Button></CardContent></Card>
        <p className="flex items-start gap-2 px-1 text-xs leading-5 text-slate-500"><CircleHelp className="mt-0.5 h-3.5 w-3.5 shrink-0" />This is a sample dashboard. All balances and transactions are fictional.</p>
      </aside>
    </div>
  </>;
}
