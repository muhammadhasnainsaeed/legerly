import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Ledgerly — your money, in focus", template: "%s | Ledgerly" },
  description: "A calm, frontend-only personal finance dashboard demo.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
