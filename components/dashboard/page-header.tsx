import type { ReactNode } from "react";

export function PageHeader({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description: string; action?: ReactNode }) {
  return <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
    <div>{eyebrow && <p className="mb-1.5 text-xs font-semibold uppercase tracking-[.12em] text-violet-600">{eyebrow}</p>}<h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-[28px]">{title}</h1><p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">{description}</p></div>
    {action && <div className="flex items-center gap-2">{action}</div>}
  </div>;
}
