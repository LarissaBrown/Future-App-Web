import React from 'react';
import { motion } from 'framer-motion';
import { Configuration } from '@/types/artist';
import { MusicalNoteIcon, UserGroupIcon } from '@heroicons/react/24/outline';

interface ArtistInfoProps {
  bio: string;
  genres: string[];
  configurations: Configuration[];
  venues: {
    type: string;
    count: number;
  }[];
}

export default function ArtistInfo({ bio, genres, configurations, venues }: ArtistInfoProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-primary mb-6">About</h2>
            <p className="text-gray-700 leading-relaxed mb-8">{bio}</p>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {genres.map((genre) => (
                    <span
                      key={genre}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      <MusicalNoteIcon className="w-4 h-4 inline-block mr-1" />
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Performance Types</h3>
                <div className="space-y-2">
                  {configurations.map((config) => (
                    <div key={config.type} className="flex items-center text-gray-700">
                      <UserGroupIcon className="w-5 h-5 text-primary mr-2" />
                      {config.type}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Venue Experience</h3>
            <div className="space-y-4">
              {venues.map((venue) => (
                <div key={venue.type} className="flex justify-between items-center">
                  <span className="text-gray-700">{venue.type}</span>
                  <span className="text-primary font-semibold">{venue.count}+</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 