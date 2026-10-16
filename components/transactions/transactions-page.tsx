"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Download, Search } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { TransactionTable } from "@/components/dashboard/transaction-list";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { transactions } from "@/lib/mock-data";

const pageSize = 5;

export function TransactionsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(0);
  const categories = Array.from(new Set(transactions.map(({ category: itemCategory }) => itemCategory)));
  const filtered = useMemo(() => transactions.filter((item) =>
    `${item.merchant} ${item.category} ${item.account}`.toLowerCase().includes(query.toLowerCase()) &&
    (category === "all" || item.category === category),
  ), [query, category]);
  const visible = filtered.slice(page * pageSize, page * pageSize + pageSize);
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const exportCsv = () => {
    const quote = (value: string) => `"${value.replaceAll('"', '""')}"`;
    const rows = [["Merchant", "Category", "Date", "Account", "Amount (USD)", "Status"], ...filtered.map((item) => [item.merchant, item.category, item.date, item.account, item.amount.toFixed(2), item.status])];
    const csv = rows.map((row) => row.map(quote).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "ledgerly-demo-transactions.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  };
  const updateFilters = (next: () => void) => { next(); setPage(0); };

  return <>
    <PageHeader eyebrow="Account activity" title="Transactions" description="A searchable record of your demo account activity." action={<Button variant="outline" onClick={exportCsv} disabled={!filtered.length}><Download className="mr-2 h-4 w-4" />Export CSV</Button>} />
    <Card><CardContent className="p-0">
      <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><Input value={query} onChange={(event) => updateFilters(() => setQuery(event.target.value))} placeholder="Search transactions..." className="pl-9" aria-label="Search transactions" /></div>
        <div className="flex flex-wrap items-center gap-2"><Select value={category} onValueChange={(value) => updateFilters(() => setCategory(value))}><SelectTrigger className="w-[170px]" aria-label="Filter by category"><SelectValue placeholder="All categories" /></SelectTrigger><SelectContent><SelectItem value="all">All categories</SelectItem>{categories.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select><span className="hidden text-xs text-slate-500 sm:block">Oct 1 – Oct 31, 2026</span></div>
      </div>
      <TransactionTable items={visible} />
      <div className="flex flex-col gap-3 border-t px-4 py-3 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs text-slate-500">{filtered.length ? `Showing ${page * pageSize + 1}–${Math.min((page + 1) * pageSize, filtered.length)} of ${filtered.length} transactions` : "No matching transactions"}</p><div className="flex items-center gap-2"><Button size="sm" variant="outline" aria-label="Previous page" disabled={page === 0} onClick={() => setPage((current) => Math.max(0, current - 1))}><ChevronLeft className="mr-1 h-4 w-4" />Previous</Button><span className="min-w-16 text-center text-xs text-slate-500">Page {page + 1} of {pageCount}</span><Button size="sm" variant="outline" aria-label="Next page" disabled={page + 1 >= pageCount} onClick={() => setPage((current) => Math.min(pageCount - 1, current + 1))}>Next<ChevronRight className="ml-1 h-4 w-4" /></Button></div></div>
    </CardContent></Card>
    <p className="mt-4 text-xs text-slate-500">Exported files include only fictional sample data shown in this demo.</p>
  </>;
}
