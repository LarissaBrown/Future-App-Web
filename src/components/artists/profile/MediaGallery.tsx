import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { PlayIcon, PhotoIcon } from '@heroicons/react/24/solid';

interface Media {
  type: 'image' | 'video';
  url: string;
  thumbnail: string;
  title: string;
}

interface MediaGalleryProps {
  media: Media[];
}

export default function MediaGallery({ media = [] }: MediaGalleryProps) {
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

  if (!media || media.length === 0) {
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
          <h2 className="text-3xl font-bold text-primary mb-6">Media Gallery</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {media.map((item, index) => (
              <motion.div
                key={item.url}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative aspect-video cursor-pointer group"
                onClick={() => setSelectedMedia(item)}
              >
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors rounded-lg flex items-center justify-center">
                  {item.type === 'video' ? (
                    <PlayIcon className="w-12 h-12 text-white opacity-75 group-hover:opacity-100 transition-opacity" />
                  ) : (
                    <PhotoIcon className="w-8 h-8 text-white opacity-75 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Modal for selected media */}
          {selectedMedia && (
            <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
              <div className="relative w-full max-w-4xl aspect-video">
                {selectedMedia.type === 'video' ? (
                  <video
                    src={selectedMedia.url}
                    controls
                    className="w-full h-full rounded-lg"
                  />
                ) : (
                  <Image
                    src={selectedMedia.url}
                    alt={selectedMedia.title}
                    fill
                    className="object-contain rounded-lg"
                  />
                )}
                <button
                  onClick={() => setSelectedMedia(null)}
                  className="absolute top-4 right-4 text-white hover:text-gray-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
} 