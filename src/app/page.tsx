'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Find the Perfect Artist for Your Event
            </h1>
            <p className="text-xl mb-8">
              Connect with talented musicians, bands, and performers for weddings, corporate events, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/artists" 
                className="bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-md font-medium text-center"
              >
                Browse Artists
              </Link>
              {!isAuthenticated && (
                <Link 
                  href="/register" 
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-medium text-center"
                >
                  Sign Up as Client
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artists Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Artists</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured Artist Card - Tianna Hall */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="/images/artists/tianna-hall/hero.jpg"
                  alt="Tianna Hall"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Tianna Hall</h3>
                <p className="text-gray-600 mb-4">Jazz Vocalist & Pianist</p>
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">(24 reviews)</span>
                </div>
                <Link 
                  href="/artists/tianna-hall" 
                  className="block text-center bg-primary text-white hover:bg-primary-dark px-4 py-2 rounded-md"
                >
                  View Profile
                </Link>
              </div>
            </div>

            {/* More featured artists would go here */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">More artists coming soon</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
                <p className="text-gray-600 mb-4">More talented artists will be added</p>
                <button 
                  className="w-full text-center bg-gray-200 text-gray-600 px-4 py-2 rounded-md cursor-not-allowed"
                  disabled
                >
                  View Profile
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">More artists coming soon</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
                <p className="text-gray-600 mb-4">More talented artists will be added</p>
                <button 
                  className="w-full text-center bg-gray-200 text-gray-600 px-4 py-2 rounded-md cursor-not-allowed"
                  disabled
                >
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Browse Artists</h3>
              <p className="text-gray-600">Find the perfect artist for your event by browsing our curated selection.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Check Availability</h3>
              <p className="text-gray-600">View the artist&apos;s calendar and find a date that works for your event.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Book & Confirm</h3>
              <p className="text-gray-600">Complete the booking process and receive confirmation for your event.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Perfect Artist?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our platform today and connect with talented artists for your next event.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/artists" 
              className="bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-md font-medium"
            >
              Browse Artists
            </Link>
            {!isAuthenticated && (
              <Link 
                href="/register" 
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-medium"
              >
                Sign Up as Client
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
