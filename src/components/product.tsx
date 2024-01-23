import Link from 'next/link'
import Image from 'next/image'

import { createRangeText } from '@/utils'
import { cn } from '@/utils/shadcn'

interface ProductProps {
  className?: string
  product: {
    id: string
    title: string
    handle: string
    featuredImage: {
      url: string
    }
    priceRange: {
      maxVariantPrice: {
        amount: string
      }
      minVariantPrice: {
        amount: string
      }
    }
  }
}

export const Product = (props: ProductProps) => {
  const { className, product } = props
  const image = product.featuredImage.url
  const price = createRangeText(
    product.priceRange.minVariantPrice.amount,
    product.priceRange.maxVariantPrice.amount,
  )
  return (
    <Link
      className={cn(
        'group block ring-offset-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
      href={`/products/${product.handle}`}
    >
      <Image
        draggable={false}
        priority={false}
        className='h-[340px] w-[340px] select-none rounded-lg bg-[#f3f3f3] object-cover transition-all group-hover:-translate-y-2 group-hover:scale-105 group-hover:shadow dark:brightness-90'
        width={340}
        height={340}
        alt={product.title}
        src={image}
        loading='lazy'
      />
      <h2 className='mb-2 mt-4 underline-offset-4 group-hover:underline'>
        {product.title}
      </h2>
      <p className='text-lg font-semibold'>{price}</p>
    </Link>
  )
}
