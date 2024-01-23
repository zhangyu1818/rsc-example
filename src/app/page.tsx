import Link from 'next/link'
import Image from 'next/image'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { NewArrivals } from '@/components/new-arrivals'

import { type Metadata } from 'next'

import bannerImage from '@/images/home-banner.jpg'
import { BestSellers } from '@/components/best-sellers'
import { Banner } from '@/components/banner'

export const metadata: Metadata = {
  description:
    'High-performance ecommerce store built with Next.js, and "mock.shop".',
  openGraph: {
    type: 'website',
  },
}

export default function Home() {
  return (
    <>
      <Banner />
      <NewArrivals />
      <BestSellers />
    </>
  )
}
