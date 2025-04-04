export const tiannaHallProfile = {
  name: "Tianna Hall",
  title: "Jazz Vocalist & Bandleader",
  heroImage: "/images/artists/tianna-hall/hero/beaded-dress.jpg", // The stunning blue beaded dress photo
  headshot: "/images/artists/tianna-hall/headshots/profile.jpg", // The dramatic B&W close-up
  rating: 5.0,
  reviewCount: 47,
  isVerified: true,
  genres: [
    "Jazz Standards",
    "Swing",
    "Contemporary Jazz",
    "Bossa Nova"
  ],
  bio: "Award-winning jazz vocalist bringing sophistication and timeless style to Houston's most prestigious venues and events. Specializing in jazz standards, contemporary arrangements, and unforgettable live performances.",
  configurations: [
    {
      type: "Solo Performance",
      description: "Intimate solo jazz vocals with backing tracks",
      minPrice: 500,
      maxPrice: 1000,
      duration: "2-3 hours",
      includes: ["Professional sound system", "Curated setlist", "Break music"],
      image: "/images/configurations/solo.jpg"
    },
    {
      type: "Jazz Duo",
      description: "Vocals with piano or guitar accompaniment",
      minPrice: 800,
      maxPrice: 1500,
      duration: "2-3 hours",
      includes: ["Two musicians", "Acoustic setup", "Customized song selection"],
      image: "/images/configurations/duo.jpg"
    },
    {
      type: "Jazz Trio",
      description: "Full jazz ensemble with vocals, piano, and bass",
      minPrice: 1200,
      maxPrice: 2000,
      duration: "3-4 hours",
      includes: ["Three musicians", "Full PA system", "Extended repertoire"],
      image: "/images/configurations/trio.jpg"
    },
    {
      type: "Full Band",
      description: "Complete jazz ensemble for the ultimate live experience",
      minPrice: 3500,
      maxPrice: 5000,
    }
  ],
  venues: [
    "Corporate Events",
    "Weddings",
    "Galas",
    "Private Parties",
    "Hotel Lounges",
    "Jazz Clubs"
  ],
  gallery: {
    performance: [
      {
        url: "/images/artists/tianna-hall/gallery/red-dress.jpg",
        alt: "Tianna Hall performing in a stunning red dress",
        caption: "Live at the Jazz Lounge"
      },
      {
        url: "/images/artists/tianna-hall/gallery/trio.jpg",
        alt: "Tianna Hall performing with her jazz trio",
        caption: "Jazz Trio Performance"
      },
      // Add more performance images
    ],
    events: [
      {
        url: "/images/artists/tianna-hall/gallery/group.jpg",
        alt: "Tianna Hall at a gala event",
        caption: "Annual Charity Gala"
      },
      // Add more event images
    ]
  },
  // Add sample repertoire
  repertoire: {
    jazzStandards: [
      "Fly Me to the Moon",
      "The Way You Look Tonight",
      "Misty",
      "All of Me"
    ],
    contemporary: [
      "At Last",
      "What a Wonderful World",
      "Dream a Little Dream"
    ]
  },
  experience: {
    years: 15,
    performances: 1200,
    venues: 150,
  },
  achievements: [
    "Houston Press Best Jazz Vocalist 2022",
    "Featured at Montreal Jazz Festival",
    "Regular performer at Houston's finest venues",
    "Collaborated with Grammy-winning artists"
  ],
  specialties: [
    "Jazz Standards & Swing",
    "Bossa Nova & Latin Jazz",
    "Contemporary Jazz Arrangements",
    "Custom Song Requests",
    "Multilingual Performances"
  ],
  venueExperience: [
    {
      type: "Corporate Events",
      description: "Fortune 500 company galas and product launches",
      count: 300,
      icon: "corporate"
    },
    {
      type: "Weddings",
      description: "Luxury wedding ceremonies and receptions",
      count: 250,
      icon: "wedding"
    },
    {
      type: "International",
      description: "Performances across North America and Europe",
      count: 50,
      icon: "international"
    },
    {
      type: "Special Events",
      description: "Music festivals and charity galas",
      count: 100,
      icon: "special"
    }
  ],
  featuredVenues: [
    "The Wortham Theater",
    "Houston Symphony Hall",
    "River Oaks Country Club",
    "Four Seasons Houston",
    "Museum of Fine Arts",
    "Rice University"
  ],
  requirements: [
    {
      category: "Audio Equipment",
      icon: "audio",
      items: [
        "Professional PA system for venues up to 500 guests",
        "Wireless microphone system (Shure or equivalent)",
        "Stage monitors for performers",
        "Mixing console with effects processing"
      ]
    },
    {
      category: "Stage Requirements",
      icon: "stage",
      items: [
        "Minimum stage size: 12' x 16'",
        "Proper stage lighting",
        "Access to power outlets",
        "Climate-controlled environment"
      ]
    },
    {
      category: "Setup Needs",
      icon: "setup",
      items: [
        "2-hour setup time before event",
        "Secure green room or changing area",
        "Easy load-in access",
        "On-site parking for performers"
      ]
    },
    {
      category: "Timing & Breaks",
      icon: "timing",
      items: [
        "3 x 45-minute sets standard",
        "15-minute breaks between sets",
        "Flexibility for special moments",
        "Overtime available upon request"
      ]
    }
  ],
  technicalNotes: "All equipment can be provided for an additional fee. For outdoor events, adequate coverage from elements must be provided. Special requirements may apply for larger venues or unique settings."
};

// We can add more artists here later
export const mockArtists = {
  "tianna-hall": tiannaHallProfile,
  // Add more artists as needed
};
