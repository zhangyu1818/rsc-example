'use client'

import { memo, useRef } from 'react'
import { useFormState } from 'react-dom'
import Image from 'next/image'
import { clsx } from 'clsx'

import { updateItemQuantity } from '@/actions'

import { QuantityInput } from '@/components/quantity-input'
import { type GetCart } from '@/service/interface'

interface CartItemProps {
  item: GetCart['cart']['lines']['edges'][number]['node']
}
export const CartItem = memo<CartItemProps>((props) => {
  const { item } = props
  const {
    id,
    quantity,
    cost,
    merchandise: { id: merchandiseId, selectedOptions, image, product },
  } = item

  const [message, formAction] = useFormState(updateItemQuantity, null)
  const formRef = useRef<HTMLFormElement | null>(null)

  const selectedOptionsText = selectedOptions.reduce((pre, cur, index) => {
    let text = pre + cur.value
    if (index !== selectedOptions.length - 1) {
      text += ' / '
    }
    return text
  }, '')

  const basePayload = {
    lineId: id,
    variantId: merchandiseId,
  }

  const onFormSubmit = (formData: FormData) => {
    const quantity = formData.get('quantity')
    if (quantity) {
      formAction({ ...basePayload, quantity: +quantity })
    }
  }

  const minusWithPayload = formAction.bind(null, {
    ...basePayload,
    quantity: quantity - 1,
  })

  const plusWithPayload = formAction.bind(null, {
    ...basePayload,
    quantity: quantity + 1,
  })

  return (
    <form
      ref={formRef}
      action={onFormSubmit}
      className={clsx('flex gap-6 pb-6', 'mb-6 border-b')}
    >
      <Image
        className='rounded bg-[#f3f3f3] object-contain dark:brightness-90'
        width={88}
        height={88}
        src={image.url}
        alt={product.title}
      />
      <div className='w-full'>
        <h2 className='text-sm font-semibold'>{product.title}</h2>
        <span className='text-xs'>$ {cost.totalAmount.amount} USD</span>
        <div className='mt-2 flex items-center'>
          <span className='flex-1 text-xs text-gray-600'>
            {selectedOptionsText}
          </span>
          <QuantityInput
            className='mt-1 w-28'
            value={quantity}
            onChange={() => {
              formRef.current!.requestSubmit()
            }}
            minusAction={minusWithPayload}
            plusAction={plusWithPayload}
          />
        </div>
      </div>
    </form>
  )
})
