'use client'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { clsx } from 'clsx'

import { type GetCart } from '@/service/interface'
import Image from 'next/image'

interface CartDrawerProps {
  cart: GetCart['cart'] | null
}

export const CartDrawer = (props: CartDrawerProps) => {
  const { cart } = props
  const [open, setOpen] = useState(false)

  const totalQuantity = cart?.totalQuantity

  if (typeof window !== 'undefined') {
    document.documentElement.style.overflow = open ? 'hidden' : ''
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className='relative flex h-12 w-12 items-center justify-center rounded transition-colors hover:bg-[#f3f3f3]'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          aria-hidden='true'
          className='h-6 w-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
          ></path>
        </svg>
        {totalQuantity && (
          <span className='absolute right-0 top-0 block h-4 w-4 rounded bg-black text-xs text-white'>
            {totalQuantity}
          </span>
        )}
      </button>
      {open &&
        createPortal(
          <>
            <div
              className='fixed inset-0 z-20 bg-black opacity-50'
              onClick={() => setOpen(false)}
            />
            <div
              className={clsx(
                'fixed bottom-0 right-0 top-0 z-30 overflow-hidden bg-white transition-all',
                open ? 'w-[400px]' : 'w-0',
              )}
            >
              <div className='flex flex-col gap-6 p-6'>
                <h1 className='text-2xl font-bold'>Cart</h1>
                {totalQuantity ? (
                  cart!.lines.edges.map(({ node }) => {
                    const {
                      id,
                      quantity,
                      merchandise: { image, product },
                    } = node
                    return (
                      <div key={id} className='flex gap-4'>
                        <Image
                          className='rounded'
                          width={80}
                          height={80}
                          src={image.url}
                          alt={product.title}
                        />
                        <div className='flex flex-col gap-1'>
                          <h2 className='font-semibold'>{product.title}</h2>
                          <p className='text-xs'>Quantity: {quantity}</p>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <p className='cursor-default py-16 text-center text-xl font-semibold text-gray-700'>
                    Empty
                  </p>
                )}
              </div>
            </div>
          </>,
          document.body,
        )}
    </>
  )
}
