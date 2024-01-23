'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { Toggle } from '@/components/ui/toggle'

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
                    <Link href={url}>
                      <Toggle
                        className='min-w-8'
                        variant='outline'
                        size='sm'
                        pressed={currentValue === value}
                      >
                        {value}
                      </Toggle>
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
