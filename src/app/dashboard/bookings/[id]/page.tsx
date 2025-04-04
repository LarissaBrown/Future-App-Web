'use client';

import React from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import {
  CalendarIcon,
  MapPinIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

interface BookingDetails {
  id: string;
  artistId: string;
  artistName: string;
  artistEmail: string;
  artistPhone: string;
  eventDate: string;
  eventTime: string;
  eventType: string;
  venueName: string;
  venueAddress: string;
  guestCount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  notes: string;
  agreementUrl?: string;
}

// Mock data - replace with API call
const mockBookingDetails: BookingDetails = {
  id: '1',
  artistId: 'tianna-hall',
  artistName: 'Tianna Hall',
  artistEmail: 'tianna@example.com',
  artistPhone: '(713) 555-0123',
  eventDate: '2024-04-15',
  eventTime: '19:00',
  eventType: 'Wedding Ceremony',
  venueName: 'The Houstonian Hotel',
  venueAddress: '111 North Post Oak Lane, Houston, TX 77024',
  guestCount: 150,
  status: 'confirmed',
  createdAt: '2024-03-01',
  notes: 'Please arrive 1 hour before the ceremony for setup and sound check.',
  agreementUrl: '/documents/booking-agreement.pdf',
};

export default function BookingDetailsPage() {
  const booking = mockBookingDetails; // Replace with API call using id from useParams()

  const getStatusColor = (status: BookingDetails['status']) => {
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
            <div className="mb-8">
              <a
                href="/dashboard/bookings"
                className="text-primary hover:text-primary/80 font-medium inline-flex items-center"
              >
                ← Back to My Bookings
              </a>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">
                      Booking with {booking.artistName}
                    </h1>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <CalendarIcon className="h-5 w-5 text-gray-400 mt-1 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Date & Time</p>
                        <p className="text-gray-900">
                          {new Date(booking.eventDate).toLocaleDateString()} at {booking.eventTime}
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
                    <div className="flex items-start">
                      <UserIcon className="h-5 w-5 text-gray-400 mt-1 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Guest Count</p>
                        <p className="text-gray-900">{booking.guestCount} guests</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <EnvelopeIcon className="h-5 w-5 text-gray-400 mt-1 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Artist Email</p>
                        <a
                          href={`mailto:${booking.artistEmail}`}
                          className="text-primary hover:text-primary/80"
                        >
                          {booking.artistEmail}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <PhoneIcon className="h-5 w-5 text-gray-400 mt-1 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Artist Phone</p>
                        <a
                          href={`tel:${booking.artistPhone}`}
                          className="text-primary hover:text-primary/80"
                        >
                          {booking.artistPhone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {booking.notes && (
                  <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">Notes</h2>
                    <p className="text-gray-600 whitespace-pre-wrap">{booking.notes}</p>
                  </div>
                )}

                {booking.agreementUrl && (
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <DocumentTextIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-gray-900">Booking Agreement</span>
                    </div>
                    <a
                      href={booking.agreementUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 font-medium"
                    >
                      View Agreement
                    </a>
                  </div>
                )}

                {booking.status === 'pending' && (
                  <div className="mt-8 flex justify-end">
                    <button
                      className="text-red-600 hover:text-red-800 font-medium"
                      onClick={() => {
                        // TODO: Implement cancel booking
                      }}
                    >
                      Cancel Booking
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
} 