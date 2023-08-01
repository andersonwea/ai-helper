export function priceFormat(price: number) {
  const formatedPrice = new Intl.NumberFormat('USD', {
    style: 'currency',
    maximumFractionDigits: 5,
    currency: 'USD',
  }).format(price)

  return formatedPrice
}
