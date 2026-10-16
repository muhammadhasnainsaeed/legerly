"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;
export const SheetTitle = DialogPrimitive.Title;
export const SheetDescription = DialogPrimitive.Description;
export const SheetContent = ({ className, side = "left", children, ...props }: React.ComponentProps<typeof DialogPrimitive.Content> & { side?: "left" | "right" }) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-slate-950/35" />
    <DialogPrimitive.Content className={cn("fixed z-50 h-full w-[min(18rem,85vw)] bg-white p-5 shadow-2xl", side === "left" ? "left-0 top-0 border-r border-slate-200" : "right-0 top-0 border-l border-slate-200", className)} {...props}>
      {children}<DialogPrimitive.Close className="absolute right-4 top-4 rounded-md opacity-70 hover:bg-violet-50 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-violet-500"><X className="h-4 w-4" /><span className="sr-only">Close</span></DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
);
