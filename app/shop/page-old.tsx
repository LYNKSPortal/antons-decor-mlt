'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Filter, Grid, List, Search, ShoppingCart, Star, X } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  inStock: boolean;
  image: string;
  description: string;
}

const products: Product[] = [
  { id: 1, name: 'Velvet Armchair', category: 'Furniture', price: 450, rating: 5, inStock: true, image: '', description: 'Luxurious velvet armchair in teal' },
  { id: 2, name: 'Marble Side Table', category: 'Furniture', price: 280, rating: 5, inStock: true, image: '', description: 'Elegant marble top side table' },
  { id: 3, name: 'Gold Floor Lamp', category: 'Lighting', price: 195, rating: 4, inStock: true, image: '', description: 'Modern gold finish floor lamp' },
  { id: 4, name: 'Crystal Table Lamp', category: 'Lighting', price: 165, rating: 5, inStock: true, image: '', description: 'Elegant crystal base table lamp' },
  { id: 5, name: 'Decorative Vase Set', category: 'Decorative', price: 85, rating: 4, inStock: true, image: '', description: 'Set of 3 ceramic vases' },
  { id: 6, name: 'Wall Mirror', category: 'Decorative', price: 220, rating: 5, inStock: true, image: '', description: 'Large ornate wall mirror' },
  { id: 7, name: 'Artificial Orchid', category: 'Floral', price: 65, rating: 5, inStock: true, image: '', description: 'Lifelike white orchid arrangement' },
  { id: 8, name: 'Faux Fiddle Leaf Fig', category: 'Floral', price: 145, rating: 4, inStock: true, image: '', description: 'Realistic artificial plant' },
  { id: 9, name: 'Velvet Cushion Set', category: 'Textiles', price: 75, rating: 4, inStock: true, image: '', description: 'Set of 4 luxury cushions' },
  { id: 10, name: 'Persian Rug', category: 'Textiles', price: 580, rating: 5, inStock: false, image: '', description: 'Hand-woven Persian style rug' },
  { id: 11, name: 'Scented Candle Collection', category: 'Ambiance', price: 55, rating: 5, inStock: true, image: '', description: 'Set of 3 luxury candles' },
  { id: 12, name: 'Reed Diffuser', category: 'Ambiance', price: 45, rating: 4, inStock: true, image: '', description: 'Premium home fragrance diffuser' },
  { id: 13, name: 'Crystal Decanter Set', category: 'Glassware', price: 125, rating: 5, inStock: true, image: '', description: 'Hand-cut crystal decanter with glasses' },
  { id: 14, name: 'Gold Serving Tray', category: 'Glassware', price: 95, rating: 4, inStock: true, image: '', description: 'Elegant gold-rimmed serving tray' },
  { id: 15, name: 'Vintage Wall Clock', category: 'Decorative', price: 110, rating: 4, inStock: true, image: '', description: 'Classic vintage style wall clock' },
  { id: 16, name: 'Console Table', category: 'Furniture', price: 520, rating: 5, inStock: true, image: '', description: 'Elegant marble console table' },
  { id: 17, name: 'Pendant Light', category: 'Lighting', price: 240, rating: 5, inStock: true, image: '', description: 'Modern geometric pendant light' },
  { id: 18, name: 'Decorative Bowl Set', category: 'Decorative', price: 68, rating: 4, inStock: true, image: '', description: 'Set of 3 ceramic bowls' },
  { id: 19, name: 'Artificial Rose Bouquet', category: 'Floral', price: 48, rating: 5, inStock: true, image: '', description: 'Realistic silk rose arrangement' },
  { id: 20, name: 'Throw Blanket', category: 'Textiles', price: 95, rating: 4, inStock: true, image: '', description: 'Cashmere blend throw blanket' },
];

