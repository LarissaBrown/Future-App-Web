import { Configuration, Venue, Requirement } from '@/types/artist';
import HeroSection from '@/components/artists/profile/HeroSection';
import BioSection from '@/components/artists/profile/BioSection';
import ConfigurationsGrid from '@/components/artists/profile/ConfigurationsGrid';
import VenueExperience from '@/components/artists/profile/VenueExperience';
import RequirementsList from '@/components/artists/profile/RequirementsList';
import BookingSection from '@/components/artists/profile/BookingSection';
import QuickNav from '@/components/artists/profile/QuickNav';
import FloatingCTA from '@/components/artists/profile/FloatingCTA';
import { mockArtists } from '@/data/mock/artists';
import { notFound } from 'next/navigation';

interface ArtistProfilePageProps {
  params: {
    id: string;
  };
}

export default async function ArtistProfilePage({ params }: ArtistProfilePageProps) {
  const artistId = (await params.id) as keyof typeof mockArtists;
  const artist = mockArtists[artistId];

  if (!artist) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white relative">
      <QuickNav 
        sections={[
          { id: 'bio', label: 'About' },
          { id: 'configurations', label: 'Packages' },
          { id: 'venues', label: 'Experience' },
          { id: 'requirements', label: 'Requirements' }
        ]}
      />

      <FloatingCTA />

      <HeroSection 
        name={artist.name}
        title={artist.title}
        heroImage={artist.heroImage}
        headshot={artist.headshot}
        rating={artist.rating}
        reviewCount={artist.reviewCount}
        isVerified={artist.isVerified}
        genres={artist.genres}
      />

      <div className="relative z-10 bg-white">
        <div id="bio">
          <BioSection 
            bio={artist.bio}
            experience={artist.experience}
            achievements={artist.achievements || []}
            specialties={artist.specialties || []}
          />
        </div>

        <div id="configurations" className="bg-gradient-to-br from-primary/5 via-transparent to-secondary/5">
          <ConfigurationsGrid 
            configurations={(artist.configurations || []).map(config => ({
              ...config,
              includes: config.includes || [],
              duration: config.duration || '2-3 hours',
              image: config.image || '/images/configurations/default.jpg'
            })) as Configuration[]}
          />
        </div>

        <div id="venues">
          <VenueExperience 
            venues={(artist.venueExperience || []) as Venue[]}
            featuredVenues={artist.featuredVenues || []}
          />
        </div>

        <div id="requirements" className="bg-gradient-to-br from-primary/5 via-transparent to-secondary/5">
          <RequirementsList 
            requirements={(artist.requirements || []) as Requirement[]}
            additionalNotes={artist.technicalNotes}
          />
        </div>

        <div id="booking" className="bg-gradient-to-br from-primary/5 via-transparent to-secondary/5">
          <BookingSection 
            configurations={(artist.configurations || []) as Configuration[]}
            artistName={artist.name}
          />
        </div>
      </div>
    </main>
  );
}
