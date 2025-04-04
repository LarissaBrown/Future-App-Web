// src/components/artists/ArtistProfilePage.tsx
import { ArtistProfile } from '@/types/artist';
import HeroSection from './profile/HeroSection';
import ArtistInfo from './profile/ArtistInfo';
import MediaGallery from './profile/MediaGallery';
import BookingSection from './profile/BookingSection';

interface ArtistProfilePageProps {
  artist: ArtistProfile;
}

export const ArtistProfilePage = ({ artist }: ArtistProfilePageProps) => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection
        name={artist.name}
        title={artist.title}
        heroImage={artist.images.hero}
        headshot={artist.images.headshot}
        rating={artist.rating}
        reviewCount={artist.reviewCount}
        isVerified={artist.isVerified}
      />
      
      <ArtistInfo
        bio={artist.bio}
        genres={artist.genres}
        configurations={artist.configurations}
        venues={artist.venues.map(venue => ({
          type: venue,
          count: 0
        }))}
      />
      
      <MediaGallery media={[artist.media]} />
      
      <BookingSection
        configurations={artist.configurations}
        availability={artist.availability}
      />
    </div>
  );
};
