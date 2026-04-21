// Shopify Storefront API Integration
// Documentation: https://shopify.dev/docs/api/storefront

const SHOPIFY_STORE_DOMAIN = 'antonsdecor-com.stackstaging.com';
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.ARTURE_API_KEY || '';
const SHOPIFY_API_VERSION = '2024-01';

interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        price: {
          amount: string;
          currencyCode: string;
        };
        availableForSale: boolean;
        quantityAvailable: number;
      };
    }>;
  };
  productType: string;
  tags: string[];
  availableForSale: boolean;
}

// GraphQL query to fetch products
const PRODUCTS_QUERY = `
  query getProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          handle
          description
          descriptionHtml
          productType
          tags
          availableForSale
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                quantityAvailable
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

// Fetch products from Shopify Storefront API
export async function fetchShopifyProducts(params?: {
  category?: string;
  search?: string;
  first?: number;
}): Promise<{ data: any[]; total: number }> {
  try {
    const first = params?.first || 50;
    let query = '';
    
    if (params?.search) {
      query = `title:*${params.search}*`;
    }
    
    if (params?.category && params.category !== 'All') {
      query += query ? ` AND product_type:${params.category}` : `product_type:${params.category}`;
    }

    const url = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

    console.log('Fetching from Shopify Storefront API...');

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        query: PRODUCTS_QUERY,
        variables: {
          first,
          query: query || null,
        },
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Shopify API Error:', response.status, errorText);
      throw new Error(`Shopify API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    if (result.errors) {
      console.error('Shopify GraphQL Errors:', result.errors);
      throw new Error(`Shopify GraphQL error: ${JSON.stringify(result.errors)}`);
    }

    const products = result.data?.products?.edges?.map((edge: any) => edge.node) || [];

    console.log(`Successfully fetched ${products.length} products from Shopify`);

    return {
      data: products,
      total: products.length,
    };
  } catch (error) {
    console.error('Error fetching from Shopify API:', error);
    throw error;
  }
}

// Fetch single product by handle
export async function fetchShopifyProduct(handle: string): Promise<any | null> {
  try {
    const query = `
      query getProduct($handle: String!) {
        productByHandle(handle: $handle) {
          id
          title
          handle
          description
          descriptionHtml
          productType
          tags
          availableForSale
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 10) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                quantityAvailable
              }
            }
          }
        }
      }
    `;

    const url = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        query,
        variables: { handle },
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();
    return result.data?.productByHandle || null;
  } catch (error) {
    console.error('Error fetching product from Shopify:', error);
    return null;
  }
}

// Fetch collections (categories)
export async function fetchShopifyCollections(): Promise<any[]> {
  try {
    const query = `
      query getCollections {
        collections(first: 50) {
          edges {
            node {
              id
              title
              handle
              description
            }
          }
        }
      }
    `;

    const url = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query }),
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.status}`);
    }

    const result = await response.json();
    const collections = result.data?.collections?.edges?.map((edge: any) => edge.node) || [];
    return collections;
  } catch (error) {
    console.error('Error fetching collections from Shopify:', error);
    return [];
  }
}

// Transform Shopify product to our internal format
export function transformShopifyProduct(shopifyProduct: any) {
  const price = parseFloat(shopifyProduct.priceRange?.minVariantPrice?.amount || '0');
  const images = shopifyProduct.images?.edges?.map((edge: any) => edge.node.url) || [];
  const variant = shopifyProduct.variants?.edges?.[0]?.node;

  return {
    id: shopifyProduct.id,
    name: shopifyProduct.title,
    slug: shopifyProduct.handle,
    description: shopifyProduct.description || '',
    price: price,
    currency: shopifyProduct.priceRange?.minVariantPrice?.currencyCode || 'EUR',
    category: shopifyProduct.productType || 'Uncategorized',
    categoryName: shopifyProduct.productType || 'Uncategorized',
    imageUrl: images[0] || null,
    images: images,
    inStock: variant?.availableForSale || shopifyProduct.availableForSale || false,
    sku: shopifyProduct.handle,
    rating: 5, // Shopify doesn't provide ratings by default
    featured: shopifyProduct.tags?.includes('featured') || false,
  };
}
