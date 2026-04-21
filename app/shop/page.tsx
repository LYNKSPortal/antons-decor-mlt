'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Filter, Grid, List, Search, ShoppingCart, Star, Loader2, X } from 'lucide-react';

interface Product {
  id: string | number;
  name: string;
  category?: string;
  categoryName?: string;
  price: string | number;
  rating: number;
  inStock: boolean;
  imageUrl?: string | null;
  images?: string[];
  description: string;
}

const categories = [
  'All',
  'Furniture',
  'Lighting',
  'Decorative',
  'Floral',
  'Textiles',
  'Ambiance',
  'Glassware'
];
const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under €100', min: 0, max: 100 },
  { label: '€100 - €200', min: 100, max: 200 },
  { label: '€200 - €400', min: 200, max: 400 },
  { label: 'Over €400', min: 400, max: Infinity },
];

function ShopPageContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState<'arture' | 'local' | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');

  // Initialize category from URL parameter
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedPriceRange, searchQuery]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== 'All') params.append('category', selectedCategory);
      if (searchQuery) params.append('search', searchQuery);
      
      const priceRange = priceRanges[selectedPriceRange];
      if (priceRange.min > 0) params.append('minPrice', priceRange.min.toString());
      if (priceRange.max !== Infinity) params.append('maxPrice', priceRange.max.toString());

      const response = await fetch(`/api/products?${params.toString()}`);
      const data = await response.json();
      
      setProducts(data.products || data || []);
      setDataSource(data.source || null);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const sortedProducts = React.useMemo(() => {
    let sorted = [...products];
    
    // Apply in-stock filter
    if (inStockOnly) {
      sorted = sorted.filter(p => p.inStock);
    }
    
    // Apply sorting
    if (sortBy === 'price-low') {
      sorted.sort((a, b) => parseFloat(a.price.toString()) - parseFloat(b.price.toString()));
    } else if (sortBy === 'price-high') {
      sorted.sort((a, b) => parseFloat(b.price.toString()) - parseFloat(a.price.toString()));
    } else if (sortBy === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    return sorted;
  }, [products, sortBy, inStockOnly]);

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
            {dataSource && (
              <p className="mt-4 text-sm text-[#C59D5A]">
                {dataSource === 'arture' ? '✓ Products loaded from Arture API' : '✓ Products loaded from local database'}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      <section className="py-8 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Top Bar */}
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
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  {showFilters ? 'Hide' : 'Show'} Filters
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

          {/* Main Content with Sidebar */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Sidebar - Filters */}
            <aside className={`lg:block ${showFilters ? 'block' : 'hidden'} lg:w-64 flex-shrink-0`}>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#143942]">Filters</h2>
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setSelectedPriceRange(0);
                      setSearchQuery('');
                      setInStockOnly(false);
                    }}
                    className="text-sm text-[#C59D5A] hover:text-[#194D59] transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                {/* Category Filter */}
                <div className="mb-8">
                  <h3 className="font-semibold text-[#143942] mb-4 flex items-center">
                    <Filter className="w-4 h-4 mr-2" />
                    Category
                  </h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    {categories.map((cat) => (
                      <label key={cat} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === cat}
                          onChange={() => setSelectedCategory(cat)}
                          className="mr-3 text-[#194D59] focus:ring-[#194D59] w-4 h-4"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-[#194D59] transition-colors">
                          {cat}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="mb-8">
                  <h3 className="font-semibold text-[#143942] mb-4">Price Range</h3>
                  <div className="space-y-2">
                    {priceRanges.map((range, idx) => (
                      <label key={idx} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="price"
                          checked={selectedPriceRange === idx}
                          onChange={() => setSelectedPriceRange(idx)}
                          className="mr-3 text-[#194D59] focus:ring-[#194D59] w-4 h-4"
                        />
                        <span className="text-gray-700 group-hover:text-[#194D59] transition-colors">
                          {range.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Stock Status Filter */}
                <div className="mb-8">
                  <h3 className="font-semibold text-[#143942] mb-4">Availability</h3>
                  <div className="space-y-2">
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={(e) => setInStockOnly(e.target.checked)}
                        className="mr-3 text-[#194D59] focus:ring-[#194D59] w-4 h-4 rounded"
                      />
                      <span className="text-gray-700 group-hover:text-[#194D59] transition-colors">
                        In Stock Only
                      </span>
                    </label>
                  </div>
                </div>

                {/* Active Filters Summary */}
                {(selectedCategory !== 'All' || selectedPriceRange !== 0 || searchQuery) && (
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-[#143942] mb-2">Active Filters:</h4>
                    <div className="space-y-1">
                      {selectedCategory !== 'All' && (
                        <div className="text-sm text-gray-600 flex items-center justify-between">
                          <span>Category: {selectedCategory}</span>
                          <button
                            onClick={() => setSelectedCategory('All')}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                      {selectedPriceRange !== 0 && (
                        <div className="text-sm text-gray-600 flex items-center justify-between">
                          <span>{priceRanges[selectedPriceRange].label}</span>
                          <button
                            onClick={() => setSelectedPriceRange(0)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                      {searchQuery && (
                        <div className="text-sm text-gray-600 flex items-center justify-between">
                          <span>Search: "{searchQuery}"</span>
                          <button
                            onClick={() => setSearchQuery('')}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </aside>

            {/* Right Content - Products */}
            <div className="flex-1">
              {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-[#194D59]" />
              <span className="ml-3 text-gray-600">Loading products...</span>
            </div>
          ) : (
            <>
              <div className="mb-4 text-gray-600">
                Showing {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
              </div>

              <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
                {sortedProducts.map((product, index) => {
                  const productCategory = product.categoryName || product.category || 'Uncategorized';
                  const productImage = product.imageUrl || (product.images && product.images[0]);
                  
                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      {viewMode === 'grid' ? (
                        <Card className="h-full flex flex-col group">
                          <div className="aspect-square bg-gradient-to-br from-[#194D59]/5 to-[#C59D5A]/5 flex items-center justify-center relative overflow-hidden">
                            {productImage ? (
                              <img src={productImage} alt={product.name} className="w-full h-full object-cover" />
                            ) : (
                              <>
                                <div className="absolute inset-0 opacity-10">
                                  <div className="absolute inset-0" style={{
                                    backgroundImage: 'radial-gradient(circle at 2px 2px, #194D59 1px, transparent 0)',
                                    backgroundSize: '20px 20px'
                                  }}></div>
                                </div>
                                <div className="text-4xl font-bold text-[#194D59]/20 relative z-10">
                                  {String(index + 1).padStart(2, '0')}
                                </div>
                              </>
                            )}
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
                            
                            <p className="text-sm text-gray-500 mb-2">{productCategory}</p>
                            <p className="text-sm text-gray-600 mb-3 flex-grow line-clamp-2">{product.description}</p>
                            
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
                              <span className="text-2xl font-bold text-[#194D59]">€{parseFloat(product.price.toString()).toFixed(2)}</span>
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
                            <div className="w-32 h-32 bg-gradient-to-br from-[#194D59]/5 to-[#C59D5A]/5 flex items-center justify-center rounded flex-shrink-0 overflow-hidden">
                              {productImage ? (
                                <img src={productImage} alt={product.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="text-3xl font-bold text-[#194D59]/20">{String(index + 1).padStart(2, '0')}</div>
                              )}
                            </div>
                            <div className="flex-grow">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="text-xl font-semibold text-[#143942] mb-1">{product.name}</h3>
                                  <p className="text-sm text-gray-500 mb-2">{productCategory}</p>
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
                                <span className="text-2xl font-bold text-[#194D59]">€{parseFloat(product.price.toString()).toFixed(2)}</span>
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
                  );
                })}
              </div>

              {sortedProducts.length === 0 && (
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
            </>
          )}
            </div>
          </div>
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

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#194D59]" />
      </div>
    }>
      <ShopPageContent />
    </Suspense>
  );
}
