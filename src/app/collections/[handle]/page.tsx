import { upperFirst } from 'lodash-es'
import { Section } from '@/components/section'
import { ProductList } from '@/components/product-list'
interface CollectionPageProps {
  params: {
    handle: string
  }
}
export default function CollectionPage(props: CollectionPageProps) {
  const {
    params: { handle },
  } = props
  const name = upperFirst(handle)
  return (
    <Section title={name}>
      <ProductList query={`tag:${handle}`} />
    </Section>
  )
}
