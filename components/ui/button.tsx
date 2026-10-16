import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  { variants: { variant: { default: "bg-violet-600 text-white shadow-[0_8px_18px_rgba(109,94,252,0.18)] hover:bg-violet-700", destructive: "bg-red-600 text-white hover:bg-red-700", outline: "border border-slate-200 bg-white shadow-sm hover:border-violet-200 hover:bg-violet-50/50", secondary: "bg-violet-50 text-violet-800 hover:bg-violet-100", ghost: "hover:bg-violet-50 hover:text-violet-900", link: "text-violet-700 underline-offset-4 hover:underline" }, size: { default: "h-10 px-4 py-2", sm: "h-8 rounded-md px-3 text-xs", lg: "h-11 px-6", icon: "h-9 w-9" } }, defaultVariants: { variant: "default", size: "default" } }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { asChild?: boolean }
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";
