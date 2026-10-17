"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Check, LockKeyhole, WalletCards } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const createAuthSchema = (isSignIn: boolean) => z.object({
  firstName: z.string().trim(),
  lastName: z.string().trim(),
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  confirmPassword: z.string(),
}).superRefine((values, context) => {
  if (isSignIn) return;

  if (!values.firstName) {
    context.addIssue({ code: "custom", path: ["firstName"], message: "Enter your first name." });
  }
  if (!values.lastName) {
    context.addIssue({ code: "custom", path: ["lastName"], message: "Enter your last name." });
  }
  if (!values.confirmPassword) {
    context.addIssue({ code: "custom", path: ["confirmPassword"], message: "Confirm your password." });
  } else if (values.password !== values.confirmPassword) {
    context.addIssue({ code: "custom", path: ["confirmPassword"], message: "Passwords do not match." });
  }
});

type AuthFormValues = z.infer<ReturnType<typeof createAuthSchema>>;

export function AuthForm({ mode }: { mode: "sign-in" | "sign-up" }) {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const isSignIn = mode === "sign-in";
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(createAuthSchema(isSignIn)),
    defaultValues: { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const continueToDemo = () => {
    window.localStorage.setItem("ledgerly-demo", "active");
    setSubmitted(true);
    router.push("/");
  };

  return <main className="grid min-h-screen bg-white lg:grid-cols-2">
    <section className="flex min-h-screen flex-col px-6 py-7 sm:px-10 lg:px-[8.75%] lg:py-9">
      <BrandMark />

      <div className={`mx-auto flex w-full max-w-[480px] flex-1 flex-col justify-center ${isSignIn ? "py-14" : "py-10"}`}>
        <div className="mb-8">
          <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[.12em] text-violet-600">{isSignIn ? "Welcome back" : "Get started"}</p>
          <h1 className="max-w-md text-[28px] font-semibold leading-[1.12] tracking-[-0.035em] text-slate-950 sm:text-[30px]">{isSignIn ? "Pick up where you left off." : "Build a clearer money routine."}</h1>
          <p className="mt-3 max-w-[430px] text-[12px] leading-5 text-slate-500">{isSignIn ? "Your balances, bills, and next best decisions are waiting in one quiet place." : "Create a calm, practical home for the decisions that shape your financial life."}</p>
        </div>

        <Form {...form}>
          <form noValidate onSubmit={form.handleSubmit(continueToDemo)} className={isSignIn ? "space-y-3.5" : "space-y-2.5"}>
            <p className="pb-0.5 text-[11px] font-semibold text-slate-800">{isSignIn ? "Sign in to your workspace" : "Create your Ledgerly account"}</p>
            {!isSignIn && <div className="grid gap-3 sm:grid-cols-2">
              <FormField control={form.control} name="firstName" render={({ field }) => <FormItem className="space-y-1.5">
                <FormLabel className="text-[10px] font-semibold text-slate-700">First name</FormLabel>
                <FormControl><Input autoComplete="given-name" placeholder="Jordan" required className="h-10 rounded-md text-[12px]" {...field} /></FormControl>
                <FormDescription className="sr-only">First name for your demo profile.</FormDescription>
                <FormMessage />
              </FormItem>} />
              <FormField control={form.control} name="lastName" render={({ field }) => <FormItem className="space-y-1.5">
                <FormLabel className="text-[10px] font-semibold text-slate-700">Last name</FormLabel>
                <FormControl><Input autoComplete="family-name" placeholder="Taylor" required className="h-10 rounded-md text-[12px]" {...field} /></FormControl>
                <FormDescription className="sr-only">Last name for your demo profile.</FormDescription>
                <FormMessage />
              </FormItem>} />
            </div>}
            <FormField control={form.control} name="email" render={({ field }) => <FormItem className="space-y-1.5">
              <FormLabel className="text-[10px] font-semibold text-slate-700">Email address</FormLabel>
              <FormControl><Input type="email" autoComplete="email" placeholder="you@company.com" required className="h-10 rounded-md text-[12px]" {...field} /></FormControl>
              <FormDescription className="sr-only">Enter a valid email address for this demo.</FormDescription>
              <FormMessage />
            </FormItem>} />
            <FormField control={form.control} name="password" render={({ field }) => <FormItem className="space-y-1.5">
              <div className="flex items-end justify-between gap-3">
                <FormLabel className="text-[10px] font-semibold text-slate-700">{isSignIn ? "Password" : "Create password"}</FormLabel>
                {isSignIn ? <button className="text-[10px] font-medium text-violet-600 hover:text-violet-800" type="button">Forgot password?</button> : null}
              </div>
              <FormControl><Input type="password" autoComplete={isSignIn ? "current-password" : "new-password"} placeholder={isSignIn ? "••••••••••" : "At least 8 characters"} required minLength={8} className="h-10 rounded-md text-[12px]" {...field} onChange={(event) => {
                field.onChange(event);
                if (!isSignIn && (form.formState.touchedFields.confirmPassword || form.formState.errors.confirmPassword)) {
                  void form.trigger("confirmPassword");
                }
              }} /></FormControl>
              <FormDescription className="sr-only">Use at least eight characters.</FormDescription>
              <FormMessage />
            </FormItem>} />
            {!isSignIn && <FormField control={form.control} name="confirmPassword" render={({ field }) => <FormItem className="space-y-1.5">
              <FormLabel className="text-[10px] font-semibold text-slate-700">Confirm password</FormLabel>
              <FormControl><Input type="password" autoComplete="new-password" placeholder="Repeat your password" required className="h-10 rounded-md text-[12px]" {...field} /></FormControl>
              <FormDescription className="sr-only">Re-enter the password you created.</FormDescription>
              <FormMessage />
            </FormItem>} />}
            <Button className="mt-1 h-10 w-full rounded-md bg-[#5b46e8] text-[11px] shadow-[0_7px_16px_rgba(91,70,232,0.2)] hover:bg-[#4d38d6]" type="submit" disabled={submitted}>{submitted ? "Opening workspace…" : isSignIn ? "Sign in to Ledgerly" : "Create your account"}{isSignIn ? <ArrowRight className="ml-2 h-3.5 w-3.5" /> : null}</Button>
            {!isSignIn ? <p className="pt-0.5 text-[9px] leading-4 text-slate-400">By continuing, you agree to Ledgerly&apos;s Terms and Privacy Policy. This is a frontend-only demo.</p> : null}
          </form>
        </Form>

        {isSignIn ? <><div className="my-5 flex items-center gap-3"><Separator className="flex-1 bg-slate-100" /><span className="text-[9px] font-medium uppercase text-slate-400">or</span><Separator className="flex-1 bg-slate-100" /></div><Button type="button" variant="outline" className="h-10 w-full rounded-md border-slate-200 text-[11px] shadow-none hover:bg-slate-50" onClick={() => router.push("/")}><span className="mr-2 text-xs font-bold text-slate-700">G</span>Continue with Google</Button></> : null}

        <p className={`text-[11px] text-slate-500 ${isSignIn ? "mt-8" : "mt-6"}`}>{isSignIn ? "New to Ledgerly?" : "Already have an account?"}{" "}<Link className="font-semibold text-violet-600 hover:text-violet-800" href={isSignIn ? "/sign-up" : "/sign-in"}>{isSignIn ? "Create an account" : "Sign in"}</Link></p>
      </div>

      <p className="text-[9px] text-slate-400">© 2026 Ledgerly. A thoughtful view of your money.</p>
    </section>

    <aside className="relative hidden min-h-screen overflow-hidden bg-[#10162b] p-[9.5%] text-white lg:flex lg:flex-col">
      <div className="pointer-events-none absolute -right-28 -top-40 h-[430px] w-[430px] rounded-full border-[28px] border-violet-600/95" />
      <div className="pointer-events-none absolute -bottom-36 -right-8 h-[300px] w-[300px] rounded-full bg-teal-300/20" />
      <div className="relative"><BrandMark inverse /><span className="mt-6 inline-flex items-center rounded-full bg-violet-500/20 px-2.5 py-1 text-[9px] font-medium text-violet-200"><LockKeyhole className="mr-1.5 h-3 w-3" />Private by design</span></div>
      {isSignIn ? <SignInAside /> : <SignUpAside />}
      <p className="relative mt-auto text-right text-[9px] text-slate-500">Dashboard preview · No real account connection</p>
    </aside>
  </main>;
}

function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return <Link href="/" className={`flex w-fit items-center gap-2 text-[13px] font-semibold tracking-[-0.02em] ${inverse ? "text-white" : "text-slate-900"}`}><span className={`grid h-6 w-6 place-items-center rounded-md ${inverse ? "bg-white text-violet-600" : "bg-violet-600 text-white"}`}><WalletCards className="h-3.5 w-3.5" /></span>Ledgerly</Link>;
}

