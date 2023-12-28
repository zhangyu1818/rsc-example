'use server'

import { cookies } from 'next/headers'

import {
  AddToCart,
  CreateCart,
  GetCart,
  OldestProducts,
  Product,
} from './interface'
import { revalidateTag } from 'next/cache'

const TAGS = {
  cart: 'cart',
}

export const getOldestProducts = (): Promise<OldestProducts> =>
  fetch(
    'https://mock.shop/api?query={products(first:%206,%20sortKey:%20CREATED_AT){edges%20{node%20{id%20title%20handle%20images(first:%201){edges%20{node%20{url}}}%20variants(first:%201){edges%20{node%20{price%20{amount}}}}}}}}',
    { cache: 'force-cache' },
  ).then((res) => res.json())

export const getProduct = (handle: string): Promise<Product> =>
  fetch(
    `https://mock.shop/api?query={product(handle:%20%22${handle}%22){id%20handle%20title%20description%20options%20{id%20name%20values}%20priceRange%20{maxVariantPrice%20{amount}%20minVariantPrice%20{amount}}%20variants(first:%20250){edges%20{node%20{id%20title%20selectedOptions%20{name%20value}%20price%20{amount}%20image%20{id%20url}}}}%20featuredImage%20{url%20altText%20width%20height}%20seo%20{description%20title}%20tags}}`,
    { cache: 'force-cache', next: { tags: [TAGS.cart] } },
  ).then((res) => res.json())

export const createCart = async (): Promise<CreateCart> => {
  const body = {
    query: `mutation {
    cartCreate(input: {}) {
      cart {
        id
      }
    }
  }`,
  }
  const res = await fetch('https://mock.shop/api', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json',
    },
    cache: 'no-store',
  })
  return await res.json()
}

export const getCart = (cartId: string): Promise<GetCart> =>
  fetch(
    `https://mock.shop/api?query={cart(id:%20%22${cartId}%22){...cart}}%20fragment%20cart%20on%20Cart%20{id%20checkoutUrl%20cost%20{subtotalAmount%20{amount%20currencyCode}%20totalAmount%20{amount%20currencyCode}%20totalTaxAmount%20{amount%20currencyCode}}%20lines(first:%20100){edges%20{node%20{id%20quantity%20cost%20{totalAmount%20{amount%20currencyCode}}%20merchandise%20{...%20on%20ProductVariant%20{id%20title%20selectedOptions%20{name%20value}%20image%20{id%20url}%20product%20{title}}}}}}%20totalQuantity}`,
    { cache: 'no-store' },
  ).then((res) => res.json())

export const addToCart = async (
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[],
): Promise<AddToCart> => {
  const body = {
    query: `mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart {
      ...cart
    }
  }
}
${cartFragment}
`,
    variables: { cartId, lines },
  }
  const request = await fetch('https://mock.shop/api', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json',
    },
    cache: 'no-store',
  })
  return await request.json()
}

export const addItem = async (
  _: unknown,
  selectedVariantId: string | undefined,
) => {
  let cartId = cookies().get('cartId')?.value
  let cart

  if (cartId) {
    const response = await getCart(cartId)
    cart = response.data.cart
  }

  if (!cartId || !cart) {
    const response = await createCart()
    cart = response.data.cartCreate.cart
    cartId = cart.id
    cookies().set('cartId', cartId)
  }

  if (!selectedVariantId) {
    return 'Missing product variant ID'
  }

  try {
    await addToCart(cartId, [{ merchandiseId: selectedVariantId, quantity: 1 }])
    revalidateTag(TAGS.cart)
  } catch (e) {
    return 'Error adding item to cart'
  }
}

const cartFragment = /* GraphQL */ `
  fragment cart on Cart {
    id
    checkoutUrl
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              selectedOptions {
                name
                value
              }
              image {
                id
                url
              }
              product {
                title
              }
            }
          }
        }
      }
    }
    totalQuantity
  }
`
