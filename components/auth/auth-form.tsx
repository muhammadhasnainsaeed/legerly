"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, CheckCircle2, EyeOff, LockKeyhole, WalletCards } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function AuthForm({ mode }: { mode: "sign-in" | "sign-up" }) {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const isSignIn = mode === "sign-in";
  const continueToDemo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.localStorage.setItem("ledgerly-demo", "active");
    setSubmitted(true);
    router.push("/");
  };

  return <main className="grid min-h-screen bg-white lg:grid-cols-2">
    <section className="flex min-h-screen flex-col px-6 py-7 sm:px-10 lg:px-[11%]">
      <Link href="/" className="flex w-fit items-center gap-2.5 text-lg font-semibold tracking-tight"><span className="grid h-9 w-9 place-items-center rounded-lg bg-violet-600 text-white"><WalletCards className="h-5 w-5" /></span>Ledgerly</Link>
      <div className="mx-auto flex w-full max-w-[390px] flex-1 flex-col justify-center py-12">
        <div className="mb-8"><p className="mb-3 text-[11px] font-bold uppercase tracking-[.16em] text-violet-600">{isSignIn ? "Welcome back" : "Start with clarity"}</p><h1 className="text-[30px] font-semibold tracking-tight text-slate-950">{isSignIn ? "Pick up where you left off." : "A clearer view starts here."}</h1><p className="mt-3 text-sm leading-6 text-slate-500">{isSignIn ? "Sign in to continue to your personal workspace." : "Create a demo profile to explore your Ledgerly workspace."}</p></div>
        <form onSubmit={continueToDemo} className="space-y-4">
          {!isSignIn && <div className="space-y-2"><Label htmlFor="name">Full name</Label><Input id="name" name="name" placeholder="Your name" autoComplete="name" required minLength={2} /></div>}
          <div className="space-y-2"><Label htmlFor="email">Email address</Label><Input id="email" type="email" name="email" placeholder="you@example.com" autoComplete="email" required /></div>
          <div className="space-y-2"><div className="flex items-center justify-between"><Label htmlFor="password">Password</Label>{isSignIn ? <button className="text-xs font-medium text-violet-700 hover:text-violet-800" type="button">Forgot password?</button> : <span className="text-xs text-slate-400">8+ characters</span>}</div><div className="relative"><Input id="password" name="password" type="password" placeholder="Enter your password" autoComplete={isSignIn ? "current-password" : "new-password"} required minLength={8} className="pr-10" /><EyeOff className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /></div></div>
          {!isSignIn && <p className="text-xs leading-5 text-slate-500">Use fictional information only. Ledgerly does not create a real account or request banking details.</p>}
          <Button className="mt-2 w-full" type="submit" disabled={submitted}>{submitted ? "Opening workspace…" : isSignIn ? "Sign in to Ledgerly" : "Create your workspace"}<ArrowRight className="ml-2 h-4 w-4" /></Button>
        </form>
        <div className="my-6 flex items-center gap-3"><Separator className="flex-1" /><span className="text-[11px] font-medium text-slate-400">OR</span><Separator className="flex-1" /></div>
        <Button type="button" variant="outline" className="w-full" onClick={() => router.push("/")}><span className="mr-2 grid h-4 w-4 place-items-center rounded-full bg-white text-[11px] font-bold text-red-500 shadow-sm ring-1 ring-slate-200">G</span>Continue with Google</Button>
        <div className="mt-5 rounded-xl border border-violet-100 bg-violet-50/60 p-3.5"><p className="flex items-center gap-2 text-sm font-medium text-slate-800"><CheckCircle2 className="h-4 w-4 text-emerald-600" />Demo account helper</p><p className="mt-1.5 text-xs leading-5 text-slate-500">Enter any email and password of 8 or more characters. Credentials are not sent anywhere.</p></div>
        <p className="mt-7 text-center text-sm text-slate-500">{isSignIn ? "New to Ledgerly?" : "Already have an account?"}{" "}<Link className="font-semibold text-violet-700 hover:text-violet-800" href={isSignIn ? "/sign-up" : "/sign-in"}>{isSignIn ? "Create an account" : "Sign in"}</Link></p>
      </div>
      <p className="text-xs text-slate-400">© 2026 Ledgerly · Frontend demo only</p>
    </section>
    <aside className="relative hidden min-h-screen flex-col justify-between overflow-hidden bg-slate-950 p-12 text-white lg:flex">
      <div className="absolute -right-44 top-24 h-[34rem] w-[34rem] rounded-full bg-violet-600/90" /><div className="absolute -right-24 top-40 h-[22rem] w-[22rem] rounded-full border border-white/10" />
      <div className="relative flex items-center gap-2.5 text-lg font-semibold"><span className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 bg-white/10"><WalletCards className="h-5 w-5 text-violet-200" /></span>Ledgerly</div>
      <div className="relative max-w-md"><span className="mb-6 inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-violet-100"><LockKeyhole className="mr-1.5 h-3.5 w-3.5" />Private by design</span><h2 className="text-5xl font-semibold leading-[1.08] tracking-tight">Money, made clearer.</h2><p className="mt-5 max-w-sm text-base leading-7 text-slate-300">A calmer, more considered way to see the details that matter to your everyday money.</p></div>
      <div className="relative grid gap-3"><div className="ml-auto w-[82%] rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-700 p-5 shadow-2xl"><p className="text-sm text-white/75">Everyday checking</p><p className="mt-1 text-2xl font-semibold">$12,480.75</p><div className="mt-6 flex justify-between text-xs text-white/70"><span>•••• 4508</span><span>Available now</span></div></div><div className="w-[76%] rounded-2xl border border-white/10 bg-white/[.08] p-4 backdrop-blur"><p className="text-xs text-slate-300">Latest activity</p><div className="mt-3 flex items-center justify-between"><span className="text-sm">Monthly paycheck</span><span className="text-sm font-semibold text-emerald-300">+$4,280.00</span></div></div></div>
    </aside>
  </main>;
}
