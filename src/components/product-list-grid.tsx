'use client'
import { memo, useRef, useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { clsx } from 'clsx'

import { Product } from '@/components/product'
import { ListContainer } from '@/components/list-container'
import { EmptyContent } from '@/components/empty-content'
import { getProductList } from '@/service'

interface ProductListGridProps {
  query?: string
}

export const ProductListGrid = memo<ProductListGridProps>((props) => {
  const { query } = props

  const loaderRef = useRef<HTMLSpanElement | null>(null)

  const { data, isFetchingNextPage, hasNextPage, fetchNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: [query],
      queryFn(data) {
        const { pageParam } = data
        const cursor = pageParam || undefined
        return getProductList({ query, cursor })
      },
      getNextPageParam(lastPage) {
        if (lastPage.products.pageInfo.hasNextPage) {
          return lastPage.products.pageInfo.endCursor
        }
      },
      initialPageParam: '',
      staleTime: 60 * 1000,
    })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entities) => {
        const target = entities[0]
        if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      {
        root: null,
        rootMargin: '20px',
        threshold: 1.0,
      },
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current)
      }
    }
  }, [hasNextPage, isFetchingNextPage])

  const isEmpty = data?.pages[0].products.edges.length === 0 && !isLoading

  return isEmpty ? (
    <EmptyContent title="Oops! It looks like the stars haven't aligned just yet." />
  ) : (
    <ListContainer>
      {data?.pages.flatMap((page, index) =>
        page.products.edges.map(({ node }) => (
          <Product
            key={node.id}
            className={clsx(
              index !== 0 && 'duration-200 ease-out animate-in zoom-in',
            )}
            product={node}
          />
        )),
      )}
      <span ref={loaderRef} />
    </ListContainer>
  )
})
