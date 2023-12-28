import { clsx } from 'clsx'
import { type ButtonHTMLAttributes } from 'react'

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const SubmitButton = (props: SubmitButtonProps) => {
  const { className, disabled, ...restProps } = props
  return (
    <button
      disabled={disabled}
      className={clsx(
        'w-full bg-black px-4 py-2.5 text-lg font-semibold text-white transition-all',
        disabled ? 'cursor-not-allowed opacity-60' : 'hover:scale-105',
      )}
      {...restProps}
    >
      Add To Cart
    </button>
  )
}
