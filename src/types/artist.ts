// src/types/artist.ts
export interface ArtistProfile {
    id: string;
    name: string;
    title: string;
    genres: string[];
    location: string;
    bio: string;
    isVerified: boolean;
    rating: number;
    reviewCount: number;
    images: {
      hero: string;
      gallery: string[];
      headshot: string;
    };
    configurations: Configuration[];
    venues: string[];
    media: {
      photos: {
        url: string;
        alt: string;
        caption?: string;
      }[];
      videos: {
        url: string;
        thumbnail: string;
        title: string;
      }[];
      audio: {
        url: string;
        title: string;
        duration: string;
      }[];
    };
    availability: {
      dates: Date[];
      timeSlots: string[];
    };
    technicalNotes?: string;
    reviews: {
      rating: number;
      comment: string;
      author: string;
      date: string;
      eventType: string;
      verified: boolean;
    }[];
    experience: string[];
    achievements: string[];
    specialties: string[];
    heroImage: string;
    headshot: string;
    venueExperience: Venue[];
    featuredVenues: string[];
    venueImages: VenueImage[];
    galleryImages: GalleryImage[];
    headshotImages: HeadshotImage[];
    performanceImages: PerformanceImage[];
  }

export interface Configuration {
  id: string;
  type: string;
  description: string;
  minPrice: number;
  maxPrice: number;
  price?: number;
  duration: string;
  includes: string[];
  image: string;
  instruments?: string[];
}

export interface PriceQuote {
  amount: number;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  timestamp: Date;
  from: 'artist' | 'client';
}

export interface Venue {
  type: string;
  description: string;
  count: number;
  icon: 'corporate' | 'wedding' | 'international' | 'special';
}

export interface Requirement {
  category: string;
  icon: 'audio' | 'stage' | 'setup' | 'timing';
  items: string[];
}

export interface Media {
  type: 'image' | 'video';
  url: string;
  thumbnail: string;
  title: string;
}

export interface VenueImage {
  id: string;
  venueName: string;
  imagePath: string;
  description?: string;
  uploadDate: Date;
  isDefault?: boolean;
}

export interface GalleryImage {
  id: string;
  imagePath: string;
  description?: string;
  uploadDate: Date;
  category: 'performance' | 'behind-the-scenes' | 'venue' | 'other';
}

export interface HeadshotImage {
  id: string;
  imagePath: string;
  description?: string;
  uploadDate: Date;
  isDefault?: boolean;
}

export interface PerformanceImage {
  id: string;
  imagePath: string;
  description?: string;
  uploadDate: Date;
  performanceType: string;
  venue?: string;
  date?: Date;
}