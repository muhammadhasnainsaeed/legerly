export type Account = {
  id: string;
  name: string;
  type: string;
  number: string;
  balance: number;
  available: number;
  color: string;
  updated: string;
};

export type Transaction = {
  id: string;
  merchant: string;
  category: string;
  date: string;
  account: string;
  amount: number;
  status: "Completed" | "Pending";
};

export const demoBanks = ["Northstar Bank", "Cedar & Co.", "Summit Credit Union"] as const;
export type DemoBank = (typeof demoBanks)[number];

export function isDemoBank(value: string): value is DemoBank {
  return demoBanks.some((bank) => bank === value);
}

export const accounts: Account[] = [
  { id: "everyday", name: "Everyday checking", type: "Checking", number: "•••• 4508", balance: 12480.75, available: 12480.75, color: "account-indigo", updated: "Updated just now" },
  { id: "savings", name: "Rainy day savings", type: "Savings", number: "•••• 2041", balance: 28760.2, available: 28760.2, color: "account-slate", updated: "Updated 2 min ago" },
  { id: "travel", name: "Travel rewards", type: "Credit card", number: "•••• 8819", balance: -1220, available: 3780, color: "account-amber", updated: "Updated 12 min ago" },
];

export const transactions: Transaction[] = [
  { id: "t-01", merchant: "Northstar Market", category: "Groceries", date: "Oct 16, 2026", account: "Everyday checking", amount: -86.42, status: "Completed" },
  { id: "t-02", merchant: "Monthly paycheck", category: "Income", date: "Oct 15, 2026", account: "Everyday checking", amount: 4280, status: "Completed" },
  { id: "t-03", merchant: "Notion", category: "Subscriptions", date: "Oct 15, 2026", account: "Travel rewards", amount: -18, status: "Completed" },
  { id: "t-04", merchant: "Figma", category: "Subscriptions", date: "Oct 14, 2026", account: "Travel rewards", amount: -15, status: "Completed" },
  { id: "t-05", merchant: "Oak & Reed", category: "Home", date: "Oct 13, 2026", account: "Everyday checking", amount: -243, status: "Completed" },
  { id: "t-06", merchant: "Coffee Collective", category: "Dining", date: "Oct 12, 2026", account: "Travel rewards", amount: -6.8, status: "Completed" },
  { id: "t-07", merchant: "Metro Transit", category: "Transport", date: "Oct 11, 2026", account: "Travel rewards", amount: -32.5, status: "Completed" },
  { id: "t-08", merchant: "Juniper Fitness", category: "Health", date: "Oct 10, 2026", account: "Everyday checking", amount: -49, status: "Pending" },
  { id: "t-09", merchant: "Sunday Table", category: "Dining", date: "Oct 9, 2026", account: "Travel rewards", amount: -64.2, status: "Completed" },
  { id: "t-10", merchant: "Electric company", category: "Utilities", date: "Oct 8, 2026", account: "Everyday checking", amount: -78.16, status: "Completed" },
  { id: "t-11", merchant: "Transfer to savings", category: "Transfer", date: "Oct 7, 2026", account: "Everyday checking", amount: -350, status: "Completed" },
  { id: "t-12", merchant: "Bookshop.org", category: "Shopping", date: "Oct 6, 2026", account: "Travel rewards", amount: -24.95, status: "Completed" },
];

export const bills = [
  { id: "rent", name: "Home rent", provider: "Willow Creek Properties", amount: 1850, due: "Oct 20", category: "Home", status: "Upcoming" as const },
  { id: "electric", name: "Electricity", provider: "BrightGrid Energy", amount: 78.16, due: "Oct 22", category: "Utilities", status: "Upcoming" as const },
  { id: "internet", name: "Internet", provider: "Northline Fiber", amount: 65, due: "Oct 24", category: "Utilities", status: "Upcoming" as const },
  { id: "music", name: "Music plan", provider: "Soundwell", amount: 10.99, due: "Oct 28", category: "Subscription", status: "Upcoming" as const },
  { id: "fitness", name: "Fitness membership", provider: "Juniper Fitness", amount: 49, due: "Oct 10", category: "Health", status: "Paid" as const },
  { id: "design", name: "Design tools", provider: "Figma", amount: 15, due: "Oct 14", category: "Subscription", status: "Paid" as const },
];

export const spendingCategories = [
  { name: "Home", amount: 1850, share: 48, color: "bg-slate-900" },
  { name: "Food & dining", amount: 426.46, share: 27, color: "bg-indigo-500" },
  { name: "Subscriptions", amount: 112, share: 13, color: "bg-violet-400" },
  { name: "Transport", amount: 174, share: 12, color: "bg-slate-300" },
];

export const monthlySpending = [
  { month: "May", value: 58 },
  { month: "Jun", value: 72 },
  { month: "Jul", value: 64 },
  { month: "Aug", value: 86 },
  { month: "Sep", value: 70 },
  { month: "Oct", value: 52 },
];
