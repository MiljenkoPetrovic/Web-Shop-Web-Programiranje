const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: "HRK",
    style: "currency",
  })
  
  export function formatCurrency(number: number) {
    return CURRENCY_FORMATTER.format(number)
  }