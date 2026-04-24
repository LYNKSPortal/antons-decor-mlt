'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Calendar, Users, Sparkles, Heart } from 'lucide-react';

export default function EventsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    location: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const eventTypes = [
    { icon: Heart, title: 'Weddings', description: 'Create unforgettable moments with bespoke floral arrangements and elegant venue styling' },
    { icon: Users, title: 'Corporate Events', description: 'Professional décor solutions that reflect your brand and impress your guests' },
    { icon: Sparkles, title: 'Private Celebrations', description: 'Birthdays, anniversaries, and special occasions deserve extraordinary styling' },
    { icon: Calendar, title: 'Themed Parties', description: 'Custom décor concepts that bring your vision to life with creativity and flair' }
  ];

  return (
    <div>
      <section className="relative bg-gradient-to-br from-[#194D59] to-[#143942] text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/pool-and-water-boat.jpg" 
            alt="Event Styling" 
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
              Event Styling & <span className="text-[#C59D5A]">Décor Services</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
              Transform your special occasions into unforgettable experiences with our bespoke event styling. 
              From intimate gatherings to grand celebrations, we bring elegance and sophistication to every detail.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeader
            title="Our Event Services"
            subtitle="Comprehensive styling solutions for every occasion"
            centered
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {eventTypes.map((event, index) => {
              const Icon = event.icon;
              return (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6 text-center h-full">
                    <div className="w-16 h-16 bg-[#194D59]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-[#194D59]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#143942] mb-3">{event.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{event.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="What We Offer"
              subtitle="Complete event styling solutions tailored to your vision"
              centered
              className="mb-12"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-[#143942] mb-3">Floral Arrangements</h3>
                <p className="text-gray-600 leading-relaxed">
                  Stunning centerpieces, bouquets, and installations using premium fresh and artificial flowers
                </p>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-[#143942] mb-3">Table Styling</h3>
                <p className="text-gray-600 leading-relaxed">
                  Elegant table settings, linens, and decorative elements that create lasting impressions
                </p>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-[#143942] mb-3">Bespoke Décor</h3>
                <p className="text-gray-600 leading-relaxed">
                  Custom décor pieces and installations designed specifically for your event theme
                </p>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-[#143942] mb-3">Venue Dressing</h3>
                <p className="text-gray-600 leading-relaxed">
                  Complete venue transformation with lighting, draping, and decorative elements
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <SectionHeader
              title="Enquire About Your Event"
              subtitle="Let's create something extraordinary together. Share your vision with us."
              centered
              className="mb-12"
            />
            
            <Card className="p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#143942] mb-2">
                      Name & Surname *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#194D59] focus:border-transparent transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#143942] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#194D59] focus:border-transparent transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[#143942] mb-2">
                      Contact Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#194D59] focus:border-transparent transition-all"
                      placeholder="+356 1234 5678"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="eventType" className="block text-sm font-medium text-[#143942] mb-2">
                      Event Type *
                    </label>
                    <select
                      id="eventType"
                      name="eventType"
                      required
                      value={formData.eventType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#194D59] focus:border-transparent transition-all"
                    >
                      <option value="">Select event type</option>
                      <option value="wedding">Wedding</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="birthday">Birthday</option>
                      <option value="anniversary">Anniversary</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="eventDate" className="block text-sm font-medium text-[#143942] mb-2">
                      Date of Event *
                    </label>
                    <input
                      type="date"
                      id="eventDate"
                      name="eventDate"
                      required
                      value={formData.eventDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#194D59] focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-[#143942] mb-2">
                      Event Location *
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#194D59] focus:border-transparent transition-all"
                      placeholder="Venue name or location"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#143942] mb-2">
                    Additional Details (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#194D59] focus:border-transparent transition-all resize-none"
                    placeholder="Tell us more about your vision, color preferences, guest count, or any special requirements..."
                  />
                </div>

                <div className="text-center">
                  <Button type="submit" variant="primary" size="lg" className="w-full md:w-auto">
                    Submit Enquiry
                  </Button>
                  <p className="text-sm text-gray-500 mt-4">
                    We&apos;ll respond to your enquiry within 24 hours
                  </p>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
