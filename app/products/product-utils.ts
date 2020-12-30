export const formatPrice = (total: number) => {
  const priceRest = total % 100
  let price = "Free"
  if (total) {
    let cents = "-"
    if (priceRest) {
      cents = priceRest < 10 ? "0" + priceRest : priceRest.toString()
    }
    price = `${(total - priceRest) / 100},${cents}€`
  }
  return price
}
