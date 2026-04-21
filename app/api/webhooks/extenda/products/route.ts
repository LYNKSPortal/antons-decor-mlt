import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { products } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Webhook to receive product data from Extenda
export async function POST(request: Request) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization');
    const clientSecret = request.headers.get('x-client-secret');
    
    const expectedKey = `Bearer ${process.env.ARTURE_API_KEY}`;
    const expectedSecret = process.env.ARTURE_CLIENT_SECRET;
    
    if (authHeader !== expectedKey || clientSecret !== expectedSecret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse incoming product data
    const payload = await request.json();
    console.log('Received Extenda products webhook:', payload);

    // Process products based on Extenda's data format
    // This is a placeholder - adjust based on actual Extenda format
    const extendaProducts = Array.isArray(payload) ? payload : payload.products || [];

    if (extendaProducts.length === 0) {
      return NextResponse.json({ 
        message: 'No products to process',
        received: 0 
      });
    }

    // Transform and insert/update products
    let processed = 0;
    for (const extendaProduct of extendaProducts) {
      try {
        // Check if product exists
        const existing = await db
          .select()
          .from(products)
          .where(eq(products.slug, extendaProduct.slug || extendaProduct.id))
          .limit(1);

        const productData = {
          name: extendaProduct.name,
          slug: extendaProduct.slug || extendaProduct.id,
          description: extendaProduct.description,
          price: extendaProduct.price?.toString(),
          rating: extendaProduct.rating || 5,
          inStock: extendaProduct.inStock !== false,
          imageUrl: extendaProduct.image || extendaProduct.imageUrl,
          featured: extendaProduct.featured || false,
        };

        if (existing.length > 0) {
          // Update existing product
          await db
            .update(products)
            .set(productData)
            .where(eq(products.id, existing[0].id));
        } else {
          // Insert new product
          await db.insert(products).values(productData);
        }
        
        processed++;
      } catch (error) {
        console.error('Error processing product:', extendaProduct, error);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${processed} products`,
      received: extendaProducts.length,
      processed
    });

  } catch (error) {
    console.error('Extenda products webhook error:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Handle GET requests (for testing)
export async function GET() {
  return NextResponse.json({
    endpoint: 'Extenda Products Webhook',
    method: 'POST',
    description: 'Receives product data from Extenda system',
    authentication: 'Bearer token + X-Client-Secret header required'
  });
}
