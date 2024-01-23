'use server'

import { cookies } from 'next/headers'
import { revalidateTag } from 'next/cache'
import { addToCart, createCart, getCart, TAGS, updateCart } from '@/service'

export const addItem = async (
  _: unknown,
  selectedVariantId: string | undefined,
) => {
  let cartId = cookies().get('cartId')?.value
  let cart

  if (cartId) {
    const response = await getCart(cartId)
    cart = response.cart
  }

  if (!cartId || !cart) {
    const response = await createCart()
    cart = response.cartCreate.cart
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

interface UpdateItemQuantityPayload {
  lineId: string
  variantId: string
  quantity: number
}

export async function updateItemQuantity(
  _: unknown,
  payload: UpdateItemQuantityPayload,
) {
  const cartId = cookies().get('cartId')?.value

  if (!cartId) {
    return 'Missing cart ID'
  }

  const { lineId, variantId, quantity } = payload

  try {
    await updateCart(cartId, [
      {
        id: lineId,
        merchandiseId: variantId,
        quantity,
      },
    ])
    revalidateTag(TAGS.cart)
  } catch (e) {
    return 'Error updating item quantity'
  }
}
