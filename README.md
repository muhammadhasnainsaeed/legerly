# Ledgerly

Ledgerly is a polished, frontend-only personal finance dashboard demo. It brings fictional account balances, spending activity, bills, and insights together in a calm, responsive interface.

> **Demo only:** Ledgerly does not connect to a bank, authenticate users, or move money. All names, balances, accounts, and transactions are fictional.

## Product flow

The experience is organized around an onboarding-to-finance overview flow, based on the supplied [Horizon Banking App Flow](https://www.figma.com/board/KtF7XeCMJfKpSmnS1YZqOv/Horizon-Banking-App-Flow?node-id=0-1&t=AgJr560jxsxLp2Za-0). Ledgerly uses that flow as a product reference and intentionally replaces external account and payment integrations with local demo interactions.

1. **Enter the demo** — Sign in or create a demo profile with an email and password. The form does not send credentials or create an account.
2. **Review the overview** — See total balance, monthly spending, upcoming bills, accounts, recent activity, and a spending snapshot.
3. **Connect a sample account** — The `/onboarding` journey previews profile details, a payment profile, sample bank selection, and a simulated connection. A fictional account appears on the Accounts page using browser-local demo state. No banking provider is contacted.
4. **Explore accounts** — View fictional checking, savings, and credit-card details.
5. **Review activity** — Search and filter transactions, page through results, and export the visible mock data as CSV.
6. **Preview a transfer** — Enter fictional recipient details, validate and review a transfer, then display a local confirmation. No payment is sent.
7. **Manage bills** — Inspect upcoming and paid sample bills; marking a bill paid changes only the current page state.
8. **Explore and personalize** — Review illustrative spending insights and update temporary profile, notification, and appearance preferences in Settings.

## Screens

| Route | Screen |
| --- | --- |
| `/sign-in` | Frontend-only sign-in demo |
| `/sign-up` | Safe demo onboarding |
| `/` | Overview dashboard |
| `/my-banks` | Mock accounts and account details |
| `/onboarding` | Multi-step sample account connection preview |
| `/transaction-history` | Searchable transaction history and CSV export |
| `/payment-transfer` | Validated transfer preview and simulated confirmation |
| `/bills` | Upcoming and paid bills and subscriptions |
| `/insights` | Spending trends, categories, and savings ideas |
| `/settings` | Demo profile, preferences, and reset control |

## Tech stack

- Next.js App Router and React
- TypeScript with strict checks
- Tailwind CSS
- Radix UI primitives styled as shadcn/ui components
- Lucide icons
- React Hook Form and Zod for transfer validation
- Local fictional data in `lib/mock-data.ts`

## Run locally

Requirements: Node.js and pnpm.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The demo sign-in accepts any email and a password of at least eight characters.

To verify the project:

```bash
pnpm build
pnpm exec tsc --noEmit
```

## Privacy and limitations

- No backend, API route, authentication provider, bank-linking service, or payment service is used.
- No real banking details, identity numbers, or dates of birth are requested.
- Balances, users, account numbers, bills, and transactions are fictional examples.
- Transfers and bill payments only show local confirmation states; they do not affect balances or contact recipients.
- Profile and preference controls are temporary UI state; the sample connected-bank choice is stored in browser `localStorage` and cleared by Reset demo. None of it is a persistent financial record.
- The app is a UI demonstration, not financial advice or a financial product.
