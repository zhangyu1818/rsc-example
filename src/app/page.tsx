import Link from 'next/link'
import Image from 'next/image'
import { type Metadata } from 'next'

import { getOldestProducts } from '@/service'
import { createRangeText } from '@/utils'

export const metadata: Metadata = {
  description:
    'High-performance ecommerce store built with Next.js, and "mock.shop".',
  openGraph: {
    type: 'website',
  },
}

export default async function Home() {
  const {
    products: { edges },
  } = await getOldestProducts()
  return (
    <>
      <section className='flex flex-col gap-8 bg-[#f3f3f3] p-8'>
        <h1 className='text-center text-2xl font-bold'>New Arrivals</h1>
        <ul className='grid grid-cols-3 grid-rows-3 justify-items-center gap-6'>
          {edges.map(({ node }) => {
            const image = node.featuredImage.url
            const price = createRangeText(
              node.priceRange.minVariantPrice.amount,
              node.priceRange.maxVariantPrice.amount,
            )
            return (
              <li className='group' key={node.id}>
                <Link href={`/product/${node.handle}`}>
                  <Image
                    draggable={false}
                    className='select-none rounded-lg transition-transform group-hover:scale-105'
                    width={340}
                    height={340}
                    alt={node.title}
                    src={image}
                  />
                  <h2 className='my-2 text-sm underline-offset-4 group-hover:underline'>
                    {node.title}
                  </h2>
                  <p className='font-semibold'>{price}</p>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
    </>
  )
}
