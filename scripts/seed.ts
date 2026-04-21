import * as dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { categories, products } from '../lib/schema';

dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function seed() {
  console.log('🌱 Seeding database...');

  const categoryData = [
    { name: 'Furniture', slug: 'furniture', description: 'Elegant sofas, chairs, tables, and sideboards' },
    { name: 'Lighting', slug: 'lighting', description: 'Designer lamps and statement lighting pieces' },
    { name: 'Decorative', slug: 'decorative', description: 'Curated ornaments and accessories' },
    { name: 'Floral', slug: 'floral', description: 'Fresh and artificial botanicals' },
    { name: 'Textiles', slug: 'textiles', description: 'Luxurious fabrics and soft furnishings' },
    { name: 'Ambiance', slug: 'ambiance', description: 'Scents, candles, and accessories' },
    { name: 'Glassware', slug: 'glassware', description: 'Elegant glass pieces for display' },
  ];

  console.log('📦 Inserting categories...');
  const insertedCategories = await db.insert(categories).values(categoryData).returning();
  console.log(`✅ Inserted ${insertedCategories.length} categories`);

  const categoryMap: Record<string, number> = {};
  insertedCategories.forEach(cat => {
    categoryMap[cat.slug] = cat.id;
  });

  const productData = [
    { name: 'Velvet Armchair', slug: 'velvet-armchair', categoryId: categoryMap['furniture'], price: '450.00', rating: 5, inStock: true, description: 'Luxurious velvet armchair in teal', featured: true },
    { name: 'Marble Side Table', slug: 'marble-side-table', categoryId: categoryMap['furniture'], price: '280.00', rating: 5, inStock: true, description: 'Elegant marble top side table', featured: true },
    { name: 'Gold Floor Lamp', slug: 'gold-floor-lamp', categoryId: categoryMap['lighting'], price: '195.00', rating: 4, inStock: true, description: 'Modern gold finish floor lamp', featured: false },
    { name: 'Crystal Table Lamp', slug: 'crystal-table-lamp', categoryId: categoryMap['lighting'], price: '165.00', rating: 5, inStock: true, description: 'Elegant crystal base table lamp', featured: true },
    { name: 'Decorative Vase Set', slug: 'decorative-vase-set', categoryId: categoryMap['decorative'], price: '85.00', rating: 4, inStock: true, description: 'Set of 3 ceramic vases', featured: false },
    { name: 'Wall Mirror', slug: 'wall-mirror', categoryId: categoryMap['decorative'], price: '220.00', rating: 5, inStock: true, description: 'Large ornate wall mirror', featured: true },
    { name: 'Artificial Orchid', slug: 'artificial-orchid', categoryId: categoryMap['floral'], price: '65.00', rating: 5, inStock: true, description: 'Lifelike white orchid arrangement', featured: false },
    { name: 'Faux Fiddle Leaf Fig', slug: 'faux-fiddle-leaf-fig', categoryId: categoryMap['floral'], price: '145.00', rating: 4, inStock: true, description: 'Realistic artificial plant', featured: false },
    { name: 'Velvet Cushion Set', slug: 'velvet-cushion-set', categoryId: categoryMap['textiles'], price: '75.00', rating: 4, inStock: true, description: 'Set of 4 luxury cushions', featured: false },
    { name: 'Persian Rug', slug: 'persian-rug', categoryId: categoryMap['textiles'], price: '580.00', rating: 5, inStock: false, description: 'Hand-woven Persian style rug', featured: true },
    { name: 'Scented Candle Collection', slug: 'scented-candle-collection', categoryId: categoryMap['ambiance'], price: '55.00', rating: 5, inStock: true, description: 'Set of 3 luxury candles', featured: false },
    { name: 'Reed Diffuser', slug: 'reed-diffuser', categoryId: categoryMap['ambiance'], price: '45.00', rating: 4, inStock: true, description: 'Premium home fragrance diffuser', featured: false },
    { name: 'Crystal Decanter Set', slug: 'crystal-decanter-set', categoryId: categoryMap['glassware'], price: '125.00', rating: 5, inStock: true, description: 'Hand-cut crystal decanter with glasses', featured: false },
    { name: 'Gold Serving Tray', slug: 'gold-serving-tray', categoryId: categoryMap['glassware'], price: '95.00', rating: 4, inStock: true, description: 'Elegant gold-rimmed serving tray', featured: false },
    { name: 'Vintage Wall Clock', slug: 'vintage-wall-clock', categoryId: categoryMap['decorative'], price: '110.00', rating: 4, inStock: true, description: 'Classic vintage style wall clock', featured: false },
    { name: 'Console Table', slug: 'console-table', categoryId: categoryMap['furniture'], price: '520.00', rating: 5, inStock: true, description: 'Elegant marble console table', featured: true },
    { name: 'Pendant Light', slug: 'pendant-light', categoryId: categoryMap['lighting'], price: '240.00', rating: 5, inStock: true, description: 'Modern geometric pendant light', featured: false },
    { name: 'Decorative Bowl Set', slug: 'decorative-bowl-set', categoryId: categoryMap['decorative'], price: '68.00', rating: 4, inStock: true, description: 'Set of 3 ceramic bowls', featured: false },
    { name: 'Artificial Rose Bouquet', slug: 'artificial-rose-bouquet', categoryId: categoryMap['floral'], price: '48.00', rating: 5, inStock: true, description: 'Realistic silk rose arrangement', featured: false },
    { name: 'Throw Blanket', slug: 'throw-blanket', categoryId: categoryMap['textiles'], price: '95.00', rating: 4, inStock: true, description: 'Cashmere blend throw blanket', featured: false },
  ];

  console.log('🛍️ Inserting products...');
  const insertedProducts = await db.insert(products).values(productData).returning();
  console.log(`✅ Inserted ${insertedProducts.length} products`);

  console.log('🎉 Database seeded successfully!');
}

seed().catch((error) => {
  console.error('❌ Error seeding database:', error);
  process.exit(1);
});
