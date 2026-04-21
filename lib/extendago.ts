// Extenda GO API Integration
// Direct connection to Extenda GO POS system

const EXTENDA_GO_API_BASE = process.env.EXTENDA_GO_API_BASE || 'https://api.extendago.com';
const ARTURE_API_KEY = process.env.ARTURE_API_KEY || '';
const CLIENT_ID = process.env.EXTENDA_CLIENT_ID || '';
const CLIENT_SECRET = process.env.ARTURE_CLIENT_SECRET || '';

interface ExtendaGoProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  sku: string;
  barcode?: string;
  stock: number;
  inStock: boolean;
  images?: string[];
  attributes?: Record<string, any>;
}

// OAuth 2.0 Token Management
let accessToken: string | null = null;
let tokenExpiry: number = 0;

async function getAccessToken(): Promise<string> {
  // Check if we have a valid token
  if (accessToken && Date.now() < tokenExpiry) {
    return accessToken;
  }

  try {
    // Request new access token using Client Credentials flow
    const tokenUrl = `${EXTENDA_GO_API_BASE}/oauth/token`;
    
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
    });

    if (!response.ok) {
      throw new Error(`OAuth token request failed: ${response.status}`);
    }

    const data = await response.json();
    accessToken = data.access_token;
    tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000; // Refresh 1 min before expiry

    if (!accessToken) {
      throw new Error('No access token received from OAuth');
    }

    return accessToken;
  } catch (error) {
    console.error('Error getting Extenda GO access token:', error);
    throw error;
  }
}

// Fetch products from Extenda GO
export async function fetchExtendaGoProducts(params?: {
  category?: string;
  search?: string;
  limit?: number;
  offset?: number;
}): Promise<{ data: any[]; total: number }> {
  try {
    const token = await getAccessToken();
    
    const queryParams = new URLSearchParams({
      api_key: ARTURE_API_KEY,
    });

    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.offset) queryParams.append('offset', params.offset.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.category) queryParams.append('category', params.category);

    const url = `${EXTENDA_GO_API_BASE}/v1/products?${queryParams.toString()}`;

    console.log('Fetching from Extenda GO API...');

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-API-Key': ARTURE_API_KEY,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Extenda GO API Error:', response.status, errorText);
      throw new Error(`Extenda GO API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    const products = result.products || result.data || [];

    console.log(`Successfully fetched ${products.length} products from Extenda GO`);

    return {
      data: products,
      total: result.total || products.length,
    };
  } catch (error) {
    console.error('Error fetching from Extenda GO API:', error);
    throw error;
  }
}

// Fetch single product
export async function fetchExtendaGoProduct(productId: string): Promise<any | null> {
  try {
    const token = await getAccessToken();
    
    const url = `${EXTENDA_GO_API_BASE}/v1/products/${productId}?api_key=${ARTURE_API_KEY}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-API-Key': ARTURE_API_KEY,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`Extenda GO API error: ${response.status}`);
    }

    const product = await response.json();
    return product;
  } catch (error) {
    console.error('Error fetching product from Extenda GO:', error);
    return null;
  }
}

// Transform Extenda GO product to our internal format
export function transformExtendaGoProduct(extendaProduct: any) {
  return {
    id: extendaProduct.id || extendaProduct.sku,
    name: extendaProduct.name || extendaProduct.title,
    slug: extendaProduct.slug || extendaProduct.sku?.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    description: extendaProduct.description || '',
    price: parseFloat(extendaProduct.price) || 0,
    currency: extendaProduct.currency || 'EUR',
    category: extendaProduct.category || extendaProduct.productType || 'Uncategorized',
    categoryName: extendaProduct.category || extendaProduct.productType || 'Uncategorized',
    imageUrl: extendaProduct.image || extendaProduct.images?.[0] || null,
    images: extendaProduct.images || [],
    inStock: extendaProduct.inStock !== false && (extendaProduct.stock || 0) > 0,
    sku: extendaProduct.sku,
    rating: 5, // Default rating
    featured: false,
  };
}
