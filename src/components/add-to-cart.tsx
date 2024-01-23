'use client'

import { useFormState } from 'react-dom'

import { addItem } from '@/actions'

import { SubmitButton } from '@/components/submit-button'

import { type Product } from '@/service/interface'

interface AddToCartProps {
  variant?: Product['product']['variants']['edges'][0]['node']
}
export const AddToCart = (props: AddToCartProps) => {
  const { variant } = props
  const [message, formAction] = useFormState(addItem, null)
  const selectedVariantId = variant?.id

  const actionWithVariant = formAction.bind(null, selectedVariantId)

  return (
    <form action={actionWithVariant}>
      <SubmitButton size='lg' disabled={!variant}>
        Add To Cart
      </SubmitButton>
      <p aria-live='polite' className='sr-only' role='status'>
        {message}
      </p>
    </form>
  )
}
