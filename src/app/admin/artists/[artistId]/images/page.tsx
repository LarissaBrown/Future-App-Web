'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import ArtistImageManager from '@/components/admin/ArtistImageManager';
import { useArtistImages } from '@/hooks/useArtistImages';

export default function ArtistImagesPage() {
  const params = useParams();
  const artistId = params.artistId as string;

  const {
    venueImages,
    galleryImages,
    headshotImages,
    performanceImages,
    isLoading,
    error,
    uploadImage,
    deleteImage,
    updateImage
  } = useArtistImages({ artistId });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading images...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <ArtistImageManager
          artistId={artistId}
          venueImages={venueImages}
          galleryImages={galleryImages}
          headshotImages={headshotImages}
          performanceImages={performanceImages}
          onImageUpload={uploadImage}
          onImageDelete={deleteImage}
          onImageUpdate={updateImage}
        />
      </div>
    </div>
  );
} 