'use client'

import { useFormStatus } from 'react-dom'
import { UpdateIcon } from '@radix-ui/react-icons'

import { Button, type ButtonProps } from '@/components/ui/button'
import { clsx } from 'clsx'

export const SubmitButton = (props: ButtonProps) => {
  const { className, children, disabled, ...restProps } = props
  const { pending } = useFormStatus()

  return (
    <Button
      className={clsx('w-full font-semibold', className)}
      disabled={pending || disabled}
      {...restProps}
    >
      {pending && <UpdateIcon className='mr-3 h-4 w-4 animate-spin' />}
      {children}
    </Button>
  )
}
