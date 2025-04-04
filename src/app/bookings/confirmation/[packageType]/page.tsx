'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface BookingConfirmationPageProps {
  params: {
    packageType: string;
  };
}

export default function BookingConfirmationPage({ params }: BookingConfirmationPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon className="w-8 h-8 text-primary" />
          </div>

          <h1 className="text-3xl font-bold text-primary mb-4">Booking Request Submitted!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your booking request for the {params.packageType} package. We'll review your request and get back to you shortly.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">What's Next?</h2>
            <ul className="space-y-4 text-left">
              <li className="flex items-start">
                <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  1
                </span>
                <span className="text-gray-600">
                  You'll receive a confirmation email with your booking details
                </span>
              </li>
              <li className="flex items-start">
                <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  2
                </span>
                <span className="text-gray-600">
                  The artist will review your request and confirm availability
                </span>
              </li>
              <li className="flex items-start">
                <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  3
                </span>
                <span className="text-gray-600">
                  Once confirmed, you'll receive payment instructions
                </span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <Link
              href="/bookings"
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              View My Bookings
            </Link>
            <div>
              <Link
                href="/"
                className="text-primary hover:text-primary-dark transition-colors"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 