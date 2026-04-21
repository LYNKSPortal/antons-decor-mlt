// WooCommerce/Extenda API Integration
// Base URL: https://antonsdecor-com.stackstaging.com
// This is a WordPress/WooCommerce site

const WOOCOMMERCE_API_BASE = 'https://antonsdecor-com.stackstaging.com/wp-json/wc/v3';
const CONSUMER_KEY = process.env.ARTURE_API_KEY;
const CONSUMER_SECRET = process.env.ARTURE_CLIENT_SECRET;

interface ArtureProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  images: string[];
  inStock: boolean;
  sku: string;
  brand?: string;
  attributes?: Record<string, any>;
}

interface ArtureApiResponse {
  data: ArtureProduct[];
  total: number;
  page: number;
  perPage: number;
}

export async function fetchArtureProducts(params?: {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<ArtureApiResponse> {
  try {
    const queryParams = new URLSearchParams();
    
    if (params?.category) queryParams.append('category', params.category);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const url = `${EXTENDA_API_BASE}/extendago-process-products?${queryParams.toString()}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ARTURE_API_KEY}`,
        'X-Client-Secret': ARTURE_CLIENT_SECRET || '',
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Arture API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching from Arture API:', error);
    throw error;
  }
}

export async function fetchArtureProductById(productId: string): Promise<ArtureProduct | null> {
  try {
    const url = `${EXTENDA_API_BASE}/extendago-process-products/${productId}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ARTURE_API_KEY}`,
        'X-Client-Secret': ARTURE_CLIENT_SECRET || '',
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`Arture API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching product from Arture API:', error);
    return null;
  }
}

export async function fetchArtureCategories(): Promise<string[]> {
  try {
    const url = `${EXTENDA_API_BASE}/extendago-process-products`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ARTURE_API_KEY}`,
        'X-Client-Secret': ARTURE_CLIENT_SECRET || '',
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Arture API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.categories || [];
  } catch (error) {
    console.error('Error fetching categories from Arture API:', error);
    return [];
  }
}

// Fetch product changes
export async function fetchProductChanges(): Promise<any> {
  try {
    const url = `${EXTENDA_API_BASE}/extendago-process-changes`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ARTURE_API_KEY}`,
        'X-Client-Secret': ARTURE_CLIENT_SECRET || '',
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Extenda API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching product changes from Extenda API:', error);
    throw error;
  }
}

// Fetch stock changes
export async function fetchStockChanges(): Promise<any> {
  try {
    const url = `${EXTENDA_API_BASE}/extendago-process-stockchanges`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ARTURE_API_KEY}`,
        'X-Client-Secret': ARTURE_CLIENT_SECRET || '',
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Extenda API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching stock changes from Extenda API:', error);
    throw error;
  }
}

// Transform Arture product to our internal format
export function transformArtureProduct(artureProduct: ArtureProduct) {
  return {
    id: artureProduct.id,
    name: artureProduct.name,
    description: artureProduct.description,
    price: artureProduct.price,
    currency: artureProduct.currency || 'EUR',
    category: artureProduct.category,
    imageUrl: artureProduct.images?.[0] || null,
    images: artureProduct.images || [],
    inStock: artureProduct.inStock,
    sku: artureProduct.sku,
    brand: artureProduct.brand,
    rating: 5, // Default rating
  };
}
