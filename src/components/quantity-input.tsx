'use client'
import { memo } from 'react'
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useDebounceFunc, useInheritedState } from '@/hooks'
import { cn } from '@/utils/shadcn'

interface QuantityInputProps {
  className?: string
  value: number
  onChange: (value: number) => void
  minusAction: () => void
  plusAction: () => void
}

export const QuantityInput = memo<QuantityInputProps>((props) => {
  const { className, value, onChange, minusAction, plusAction } = props
  const [quantity, setQuantity] = useInheritedState(value)

  const debounceOnChange = useDebounceFunc(onChange, 500)

  return (
    <div className={cn('flex', className)}>
      <Button
        className='h-8 w-8 rounded-r-none border border-r-0'
        variant='ghost'
        size='sm'
        formAction={minusAction}
      >
        <MinusIcon />
      </Button>
      <Input
        name='quantity'
        className='h-8 appearance-none rounded-none px-0.5 text-center text-sm [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
        type='number'
        value={quantity}
        onChange={(e) => {
          const value = Number(e.target.value)
          setQuantity(value)
          debounceOnChange(value)
        }}
      />
      <Button
        className='h-8 w-8 rounded-l-none border border-l-0'
        variant='ghost'
        size='sm'
        formAction={plusAction}
      >
        <PlusIcon />
      </Button>
    </div>
  )
})
