'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  BuildingOffice2Icon, 
  HeartIcon, 
  GlobeAmericasIcon,
  SparklesIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { Venue } from '@/types/artist';

interface VenueExperienceProps {
  venues: Venue[];
  featuredVenues?: string[];
}

export default function VenueExperience({ venues = [], featuredVenues = [] }: VenueExperienceProps) {
  if (!venues || venues.length === 0) {
    return null;
  }

  // Group venues by type
  const venueTypes = venues.reduce((acc, venue) => {
    if (!acc[venue.type]) {
      acc[venue.type] = [];
    }
    acc[venue.type].push(venue);
    return acc;
  }, {} as Record<string, Venue[]>);

  // Get featured venue images
  const getVenueImage = (venueName: string) => {
    // Map venue names to image URLs
    const venueImages: Record<string, string> = {
      'The Grand Ballroom': 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'Skyline Rooftop': 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'The Garden Pavilion': 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'The Historic Mansion': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'The Modern Loft': 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'The Beach Club': 'https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'The Country Club': 'https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'The Art Gallery': 'https://images.unsplash.com/photo-1577083552431-6e5fd01988d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'The Wine Cellar': 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'The Rooftop Lounge': 'https://images.unsplash.com/photo-1517248135467-4c7ecad25c4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'The Jazz Club': 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'The Opera House': 'https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'The Concert Hall': 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'The Outdoor Amphitheater': 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'The Private Estate': 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    };
    
    return venueImages[venueName] || '/images/venues/default.jpg';
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl font-bold text-primary mb-2">Venue Experience</h2>
          <p className="text-gray-600 mb-12">Where I&apos;ve performed and what I can bring to your venue</p>

          {/* Venue Types */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {Object.entries(venueTypes).map(([type, venuesOfType], index) => (
              <motion.div
                key={type}
                variants={itemVariants}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  <BuildingOffice2Icon className="w-6 h-6 text-primary mr-3" />
                  <h3 className="text-xl font-semibold text-primary">{type}</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  {venuesOfType.length} {venuesOfType.length === 1 ? 'performance' : 'performances'}
                </p>
                <div className="flex items-center text-secondary">
                  <HeartIcon className="w-5 h-5 mr-2" />
                  <span className="font-medium">Top Rated</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Featured Venues */}
          {featuredVenues && featuredVenues.length > 0 && (
            <motion.div 
              className="mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="text-2xl font-semibold text-primary mb-6">Featured Venues</h3>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                {featuredVenues.map((venueName, index) => (
                  <motion.div
                    key={venueName}
                    variants={itemVariants}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <div className="h-48 relative">
                      <Image
                        src={getVenueImage(venueName)}
                        alt={venueName}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index < 3}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h4 className="text-xl font-semibold text-white">{venueName}</h4>
                        <div className="flex items-center mt-2">
                          <GlobeAmericasIcon className="w-4 h-4 text-white mr-1" />
                          <span className="text-white text-sm">Featured Venue</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <SparklesIcon className="w-5 h-5 text-secondary mr-1" />
                          <span className="text-sm font-medium text-gray-700">Premium Venue</span>
                        </div>
                        <div className="flex items-center">
                          <StarIcon className="w-5 h-5 text-secondary mr-1" />
                          <span className="text-sm font-medium text-gray-700">Top Rated</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
