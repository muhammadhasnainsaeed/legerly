"use client";

import * as React from "react";
import { Controller, FormProvider, useFormContext, type ControllerProps, type FieldPath, type FieldValues } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const Form = FormProvider;
const FormFieldContext = React.createContext<{ name: string } | null>(null);
export function FormField<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({ name, ...props }: ControllerProps<TFieldValues, TName>) {
  return <FormFieldContext.Provider value={{ name }}><Controller name={name} {...props} /></FormFieldContext.Provider>;
}
export function FormItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-2", className)} {...props} />;
}
export function FormLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  const field = React.useContext(FormFieldContext);
  const { getFieldState, formState } = useFormContext();
  const invalid = field ? getFieldState(field.name, formState).invalid : false;
  return <Label htmlFor={field?.name} className={cn(invalid && "text-red-600", className)} {...props} />;
}
export function FormControl({ children }: { children: React.ReactElement<{ id?: string; "aria-describedby"?: string; "aria-invalid"?: boolean }> }) {
  const field = React.useContext(FormFieldContext);
  const { getFieldState, formState } = useFormContext();
  const invalid = field ? getFieldState(field.name, formState).invalid : false;
  const id = field?.name;
  return React.cloneElement(children, { id, "aria-describedby": `${id}-description ${id}-message`, "aria-invalid": invalid });
}
export function FormDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  const field = React.useContext(FormFieldContext);
  return <p id={`${field?.name}-description`} className={cn("text-xs text-slate-500", className)} {...props} />;
}
export function FormMessage({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  const field = React.useContext(FormFieldContext);
  const { getFieldState, formState } = useFormContext();
  const message = field ? getFieldState(field.name, formState).error?.message : undefined;
  const body = message ?? children;
  if (!body) return null;
  return <p id={`${field?.name}-message`} className={cn("text-xs font-medium text-red-600", className)} {...props}>{body}</p>;
}
