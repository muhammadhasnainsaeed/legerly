export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Math.abs(amount));

export const formatSignedCurrency = (amount: number) =>
  `${amount < 0 ? "−" : "+"}${formatCurrency(amount)}`;
