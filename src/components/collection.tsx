import Link from 'next/link'
import Image from 'next/image'

import { cn } from '@/utils/shadcn'

interface CollectionProps {
  className?: string
  collection: {
    id: string
    handle: string
    title: string
    image: {
      url: string
    }
  }
}

export const Collection = (props: CollectionProps) => {
  const { className, collection } = props
  const image = collection.image.url

  return (
    <Link
      className={cn(
        'group block ring-offset-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
      href={`/collections/${collection.handle}`}
    >
      <Image
        draggable={false}
        priority={false}
        quality={70}
        className='h-[340px] w-[340px] select-none rounded-lg bg-[#f3f3f3] object-cover transition-all group-hover:-translate-y-2 group-hover:scale-105 group-hover:shadow dark:brightness-90'
        width={340}
        height={340}
        alt={collection.title}
        src={image}
        loading='lazy'
      />
      <h2 className='mb-2 mt-4 text-center text-lg font-semibold underline-offset-4 group-hover:underline'>
        {collection.title}
      </h2>
    </Link>
  )
}
