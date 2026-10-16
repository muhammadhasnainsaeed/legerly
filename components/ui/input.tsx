import * as React from "react";
import { cn } from "@/lib/utils";
export const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ className, type, ...props }, ref) => <input type={type} className={cn("flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none placeholder:text-slate-400 transition-colors focus:border-violet-400 focus:ring-2 focus:ring-violet-200", className)} ref={ref} {...props} />);
Input.displayName = "Input";
