import type { Metadata } from "next";
// @ts-expect-error Next.js processes CSS side-effect imports.
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Ledgerly — your money, in focus", template: "%s | Ledgerly" },
  description: "A calm, frontend-only personal finance dashboard demo.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
