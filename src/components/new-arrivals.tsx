import { Product } from '@/components/product'
import { Section } from '@/components/section'
import { ListContainer } from '@/components/list-container'
import { getOldestProducts } from '@/service'

export const NewArrivals = async () => {
  const {
    products: { edges },
  } = await getOldestProducts()

  return (
    <Section title='New Arrivals'>
      <ListContainer asChild>
        <ul>
          {edges.map(({ node }) => {
            return (
              <li key={node.id}>
                <Product product={node} />
              </li>
            )
          })}
        </ul>
      </ListContainer>
    </Section>
  )
}
