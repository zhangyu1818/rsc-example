'use client'

import { useFormState } from 'react-dom'

import { SubmitButton } from '@/components/submit-button'
import { addItem } from '@/actions'

import { type Product } from '@/actions/interface'

interface AddToCartProps {
  variant?: Product['data']['product']['variants']['edges'][0]['node']
}
export const AddToCart = (props: AddToCartProps) => {
  const { variant } = props
  const [message, formAction] = useFormState(addItem, null)
  const selectedVariantId = variant?.id

  const actionWithVariant = formAction.bind(null, selectedVariantId)

  return (
    <form action={actionWithVariant}>
      <SubmitButton disabled={!variant} />
      <p aria-live='polite' className='sr-only' role='status'>
        {message}
      </p>
    </form>
  )
}
