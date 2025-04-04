'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Configuration } from '@/types/artist';

interface BookingFormProps {
  artistId: string;
  artistName: string;
  configurations: Configuration[];
}

export default function BookingForm({ artistId, artistName, configurations }: BookingFormProps) {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  
  const [selectedConfig, setSelectedConfig] = useState<string>('');
  const [eventDate, setEventDate] = useState<string>('');
  const [eventTime, setEventTime] = useState<string>('');
  const [eventType, setEventType] = useState<string>('');
  const [venueName, setVenueName] = useState<string>('');
  const [venueAddress, setVenueAddress] = useState<string>('');
  const [guestCount, setGuestCount] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      // Redirect to login with return URL
      router.push(`/login?redirect=/artists/${artistId}?booking=true`);
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // In a real app, this would send the booking request to the server
      console.log('Booking submitted:', {
        artistId,
        artistName,
        configuration: selectedConfig,
        eventDate,
        eventTime,
        eventType,
        venueName,
        venueAddress,
        guestCount,
        message,
        clientId: user?.id,
        clientName: user?.name,
        clientEmail: user?.email,
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to confirmation page
      router.push('/dashboard/bookings/confirmation');
    } catch {
      setError('Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Book {artistName}</h2>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Configuration Selection */}
        <div>
          <label htmlFor="configuration" className="block text-sm font-medium text-gray-700 mb-1">
            Performance Type
          </label>
          <select
            id="configuration"
            name="configuration"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
            value={selectedConfig}
            onChange={(e) => setSelectedConfig(e.target.value)}
            required
          >
            <option value="">Select a performance type</option>
            {configurations.map((config) => (
              <option key={config.id} value={config.id}>
                {config.type} - ${config.price}
              </option>
            ))}
          </select>
        </div>
        
        {/* Event Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-1">
              Event Date
            </label>
            <input
              type="date"
              id="eventDate"
              name="eventDate"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="eventTime" className="block text-sm font-medium text-gray-700 mb-1">
              Event Time
            </label>
            <input
              type="time"
              id="eventTime"
              name="eventTime"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
              required
            />
          </div>
        </div>
        
        {/* Event Type */}
        <div>
          <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-1">
            Event Type
          </label>
          <select
            id="eventType"
            name="eventType"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            required
          >
            <option value="">Select event type</option>
            <option value="wedding">Wedding</option>
            <option value="corporate">Corporate Event</option>
            <option value="birthday">Birthday Party</option>
            <option value="anniversary">Anniversary</option>
            <option value="holiday">Holiday Party</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        {/* Venue Information */}
        <div>
          <label htmlFor="venueName" className="block text-sm font-medium text-gray-700 mb-1">
            Venue Name
          </label>
          <input
            type="text"
            id="venueName"
            name="venueName"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="Enter venue name"
            value={venueName}
            onChange={(e) => setVenueName(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="venueAddress" className="block text-sm font-medium text-gray-700 mb-1">
            Venue Address
          </label>
          <textarea
            id="venueAddress"
            name="venueAddress"
            rows={2}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="Enter venue address"
            value={venueAddress}
            onChange={(e) => setVenueAddress(e.target.value)}
            required
          />
        </div>
        
        {/* Guest Count */}
        <div>
          <label htmlFor="guestCount" className="block text-sm font-medium text-gray-700 mb-1">
            Number of Guests
          </label>
          <input
            type="number"
            id="guestCount"
            name="guestCount"
            min="1"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="Enter number of guests"
            value={guestCount}
            onChange={(e) => setGuestCount(e.target.value)}
            required
          />
        </div>
        
        {/* Additional Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Additional Information
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="Any special requests or information about your event"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        
        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {isSubmitting ? 'Submitting...' : 'Request Booking'}
          </button>
        </div>
        
        {!isAuthenticated && (
          <p className="text-sm text-gray-500 text-center">
            You will need to sign in or create an account to complete your booking.
          </p>
        )}
      </form>
    </div>
  );
} 