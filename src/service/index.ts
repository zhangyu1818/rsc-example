import { unstable_cache } from 'next/cache'
import { GraphQLClient, gql, type RequestMiddleware } from 'graphql-request'

import {
  AddToCart,
  CreateCart,
  GetCart,
  OldestProducts,
  Product,
} from './interface'

export const TAGS = {
  oldestProducts: 'oldest-products',
  cart: 'cart',
}

const API = 'https://mock.shop/api'

const requestMiddleware: RequestMiddleware = async (request) => {
  try {
    // @ts-ignore
    const doc = JSON.parse(request.body)
    const query = !!doc.query
    console.log(query ? 'query' : 'mutation', doc.operationName)
  } catch {}
  return request
}

const client = new GraphQLClient(API, { requestMiddleware })

export const getOldestProducts = unstable_cache((): Promise<OldestProducts> => {
  const query = gql`
    query Products {
      products(first: 6, sortKey: CREATED_AT) {
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

export const getCart = (cartId: string): Promise<GetCart> => {
  const query = gql`
    query GetCart{
      cart(id: "${cartId}") {
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
  `
  return client.request(query)
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
