'use client'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ShoppingCart } from '@/components/ui/icons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CartItem } from '@/components/cart-item'

import { type GetCart } from '@/service/interface'

interface CartDrawerProps {
  cart: GetCart['cart'] | null
}

export const CartDrawer = (props: CartDrawerProps) => {
  const { cart } = props

  const totalQuantity = cart?.totalQuantity

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className='relative h-12 w-12 p-0' variant='ghost'>
          <ShoppingCart className='h-6 w-6' />
          {totalQuantity && (
            <Badge className='absolute -right-1 -top-1 origin-top-right scale-75'>
              {totalQuantity}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className='pt-6'>
          {totalQuantity ? (
            cart!.lines.edges.map(({ node }, index, array) => {
              return <CartItem key={node.id} item={node} />
            })
          ) : (
            <p className='cursor-default py-16 text-center text-xl font-semibold text-gray-700'>
              Empty
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
