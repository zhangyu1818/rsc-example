import { unstable_cache } from 'next/cache'
import { GraphQLClient, gql, type RequestMiddleware } from 'graphql-request'

import type {
  AddToCart,
  BestSellers,
  CreateCart,
  GetCart,
  OldestProducts,
  Product,
  GetProductList,
  GetCollections,
} from './interface'

export const TAGS = {
  oldestProducts: 'oldest-products',
  cart: 'cart',
}

const API = 'https://mock.shop/api'

const requestMiddleware: RequestMiddleware = async (request) => {
  try {
    console.log(request.operationName, request.variables ?? '')
  } catch {}
  return request
}

const client = new GraphQLClient(API, { requestMiddleware, fetch })

export const getOldestProducts = unstable_cache((): Promise<OldestProducts> => {
  const query = gql`
    query OldestProducts {
      products(first: 6, sortKey: CREATED_AT, reverse: true) {
        edges {
          node {
            id
            title
            handle
            featuredImage {
              url
              id
            }
            priceRange {
              maxVariantPrice {
                amount
              }
              minVariantPrice {
                amount
              }
            }
          }
        }
      }
    }
  `
  return client.request(query)
}, [TAGS.oldestProducts])

export const getProduct = unstable_cache((handle: string): Promise<Product> => {
  const query = gql`
    query Product {
      product(handle: "${handle}") {
        id
        handle
        title
        description
        options {
          id
          name
          values
        }
        priceRange {
          maxVariantPrice {
            amount
          }
          minVariantPrice {
            amount
          }
        }
        variants(first: 20) {
          edges {
            node {
              id
              title
              selectedOptions {
                name
                value
              }
              price {
                amount
              }
              image {
                id
                url
              }
            }
          }
        }
        featuredImage {
          id
          url
        }
        tags
      }
    }
  `
  return client.request(query)
})

export const createCart = (): Promise<CreateCart> => {
  const query = gql`
    mutation CartCreate {
      cartCreate(input: {}) {
        cart {
          id
        }
      }
    }
  `
  return client.request(query)
}

// export const getCart = unstable_cache(
//   (cartId: string): Promise<GetCart> => {
//     const query = gql`
//       query GetCart{
//           cart(id: "${cartId}") {
//               id
//               cost {
//                   subtotalAmount {
//                       amount
//                   }
//                   totalTaxAmount {
//                       amount
//                   }
//                   totalAmount {
//                       amount
//                   }
//               }
//               totalQuantity
//               lines(first: 100) {
//                   edges {
//                       node {
//                           id
//                           quantity
//                           cost {
//                               totalAmount {
//                                   amount
//                               }
//                           }
//                           merchandise {
//                               ... on ProductVariant {
//                                   id
//                                   title
//                                   selectedOptions {
//                                       name
//                                       value
//                                   }
//                                   image {
//                                       id
//                                       url
//                                   }
//                                   product {
//                                       id
//                                       title
//                                       handle
//                                   }
//                               }
//                           }
//                       }
//                   }
//               }
//           }
//       }
//   `
//     return client.request(query)
//   },
//   [TAGS.cart],
//   { tags: [TAGS.cart] },
// )

export const getCart = async (cartId: string): Promise<GetCart> => {
  console.log('getCart')
  const request = await fetch(
    `https://mock.shop/api?query=%20query%20GetCart{cart(id:%20%22${cartId}%22){id%20cost%20{subtotalAmount%20{amount}%20totalTaxAmount%20{amount}%20totalAmount%20{amount}}%20totalQuantity%20lines(first:%20100){edges%20{node%20{id%20quantity%20cost%20{totalAmount%20{amount}}%20merchandise%20{...%20on%20ProductVariant%20{id%20title%20selectedOptions%20{name%20value}%20image%20{id%20url}%20product%20{id%20title%20handle}}}}}}}}`,
    {
      cache: 'no-store',
      next: {
        tags: [TAGS.cart],
      },
    },
  )
  const response = await request.json()
  return response.data
}

export const addToCart = async (
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[],
): Promise<AddToCart> => {
  const mutation = gql`
    mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          cost {
            subtotalAmount {
              amount
            }
            totalTaxAmount {
              amount
            }
            totalAmount {
              amount
            }
          }
          totalQuantity
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                cost {
                  totalAmount {
                    amount
                  }
                }
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    selectedOptions {
                      name
                      value
                    }
                    image {
                      id
                      url
                    }
                    product {
                      id
                      title
                      handle
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `
  return client.request(mutation, { cartId, lines })
}

export const updateCart = (
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[],
) => {
  const query = gql`
    mutation UpdateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          cost {
            subtotalAmount {
              amount
            }
            totalTaxAmount {
              amount
            }
            totalAmount {
              amount
            }
          }
          totalQuantity
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                cost {
                  totalAmount {
                    amount
                  }
                }
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    selectedOptions {
                      name
                      value
                    }
                    image {
                      id
                      url
                    }
                    product {
                      id
                      title
                      handle
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `
  return client.request(query, { cartId, lines })
}

export const getBestSellers = unstable_cache((): Promise<BestSellers> => {
  const query = gql`
    query BestSellers {
      products(first: 12, sortKey: BEST_SELLING) {
        edges {
          node {
            id
            title
            handle
            featuredImage {
              id
              url
            }
            priceRange {
              maxVariantPrice {
                amount
              }
              minVariantPrice {
                amount
              }
            }
          }
        }
      }
    }
  `
  return client.request(query)
})

interface GetProductListParams {
  first?: number
  cursor?: string
  query?: string
}
export const getProductList = (
  params: GetProductListParams,
): Promise<GetProductList> => {
  const { first = 9, ...restParams } = params
  const query = gql`
    query ProductList($first: Int, $cursor: String, $query: String) {
      products(first: $first, after: $cursor, query: $query) {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
        edges {
          cursor
          node {
            id
            title
            handle
            featuredImage {
              url
            }
            priceRange {
              maxVariantPrice {
                amount
              }
              minVariantPrice {
                amount
              }
            }
          }
        }
      }
    }
  `
  return client.request(query, { first, ...restParams })
}

export const getCollections = unstable_cache((): Promise<GetCollections> => {
  const query = gql`
    query Collections {
      collections(first: 10) {
        edges {
          node {
            id
            handle
            title
            image {
              url
            }
          }
        }
      }
    }
  `
  return client.request(query)
})
