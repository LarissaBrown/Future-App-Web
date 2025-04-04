import { useState, useEffect } from 'react';
import { 
  VenueImage, 
  GalleryImage, 
  HeadshotImage, 
  PerformanceImage 
} from '@/types/artist';

interface UseArtistImagesProps {
  artistId: string;
}

export function useArtistImages({ artistId }: UseArtistImagesProps) {
  const [venueImages, setVenueImages] = useState<VenueImage[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [headshotImages, setHeadshotImages] = useState<HeadshotImage[]>([]);
  const [performanceImages, setPerformanceImages] = useState<PerformanceImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchImages();
  }, [artistId]);

  const fetchImages = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [venueRes, galleryRes, headshotRes, performanceRes] = await Promise.all([
        fetch(`/api/artists/${artistId}/images?type=venue`),
        fetch(`/api/artists/${artistId}/images?type=gallery`),
        fetch(`/api/artists/${artistId}/images?type=headshot`),
        fetch(`/api/artists/${artistId}/images?type=performance`)
      ]);

      if (!venueRes.ok || !galleryRes.ok || !headshotRes.ok || !performanceRes.ok) {
        throw new Error('Failed to fetch images');
      }

      const [venueData, galleryData, headshotData, performanceData] = await Promise.all([
        venueRes.json(),
        galleryRes.json(),
        headshotRes.json(),
        performanceRes.json()
      ]);

      setVenueImages(venueData);
      setGalleryImages(galleryData);
      setHeadshotImages(headshotData);
      setPerformanceImages(performanceData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImage = async (
    file: File,
    type: 'venue' | 'gallery' | 'headshot' | 'performance',
    metadata: any
  ) => {
    try {
      setError(null);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);
      formData.append('metadata', JSON.stringify(metadata));

      const response = await fetch(`/api/artists/${artistId}/images`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const newImage = await response.json();

      // Update appropriate state
      switch (type) {
        case 'venue':
          setVenueImages(prev => [...prev, newImage]);
          break;
        case 'gallery':
          setGalleryImages(prev => [...prev, newImage]);
          break;
        case 'headshot':
          setHeadshotImages(prev => [...prev, newImage]);
          break;
        case 'performance':
          setPerformanceImages(prev => [...prev, newImage]);
          break;
      }

      return newImage;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const deleteImage = async (
    imageId: string,
    type: 'venue' | 'gallery' | 'headshot' | 'performance'
  ) => {
    try {
      setError(null);

      const response = await fetch(
        `/api/artists/${artistId}/images?imageId=${imageId}&type=${type}`,
        { method: 'DELETE' }
      );

      if (!response.ok) {
        throw new Error('Failed to delete image');
      }

      // Update appropriate state
      switch (type) {
        case 'venue':
          setVenueImages(prev => prev.filter(img => img.id !== imageId));
          break;
        case 'gallery':
          setGalleryImages(prev => prev.filter(img => img.id !== imageId));
          break;
        case 'headshot':
          setHeadshotImages(prev => prev.filter(img => img.id !== imageId));
          break;
        case 'performance':
          setPerformanceImages(prev => prev.filter(img => img.id !== imageId));
          break;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const updateImage = async (
    imageId: string,
    type: 'venue' | 'gallery' | 'headshot' | 'performance',
    updates: any
  ) => {
    try {
      setError(null);

      const response = await fetch(`/api/artists/${artistId}/images`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ imageId, type, updates })
      });

      if (!response.ok) {
        throw new Error('Failed to update image');
      }

      const updatedImage = await response.json();

      // Update appropriate state
      switch (type) {
        case 'venue':
          setVenueImages(prev => 
            prev.map(img => img.id === imageId ? updatedImage : img)
          );
          break;
        case 'gallery':
          setGalleryImages(prev => 
            prev.map(img => img.id === imageId ? updatedImage : img)
          );
          break;
        case 'headshot':
          setHeadshotImages(prev => 
            prev.map(img => img.id === imageId ? updatedImage : img)
          );
          break;
        case 'performance':
          setPerformanceImages(prev => 
            prev.map(img => img.id === imageId ? updatedImage : img)
          );
          break;
      }

      return updatedImage;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  return {
    venueImages,
    galleryImages,
    headshotImages,
    performanceImages,
    isLoading,
    error,
    uploadImage,
    deleteImage,
    updateImage,
    refreshImages: fetchImages
  };
} 