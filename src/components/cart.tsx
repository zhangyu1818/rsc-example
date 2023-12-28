import { cookies } from 'next/headers'
import { getCart } from '@/actions'
import { CartDrawer } from '@/components/cart-drawer'

export const Cart = async () => {
  const cartId = cookies().get('cartId')?.value
  let cart = null

  if (cartId) {
    const response = await getCart(cartId)
    cart = response.data.cart
  }

  return (
      <CartDrawer cart={cart} />
  )
}
