'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  PhotoIcon,
  TrashIcon,
  PencilIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { 
  VenueImage, 
  GalleryImage, 
  HeadshotImage, 
  PerformanceImage 
} from '@/types/artist';

interface ArtistImageManagerProps {
  artistId: string;
  venueImages: VenueImage[];
  galleryImages: GalleryImage[];
  headshotImages: HeadshotImage[];
  performanceImages: PerformanceImage[];
  onImageUpload: (file: File, type: 'venue' | 'gallery' | 'headshot' | 'performance', metadata?: any) => Promise<void>;
  onImageDelete: (imageId: string, type: 'venue' | 'gallery' | 'headshot' | 'performance') => Promise<void>;
  onImageUpdate: (imageId: string, type: 'venue' | 'gallery' | 'headshot' | 'performance', updates: any) => Promise<void>;
}

export default function ArtistImageManager({
  artistId,
  venueImages,
  galleryImages,
  headshotImages,
  performanceImages,
  onImageUpload,
  onImageDelete,
  onImageUpdate
}: ArtistImageManagerProps) {
  const [activeTab, setActiveTab] = useState<'venue' | 'gallery' | 'headshot' | 'performance'>('venue');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: 'venue' | 'gallery' | 'headshot' | 'performance') => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        let metadata = {};

        switch (type) {
          case 'venue':
            metadata = {
              venueName: prompt('Enter venue name:') || 'Unknown Venue',
              description: prompt('Enter venue description (optional):'),
              isDefault: false
            };
            break;
          case 'gallery':
            metadata = {
              description: prompt('Enter image description (optional):'),
              category: prompt('Enter category (performance/behind-the-scenes/venue/other):') as GalleryImage['category']
            };
            break;
          case 'headshot':
            metadata = {
              description: prompt('Enter image description (optional):'),
              isDefault: false
            };
            break;
          case 'performance':
            metadata = {
              description: prompt('Enter image description (optional):'),
              performanceType: prompt('Enter performance type:'),
              venue: prompt('Enter venue name (optional):'),
              date: prompt('Enter performance date (YYYY-MM-DD, optional):')
            };
            break;
        }

        await onImageUpload(file, type, metadata);
      }
    } catch (error) {
      console.error('Error uploading images:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const renderImageGrid = (images: (VenueImage | GalleryImage | HeadshotImage | PerformanceImage)[], type: string) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative group bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="aspect-w-16 aspect-h-9 relative">
              <Image
                src={image.imagePath}
                alt={image.description || 'Artist image'}
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300">
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onImageDelete(image.id, type as any)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      const updates = {
                        description: prompt('Enter new description:', image.description),
                        ...(type === 'venue' && { venueName: prompt('Enter new venue name:', (image as VenueImage).venueName) }),
                        ...(type === 'gallery' && { category: prompt('Enter new category:', (image as GalleryImage).category) }),
                        ...(type === 'performance' && { 
                          performanceType: prompt('Enter new performance type:', (image as PerformanceImage).performanceType),
                          venue: prompt('Enter new venue name:', (image as PerformanceImage).venue),
                          date: prompt('Enter new date:', (image as PerformanceImage).date?.toISOString().split('T')[0])
                        })
                      };
                      onImageUpdate(image.id, type as any, updates);
                    }}
                    className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  {(type === 'venue' || type === 'headshot') && (
                    <button
                      onClick={() => onImageUpdate(image.id, type as any, { isDefault: true })}
                      className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors"
                    >
                      <StarIcon className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-primary mb-6">Image Manager</h2>
      
      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        {(['venue', 'gallery', 'headshot', 'performance'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === tab
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} Images
          </button>
        ))}
      </div>

      {/* Upload Section */}
      <div className="mb-8">
        <label className="block">
          <span className="sr-only">Choose images to upload</span>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-primary transition-colors cursor-pointer">
            <div className="space-y-1 text-center">
              <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none">
                  <span>Upload images</span>
                  <input
                    type="file"
                    className="sr-only"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, activeTab)}
                    disabled={isUploading}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </label>
      </div>

      {/* Image Grid */}
      <div className="mt-6">
        {activeTab === 'venue' && renderImageGrid(venueImages, 'venue')}
        {activeTab === 'gallery' && renderImageGrid(galleryImages, 'gallery')}
        {activeTab === 'headshot' && renderImageGrid(headshotImages, 'headshot')}
        {activeTab === 'performance' && renderImageGrid(performanceImages, 'performance')}
      </div>
    </div>
  );
} 