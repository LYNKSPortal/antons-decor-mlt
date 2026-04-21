import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { products } from '@/lib/schema';
import { eq } from 'drizzle-orm';

// Webhook to receive stock updates from Extenda
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

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

    // Parse incoming stock data
    const payload = await request.json();
    console.log('Received Extenda stock webhook:', payload);

    // Process stock updates
    const stockUpdates = Array.isArray(payload) ? payload : payload.stockChanges || [];

    if (stockUpdates.length === 0) {
      return NextResponse.json({ 
        message: 'No stock updates to process',
        received: 0 
      });
    }

    let processed = 0;
    for (const update of stockUpdates) {
      try {
        // Update product stock status
        await db
          .update(products)
          .set({ 
            inStock: update.inStock !== false && (update.quantity || 0) > 0 
          })
          .where(eq(products.slug, update.productId || update.sku));
        
        processed++;
      } catch (error) {
        console.error('Error processing stock update:', update, error);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${processed} stock updates`,
      received: stockUpdates.length,
      processed
    });

  } catch (error) {
    console.error('Extenda stock webhook error:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Handle GET requests (for testing)
export async function GET() {
  return NextResponse.json({
    endpoint: 'Extenda Stock Webhook',
    method: 'POST',
    description: 'Receives stock level updates from Extenda system',
    authentication: 'Bearer token + X-Client-Secret header required'
  });
}
