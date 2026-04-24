'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function AccountPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
              {isLogin 
                ? 'Sign in to access your account and manage your orders'
                : 'Join us to enjoy exclusive benefits and personalized shopping'}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-8">
                <div className="flex items-center justify-center mb-8">
                  <div className="w-16 h-16 bg-[#194D59]/10 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-[#194D59]" />
                  </div>
                </div>

                <div className="flex border-b border-gray-200 mb-8">
                  <button
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 pb-4 text-center font-medium transition-colors ${
                      isLogin
                        ? 'text-[#194D59] border-b-2 border-[#194D59]'
                        : 'text-gray-500 hover:text-[#194D59]'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 pb-4 text-center font-medium transition-colors ${
                      !isLogin
                        ? 'text-[#194D59] border-b-2 border-[#194D59]'
                        : 'text-gray-500 hover:text-[#194D59]'
                    }`}
                  >
                    Register
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {!isLogin && (
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-[#143942] mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required={!isLogin}
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#194D59] focus:border-transparent transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#143942] mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#194D59] focus:border-transparent transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-[#143942] mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#194D59] focus:border-transparent transition-all"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#194D59]"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {!isLogin && (
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#143942] mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="confirmPassword"
                          name="confirmPassword"
                          required={!isLogin}
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#194D59] focus:border-transparent transition-all"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                  )}

                  {isLogin && (
                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2 text-[#194D59] focus:ring-[#194D59]"
                        />
                        <span className="text-gray-600">Remember me</span>
                      </label>
                      <a href="#" className="text-[#194D59] hover:text-[#C59D5A] transition-colors">
                        Forgot password?
                      </a>
                    </div>
                  )}

                  <Button type="submit" variant="primary" size="lg" className="w-full">
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </Button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                  {isLogin ? (
                    <p>
                      Don&apos;t have an account?{' '}
                      <button
                        onClick={() => setIsLogin(false)}
                        className="text-[#194D59] hover:text-[#C59D5A] font-medium transition-colors"
                      >
                        Register now
                      </button>
                    </p>
                  ) : (
                    <p>
                      Already have an account?{' '}
                      <button
                        onClick={() => setIsLogin(true)}
                        className="text-[#194D59] hover:text-[#C59D5A] font-medium transition-colors"
                      >
                        Sign in
                      </button>
                    </p>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