function SignInAside() {
  return <div className="relative mt-3 pb-8">
    <h2 className="max-w-md text-[31px] font-semibold leading-[1.1] tracking-[-0.04em]">Money, made clearer.</h2>
    <p className="mt-7 max-w-[390px] text-[12px] leading-5 text-slate-300">A focused dashboard for your complete financial picture — without the visual noise.</p>
    <div className="mt-11 space-y-3">
      <InsightCard label="Total balance" value="$24,880.40" />
      <InsightCard className="ml-auto w-[88%]" label="This month" value="+$1,260.00" />
      <div className="rounded-xl border border-white/[.07] bg-[#202942] p-4"><p className="text-[9px] font-medium text-slate-400">Your next move</p><p className="mt-1 text-[12px] font-semibold">A calmer overview starts here.</p><p className="mt-1 text-[10px] text-slate-400">Sign in to review balances, bills, and spending signals.</p></div>
    </div>
  </div>;
}

function SignUpAside() {
  const benefits = [["Clarity from day one", "Bring your accounts and spending into one focused view."], ["Built around your routine", "Set goals, review trends, and stay ahead of every bill."], ["Your data stays yours", "Ledgerly gives you visibility without selling your financial story."]];
  return <div className="relative mt-3 pb-5">
    <h2 className="max-w-md text-[31px] font-semibold leading-[1.1] tracking-[-0.04em]">A calm home for your money.</h2>
    <p className="mt-7 max-w-[390px] text-[12px] leading-5 text-slate-300">Start with a clean view of where you are, then turn it into a plan you can trust.</p>
    <div className="mt-10 space-y-6">{benefits.map(([title, text]) => <div className="flex gap-3" key={title}><span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-emerald-300/80 text-[#10162b]"><Check className="h-2.5 w-2.5 stroke-[3]" /></span><div><p className="text-[11px] font-semibold">{title}</p><p className="mt-1 text-[9px] leading-4 text-slate-400">{text}</p></div></div>)}</div>
    <div className="mt-11 rounded-xl border border-white/[.07] bg-[#202942] p-4"><span className="rounded-full bg-emerald-300/80 px-2 py-0.5 text-[8px] font-semibold text-[#10162b]">Secure</span><p className="mt-3 text-[11px] font-semibold">Designed for intentional money management.</p><p className="mt-1 text-[9px] leading-4 text-slate-400">A visual demo interface — connect accounts only in the live product.</p></div>
  </div>;
}

function InsightCard({ label, value, className = "" }: { label: string; value: string; className?: string }) {
  return <div className={`w-[82%] rounded-xl border border-white/[.07] bg-[#202942] px-4 py-3 ${className}`}><span className="rounded-full bg-violet-400/30 px-2 py-0.5 text-[8px] font-semibold text-violet-100">Live</span><div className="mt-2 flex items-end justify-between"><div><p className="text-[9px] text-slate-400">{label}</p><p className="mt-0.5 text-[18px] font-semibold tracking-[-0.03em]">{value}</p></div><span className="rounded-md bg-emerald-200 px-2 py-1 text-[8px] font-semibold text-emerald-800">↗ 8%</span></div></div>;
}
