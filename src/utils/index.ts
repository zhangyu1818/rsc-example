export function createRangeText(
  minVariantPrice: string,
  maxVariantPrice: string,
) {
  let price = minVariantPrice
  if (minVariantPrice !== maxVariantPrice) {
    price += ' ~ ' + maxVariantPrice
  }
  return `$ ${price} USD`
}
