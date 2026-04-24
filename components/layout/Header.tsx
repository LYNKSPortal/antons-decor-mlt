'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Mail, User, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const count = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
      setCartCount(count);
    };

    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    return () => window.removeEventListener('cartUpdated', updateCartCount);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/events', label: 'Events' },
    { href: '/floral', label: 'Floral' },
    { href: '/shop', label: 'Online Shop' },
    { href: '/contact', label: 'Contact Us' },
  ];

  return (
    <>
      <div className="bg-[#143942] text-white py-2 text-center text-sm">
        <p>✨ Elevate Your Space with Premium Décor | Visit Our Paola Showroom</p>
      </div>
      
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md' : 'bg-white'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <Link href="/" className="flex items-center">
              <img 
                src="/AD-Dark-Version.png" 
                alt="Anton's Décor" 
                className="w-[200px] h-auto object-contain"
              />
            </Link>

            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="text-[#143942] hover:text-[#C59D5A] transition-colors duration-300 font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <Link href="/contact" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Mail className="w-5 h-5 text-[#194D59]" />
              </Link>
              <Link href="/account" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <User className="w-5 h-5 text-[#194D59]" />
              </Link>
              <Link href="/basket" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                <ShoppingBag className="w-5 h-5 text-[#194D59]" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-[#C59D5A] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              <button
                className="lg:hidden p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-[#194D59]" />
                ) : (
                  <Menu className="w-6 h-6 text-[#194D59]" />
                )}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-200 bg-white"
            >
              <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href + link.label}
                    href={link.href}
                    className="text-[#143942] hover:text-[#C59D5A] transition-colors duration-300 font-medium py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
