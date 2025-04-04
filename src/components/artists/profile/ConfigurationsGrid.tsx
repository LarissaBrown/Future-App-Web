'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MusicalNoteIcon, ClockIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { Configuration } from '@/types/artist';

interface ConfigurationsGridProps {
  configurations: Configuration[];
}

export default function ConfigurationsGrid({ configurations = [] }: ConfigurationsGridProps) {
  if (!configurations || configurations.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-primary mb-2">Performance Options</h2>
          <p className="text-gray-600 mb-12">Select the perfect musical arrangement for your event</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {configurations.map((config, index) => (
              <motion.div
                key={config.type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-48 relative">
                  <Image
                    src={config.image || '/images/configurations/default.jpg'}
                    alt={config.type}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    priority={index < 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 text-xl font-semibold text-white">
                    {config.type}
                  </h3>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-4">{config.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-700">
                      <CurrencyDollarIcon className="w-5 h-5 text-secondary mr-2" />
                      <span>${config.minPrice} - ${config.maxPrice}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <ClockIcon className="w-5 h-5 text-secondary mr-2" />
                      <span>{config.duration}</span>
                    </div>
                  </div>

                  {config.includes && config.includes.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-semibold text-primary mb-2">Includes:</h4>
                      <ul className="space-y-2">
                        {config.includes.map((item, i) => (
                          <li key={i} className="flex items-center text-sm text-gray-600">
                            <MusicalNoteIcon className="w-4 h-4 text-secondary mr-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button className="w-full mt-6 bg-secondary hover:bg-secondary-light text-white py-2 rounded-lg transition-colors">
                    Select Package
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

