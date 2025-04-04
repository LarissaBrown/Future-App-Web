import { Configuration, Venue, Requirement } from '@/types/artist';
import HeroSection from '@/components/artists/profile/HeroSection';
import BioSection from '@/components/artists/profile/BioSection';
import ConfigurationsGrid from '@/components/artists/profile/ConfigurationsGrid';
import VenueExperience from '@/components/artists/profile/VenueExperience';
import RequirementsList from '@/components/artists/profile/RequirementsList';
import BookingForm from '@/components/artists/profile/BookingForm';
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

  // Ensure configurations have all required fields
  const configurations = (artist.configurations || []).map(config => ({
    ...config,
    id: config.id || `config-${config.type.toLowerCase().replace(/\s+/g, '-')}`,
    price: config.price || config.minPrice || 0,
    includes: config.includes || [],
    duration: config.duration || '2-3 hours',
    image: config.image || '/images/configurations/default.jpg'
  })) as Configuration[];

  return (
    <main className="min-h-screen bg-white relative">
      <QuickNav 
        sections={[
          { id: 'bio', label: 'About' },
          { id: 'configurations', label: 'Packages' },
          { id: 'venues', label: 'Experience' },
          { id: 'requirements', label: 'Requirements' },
          { id: 'booking', label: 'Book Now' }
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
            configurations={configurations}
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

        <div id="booking" className="bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <BookingForm 
                artistId={artistId}
                artistName={artist.name}
                configurations={configurations}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
