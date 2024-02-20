export function moneyStringToNumber(value: string) {
  return parseFloat(value.replace(/[^0-9.-]+/g, ""));
}

export function numberToMoneyString(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
