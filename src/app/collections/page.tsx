import { Section } from '@/components/section'
import { Collection } from '@/components/collection'
import { ListContainer } from '@/components/list-container'
import { getCollections } from '@/service'

export default async function Collections() {
  const {
    collections: { edges },
  } = await getCollections()

  return (
    <Section title='Collections'>
      <ListContainer>
        {edges.map(({ node }) => (
          <Collection key={node.id} collection={node} />
        ))}
      </ListContainer>
    </Section>
  )
}