const categories = ['All', 'Furniture', 'Lighting', 'Decorative', 'Floral', 'Textiles', 'Ambiance', 'Glassware'];
const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under €100', min: 0, max: 100 },
  { label: '€100 - €200', min: 100, max: 200 },
  { label: '€200 - €400', min: 200, max: 400 },
  { label: 'Over €400', min: 400, max: Infinity },
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    const priceRange = priceRanges[selectedPriceRange];
    filtered = filtered.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);

    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortBy === 'price-low') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [selectedCategory, selectedPriceRange, searchQuery, sortBy]);

  return (
    <div>
      <section className="relative bg-gradient-to-br from-[#194D59] to-[#143942] text-white py-20 md:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Online <span className="text-[#C59D5A]">Shop</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
              Browse our complete collection of premium home décor. Filter by category, price, and more to find the perfect pieces for your space.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="relative flex-grow w-full lg:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#194D59] focus:border-transparent"
                />
              </div>
              
              <div className="flex gap-3 w-full lg:w-auto">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#194D59] focus:border-transparent"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A-Z</option>
                </select>
                
                <div className="hidden md:flex gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid' ? 'bg-[#194D59] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'list' ? 'bg-[#194D59] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-lg shadow-sm p-6 mb-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-[#143942] mb-3">Category</h3>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <label key={cat} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === cat}
                          onChange={() => setSelectedCategory(cat)}
                          className="mr-2 text-[#194D59] focus:ring-[#194D59]"
                        />
                        <span className="text-gray-700 group-hover:text-[#194D59] transition-colors">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-[#143942] mb-3">Price Range</h3>
                  <div className="space-y-2">
                    {priceRanges.map((range, idx) => (
                      <label key={idx} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="price"
                          checked={selectedPriceRange === idx}
                          onChange={() => setSelectedPriceRange(idx)}
                          className="mr-2 text-[#194D59] focus:ring-[#194D59]"
                        />
                        <span className="text-gray-700 group-hover:text-[#194D59] transition-colors">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div className="mb-4 text-gray-600">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </div>

          <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {viewMode === 'grid' ? (
                  <Card className="h-full flex flex-col group">
                    <div className="aspect-square bg-gradient-to-br from-[#194D59]/5 to-[#C59D5A]/5 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                          backgroundImage: 'radial-gradient(circle at 2px 2px, #194D59 1px, transparent 0)',
                          backgroundSize: '20px 20px'
                        }}></div>
                      </div>
                      <div className="text-4xl font-bold text-[#194D59]/20 relative z-10">
                        {product.id}
                      </div>
                      {!product.inStock && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                          Out of Stock
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4 flex-grow flex flex-col">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-[#143942] group-hover:text-[#C59D5A] transition-colors">
                          {product.name}
                        </h3>
                      </div>
                      
                      <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                      <p className="text-sm text-gray-600 mb-3 flex-grow">{product.description}</p>
                      
                      <div className="flex items-center mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < product.rating ? 'fill-[#C59D5A] text-[#C59D5A]' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-[#194D59]">€{product.price}</span>
                        <Button
                          variant="primary"
                          size="sm"
                          disabled={!product.inStock}
                          className="flex items-center gap-2"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </Card>
                ) : (
                  <Card className="p-4">
                    <div className="flex gap-4">
                      <div className="w-32 h-32 bg-gradient-to-br from-[#194D59]/5 to-[#C59D5A]/5 flex items-center justify-center rounded flex-shrink-0">
                        <div className="text-3xl font-bold text-[#194D59]/20">{product.id}</div>
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-semibold text-[#143942] mb-1">{product.name}</h3>
                            <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                          </div>
                          {!product.inStock && (
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">Out of Stock</span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-3">{product.description}</p>
                        <div className="flex items-center mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < product.rating ? 'fill-[#C59D5A] text-[#C59D5A]' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-[#194D59]">€{product.price}</span>
                          <Button
                            variant="primary"
                            disabled={!product.inStock}
                            className="flex items-center gap-2"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                )}
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg mb-4">No products found matching your criteria</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedPriceRange(0);
                  setSearchQuery('');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-[#194D59] to-[#143942] text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Visit Our Showroom
            </h2>
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
              See, touch, and experience our collections in person at our Paola location. 
              Our showroom showcases the full range of our offerings in beautifully styled settings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" href="/contact">
                Plan Your Visit
              </Button>
              <Button variant="outline" size="lg" href="/contact" className="bg-white/10 border-white text-white hover:bg-white hover:text-[#194D59]">
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
