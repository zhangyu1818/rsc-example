'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { clsx } from 'clsx'

import { type Product } from '@/service/interface'

interface VariantOptionsProps {
  options: Product['product']['options']
}
export const VariantOptions = (props: VariantOptionsProps) => {
  const { options } = props
  const searchParams = useSearchParams()

  const currentOptions = Object.fromEntries(searchParams.entries())

  return (
    <div className='flex flex-col gap-4'>
      {options.map((option) => {
        const currentValue = currentOptions[option.name]
        return (
          <div key={option.id}>
            <h2 className='font-semibold'>{option.name}</h2>
            <ul className='flex flex-wrap gap-2'>
              {option.values.map((value) => {
                const params = new URLSearchParams(searchParams.toString())
                params.set(option.name, value)
                const url = `?${params.toString()}`
                return (
                  <li className='mt-2' key={value}>
                    <Link
                      className={clsx(
                        'border px-2.5 py-1.5 text-xs font-semibold',
                        currentValue === value
                          ? 'border-black bg-black text-white'
                          : 'bg-white text-gray-700',
                      )}
                      href={url}
                    >
                      {value}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}
