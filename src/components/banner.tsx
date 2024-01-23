import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'
import bannerImage from '@/images/home-banner.jpg'
import Link from 'next/link'

export const Banner = () => (
  <section className='relative p-4 md:p-8'>
    <AspectRatio className='z-0' ratio={3}>
      <Image
        priority={false}
        className='h-full w-full rounded-lg object-cover shadow-xl'
        src={bannerImage}
        placeholder='blur'
        alt='Home Banner Image'
      />
    </AspectRatio>
    <div className='absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center'>
      <h1 className='mb-2 whitespace-nowrap text-xl font-extrabold text-white lg:mb-10 lg:text-5xl'>
        The Peak Collection
      </h1>
      <Link
        href='/collections'
        className='inline-block rounded-md border-2 border-white px-2 py-1 text-sm font-bold text-white transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:px-8 lg:py-4 lg:text-2xl'
      >
        SHOP NOW
      </Link>
    </div>
  </section>
)
