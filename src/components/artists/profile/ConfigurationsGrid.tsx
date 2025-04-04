'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Configuration } from '@/types/artist';
import { MusicalNoteIcon } from '@heroicons/react/24/outline';

interface ConfigurationsGridProps {
  configurations: Configuration[];
}

export default function ConfigurationsGrid({ configurations = [] }: ConfigurationsGridProps) {
  if (!configurations || configurations.length === 0) {
    return null;
  }

  // Get configuration image based on type
  const getConfigImage = (config: Configuration) => {
    // Map configuration types to local image paths
    const configImages: Record<string, string> = {
      'Solo Performance': '/images/artists/tianna-hall/gallery/solo.jpg',
      'Duo Performance': '/images/artists/tianna-hall/gallery/duo1.jpg',
      'Trio Performance': '/images/artists/tianna-hall/gallery/trio.jpg',
      'Quartet Performance': '/images/artists/tianna-hall/gallery/quartet.jpg',
      'Full Band': '/images/artists/tianna-hall/gallery/full-band-wedding-dance.jpg',
      'Acoustic Set': '/images/artists/tianna-hall/gallery/casual.jpg',
      'DJ Set': '/images/artists/tianna-hall/gallery/duo2.jpg',
      'Custom Arrangement': '/images/artists/tianna-hall/gallery/full-band-wedding-dance.jpg'
    };
    
    return configImages[config.type] || '/images/configurations/default.jpg';
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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl font-bold text-primary mb-2">Performance Options</h2>
          <p className="text-gray-600 mb-12">Choose the perfect configuration for your event</p>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {configurations.map((config, index) => (
              <motion.div
                key={`${config.type}-${index}`}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="h-48 relative">
                  <Image
                    src={getConfigImage(config)}
                    alt={config.type}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 3}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-semibold text-white">{config.type}</h3>
                    <div className="flex items-center mt-2">
                      <MusicalNoteIcon className="w-4 h-4 text-white mr-1" />
                      <span className="text-white text-sm">{config.instruments?.length || 0} Musicians</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 mb-4">{config.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-semibold">${config.price}</span>
                    <span className="text-sm text-gray-500">{config.duration} minutes</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

