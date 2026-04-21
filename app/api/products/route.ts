import { NextResponse } from 'next/server';
import { fetchExtendaGoProducts, transformExtendaGoProduct } from '@/lib/extendago';
import { db } from '@/lib/db';
import { products, categories } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '50';

    // Try to fetch from Extenda GO API first
    try {
      console.log('Fetching products from Extenda GO API...');
      const extendaResponse = await fetchExtendaGoProducts({
        category: category && category !== 'All' ? category : undefined,
        search: search || undefined,
        limit: parseInt(limit),
        offset: (parseInt(page) - 1) * parseInt(limit),
      });

      // Transform Extenda GO products to our format
      let transformedProducts = extendaResponse.data.map(transformExtendaGoProduct);

      // Apply price filters
      if (minPrice) {
        transformedProducts = transformedProducts.filter((p: any) => p.price >= parseFloat(minPrice));
      }

      if (maxPrice && maxPrice !== 'Infinity') {
        transformedProducts = transformedProducts.filter((p: any) => p.price <= parseFloat(maxPrice));
      }

      console.log(`Successfully fetched ${transformedProducts.length} products from Extenda GO API`);
      
      return NextResponse.json({
        products: transformedProducts,
        total: extendaResponse.total,
        page: parseInt(page),
        source: 'extendago',
      });
    } catch (extendaError) {
      console.warn('Extenda GO API failed, falling back to local database:', extendaError);
      
      // Fallback to local database
      let query = db.select({
        id: products.id,
        name: products.name,
        slug: products.slug,
        description: products.description,
        price: products.price,
        rating: products.rating,
        inStock: products.inStock,
        imageUrl: products.imageUrl,
        featured: products.featured,
        categoryId: products.categoryId,
        categoryName: categories.name,
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id));

      const allProducts = await query;

      let filtered = allProducts;

      if (category && category !== 'All') {
        filtered = filtered.filter(p => p.categoryName === category);
      }

      if (search) {
        const searchLower = search.toLowerCase();
        filtered = filtered.filter(p => 
          p.name?.toLowerCase().includes(searchLower) ||
          p.description?.toLowerCase().includes(searchLower)
        );
      }

      if (minPrice) {
        filtered = filtered.filter(p => parseFloat(p.price || '0') >= parseFloat(minPrice));
      }

      if (maxPrice && maxPrice !== 'Infinity') {
        filtered = filtered.filter(p => parseFloat(p.price || '0') <= parseFloat(maxPrice));
      }

      return NextResponse.json({
        products: filtered,
        total: filtered.length,
        page: 1,
        source: 'local',
      });
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
