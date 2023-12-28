export type OldestProducts = {
  data: {
    products: {
      edges: Array<{
        node: {
          id: string
          title: string
          handle: string
          images: {
            edges: Array<{
              node: {
                url: string
              }
            }>
          }
          variants: {
            edges: Array<{
              node: {
                price: {
                  amount: string
                }
              }
            }>
          }
        }
      }>
    }
  }
}

export type Product = {
  data: {
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
        url: string
        altText: any
        width: number
        height: number
      }
      seo: {
        description: any
        title: any
      }
      tags: Array<string>
    }
  }
}

export type CreateCart = {
  data: {
    cartCreate: {
      cart: {
        id: string
      }
    }
  }
}

export type AddToCart = {
  data: {
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
                product: {
                  title: string
                }
              }
            }
          }>
        }
        totalQuantity: number
      }
    }
  }
}

export type GetCart = {
  data: {
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
                title: string
              }
            }
          }
        }>
      }
      totalQuantity: number
    }
  }
}
