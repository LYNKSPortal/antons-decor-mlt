# 🔌 Arture API Integration

This document explains how the Arture API is integrated into Anton's Décor e-commerce platform.

## 📋 Overview

The shop now fetches products from the **Arture API** with automatic fallback to the local Neon database if the API is unavailable.

## 🔑 API Credentials

Your Arture API credentials are stored in `.env.local`:

```env
ARTURE_API_KEY=847710e7a12754ad0c47856b
ARTURE_CLIENT_SECRET=ca7fc94030db0702ec7f8832a7fc6629454123ccd7fae6ad29935b71e509a466f4fef192fa556b9a70695f5999056f6376e33772af9ff7128b86eb9cab025594
```

**Security Note:** These credentials are gitignored and never committed to version control.

## 🏗️ Architecture

### Data Flow

1. **Shop Page** (`/app/shop/page.tsx`) → Fetches from `/api/products`
2. **API Route** (`/app/api/products/route.ts`) → Tries Arture API first
3. **Arture Client** (`/lib/arture.ts`) → Handles API communication
4. **Fallback** → If Arture fails, uses local Neon database

### Files Created

- **`lib/arture.ts`** - Arture API client with authentication
- **`app/api/products/route.ts`** - Updated to use Arture with fallback
- **`app/shop/page.tsx`** - Updated to fetch products dynamically

## 🔧 API Functions

### `fetchArtureProducts(params)`

Fetches products from Arture API with optional filters:

```typescript
const products = await fetchArtureProducts({
  category: 'Furniture',
  search: 'chair',
  page: 1,
  limit: 50,
});
```

**Parameters:**
- `category` - Filter by product category
- `search` - Search query for product name/description
- `page` - Page number for pagination
- `limit` - Number of products per page

**Returns:**
```typescript
{
  data: ArtureProduct[],
  total: number,
  page: number,
  perPage: number
}
```

### `fetchArtureProductById(productId)`

Fetches a single product by ID:

```typescript
const product = await fetchArtureProductById('prod_123');
```

### `fetchArtureCategories()`

Fetches all available categories:

```typescript
const categories = await fetchArtureCategories();
// Returns: ['Furniture', 'Lighting', 'Decorative', ...]
```

### `transformArtureProduct(artureProduct)`

Transforms Arture API response to internal format:

```typescript
const transformed = transformArtureProduct(artureProduct);
```

## 📊 Product Data Structure

### Arture API Format

```typescript
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
```

### Internal Format (After Transformation)

```typescript
{
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  imageUrl: string | null;
  images: string[];
  inStock: boolean;
  sku: string;
  brand?: string;
  rating: number; // Default: 5
}
```

## 🔄 Fallback Mechanism

If the Arture API fails (network error, API down, authentication issue), the system automatically falls back to the local Neon database:

```typescript
try {
  // Try Arture API
  const artureProducts = await fetchArtureProducts(params);
  return { products: artureProducts, source: 'arture' };
} catch (error) {
  // Fallback to local database
  console.warn('Arture API failed, using local database');
  const localProducts = await db.select().from(products);
  return { products: localProducts, source: 'local' };
}
```

The shop page displays which data source is being used.

## 🎯 Features

### Shop Page Features

✅ **Real-time API Integration** - Products fetched from Arture
✅ **Search** - Search products by name/description
✅ **Category Filtering** - Filter by product category
✅ **Price Range Filtering** - Filter by price brackets
✅ **Sorting** - Sort by price, name, or featured
✅ **Grid/List Views** - Toggle between view modes
✅ **Loading States** - Spinner while fetching
✅ **Data Source Indicator** - Shows if using Arture or local DB
✅ **Automatic Fallback** - Seamless switch to local data if API fails

### API Endpoint Features

- **GET** `/api/products` - Fetch all products with filters
- Query parameters: `category`, `search`, `minPrice`, `maxPrice`, `page`, `limit`
- Returns: `{ products: [], total: number, page: number, source: 'arture' | 'local' }`

## 🧪 Testing

### Test Arture API Connection

```bash
curl http://localhost:3000/api/products
```

### Test with Filters

```bash
# Filter by category
curl "http://localhost:3000/api/products?category=Furniture"

# Search products
curl "http://localhost:3000/api/products?search=chair"

# Price range
curl "http://localhost:3000/api/products?minPrice=100&maxPrice=500"
```

### Check Data Source

The API response includes a `source` field:
- `"arture"` - Data from Arture API
- `"local"` - Data from local Neon database

## 🔐 Authentication

All Arture API requests include:

```typescript
headers: {
  'Authorization': `Bearer ${ARTURE_API_KEY}`,
  'X-Client-Secret': ARTURE_CLIENT_SECRET,
  'Content-Type': 'application/json',
}
```

## 🚨 Error Handling

### API Errors

- **401 Unauthorized** - Check API credentials in `.env.local`
- **404 Not Found** - Product/endpoint doesn't exist
- **429 Rate Limited** - Too many requests, implement caching
- **500 Server Error** - Arture API issue, fallback activates

### Fallback Triggers

The system falls back to local database when:
- Network connection fails
- Arture API returns error status
- Authentication fails
- Request timeout

## 📈 Performance

### Caching

Currently set to `cache: 'no-store'` for real-time data. To improve performance:

```typescript
// Add caching
cache: 'force-cache',
next: { revalidate: 3600 } // Revalidate every hour
```

### Pagination

Products are paginated (default 50 per page). Adjust with:

```typescript
fetchArtureProducts({ page: 2, limit: 100 });
```

## 🔮 Future Enhancements

- [ ] Add product detail pages with full Arture data
- [ ] Implement shopping cart with Arture SKUs
- [ ] Sync Arture products to local database periodically
- [ ] Add product image optimization
- [ ] Implement advanced filtering (brand, attributes)
- [ ] Add product recommendations
- [ ] Cache API responses for better performance

## 📞 Support

For Arture API issues or questions:
- Contact your Extenda dealer
- Check API documentation: https://api.arture.com/docs
- Review API status: https://status.arture.com

## ✅ Verification Checklist

- [x] Arture API credentials added to `.env.local`
- [x] API client created (`lib/arture.ts`)
- [x] Products API route updated with Arture integration
- [x] Shop page updated to fetch from API
- [x] Fallback to local database implemented
- [x] Error handling added
- [x] Loading states implemented
- [x] Data source indicator added

## 🎉 Success!

Your shop is now powered by the Arture API with seamless fallback to your local database!

Visit **http://localhost:3000/shop** to see it in action.
