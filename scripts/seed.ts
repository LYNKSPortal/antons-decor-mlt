import * as dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { categories, products } from '../lib/schema';

dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function seed() {
  console.log('🌱 Seeding database...');

  console.log('🗑️ Clearing existing data...');
  await db.delete(products);
  await db.delete(categories);
  console.log('✅ Cleared existing data');

  const categoryData = [
    { name: 'Armchairs, Chairs & Stools', slug: 'armchairs-chairs-stools', description: 'Comfortable seating solutions' },
    { name: 'Artificial Flowers', slug: 'artificial-flowers', description: 'Lifelike floral arrangements' },
    { name: 'Artificial Plants', slug: 'artificial-plants', description: 'Realistic greenery and plants' },
    { name: 'Candle Holders', slug: 'candle-holders', description: 'Elegant candle displays' },
    { name: 'Candles & Home Scent', slug: 'candles-home-scent', description: 'Fragrances for your home' },
    { name: 'Carpets', slug: 'carpets', description: 'Luxurious floor coverings' },
    { name: 'Clocks', slug: 'clocks', description: 'Timeless timepieces' },
    { name: 'Console Tables', slug: 'console-tables', description: 'Elegant hallway furniture' },
    { name: 'Cushions', slug: 'cushions', description: 'Comfortable decorative pillows' },
    { name: 'Dining Tables', slug: 'dining-tables', description: 'Tables for gathering' },
    { name: 'Floor Lamps', slug: 'floor-lamps', description: 'Standing light fixtures' },
    { name: 'Frames', slug: 'frames', description: 'Picture and art frames' },
    { name: 'Furniture', slug: 'furniture', description: 'General furniture pieces' },
    { name: 'Gift Vouchers', slug: 'gift-vouchers', description: 'Perfect gift options' },
    { name: 'Glass', slug: 'glass', description: 'Glassware and crystal' },
    { name: 'Lanterns', slug: 'lanterns', description: 'Decorative light holders' },
    { name: 'Lighting', slug: 'lighting', description: 'General lighting solutions' },
    { name: 'Mirrors', slug: 'mirrors', description: 'Reflective wall decor' },
    { name: 'Ornaments', slug: 'ornaments', description: 'Decorative accents' },
    { name: 'Pictures', slug: 'pictures', description: 'Wall art and prints' },
    { name: 'Plant Ornaments', slug: 'plant-ornaments', description: 'Decorative plant accessories' },
    { name: 'Pots', slug: 'pots', description: 'Planters and containers' },
    { name: 'Ribbons', slug: 'ribbons', description: 'Decorative ribbons' },
    { name: 'Services', slug: 'services', description: 'Professional services' },
    { name: 'Side Tables', slug: 'side-tables', description: 'Accent tables' },
    { name: 'Sideboards', slug: 'sideboards', description: 'Storage furniture' },
    { name: 'Table Holders', slug: 'table-holders', description: 'Table accessories' },
    { name: 'Table Lamps', slug: 'table-lamps', description: 'Desktop lighting' },
    { name: 'Trays', slug: 'trays', description: 'Serving and display trays' },
    { name: 'Vases', slug: 'vases', description: 'Decorative containers' },
  ];

  console.log('📦 Inserting categories...');
  const insertedCategories = await db.insert(categories).values(categoryData).returning();
  console.log(`✅ Inserted ${insertedCategories.length} categories`);

  const categoryMap: Record<string, number> = {};
  insertedCategories.forEach(cat => {
    categoryMap[cat.slug] = cat.id;
  });

  const productData = [
    { name: 'Velvet Armchair', slug: 'velvet-armchair', categoryId: categoryMap['armchairs-chairs-stools'], price: '450.00', rating: 5, inStock: true, description: 'Luxurious velvet armchair in teal', featured: true, imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80' },
    { name: 'Silk Rose Bouquet', slug: 'silk-rose-bouquet', categoryId: categoryMap['artificial-flowers'], price: '65.00', rating: 5, inStock: true, description: 'Lifelike silk rose arrangement', featured: false, imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80' },
    { name: 'Faux Fiddle Leaf Fig', slug: 'faux-fiddle-leaf-fig', categoryId: categoryMap['artificial-plants'], price: '145.00', rating: 5, inStock: true, description: 'Realistic artificial plant', featured: false, imageUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&q=80' },
    { name: 'Brass Candle Holders', slug: 'brass-candle-holders', categoryId: categoryMap['candle-holders'], price: '68.00', rating: 5, inStock: true, description: 'Set of 3 brass candle holders', featured: false, imageUrl: 'https://images.unsplash.com/photo-1602874801006-e04b2d0c6e0e?w=800&q=80' },
    { name: 'Scented Candle Collection', slug: 'scented-candle-collection', categoryId: categoryMap['candles-home-scent'], price: '55.00', rating: 5, inStock: true, description: 'Set of 3 luxury candles', featured: false, imageUrl: 'https://images.unsplash.com/photo-1602874801006-e04b2d0c6e0e?w=800&q=80' },
    { name: 'Persian Rug', slug: 'persian-rug', categoryId: categoryMap['carpets'], price: '580.00', rating: 5, inStock: true, description: 'Hand-woven Persian style rug', featured: true, imageUrl: 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&q=80' },
    { name: 'Vintage Wall Clock', slug: 'vintage-wall-clock', categoryId: categoryMap['clocks'], price: '110.00', rating: 4, inStock: true, description: 'Classic vintage style wall clock', featured: false, imageUrl: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800&q=80' },
    { name: 'Marble Console Table', slug: 'marble-console-table', categoryId: categoryMap['console-tables'], price: '520.00', rating: 5, inStock: true, description: 'Elegant marble console table', featured: true, imageUrl: 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=800&q=80' },
    { name: 'Velvet Cushion Set', slug: 'velvet-cushion-set', categoryId: categoryMap['cushions'], price: '75.00', rating: 4, inStock: true, description: 'Set of 4 luxury cushions', featured: false, imageUrl: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&q=80' },
    { name: 'Walnut Dining Table', slug: 'walnut-dining-table', categoryId: categoryMap['dining-tables'], price: '1250.00', rating: 5, inStock: true, description: 'Solid walnut dining table seats 8', featured: true, imageUrl: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80' },
    { name: 'Gold Floor Lamp', slug: 'gold-floor-lamp', categoryId: categoryMap['floor-lamps'], price: '195.00', rating: 4, inStock: true, description: 'Modern gold finish floor lamp', featured: false, imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80' },
    { name: 'Gold Picture Frame', slug: 'gold-picture-frame', categoryId: categoryMap['frames'], price: '45.00', rating: 4, inStock: true, description: 'Ornate gold picture frame', featured: false, imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=800&q=80' },
    { name: 'Leather Sofa', slug: 'leather-sofa', categoryId: categoryMap['furniture'], price: '1800.00', rating: 5, inStock: true, description: 'Premium leather three-seater sofa', featured: true, imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80' },
    { name: '€100 Gift Voucher', slug: '100-gift-voucher', categoryId: categoryMap['gift-vouchers'], price: '100.00', rating: 5, inStock: true, description: 'Gift voucher worth €100', featured: true, imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80' },
    { name: 'Crystal Wine Glasses', slug: 'crystal-wine-glasses', categoryId: categoryMap['glass'], price: '85.00', rating: 5, inStock: true, description: 'Set of 6 crystal wine glasses', featured: false, imageUrl: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&q=80' },
    { name: 'Moroccan Lantern', slug: 'moroccan-lantern', categoryId: categoryMap['lanterns'], price: '95.00', rating: 4, inStock: true, description: 'Vintage copper lantern', featured: false, imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&q=80' },
    { name: 'Brass Chandelier', slug: 'brass-chandelier', categoryId: categoryMap['lighting'], price: '680.00', rating: 5, inStock: true, description: '8-light brass chandelier', featured: true, imageUrl: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80' },
    { name: 'Ornate Wall Mirror', slug: 'ornate-wall-mirror', categoryId: categoryMap['mirrors'], price: '220.00', rating: 5, inStock: true, description: 'Large baroque wall mirror', featured: true, imageUrl: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80' },
    { name: 'Crystal Ornaments', slug: 'crystal-ornaments', categoryId: categoryMap['ornaments'], price: '55.00', rating: 5, inStock: true, description: 'Set of 6 crystal ornaments', featured: false, imageUrl: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80' },
    { name: 'Canvas Wall Art', slug: 'canvas-wall-art', categoryId: categoryMap['pictures'], price: '180.00', rating: 5, inStock: true, description: 'Abstract canvas art', featured: false, imageUrl: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=80' },
    { name: 'Decorative Plant Stand', slug: 'decorative-plant-stand', categoryId: categoryMap['plant-ornaments'], price: '88.00', rating: 4, inStock: true, description: 'Metal plant stand', featured: false, imageUrl: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=800&q=80' },
    { name: 'Ceramic Planter Set', slug: 'ceramic-planter-set', categoryId: categoryMap['pots'], price: '68.00', rating: 5, inStock: true, description: 'Set of 3 ceramic planters', featured: false, imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80' },
    { name: 'Silk Ribbon Collection', slug: 'silk-ribbon-collection', categoryId: categoryMap['ribbons'], price: '28.00', rating: 4, inStock: true, description: 'Assorted silk ribbons', featured: false, imageUrl: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&q=80' },
    { name: 'Interior Design Consultation', slug: 'interior-design-consultation', categoryId: categoryMap['services'], price: '150.00', rating: 5, inStock: true, description: '2-hour design consultation', featured: false, imageUrl: 'https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800&q=80' },
    { name: 'Marble Side Table', slug: 'marble-side-table', categoryId: categoryMap['side-tables'], price: '280.00', rating: 5, inStock: true, description: 'Elegant marble top side table', featured: false, imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80' },
    { name: 'Oak Sideboard', slug: 'oak-sideboard', categoryId: categoryMap['sideboards'], price: '780.00', rating: 5, inStock: true, description: 'Handcrafted oak sideboard', featured: true, imageUrl: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80' },
    { name: 'Crystal Tealight Holders', slug: 'crystal-tealight-holders', categoryId: categoryMap['table-holders'], price: '38.00', rating: 4, inStock: true, description: 'Set of 6 tealight holders', featured: false, imageUrl: 'https://images.unsplash.com/photo-1602874801006-e04b2d0c6e0e?w=800&q=80' },
    { name: 'Crystal Table Lamp', slug: 'crystal-table-lamp', categoryId: categoryMap['table-lamps'], price: '165.00', rating: 5, inStock: true, description: 'Elegant crystal base table lamp', featured: true, imageUrl: 'https://images.unsplash.com/photo-1543198126-a8ad8e47a917?w=800&q=80' },
    { name: 'Marble Serving Tray', slug: 'marble-serving-tray', categoryId: categoryMap['trays'], price: '78.00', rating: 4, inStock: true, description: 'White marble serving tray', featured: false, imageUrl: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80' },
    { name: 'Tall Floor Vase', slug: 'tall-floor-vase', categoryId: categoryMap['vases'], price: '165.00', rating: 5, inStock: true, description: 'Large ceramic floor vase', featured: false, imageUrl: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80' },
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
