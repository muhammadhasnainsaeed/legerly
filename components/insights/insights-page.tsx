import { ArrowDownRight, ArrowUpRight, Lightbulb, PiggyBank, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { monthlySpending, spendingCategories } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/formatters";

export function InsightsPage() {
  return <>
    <PageHeader eyebrow="Make your money make sense" title="Insights" description="Helpful patterns from your fictional demo activity." />
    <div className="mb-6 grid gap-4 sm:grid-cols-3">
      <Card><CardContent className="p-5"><p className="text-sm text-slate-500">Spent this month</p><p className="mt-2 text-2xl font-semibold">$2,562.46</p><p className="mt-1 flex items-center gap-1 text-xs text-emerald-700"><ArrowDownRight className="h-3.5 w-3.5" />12% less than September</p></CardContent></Card>
      <Card><CardContent className="p-5"><p className="text-sm text-slate-500">Average monthly spend</p><p className="mt-2 text-2xl font-semibold">$2,940.18</p><p className="mt-1 text-xs text-slate-500">Across the last 6 months</p></CardContent></Card>
      <Card><CardContent className="p-5"><p className="text-sm text-slate-500">Savings rate</p><p className="mt-2 text-2xl font-semibold">18.4%</p><p className="mt-1 flex items-center gap-1 text-xs text-emerald-700"><ArrowUpRight className="h-3.5 w-3.5" />2.1% above your target</p></CardContent></Card>
    </div>
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(300px,.8fr)]">
      <Card><CardHeader><CardTitle>Spending over time</CardTitle><CardDescription>Monthly spend compared with your recent average.</CardDescription></CardHeader><CardContent>
        <div role="img" aria-label="Bar chart of monthly spending from May through October. Spending peaked in August and has decreased since." className="relative overflow-hidden rounded-lg border bg-white px-4 pb-3 pt-5">
          <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-slate-200" /><div className="absolute inset-x-0 top-1/4 border-t border-dashed border-slate-100" /><div className="absolute inset-x-0 top-3/4 border-t border-dashed border-slate-100" />
          <div className="relative flex h-[220px] items-end justify-around gap-3">{monthlySpending.map((month, index) => <div key={month.month} className="flex h-full flex-1 flex-col items-center justify-end gap-2"><span className="text-[10px] text-slate-400">{["$2.8k", "$3.1k", "$2.9k", "$3.3k", "$3.0k", "$2.56k"][index]}</span><div className={`w-full max-w-12 rounded-t-md ${index === monthlySpending.length - 1 ? "bg-violet-600" : "bg-violet-100"}`} style={{ height: `${month.value}%` }} /><span className="text-xs text-slate-500">{month.month}</span></div>)}</div>
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-500"><span className="h-2 w-2 rounded-sm bg-violet-600" />Current month<span className="ml-3 h-2 w-2 rounded-sm bg-violet-100" />Previous months</div>
        </div>
      </CardContent></Card>
      <Card><CardHeader><CardTitle>Top categories</CardTitle><CardDescription>October spending breakdown.</CardDescription></CardHeader><CardContent className="space-y-5">{spendingCategories.map((category) => <div key={category.name}><div className="mb-2 flex justify-between text-sm"><span className="text-slate-600">{category.name}</span><span className="font-medium">{formatCurrency(category.amount)}</span></div><Progress value={category.share * 2} className="[&_[data-radix-progress-indicator]]:bg-violet-600" /></div>)}</CardContent></Card>
    </div>
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      <Card className="border-emerald-100 bg-emerald-50/50 shadow-none"><CardContent className="flex gap-3 p-5"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-emerald-700"><Sparkles className="h-4 w-4" /></span><div><Badge variant="success">Positive trend</Badge><h2 className="mt-2 font-semibold">Subscriptions are lighter this month</h2><p className="mt-1 text-sm leading-5 text-slate-600">You’ve spent $112 on subscriptions, down 12% from September.</p></div></CardContent></Card>
      <Card className="border-amber-100 bg-amber-50/50 shadow-none"><CardContent className="flex gap-3 p-5"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-amber-700"><Lightbulb className="h-4 w-4" /></span><div><Badge variant="warning">An opportunity</Badge><h2 className="mt-2 font-semibold">A small weekly save adds up</h2><p className="mt-1 text-sm leading-5 text-slate-600">Setting aside $35 each week could add about $1,820 to your rainy day fund in a year.</p></div></CardContent></Card>
    </div>
    <Card className="mt-6"><CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-violet-50 text-violet-700"><PiggyBank className="h-5 w-5" /></span><div className="flex-1"><h2 className="font-semibold">Rainy day fund goal</h2><p className="mt-1 text-sm text-slate-500">You’ve saved $2,760 toward your $5,000 demo goal.</p></div><div className="w-full sm:max-w-56"><div className="mb-2 flex justify-between text-xs text-slate-500"><span>55% complete</span><span>$2,240 to go</span></div><Progress value={55} /></div></CardContent></Card>
    <p className="mt-4 text-xs text-slate-500">Insights are illustrative and generated from the local sample data, not financial advice.</p>
  </>;
}
