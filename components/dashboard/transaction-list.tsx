import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Transaction } from "@/lib/mock-data";
import { formatSignedCurrency } from "@/lib/formatters";

export function TransactionTable({ items }: { items: Transaction[] }) {
  if (!items.length) return <div className="rounded-lg border border-dashed py-12 text-center"><p className="font-medium">No transactions found</p><p className="mt-1 text-sm text-slate-500">Try adjusting your search or category filter.</p></div>;
  return <Table>
    <TableHeader><TableRow><TableHead>Merchant</TableHead><TableHead>Category</TableHead><TableHead className="hidden md:table-cell">Date</TableHead><TableHead className="hidden lg:table-cell">Account</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Amount</TableHead></TableRow></TableHeader>
    <TableBody>{items.map((transaction) => <TableRow key={transaction.id}>
      <TableCell><div className="flex items-center gap-3"><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${transaction.amount > 0 ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{transaction.amount > 0 ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}</span><span className="font-medium">{transaction.merchant}</span></div></TableCell>
      <TableCell><Badge variant="secondary">{transaction.category}</Badge></TableCell><TableCell className="hidden whitespace-nowrap text-slate-500 md:table-cell">{transaction.date}</TableCell><TableCell className="hidden text-slate-500 lg:table-cell">{transaction.account}</TableCell><TableCell><Badge variant={transaction.status === "Completed" ? "success" : "warning"}>{transaction.status}</Badge></TableCell><TableCell className={`whitespace-nowrap text-right font-medium ${transaction.amount > 0 ? "text-emerald-700" : "text-slate-900"}`}>{formatSignedCurrency(transaction.amount)}</TableCell>
    </TableRow>)}</TableBody>
  </Table>;
}
