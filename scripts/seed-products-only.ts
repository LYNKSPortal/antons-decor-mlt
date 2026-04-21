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
    
    // Additional products for missing categories
    // Note: These will use existing category IDs as placeholders since we only have 7 categories in DB
    // When real categories are added, update these categoryIds
    
    // More Furniture items (Armchairs, Chairs, Stools, Console Tables, Dining Tables, Side Tables, Sideboards)
    { name: 'Tufted Lounge Chair', slug: 'tufted-lounge-chair', categoryId: categoryMap['furniture'], price: '520.00', rating: 5, inStock: true, description: 'Elegant tufted lounge chair', featured: false },
    { name: 'Wooden Dining Chair Set', slug: 'wooden-dining-chair-set', categoryId: categoryMap['furniture'], price: '680.00', rating: 5, inStock: true, description: 'Set of 4 dining chairs', featured: false },
    { name: 'Modern Bar Stool Pair', slug: 'modern-bar-stool-pair', categoryId: categoryMap['furniture'], price: '320.00', rating: 4, inStock: true, description: 'Set of 2 contemporary bar stools', featured: false },
    { name: 'Marble Console Table', slug: 'marble-console-table-2', categoryId: categoryMap['furniture'], price: '890.00', rating: 5, inStock: true, description: 'Luxury marble console table', featured: true },
    { name: 'Extendable Dining Table', slug: 'extendable-dining-table', categoryId: categoryMap['furniture'], price: '1450.00', rating: 5, inStock: true, description: 'Seats 6-10 people', featured: true },
    { name: 'Nesting Side Tables', slug: 'nesting-side-tables', categoryId: categoryMap['furniture'], price: '340.00', rating: 4, inStock: true, description: 'Set of 3 nesting tables', featured: false },
    { name: 'Vintage Sideboard', slug: 'vintage-sideboard', categoryId: categoryMap['furniture'], price: '1280.00', rating: 5, inStock: true, description: 'Restored vintage sideboard', featured: true },
    
    // More Lighting (Floor Lamps, Table Lamps, Lanterns)
    { name: 'Arc Floor Lamp', slug: 'arc-floor-lamp', categoryId: categoryMap['lighting'], price: '380.00', rating: 5, inStock: true, description: 'Modern arc floor lamp', featured: false },
    { name: 'Tripod Floor Lamp', slug: 'tripod-floor-lamp', categoryId: categoryMap['lighting'], price: '295.00', rating: 4, inStock: true, description: 'Wooden tripod floor lamp', featured: false },
    { name: 'Marble Table Lamp', slug: 'marble-table-lamp', categoryId: categoryMap['lighting'], price: '185.00', rating: 5, inStock: true, description: 'Elegant marble base lamp', featured: false },
    { name: 'Glass Table Lamp', slug: 'glass-table-lamp', categoryId: categoryMap['lighting'], price: '155.00', rating: 4, inStock: true, description: 'Hand-blown glass lamp', featured: false },
    { name: 'Moroccan Lantern', slug: 'moroccan-lantern', categoryId: categoryMap['lighting'], price: '125.00', rating: 5, inStock: true, description: 'Authentic Moroccan lantern', featured: false },
    { name: 'Hurricane Lantern Set', slug: 'hurricane-lantern-set', categoryId: categoryMap['lighting'], price: '88.00', rating: 4, inStock: true, description: 'Set of 2 hurricane lanterns', featured: false },
    
    // More Decorative (Frames, Mirrors, Ornaments, Pictures, Clocks, Trays, Vases)
    { name: 'Gallery Frame Set', slug: 'gallery-frame-set', categoryId: categoryMap['decorative'], price: '95.00', rating: 5, inStock: true, description: 'Set of 5 gallery frames', featured: false },
    { name: 'Antique Gold Frame', slug: 'antique-gold-frame', categoryId: categoryMap['decorative'], price: '68.00', rating: 4, inStock: true, description: 'Ornate antique gold frame', featured: false },
    { name: 'Round Wall Mirror', slug: 'round-wall-mirror', categoryId: categoryMap['decorative'], price: '195.00', rating: 5, inStock: true, description: 'Large round wall mirror', featured: false },
    { name: 'Venetian Mirror', slug: 'venetian-mirror', categoryId: categoryMap['decorative'], price: '420.00', rating: 5, inStock: true, description: 'Authentic Venetian mirror', featured: true },
    { name: 'Ceramic Ornament Set', slug: 'ceramic-ornament-set', categoryId: categoryMap['decorative'], price: '45.00', rating: 4, inStock: true, description: 'Set of 4 ceramic ornaments', featured: false },
    { name: 'Glass Ornaments', slug: 'glass-ornaments', categoryId: categoryMap['decorative'], price: '38.00', rating: 4, inStock: true, description: 'Hand-blown glass ornaments', featured: false },
    { name: 'Canvas Wall Art', slug: 'canvas-wall-art', categoryId: categoryMap['decorative'], price: '180.00', rating: 5, inStock: true, description: 'Abstract canvas art', featured: false },
    { name: 'Framed Botanical Print', slug: 'framed-botanical-print', categoryId: categoryMap['decorative'], price: '85.00', rating: 4, inStock: true, description: 'Vintage botanical print', featured: false },
    { name: 'Grandfather Clock', slug: 'grandfather-clock', categoryId: categoryMap['decorative'], price: '2400.00', rating: 5, inStock: true, description: 'Antique grandfather clock', featured: true },
    { name: 'Mantel Clock', slug: 'mantel-clock', categoryId: categoryMap['decorative'], price: '145.00', rating: 5, inStock: true, description: 'Classic mantel clock', featured: false },
    { name: 'Marble Serving Tray', slug: 'marble-serving-tray', categoryId: categoryMap['decorative'], price: '78.00', rating: 4, inStock: true, description: 'White marble serving tray', featured: false },
    { name: 'Wooden Tray Set', slug: 'wooden-tray-set', categoryId: categoryMap['decorative'], price: '65.00', rating: 4, inStock: true, description: 'Set of 3 wooden trays', featured: false },
    { name: 'Tall Floor Vase', slug: 'tall-floor-vase', categoryId: categoryMap['decorative'], price: '165.00', rating: 5, inStock: true, description: 'Large ceramic floor vase', featured: false },
    { name: 'Crystal Vase', slug: 'crystal-vase', categoryId: categoryMap['decorative'], price: '125.00', rating: 5, inStock: true, description: 'Hand-cut crystal vase', featured: false },
    
    // More Floral (Artificial Flowers, Artificial Plants, Plant Ornaments, Pots)
    { name: 'Silk Hydrangea Arrangement', slug: 'silk-hydrangea-arrangement', categoryId: categoryMap['floral'], price: '72.00', rating: 5, inStock: true, description: 'Realistic hydrangea arrangement', featured: false },
    { name: 'Artificial Tulip Bouquet', slug: 'artificial-tulip-bouquet', categoryId: categoryMap['floral'], price: '45.00', rating: 4, inStock: true, description: 'Spring tulip bouquet', featured: false },
    { name: 'Faux Monstera Plant', slug: 'faux-monstera-plant', categoryId: categoryMap['floral'], price: '125.00', rating: 5, inStock: true, description: 'Large artificial monstera', featured: false },
    { name: 'Artificial Succulent Set', slug: 'artificial-succulent-set', categoryId: categoryMap['floral'], price: '35.00', rating: 4, inStock: true, description: 'Set of 6 faux succulents', featured: false },
    { name: 'Decorative Plant Stand', slug: 'decorative-plant-stand', categoryId: categoryMap['floral'], price: '88.00', rating: 4, inStock: true, description: 'Metal plant stand', featured: false },
    { name: 'Hanging Plant Holder', slug: 'hanging-plant-holder', categoryId: categoryMap['floral'], price: '42.00', rating: 4, inStock: true, description: 'Macrame plant hanger', featured: false },
    { name: 'Ceramic Planter Set', slug: 'ceramic-planter-set', categoryId: categoryMap['floral'], price: '68.00', rating: 5, inStock: true, description: 'Set of 3 ceramic planters', featured: false },
    { name: 'Terracotta Pot Collection', slug: 'terracotta-pot-collection', categoryId: categoryMap['floral'], price: '55.00', rating: 4, inStock: true, description: 'Set of 4 terracotta pots', featured: false },
    
    // More Textiles (Carpets, Cushions)
    { name: 'Shag Area Rug', slug: 'shag-area-rug', categoryId: categoryMap['textiles'], price: '320.00', rating: 4, inStock: true, description: 'Soft shag area rug', featured: false },
    { name: 'Runner Carpet', slug: 'runner-carpet', categoryId: categoryMap['textiles'], price: '180.00', rating: 4, inStock: true, description: 'Hallway runner carpet', featured: false },
    { name: 'Silk Cushion Set', slug: 'silk-cushion-set', categoryId: categoryMap['textiles'], price: '95.00', rating: 5, inStock: true, description: 'Set of 4 silk cushions', featured: false },
    { name: 'Embroidered Cushions', slug: 'embroidered-cushions', categoryId: categoryMap['textiles'], price: '68.00', rating: 4, inStock: true, description: 'Hand-embroidered cushions', featured: false },
    
    // More Ambiance (Candle Holders, Candles & Home Scent)
    { name: 'Crystal Candle Holders', slug: 'crystal-candle-holders', categoryId: categoryMap['ambiance'], price: '85.00', rating: 5, inStock: true, description: 'Set of 2 crystal holders', featured: false },
    { name: 'Taper Candle Holders', slug: 'taper-candle-holders', categoryId: categoryMap['ambiance'], price: '58.00', rating: 4, inStock: true, description: 'Set of 3 brass holders', featured: false },
    { name: 'Luxury Scented Candles', slug: 'luxury-scented-candles', categoryId: categoryMap['ambiance'], price: '75.00', rating: 5, inStock: true, description: 'Premium scented candle set', featured: false },
    { name: 'Aromatherapy Candles', slug: 'aromatherapy-candles', categoryId: categoryMap['ambiance'], price: '48.00', rating: 4, inStock: true, description: 'Natural aromatherapy candles', featured: false },
    
    // More Glassware (Glass items, Table Holders)
    { name: 'Whiskey Glass Set', slug: 'whiskey-glass-set', categoryId: categoryMap['glassware'], price: '68.00', rating: 5, inStock: true, description: 'Set of 4 whiskey glasses', featured: false },
    { name: 'Cocktail Glass Set', slug: 'cocktail-glass-set', categoryId: categoryMap['glassware'], price: '58.00', rating: 4, inStock: true, description: 'Set of 6 cocktail glasses', featured: false },
    { name: 'Glass Candle Holders', slug: 'glass-candle-holders', categoryId: categoryMap['glassware'], price: '42.00', rating: 4, inStock: true, description: 'Set of 3 glass holders', featured: false },
    { name: 'Crystal Tealight Holders', slug: 'crystal-tealight-holders', categoryId: categoryMap['glassware'], price: '38.00', rating: 4, inStock: true, description: 'Set of 6 tealight holders', featured: false },
    
    // Services & Ribbons (using decorative category as placeholder)
    { name: 'Interior Design Consultation', slug: 'interior-design-consultation', categoryId: categoryMap['decorative'], price: '150.00', rating: 5, inStock: true, description: '2-hour design consultation', featured: false },
    { name: 'Home Styling Service', slug: 'home-styling-service', categoryId: categoryMap['decorative'], price: '300.00', rating: 5, inStock: true, description: 'Full room styling service', featured: true },
    { name: 'Silk Ribbon Collection', slug: 'silk-ribbon-collection', categoryId: categoryMap['decorative'], price: '28.00', rating: 4, inStock: true, description: 'Assorted silk ribbons', featured: false },
    { name: 'Velvet Ribbon Set', slug: 'velvet-ribbon-set', categoryId: categoryMap['decorative'], price: '32.00', rating: 4, inStock: true, description: 'Luxury velvet ribbons', featured: false },
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
