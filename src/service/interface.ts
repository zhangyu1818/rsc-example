import exp from 'node:constants'

export type OldestProducts = {
  products: {
    edges: Array<{
      node: {
        id: string
        title: string
        handle: string
        featuredImage: {
          url: string
          id: string
        }
        priceRange: {
          maxVariantPrice: {
            amount: string
          }
          minVariantPrice: {
            amount: string
          }
        }
      }
    }>
  }
}

export type Product = {
  product: {
    id: string
    handle: string
    title: string
    description: string
    options: Array<{
      id: string
      name: string
      values: Array<string>
    }>
    priceRange: {
      maxVariantPrice: {
        amount: string
      }
      minVariantPrice: {
        amount: string
      }
    }
    variants: {
      edges: Array<{
        node: {
          id: string
          title: string
          selectedOptions: Array<{
            name: string
            value: string
          }>
          price: {
            amount: string
          }
          image: {
            id: string
            url: string
          }
        }
      }>
    }
    featuredImage: {
      id: string
      url: string
    }
    tags: Array<string>
  }
}

export type CreateCart = {
  cartCreate: {
    cart: {
      id: string
    }
  }
}

export type AddToCart = {
  cartLinesAdd: {
    cart: {
      id: string
      checkoutUrl: string
      cost: {
        subtotalAmount: {
          amount: string
          currencyCode: string
        }
        totalAmount: {
          amount: string
          currencyCode: string
        }
        totalTaxAmount: any
      }
      lines: {
        edges: Array<{
          node: {
            id: string
            quantity: number
            cost: {
              totalAmount: {
                amount: string
                currencyCode: string
              }
            }
            merchandise: {
              id: string
              title: string
              selectedOptions: Array<{
                name: string
                value: string
              }>
              image: {
                id: string
                url: string
              }
              product: {
                id: string
                title: string
                handle: string
              }
            }
          }
        }>
      }
      totalQuantity: number
    }
  }
}

export type GetCart = {
  cart: {
    id: string
    checkoutUrl: string
    cost: {
      subtotalAmount: {
        amount: string
        currencyCode: string
      }
      totalAmount: {
        amount: string
        currencyCode: string
      }
      totalTaxAmount: any
    }
    lines: {
      edges: Array<{
        node: {
          id: string
          quantity: number
          cost: {
            totalAmount: {
              amount: string
            }
          }
          merchandise: {
            id: string
            title: string
            selectedOptions: Array<{
              name: string
              value: string
            }>
            image: {
              id: string
              url: string
            }
            product: {
              id: string
              title: string
              handle: string
            }
          }
        }
      }>
    }
    totalQuantity: number
  }
}

export type UpdateCart = {
  cartLinesUpdate: {
    cart: {
      id: string
      // cost: {
      //   subtotalAmount: {
      //     amount: string
      //   }
      //   totalTaxAmount: any
      //   totalAmount: {
      //     amount: string
      //   }
      // }
      // totalQuantity: number
      // lines: {
      //   edges: Array<{
      //     node: {
      //       id: string
      //       quantity: number
      //       cost: {
      //         totalAmount: {
      //           amount: string
      //         }
      //       }
      //       merchandise: {
      //         id: string
      //         title: string
      //         selectedOptions: Array<{
      //           name: string
      //           value: string
      //         }>
      //         image: {
      //           id: string
      //           url: string
      //         }
      //         product: {
      //           id: string
      //           title: string
      //           handle: string
      //         }
      //       }
      //     }
      //   }>
      // }
    }
  }
}

export type BestSellers = {
  products: {
    edges: Array<{
      node: {
        id: string
        title: string
        handle: string
        featuredImage: {
          id: string
          url: string
        }
        priceRange: {
          maxVariantPrice: {
            amount: string
          }
          minVariantPrice: {
            amount: string
          }
        }
      }
    }>
  }
}

export type GetProductList = {
  products: {
    pageInfo: {
      startCursor: string
      endCursor: string
      hasNextPage: boolean
      hasPreviousPage: boolean
    }
    edges: Array<{
      cursor: string
      node: {
        id: string
        title: string
        handle: string
        featuredImage: {
          url: string
        }
        priceRange: {
          maxVariantPrice: {
            amount: string
          }
          minVariantPrice: {
            amount: string
          }
        }
      }
    }>
  }
}

export type GetCollections = {
  collections: {
    edges: Array<{
      node: {
        id: string
        handle: string
        title: string
        image: {
          url: string
        }
      }
    }>
  }
}
