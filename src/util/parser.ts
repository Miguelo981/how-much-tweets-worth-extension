export function getNumberFromString(text: string): number {
  const numbers = text.match(/\d+/);

  if (!numbers) return 0;

  return Number(numbers[0]);
}

export function getParsedPrice(price: number): string {
  return price.toFixed(2);

  return Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  }).format(price);
}
