'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface Booking {
  id: string;
  artistId: string;
  artistName: string;
  eventDate: string;
  eventTime: string;
  eventType: string;
  venueName: string;
  venueAddress: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

// Mock data - replace with API call
const mockBookings: Booking[] = [
  {
    id: '1',
    artistId: 'tianna-hall',
    artistName: 'Tianna Hall',
    eventDate: '2024-04-15',
    eventTime: '19:00',
    eventType: 'Wedding Ceremony',
    venueName: 'The Houstonian Hotel',
    venueAddress: '111 North Post Oak Lane, Houston, TX 77024',
    status: 'confirmed',
    createdAt: '2024-03-01',
  },
  {
    id: '2',
    artistId: 'tianna-hall',
    artistName: 'Tianna Hall',
    eventDate: '2024-05-20',
    eventTime: '18:30',
    eventType: 'Corporate Event',
    venueName: 'Houston Marriott Marquis',
    venueAddress: '1777 Walker St, Houston, TX 77010',
    status: 'pending',
    createdAt: '2024-03-10',
  },
];

export default function BookingsPage() {
  const [bookings] = useState<Booking[]>(mockBookings);

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <ProtectedRoute allowedRoles={['client']}>
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
              <Link
                href="/artists"
                className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Book New Artist
              </Link>
            </div>

            {bookings.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">No Bookings Yet</h2>
                <p className="text-gray-600 mb-6">
                  Start browsing our talented artists and make your first booking!
                </p>
                <Link
                  href="/artists"
                  className="inline-block bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Browse Artists
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-white rounded-lg shadow overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h2 className="text-xl font-semibold text-gray-900 mb-1">
                            {booking.artistName}
                          </h2>
                          <p className="text-gray-600">{booking.eventType}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-start">
                          <CalendarIcon className="h-5 w-5 text-gray-400 mt-1 mr-2" />
                          <div>
                            <p className="text-sm font-medium text-gray-500">Date & Time</p>
                            <p className="text-gray-900">
                              {new Date(booking.eventDate).toLocaleDateString()} at{' '}
                              {booking.eventTime}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <MapPinIcon className="h-5 w-5 text-gray-400 mt-1 mr-2" />
                          <div>
                            <p className="text-sm font-medium text-gray-500">Venue</p>
                            <p className="text-gray-900">{booking.venueName}</p>
                            <p className="text-sm text-gray-600">{booking.venueAddress}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end space-x-4">
                        <button
                          className="text-primary hover:text-primary/80 font-medium"
                          onClick={() => {
                            // TODO: Implement view details
                          }}
                        >
                          View Details
                        </button>
                        {booking.status === 'pending' && (
                          <button
                            className="text-red-600 hover:text-red-800 font-medium"
                            onClick={() => {
                              // TODO: Implement cancel booking
                            }}
                          >
                            Cancel Booking
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
} 