import { notFound } from 'next/navigation'
import Image from 'next/image'

import { VariantOptions } from '@/components/variant-options'
import { AddToCart } from '@/components/add-to-cart'
import { Separator } from '@/components/ui/separator'
import { getProduct } from '@/service'

interface ProductPageProps {
  params: {
    handle: string
  }
  searchParams: Record<string, string>
}

export default async function ProductPage(props: ProductPageProps) {
  const { params, searchParams } = props
  const { product } = await getProduct(params.handle)

  if (!product) return notFound()

  const currentVariant = product.variants.edges.find(({ node }) =>
    node.selectedOptions.every(
      (option) => option.value === searchParams[option.name],
    ),
  )?.node

  const priceRangeText = createRangeText(
    product.priceRange.minVariantPrice.amount,
    product.priceRange.maxVariantPrice.amount,
  )

  const priceText = currentVariant
    ? `$ ${currentVariant.price.amount} USD`
    : priceRangeText

  const productImageSrc = currentVariant
    ? currentVariant.image.url
    : product.featuredImage.url

  const productImageTitle = currentVariant
    ? currentVariant.title
    : product.title

  return (
    <div className='flex flex-1 px-24 py-12 gap-8'>
      <div className='w-2/3'>
        <Image
          className='rounded-xl dark:brightness-90'
          width={715}
          height={715}
          src={productImageSrc}
          alt={productImageTitle}
        />
      </div>
      <aside className='flex w-1/3 flex-col gap-8'>
        <div>
          <h1 className='text-6xl font-extrabold tracking-wide'>
            {product.title}
          </h1>
          <p className='mt-4 font-semibold'>{priceText}</p>
        </div>
        <VariantOptions options={product.options} />
        <AddToCart variant={currentVariant} />
        <Separator decorative />
        <p className='text-gray-700'>{product.description}</p>
      </aside>
    </div>
  )
}

function createRangeText(minVariantPrice: string, maxVariantPrice: string) {
  let price = minVariantPrice
  if (minVariantPrice !== maxVariantPrice) {
    price += ' ~ ' + maxVariantPrice
  }
  return `$ ${price} USD`
}
