'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { 
  ArrowRight, Star, Armchair, Flower2, Leaf, Flame, Sparkles, 
  Grid3x3, Clock, Table, Layers, Square, UtensilsCrossed, 
  Lamp, Frame, Sofa, Gift, Wine, Lightbulb, ScanFace, 
  Gem, Image, Trees, FlowerIcon, Ribbon, Wrench, Box, 
  CandlestickChart, LampDesk, RectangleHorizontal, Vegan
} from 'lucide-react';

const categories = [
  { name: 'Armchairs, Chairs & Stools', icon: Armchair, dbCategory: 'Furniture' },
  { name: 'Artificial Flowers', icon: Flower2, dbCategory: 'Floral' },
  { name: 'Artificial Plants', icon: Leaf, dbCategory: 'Floral' },
  { name: 'Candle Holders', icon: Flame, dbCategory: 'Ambiance' },
  { name: 'Candles & Home Scent', icon: Sparkles, dbCategory: 'Ambiance' },
  { name: 'Carpets', icon: Grid3x3, dbCategory: 'Textiles' },
  { name: 'Clocks', icon: Clock, dbCategory: 'Decorative' },
  { name: 'Side Tables', icon: Table, dbCategory: 'Furniture' },
  { name: 'Console Tables', icon: Layers, dbCategory: 'Furniture' },
  { name: 'Cushions', icon: Square, dbCategory: 'Textiles' },
  { name: 'Dining Tables', icon: UtensilsCrossed, dbCategory: 'Furniture' },
  { name: 'Floor Lamps', icon: Lamp, dbCategory: 'Lighting' },
  { name: 'Frames', icon: Frame, dbCategory: 'Decorative' },
  { name: 'Furniture', icon: Sofa, dbCategory: 'Furniture' },
  { name: 'Gift Vouchers', icon: Gift, dbCategory: 'Glassware' },
  { name: 'Glass', icon: Wine, dbCategory: 'Glassware' },
  { name: 'Lanterns', icon: Lightbulb, dbCategory: 'Lighting' },
  { name: 'Lighting', icon: Lightbulb, dbCategory: 'Lighting' },
  { name: 'Mirrors', icon: ScanFace, dbCategory: 'Decorative' },
  { name: 'Ornaments', icon: Gem, dbCategory: 'Decorative' },
  { name: 'Pictures', icon: Image, dbCategory: 'Decorative' },
  { name: 'Plant Ornaments', icon: Trees, dbCategory: 'Floral' },
  { name: 'Pots', icon: FlowerIcon, dbCategory: 'Floral' },
  { name: 'Ribbons', icon: Ribbon, dbCategory: 'Decorative' },
  { name: 'Services', icon: Wrench, dbCategory: 'Decorative' },
  { name: 'Sideboards', icon: Box, dbCategory: 'Furniture' },
  { name: 'Table Holders', icon: CandlestickChart, dbCategory: 'Glassware' },
  { name: 'Table Lamps', icon: LampDesk, dbCategory: 'Lighting' },
  { name: 'Trays', icon: RectangleHorizontal, dbCategory: 'Decorative' },
  { name: 'Vases', icon: Vegan, dbCategory: 'Decorative' }
];

const testimonials = [
  {
    name: 'Maria Borg',
    text: 'Anton\'s Décor transformed our wedding venue into a dream. The attention to detail and elegant floral arrangements were absolutely stunning.',
    rating: 5
  },
  {
    name: 'David Camilleri',
    text: 'Exceptional quality and service. The furniture pieces we purchased have become the centerpiece of our living room. Highly recommend!',
    rating: 5
  },
  {
    name: 'Sophie Vella',
    text: 'The team at Anton\'s Décor helped us redesign our entire home. Their taste is impeccable and the results exceeded our expectations.',
    rating: 5
  }
];

export default function Home() {
  return (
    <div>
      <section className="relative bg-gradient-to-br from-[#194D59] to-[#143942] text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight"
            >
              Transform Your Home with <span className="text-[#C59D5A]">Anton&apos;s Décor</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl lg:text-2xl mb-10 text-gray-200 leading-relaxed"
            >
              Discover Malta&apos;s finest collection of elegant home décor, bespoke floral arrangements, 
              and sophisticated furnishings. Refresh your space with timeless beauty.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button variant="secondary" size="lg" href="/shop">
                Shop Now <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" href="/contact" className="bg-white/10 border-white text-white hover:bg-white hover:text-[#194D59]">
                Visit Store
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeader
            title="Explore Our Collections"
            subtitle="From elegant furniture to exquisite ornaments, discover pieces that define your style"
            centered
            className="mb-12"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.02 }}
                >
                  <Link href={`/shop?category=${encodeURIComponent(category.dbCategory)}`}>
                    <Card className="p-6 text-center h-full flex flex-col items-center justify-center min-h-[120px] cursor-pointer group hover:shadow-lg transition-shadow">
                      <div className="w-12 h-12 bg-[#194D59]/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-[#C59D5A]/20 transition-colors">
                        <Icon className="w-6 h-6 text-[#194D59] group-hover:text-[#C59D5A] transition-colors" />
                      </div>
                      <h3 className="text-sm font-medium text-[#143942] group-hover:text-[#C59D5A] transition-colors">
                        {category.name}
                      </h3>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeader
            title="What Our Clients Say"
            subtitle="Trusted by Malta's most discerning homeowners and event planners"
            centered
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-8 h-full">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#C59D5A] text-[#C59D5A]" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed italic">
                    &quot;{testimonial.text}&quot;
                  </p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-[#143942]">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">Verified Customer</p>
                  </div>
                </Card>
              </motion.div>
            ))}
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
              Visit Our Paola Showroom
            </h2>
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
              Experience our full collection in person. Our expert team is ready to help you 
              create the perfect ambiance for your home or event.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" href="/contact">
                Get Directions
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
