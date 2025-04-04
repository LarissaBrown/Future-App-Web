'use client';
import React from 'react';
import Image from 'next/image';
import { CheckBadgeIcon, StarIcon } from '@heroicons/react/24/solid';

interface HeroSectionProps {
  name: string;
  title: string;
  heroImage: string;
  headshot: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  genres?: string[];
}

function HeroSection(props: HeroSectionProps) {
  const {
    name,
    title,
    heroImage,
    headshot,
    rating,
    reviewCount,
    isVerified,
    //genres = []
  } = props;

  return (
    <section className="relative h-[80vh] min-h-[600px] w-full">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt={`${name} performing`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/60 to-primary" />
      </div>

      <div className="relative z-10 container mx-auto h-full flex items-end pb-20 px-4">
        <div className="flex flex-col md:flex-row items-end gap-8">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white">
            <Image
              src={headshot}
              alt={name}
              width={160}
              height={160}
              className="object-cover"
            />
          </div>

          <div className="text-white">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-5xl font-bold">{name}</h1>
              {isVerified && (
                <CheckBadgeIcon className="w-8 h-8 text-secondary" />
              )}
            </div>
            <h2 className="text-2xl text-secondary mb-4">{title}</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(rating)
                          ? 'text-yellow-400'
                          : 'text-gray-400'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-white/80">
                  {rating.toFixed(1)} ({reviewCount} reviews)
                </span>
              </div>
              <button className="bg-secondary hover:bg-secondary-light px-6 py-2 rounded-full transition-colors">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
