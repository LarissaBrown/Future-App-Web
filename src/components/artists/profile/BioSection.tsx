'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { MusicalNoteIcon, TrophyIcon } from '@heroicons/react/24/outline';

interface BioSectionProps {
  bio: string;
  experience: {
    years: number;
    performances: number;
    venues: number;
  };
  achievements: string[];
  specialties: string[];
}

export default function BioSection({ 
  bio = '', 
  experience = { years: 0, performances: 0, venues: 0 }, 
  achievements = [], 
  specialties = [] 
}: BioSectionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-12"
        >
          {/* Main Bio */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-primary mb-6">About the Artist</h2>
            <p className="text-gray-700 leading-relaxed mb-8">{bio}</p>
            
            {/* Experience Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <div className="text-3xl font-bold text-primary mb-1">{experience.years}+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <div className="text-3xl font-bold text-primary mb-1">{experience.performances}+</div>
                <div className="text-sm text-gray-600">Performances</div>
              </div>
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <div className="text-3xl font-bold text-primary mb-1">{experience.venues}+</div>
                <div className="text-sm text-gray-600">Unique Venues</div>
              </div>
            </div>
          </div>

          {/* Specialties & Achievements */}
          <div>
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-primary mb-4">Specialties</h3>
              <ul className="space-y-3">
                {specialties.map((specialty, index) => (
                  <li key={index} className="flex items-center">
                    <MusicalNoteIcon className="w-5 h-5 text-secondary mr-2" />
                    <span className="text-gray-700">{specialty}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-primary mb-4">Achievements</h3>
              <ul className="space-y-3">
                {achievements.map((achievement, index) => (
                  <li key={index} className="flex items-center">
                    <TrophyIcon className="w-5 h-5 text-secondary mr-2" />
                    <span className="text-gray-700">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
