// src/components/artists/ArtistProfile.tsx
interface ArtistProfile {
    id: string;
    name: string;
    title: string;
    genres: string[];
    location: string;
    bio: string;
    images: {
      hero: string;
      gallery: string[];
      headshot: string;
    };
    packages: {
      name: string;
      description: string;
      price: number;
      duration: string;
      includes: string[];
    }[];
    availability: {
      // Calendar availability data
    };
    reviews: {
      rating: number;
      comment: string;
      author: string;
      date: string;
      eventType: string;
    }[];
  }
  
  // Example mock data for Tianna:
  const tiannaProfile = {
    id: "tianna-hall",
    name: "Tianna Hall",
    title: "Jazz Vocalist & Bandleader",
    genres: ["Jazz", "Standards", "Swing", "Contemporary"],
    location: "Houston, TX",
    bio: "Award-winning jazz vocalist specializing in elegant entertainment for upscale events...",
    images: {
      hero: "/images/artists/tianna-hall/hero.jpg",
      gallery: [
        // Array of performance images
      ],
      headshot: "/images/artists/tianna-hall/headshot.jpg"
    },
    packages: [
      {
        name: "Solo Performance",
        description: "Intimate solo vocals with piano accompaniment",
        price: 1200,
        duration: "2 hours",
        includes: ["Professional sound system", "Elegant stage lighting", "Custom song list"]
      },
      // More package options...
    ]
  };