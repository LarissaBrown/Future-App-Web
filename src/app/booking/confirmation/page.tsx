'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default function BookingConfirmationPage() {
  const searchParams = useSearchParams();
  const artistName = searchParams.get('artistName');
  const eventDate = searchParams.get('eventDate');
  const eventType = searchParams.get('eventType');

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Request Submitted!</h1>
            <p className="text-gray-600">
              Thank you for your booking request. We&apos;ll be in touch shortly to confirm the details.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Details</h2>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Artist</dt>
                <dd className="mt-1 text-lg text-gray-900">{artistName}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Event Date</dt>
                <dd className="mt-1 text-lg text-gray-900">{eventDate}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Event Type</dt>
                <dd className="mt-1 text-lg text-gray-900">{eventType}</dd>
              </div>
            </dl>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Next Steps</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>You&apos;ll receive a confirmation email with your booking details</li>
              <li>Our team will review your request and contact you within 24 hours</li>
              <li>Once confirmed, you&apos;ll receive a booking agreement to sign</li>
            </ol>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/dashboard/bookings"
              className="flex-1 bg-primary text-white text-center px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              View My Bookings
            </Link>
            <Link
              href="/artists"
              className="flex-1 bg-white text-primary border border-primary text-center px-6 py-3 rounded-lg font-medium hover:bg-primary/5 transition-colors"
            >
              Browse More Artists
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
} 