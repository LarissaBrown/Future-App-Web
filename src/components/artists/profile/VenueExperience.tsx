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
    // Map venue names to local image paths
    const venueImages: Record<string, string> = {
      'Wortham Theater': '/images/artists/tianna-hall/venues/wortham-theater.jpg',
      'Houston Symphony Hall': '/images/artists/tianna-hall/venues/houston-symphony-hall.jpg',
      'River Oaks Country Club': '/images/artists/tianna-hall/venues/river-oaks-country-club.jpg',
      'Four Seasons Hotel Houston': '/images/artists/tianna-hall/venues/four-seasons-houston.jpg',
      'Museum of Fine Arts Houston': '/images/artists/tianna-hall/venues/museum-of-fine-arts.jpg',
      'Rice University': '/images/artists/tianna-hall/venues/rice-university.jpg',
      'The Grand Ballroom at The Houstonian': '/images/artists/tianna-hall/venues/houstonian-grand-ballroom.jpg',
      'Skyline Rooftop at Post Oak Hotel': '/images/artists/tianna-hall/venues/post-oak-skyline.jpg',
      'The Garden Pavilion at River Oaks Country Club': '/images/artists/tianna-hall/venues/river-oaks-garden.jpg',
      'The Historic Mansion at Bayou Bend': '/images/artists/tianna-hall/venues/bayou-bend.jpg',
      'The Modern Loft at Market Square Tower': '/images/artists/tianna-hall/venues/market-square-tower.jpg',
      'The Beach Club at Galveston': '/images/artists/tianna-hall/venues/galveston-beach-club.jpg',
      'The Country Club at Champions Golf Club': '/images/artists/tianna-hall/venues/champions-golf-club.jpg',
      'The Art Gallery at Museum of Fine Arts': '/images/artists/tianna-hall/venues/mfa-gallery.jpg',
      'The Wine Cellar at Brennan\'s of Houston': '/images/artists/tianna-hall/venues/brennans-wine-cellar.jpg',
      'The Rooftop Lounge at The St. Regis Houston': '/images/artists/tianna-hall/venues/st-regis-rooftop.jpg',
      'The Jazz Club at The Heights Theater': '/images/artists/tianna-hall/venues/heights-theater.jpg',
      'The Opera House at Wortham Theater': '/images/artists/tianna-hall/venues/wortham-opera.jpg',
      'The Concert Hall at Jones Hall': '/images/artists/tianna-hall/venues/jones-hall.jpg',
      'The Outdoor Amphitheater at Miller Outdoor Theatre': '/images/artists/tianna-hall/venues/miller-outdoor.jpg',
      'The Private Estate at River Oaks': '/images/artists/tianna-hall/venues/river-oaks-estate.jpg'
    };
    
    return venueImages[venueName] || '/images/artists/tianna-hall/venues/default-venue.jpg';
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
            {Object.entries(venueTypes).map(([type, venuesOfType]) => (
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
                    key={`${venueName}-${index}`}
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
