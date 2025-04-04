'use client';
import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function ClientDashboard() {
  const { user } = useAuth();

  return (
    <ProtectedRoute allowedRoles={['client']}>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white shadow rounded-lg p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Welcome, {user?.name}</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* My Bookings Card */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">My Bookings</h2>
                  <p className="text-gray-600 mb-4">View and manage your upcoming and past bookings.</p>
                  <Link 
                    href="/dashboard/bookings" 
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark"
                  >
                    View Bookings
                  </Link>
                </div>
                
                {/* Browse Artists Card */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Browse Artists</h2>
                  <p className="text-gray-600 mb-4">Find and book talented artists for your next event.</p>
                  <Link 
                    href="/artists" 
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark"
                  >
                    Browse Artists
                  </Link>
                </div>
                
                {/* My Profile Card */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">My Profile</h2>
                  <p className="text-gray-600 mb-4">Update your profile information and preferences.</p>
                  <Link 
                    href="/dashboard/profile" 
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark"
                  >
                    Edit Profile
                  </Link>
                </div>
              </div>
              
              {/* Recent Activity Section */}
              <div className="mt-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-600">You haven&apos;t made any bookings yet.</p>
                  <Link 
                    href="/artists" 
                    className="inline-flex items-center mt-2 text-sm font-medium text-primary hover:text-primary-dark"
                  >
                    Browse artists to get started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 