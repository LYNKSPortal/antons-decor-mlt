// WooCommerce REST API Integration
// Documentation: https://woocommerce.github.io/woocommerce-rest-api-docs/

const WOOCOMMERCE_API_BASE = 'https://antonsdecor-com.stackstaging.com/wp-json/wc/v3';
const CONSUMER_KEY = process.env.ARTURE_API_KEY || '';
const CONSUMER_SECRET = process.env.ARTURE_CLIENT_SECRET || '';

interface WooCommerceProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  description: string;
  short_description: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  stock_status: 'instock' | 'outofstock' | 'onbackorder';
  stock_quantity: number | null;
  categories: Array<{ id: number; name: string; slug: string }>;
  images: Array<{ id: number; src: string; name: string; alt: string }>;
  attributes: any[];
  average_rating: string;
  rating_count: number;
}

interface WooCommerceApiResponse {
  data: WooCommerceProduct[];
  total: number;
  totalPages: number;
}

// Fetch products from WooCommerce
export async function fetchWooCommerceProducts(params?: {
  category?: string;
  search?: string;
  page?: number;
  per_page?: number;
  orderby?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: any[]; total: number; page: number }> {
  try {
    const queryParams = new URLSearchParams({
      consumer_key: CONSUMER_KEY,
      consumer_secret: CONSUMER_SECRET,
    });

    if (params?.search) queryParams.append('search', params.search);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
    if (params?.orderby) queryParams.append('orderby', params.orderby);
    if (params?.order) queryParams.append('order', params.order);
    if (params?.category) queryParams.append('category', params.category);

    const url = `${WOOCOMMERCE_API_BASE}/products?${queryParams.toString()}`;

    console.log('Fetching from WooCommerce API:', url.replace(CONSUMER_SECRET, '***'));

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('WooCommerce API Error:', response.status, errorText);
      throw new Error(`WooCommerce API error: ${response.status} ${response.statusText}`);
    }

    const products: WooCommerceProduct[] = await response.json();
    
    // Get total from headers
    const total = parseInt(response.headers.get('x-wp-total') || '0');
    const totalPages = parseInt(response.headers.get('x-wp-totalpages') || '1');

    console.log(`Successfully fetched ${products.length} products from WooCommerce`);

    return {
      data: products,
      total,
      page: params?.page || 1,
    };
  } catch (error) {
    console.error('Error fetching from WooCommerce API:', error);
    throw error;
  }
}

// Fetch single product
export async function fetchWooCommerceProduct(productId: number): Promise<WooCommerceProduct | null> {
  try {
    const queryParams = new URLSearchParams({
      consumer_key: CONSUMER_KEY,
      consumer_secret: CONSUMER_SECRET,
    });

    const url = `${WOOCOMMERCE_API_BASE}/products/${productId}?${queryParams.toString()}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`WooCommerce API error: ${response.status} ${response.statusText}`);
    }

    const product: WooCommerceProduct = await response.json();
    return product;
  } catch (error) {
    console.error('Error fetching product from WooCommerce:', error);
    return null;
  }
}

// Fetch categories
export async function fetchWooCommerceCategories(): Promise<any[]> {
  try {
    const queryParams = new URLSearchParams({
      consumer_key: CONSUMER_KEY,
      consumer_secret: CONSUMER_SECRET,
      per_page: '100',
    });

    const url = `${WOOCOMMERCE_API_BASE}/products/categories?${queryParams.toString()}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`WooCommerce API error: ${response.status} ${response.statusText}`);
    }

    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error('Error fetching categories from WooCommerce:', error);
    return [];
  }
}

// Transform WooCommerce product to our internal format
export function transformWooCommerceProduct(wooProduct: WooCommerceProduct) {
  return {
    id: wooProduct.id,
    name: wooProduct.name,
    slug: wooProduct.slug,
    description: wooProduct.description || wooProduct.short_description,
    price: parseFloat(wooProduct.price) || 0,
    currency: 'EUR',
    category: wooProduct.categories?.[0]?.name || 'Uncategorized',
    categoryName: wooProduct.categories?.[0]?.name || 'Uncategorized',
    imageUrl: wooProduct.images?.[0]?.src || null,
    images: wooProduct.images?.map(img => img.src) || [],
    inStock: wooProduct.stock_status === 'instock',
    sku: wooProduct.slug,
    rating: parseFloat(wooProduct.average_rating) || 5,
    featured: false,
  };
}
