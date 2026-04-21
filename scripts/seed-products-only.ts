import * as dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { categories, products } from '../lib/schema';
import { eq } from 'drizzle-orm';

dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function seedProducts() {
  console.log('🌱 Seeding products only...');

  // Get existing categories
  const existingCategories = await db.select().from(categories);
  console.log(`📦 Found ${existingCategories.length} existing categories`);

  const categoryMap: Record<string, number> = {};
  existingCategories.forEach(cat => {
    categoryMap[cat.slug] = cat.id;
  });

  // Delete existing products first
  console.log('🗑️ Clearing existing products...');
  await db.delete(products);

  const productData = [
    // Furniture
    { name: 'Velvet Armchair', slug: 'velvet-armchair', categoryId: categoryMap['furniture'], price: '450.00', rating: 5, inStock: true, description: 'Luxurious velvet armchair in teal', featured: true },
    { name: 'Leather Dining Chair', slug: 'leather-dining-chair', categoryId: categoryMap['furniture'], price: '280.00', rating: 5, inStock: true, description: 'Premium leather dining chair', featured: false },
    { name: 'Wooden Bar Stool', slug: 'wooden-bar-stool', categoryId: categoryMap['furniture'], price: '165.00', rating: 4, inStock: true, description: 'Solid oak bar stool', featured: false },
    { name: 'Console Table', slug: 'console-table', categoryId: categoryMap['furniture'], price: '520.00', rating: 5, inStock: true, description: 'Elegant marble console table', featured: true },
    { name: 'Oak Sideboard', slug: 'oak-sideboard', categoryId: categoryMap['furniture'], price: '780.00', rating: 5, inStock: true, description: 'Handcrafted oak sideboard', featured: true },
    { name: 'Marble Side Table', slug: 'marble-side-table', categoryId: categoryMap['furniture'], price: '280.00', rating: 5, inStock: true, description: 'Elegant marble top side table', featured: false },
    { name: 'Glass Coffee Table', slug: 'glass-coffee-table', categoryId: categoryMap['furniture'], price: '420.00', rating: 4, inStock: true, description: 'Modern tempered glass coffee table', featured: false },
    { name: 'Walnut Dining Table', slug: 'walnut-dining-table', categoryId: categoryMap['furniture'], price: '1250.00', rating: 5, inStock: true, description: 'Solid walnut dining table seats 8', featured: true },
    
    // Lighting
    { name: 'Gold Floor Lamp', slug: 'gold-floor-lamp', categoryId: categoryMap['lighting'], price: '195.00', rating: 4, inStock: true, description: 'Modern gold finish floor lamp', featured: false },
    { name: 'Crystal Table Lamp', slug: 'crystal-table-lamp', categoryId: categoryMap['lighting'], price: '165.00', rating: 5, inStock: true, description: 'Elegant crystal base table lamp', featured: true },
    { name: 'Pendant Light', slug: 'pendant-light', categoryId: categoryMap['lighting'], price: '240.00', rating: 5, inStock: true, description: 'Modern geometric pendant light', featured: false },
    { name: 'Brass Chandelier', slug: 'brass-chandelier', categoryId: categoryMap['lighting'], price: '680.00', rating: 5, inStock: true, description: '8-light brass chandelier', featured: true },
    { name: 'Ceramic Table Lamp', slug: 'ceramic-table-lamp', categoryId: categoryMap['lighting'], price: '145.00', rating: 4, inStock: true, description: 'Hand-painted ceramic lamp', featured: false },
    { name: 'Copper Lantern', slug: 'copper-lantern', categoryId: categoryMap['lighting'], price: '95.00', rating: 4, inStock: true, description: 'Vintage copper lantern', featured: false },
    
    // Decorative
    { name: 'Decorative Vase Set', slug: 'decorative-vase-set', categoryId: categoryMap['decorative'], price: '85.00', rating: 4, inStock: true, description: 'Set of 3 ceramic vases', featured: false },
    { name: 'Vintage Wall Clock', slug: 'vintage-wall-clock', categoryId: categoryMap['decorative'], price: '110.00', rating: 4, inStock: true, description: 'Classic vintage style wall clock', featured: false },
    { name: 'Decorative Bowl Set', slug: 'decorative-bowl-set', categoryId: categoryMap['decorative'], price: '68.00', rating: 4, inStock: true, description: 'Set of 3 ceramic bowls', featured: false },
    { name: 'Bronze Sculpture', slug: 'bronze-sculpture', categoryId: categoryMap['decorative'], price: '320.00', rating: 5, inStock: true, description: 'Abstract bronze sculpture', featured: true },
    { name: 'Decorative Tray Set', slug: 'decorative-tray-set', categoryId: categoryMap['decorative'], price: '75.00', rating: 4, inStock: true, description: 'Gold-rimmed serving trays', featured: false },
    { name: 'Ornate Wall Mirror', slug: 'ornate-wall-mirror', categoryId: categoryMap['decorative'], price: '220.00', rating: 5, inStock: true, description: 'Large baroque wall mirror', featured: true },
    { name: 'Crystal Ornaments', slug: 'crystal-ornaments', categoryId: categoryMap['decorative'], price: '55.00', rating: 5, inStock: true, description: 'Set of 6 crystal ornaments', featured: false },
    { name: 'Gold Picture Frame', slug: 'gold-picture-frame', categoryId: categoryMap['decorative'], price: '45.00', rating: 4, inStock: true, description: 'Ornate gold picture frame', featured: false },
    
    // Floral
    { name: 'Artificial Orchid', slug: 'artificial-orchid', categoryId: categoryMap['floral'], price: '65.00', rating: 5, inStock: true, description: 'Lifelike white orchid arrangement', featured: false },
    { name: 'Faux Fiddle Leaf Fig', slug: 'faux-fiddle-leaf-fig', categoryId: categoryMap['floral'], price: '145.00', rating: 4, inStock: true, description: 'Realistic artificial plant', featured: false },
    { name: 'Artificial Rose Bouquet', slug: 'artificial-rose-bouquet', categoryId: categoryMap['floral'], price: '48.00', rating: 5, inStock: true, description: 'Realistic silk rose arrangement', featured: false },
    { name: 'Silk Peony Arrangement', slug: 'silk-peony-arrangement', categoryId: categoryMap['floral'], price: '85.00', rating: 5, inStock: true, description: 'Elegant silk peony display', featured: true },
    { name: 'Artificial Eucalyptus', slug: 'artificial-eucalyptus', categoryId: categoryMap['floral'], price: '38.00', rating: 4, inStock: true, description: 'Faux eucalyptus stems', featured: false },
    { name: 'Faux Olive Tree', slug: 'faux-olive-tree', categoryId: categoryMap['floral'], price: '195.00', rating: 5, inStock: true, description: 'Lifelike potted olive tree', featured: false },
    { name: 'Dried Flower Bouquet', slug: 'dried-flower-bouquet', categoryId: categoryMap['floral'], price: '42.00', rating: 4, inStock: true, description: 'Natural dried flower arrangement', featured: false },
    
    // Textiles
    { name: 'Velvet Cushion Set', slug: 'velvet-cushion-set', categoryId: categoryMap['textiles'], price: '75.00', rating: 4, inStock: true, description: 'Set of 4 luxury cushions', featured: false },
    { name: 'Persian Rug', slug: 'persian-rug', categoryId: categoryMap['textiles'], price: '580.00', rating: 5, inStock: true, description: 'Hand-woven Persian style rug', featured: true },
    { name: 'Throw Blanket', slug: 'throw-blanket', categoryId: categoryMap['textiles'], price: '95.00', rating: 4, inStock: true, description: 'Cashmere blend throw blanket', featured: false },
    { name: 'Linen Cushions', slug: 'linen-cushions', categoryId: categoryMap['textiles'], price: '55.00', rating: 4, inStock: true, description: 'Natural linen cushion covers', featured: false },
    { name: 'Moroccan Carpet', slug: 'moroccan-carpet', categoryId: categoryMap['textiles'], price: '420.00', rating: 5, inStock: true, description: 'Handwoven Moroccan carpet', featured: true },
    
    // Ambiance
    { name: 'Scented Candle Collection', slug: 'scented-candle-collection', categoryId: categoryMap['ambiance'], price: '55.00', rating: 5, inStock: true, description: 'Set of 3 luxury candles', featured: false },
    { name: 'Reed Diffuser', slug: 'reed-diffuser', categoryId: categoryMap['ambiance'], price: '45.00', rating: 4, inStock: true, description: 'Premium home fragrance diffuser', featured: false },
    { name: 'Brass Candle Holders', slug: 'brass-candle-holders', categoryId: categoryMap['ambiance'], price: '68.00', rating: 5, inStock: true, description: 'Set of 3 brass candle holders', featured: false },
    { name: 'Pillar Candles', slug: 'pillar-candles', categoryId: categoryMap['ambiance'], price: '32.00', rating: 4, inStock: true, description: 'Unscented pillar candles set', featured: false },
    { name: 'Essential Oil Set', slug: 'essential-oil-set', categoryId: categoryMap['ambiance'], price: '48.00', rating: 5, inStock: true, description: 'Aromatherapy essential oils', featured: false },
    
    // Glassware
    { name: 'Crystal Decanter Set', slug: 'crystal-decanter-set', categoryId: categoryMap['glassware'], price: '125.00', rating: 5, inStock: true, description: 'Hand-cut crystal decanter with glasses', featured: false },
    { name: 'Wine Glass Set', slug: 'wine-glass-set', categoryId: categoryMap['glassware'], price: '85.00', rating: 4, inStock: true, description: 'Set of 6 crystal wine glasses', featured: false },
    { name: 'Glass Vase Collection', slug: 'glass-vase-collection', categoryId: categoryMap['glassware'], price: '95.00', rating: 5, inStock: true, description: 'Set of 3 glass vases', featured: false },
    { name: 'Champagne Flutes', slug: 'champagne-flutes', categoryId: categoryMap['glassware'], price: '72.00', rating: 4, inStock: true, description: 'Set of 4 crystal flutes', featured: false },
    
    // Gift Vouchers
    { name: '€50 Gift Voucher', slug: '50-gift-voucher', categoryId: categoryMap['glassware'], price: '50.00', rating: 5, inStock: true, description: 'Gift voucher worth €50', featured: false },
    { name: '€100 Gift Voucher', slug: '100-gift-voucher', categoryId: categoryMap['glassware'], price: '100.00', rating: 5, inStock: true, description: 'Gift voucher worth €100', featured: true },
    { name: '€200 Gift Voucher', slug: '200-gift-voucher', categoryId: categoryMap['glassware'], price: '200.00', rating: 5, inStock: true, description: 'Gift voucher worth €200', featured: false },
  ];

  console.log('🛍️ Inserting products...');
  const insertedProducts = await db.insert(products).values(productData).returning();
  console.log(`✅ Inserted ${insertedProducts.length} products`);

  console.log('🎉 Products seeded successfully!');
}

seedProducts().catch((error) => {
  console.error('❌ Error seeding products:', error);
  process.exit(1);
});
