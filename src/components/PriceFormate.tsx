
export function PriceFormate(amount: any): string {
  const price: number = amount;
  const formattedPrice: string = price?.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return formattedPrice;
}