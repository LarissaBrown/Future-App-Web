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
  }

export interface Configuration {
  type: string;
  description: string;
  minPrice: number;
  maxPrice: number;
  duration: string;
  includes: string[];
  image: string;
  negotiable?: boolean;
  customQuotes?: PriceQuote[];
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