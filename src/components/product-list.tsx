import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

import { ProductListGrid } from '@/components/product-list-grid'
import { getProductList } from '@/service'

interface ProductListProps {
  query?: string
}
export const ProductList = async (props: ProductListProps) => {
  const { query } = props

  const queryClient = new QueryClient()

  await queryClient.prefetchInfiniteQuery({
    initialPageParam: '',
    queryKey: [query],
    queryFn: () => getProductList({ query }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListGrid query={query} />
    </HydrationBoundary>
  )
}
