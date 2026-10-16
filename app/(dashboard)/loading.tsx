import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return <section aria-label="Loading dashboard" aria-busy="true" className="space-y-6">
    <span className="sr-only">Loading your demo finance dashboard</span>
    <div className="space-y-2"><Skeleton className="h-3 w-36" /><Skeleton className="h-8 w-64" /><Skeleton className="h-4 w-80 max-w-full" /></div>
    <div className="grid gap-4 md:grid-cols-3">{[1, 2, 3].map((item) => <Skeleton key={item} className="h-32 rounded-xl" />)}</div>
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(300px,.9fr)]"><Skeleton className="h-72 rounded-xl" /><Skeleton className="h-72 rounded-xl" /></div>
  </section>;
}
