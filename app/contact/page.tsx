'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
              Get in <span className="text-[#C59D5A]">Touch</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
              Visit our showroom, give us a call, or send us a message. We&apos;re here to help you 
              create the perfect space with our elegant décor and expert guidance.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeader
                title="Visit Our Showroom"
                subtitle="Experience our collections in person"
                className="mb-8"
              />
              
              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#194D59]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-[#194D59]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#143942] mb-2">Our Location</h3>
                      <p className="text-gray-600 leading-relaxed">
                        105 Vjal Sir Paul Boffa<br />
                        Paola, Malta<br />
                        PLA 1510
                      </p>
                      <Button variant="ghost" className="mt-3 px-0">
                        <Navigation className="w-4 h-4 mr-2" />
                        Get Directions
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#194D59]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-[#194D59]" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-[#143942] mb-3">Business Hours</h3>
                      <div className="space-y-2 text-gray-600">
                        <div className="flex justify-between">
                          <span className="font-medium">Monday – Friday</span>
                          <span>10:00 AM – 6:30 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Saturday</span>
                          <span>9:00 AM – 1:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Sunday & Holidays</span>
                          <span className="text-red-600">Closed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#194D59]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-[#194D59]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#143942] mb-2">Phone</h3>
                      <a href="tel:+35621234567" className="text-gray-600 hover:text-[#C59D5A] transition-colors">
                        +356 2123 4567
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#194D59]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-[#194D59]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#143942] mb-2">Email</h3>
                      <a href="mailto:info@antonsdecor.com" className="text-gray-600 hover:text-[#C59D5A] transition-colors">
                        info@antonsdecor.com
                      </a>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeader
                title="Send Us a Message"
                subtitle="We'll respond within 24 hours"
                className="mb-8"
              />
              
              <Card className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#143942] mb-2">
                      Your Name *
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

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-[#143942] mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#194D59] focus:border-transparent transition-all"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[#143942] mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#194D59] focus:border-transparent transition-all resize-none"
                      placeholder="Tell us about your project, questions, or how we can assist you..."
                    />
                  </div>

                  <Button type="submit" variant="primary" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeader
            title="Find Us on the Map"
            subtitle="Located in the heart of Paola, Malta"
            centered
            className="mb-8"
          />
          
          <Card className="overflow-hidden">
            <div className="aspect-[21/9] relative">
              <iframe
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=105+Vjal+Sir+Paul+Boffa,Paola,Malta+PLA+1510&zoom=15"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
                title="Anton's Décor - 105 Vjal Sir Paul Boffa, Paola, Malta"
              />
            </div>
          </Card>
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
              Ready to Transform Your Space?
            </h2>
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
              Whether you&apos;re looking for a single statement piece or a complete home makeover, 
              our team is ready to bring your vision to life with elegance and expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" href="/shop">
                Browse Collections
              </Button>
              <Button variant="outline" size="lg" href="/events" className="bg-white/10 border-white text-white hover:bg-white hover:text-[#194D59]">
                Event Services
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
