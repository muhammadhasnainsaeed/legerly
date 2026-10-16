"use client";

import { useState } from "react";
import { Check, RotateCcw, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SettingsPage() {
  const [name, setName] = useState("Hasnain Saeed");
  const [email, setEmail] = useState("hasnain@example.com");
  const [saved, setSaved] = useState(false);
  const [weekly, setWeekly] = useState(true);
  const [billAlerts, setBillAlerts] = useState(true);
  const [transactionAlerts, setTransactionAlerts] = useState(false);
  const [appearance, setAppearance] = useState("light");
  const [reset, setReset] = useState(false);
  const saveProfile = (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); setSaved(true); window.setTimeout(() => setSaved(false), 2500); };
  const resetDemo = () => {
    window.localStorage.removeItem("ledgerly-demo");
    window.localStorage.removeItem("ledgerly-connected-bank");
    setName("Hasnain Saeed");
    setEmail("hasnain@example.com");
    setWeekly(true);
    setBillAlerts(true);
    setTransactionAlerts(false);
    setAppearance("light");
    setReset(false);
  };

  return <>
    <PageHeader eyebrow="Your preferences" title="Settings" description="Manage your demo profile and Ledgerly experience." />
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(300px,.7fr)]">
      <div className="space-y-6">
        <Card><CardHeader><CardTitle>Profile</CardTitle><CardDescription>This profile is stored only in this page session.</CardDescription></CardHeader><CardContent>
          <form onSubmit={saveProfile} className="space-y-5">
            <div className="flex items-center gap-3"><Avatar className="h-12 w-12"><AvatarFallback className="bg-violet-100 text-violet-700">HS</AvatarFallback></Avatar><div><p className="font-medium">{name}</p><p className="text-xs text-slate-500">Demo profile</p></div></div>
            <div className="grid gap-4 sm:grid-cols-2"><div className="space-y-2"><Label htmlFor="profile-name">Full name</Label><Input id="profile-name" value={name} onChange={(event) => setName(event.target.value)} /></div><div className="space-y-2"><Label htmlFor="profile-email">Email address</Label><Input id="profile-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></div></div>
            <Button type="submit">{saved ? <><Check className="mr-2 h-4 w-4" />Saved locally</> : "Save changes"}</Button>
          </form>
        </CardContent></Card>
        <Card><CardHeader><CardTitle>Notifications</CardTitle><CardDescription>Choose the updates you’d like to see in this demo.</CardDescription></CardHeader><CardContent className="space-y-5">
          {[{ id: "weekly-digest", title: "Weekly spending summary", text: "A simple recap of your recent activity.", value: weekly, onChange: setWeekly }, { id: "bill-alerts", title: "Bill reminders", text: "A reminder when a sample bill is coming up.", value: billAlerts, onChange: setBillAlerts }, { id: "transaction-alerts", title: "Transaction activity", text: "A notice for new sample transactions.", value: transactionAlerts, onChange: setTransactionAlerts }].map((preference) => <div key={preference.id} className="flex items-start gap-3"><Checkbox id={preference.id} checked={preference.value} onCheckedChange={(checked) => preference.onChange(checked === true)} /><div className="grid gap-1"><Label htmlFor={preference.id} className="cursor-pointer">{preference.title}</Label><p className="text-xs text-slate-500">{preference.text}</p></div></div>)}
        </CardContent></Card>
        <Card><CardHeader><CardTitle>Appearance</CardTitle><CardDescription>Choose a preferred look for your demo.</CardDescription></CardHeader><CardContent><Tabs value={appearance} onValueChange={setAppearance}><TabsList><TabsTrigger value="light">Light</TabsTrigger><TabsTrigger value="system">System</TabsTrigger><TabsTrigger value="dark">Dark</TabsTrigger></TabsList></Tabs><p className="mt-3 text-xs text-slate-500">Appearance preference is a demo control and does not change system theme.</p></CardContent></Card>
      </div>
      <div className="space-y-6">
        <Card className="border-violet-100 bg-violet-50/50 shadow-none"><CardContent className="p-5"><div className="flex items-start gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-violet-700"><ShieldCheck className="h-4 w-4" /></span><div><h2 className="font-semibold">Privacy & demo data</h2><p className="mt-2 text-sm leading-5 text-slate-600">Ledgerly is a frontend-only demonstration. Your sample profile, balances, and activity are fictional. No financial institution or service is connected.</p><p className="mt-3 text-xs leading-5 text-slate-500">This demo does not request sensitive identity details, store credentials, or move money.</p></div></div></CardContent></Card>
        <Card><CardHeader><CardTitle>Reset demo</CardTitle><CardDescription>Clear local demo preferences and restore the sample profile.</CardDescription></CardHeader><CardContent><Dialog open={reset} onOpenChange={setReset}><DialogTrigger asChild><Button variant="outline"><RotateCcw className="mr-2 h-4 w-4" />Reset demo data</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Reset your demo preferences?</DialogTitle><DialogDescription>This removes the connected sample bank from this browser and restores the built-in fictional accounts and sample profile.</DialogDescription></DialogHeader><DialogFooter><Button variant="outline" onClick={() => setReset(false)}>Cancel</Button><Button variant="destructive" onClick={resetDemo}>Reset demo</Button></DialogFooter></DialogContent></Dialog></CardContent></Card>
      </div>
    </div>
  </>;
}
