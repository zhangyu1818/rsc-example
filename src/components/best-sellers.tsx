import { Product } from '@/components/product'
import { Section } from '@/components/section'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

import { getBestSellers } from '@/service'

export const BestSellers = async () => {
  const {
    products: { edges },
  } = await getBestSellers()

  return (
    <Section title='Best Sellers'>
      <Carousel className='mx-16' opts={{ align: 'start' }}>
        <CarouselContent>
          {edges.map(({ node }) => (
            <CarouselItem
              className='flex basis-1/4 justify-center'
              key={node.id}
            >
              <Product product={node} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </Section>
  )
}
