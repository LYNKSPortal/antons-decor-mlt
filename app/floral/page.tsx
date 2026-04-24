'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Flower2, Heart, Gift, Sparkles } from 'lucide-react';

const floralPackages = [
  {
    id: 1,
    title: 'Package 01',
    description: 'Elegant mixed bouquet featuring premium roses, lilies, and seasonal blooms. Perfect for expressing heartfelt emotions.',
    features: ['Premium fresh flowers', 'Designer arrangement', 'Complimentary gift card']
  },
  {
    id: 2,
    title: 'Package 02',
    description: 'Sophisticated centerpiece arrangement with exotic orchids and delicate greenery. Ideal for special occasions.',
    features: ['Exotic orchids', 'Custom vase included', 'Same-day delivery']
  },
  {
    id: 3,
    title: 'Package 03',
    description: 'Romantic red rose collection with elegant wrapping. The timeless choice for love and celebration.',
    features: ['Premium red roses', 'Luxury presentation', 'Personalized message']
  },
  {
    id: 4,
    title: 'Package 04',
    description: 'Vibrant seasonal arrangement bursting with color and life. Brings joy to any space or occasion.',
    features: ['Seasonal blooms', 'Artistic design', 'Long-lasting freshness']
  },
  {
    id: 5,
    title: 'Package 05',
    description: 'Minimalist modern arrangement with sculptural elements. Perfect for contemporary spaces and style.',
    features: ['Modern aesthetic', 'Unique composition', 'Premium container']
  },
  {
    id: 6,
    title: 'Package 06',
    description: 'Grand luxury arrangement featuring the finest blooms. Makes a statement for important celebrations.',
    features: ['Luxury flowers', 'Impressive scale', 'White-glove delivery']
  }
];

export default function FloralPage() {
  return (
    <div>
      <section className="relative bg-gradient-to-br from-[#194D59] to-[#143942] text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/lots-of-flowers.jpg" 
            alt="Floral Arrangements" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Floral <span className="text-[#C59D5A]">Arrangements</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
              Flowers express emotion, celebrate moments, and elevate spaces. Discover our curated collection 
              of fresh and artificial arrangements, each crafted with artistry and care.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { icon: Flower2, title: 'Fresh Flowers', description: 'Sourced daily from premium growers' },
              { icon: Sparkles, title: 'Artificial Blooms', description: 'Lifelike arrangements that last forever' },
              { icon: Heart, title: 'Custom Designs', description: 'Bespoke creations for your vision' },
              { icon: Gift, title: 'Gift Ready', description: 'Beautifully presented and delivered' }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-[#194D59]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-[#194D59]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#143942] mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeader
            title="Our Floral Packages"
            subtitle="Curated collections designed to inspire and delight"
            centered
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {floralPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col">
                  <div className="aspect-square bg-gradient-to-br from-[#194D59]/10 to-[#C59D5A]/10 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, #194D59 1px, transparent 0)',
                        backgroundSize: '30px 30px'
                      }}></div>
                    </div>
                    <Flower2 className="w-24 h-24 text-[#194D59] relative z-10" />
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-2xl font-bold text-[#143942] mb-3">{pkg.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed flex-grow">
                      {pkg.description}
                    </p>
                    
                    <div className="mb-6">
                      <ul className="space-y-2">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <span className="w-1.5 h-1.5 bg-[#C59D5A] rounded-full mr-2"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button variant="primary" className="w-full">
                      View Package
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Why Choose Our Floral Arrangements"
              centered
              className="mb-12"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-[#143942] mb-3">Premium Quality</h3>
                <p className="text-gray-600 leading-relaxed">
                  We source only the finest fresh flowers from trusted growers and create artificial arrangements 
                  that are indistinguishable from nature.
                </p>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-[#143942] mb-3">Expert Design</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our skilled florists bring years of experience and artistic vision to every arrangement, 
                  ensuring stunning results.
                </p>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-[#143942] mb-3">Custom Creations</h3>
                <p className="text-gray-600 leading-relaxed">
                  Have a specific vision? We specialize in bespoke arrangements tailored to your preferences, 
                  occasion, and color palette.
                </p>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-[#143942] mb-3">Reliable Service</h3>
                <p className="text-gray-600 leading-relaxed">
                  From consultation to delivery, we provide attentive service and ensure your flowers arrive 
                  fresh and beautifully presented.
                </p>
              </Card>
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
              Order Your Perfect Arrangement
            </h2>
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
              Visit our showroom to see our full collection or contact us to discuss a custom creation. 
              We&apos;re here to help you find the perfect flowers for any occasion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" href="/contact">
                Contact Us
              </Button>
              <Button variant="outline" size="lg" href="/shop" className="bg-white/10 border-white text-white hover:bg-white hover:text-[#194D59]">
                Browse Shop
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
