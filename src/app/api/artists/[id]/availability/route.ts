import { NextResponse } from 'next/server';

interface AvailabilityData {
  date: string;
  available: boolean;
  timeSlots: string[];
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Replace with actual database query
    // For now, we'll generate mock availability data
    const today = new Date();
    const availability: AvailabilityData[] = Array.from({ length: 30 }, (_, i) => {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      
      // Randomly mark some dates as unavailable
      const available = Math.random() > 0.3;
      
      // Generate random time slots for available dates
      const timeSlots = available
        ? ['10:00', '14:00', '18:00', '20:00'].filter(() => Math.random() > 0.2)
        : [];

      return {
        date: date.toISOString().split('T')[0],
        available,
        timeSlots,
      };
    });

    return NextResponse.json(availability);
  } catch (error) {
    console.error('Failed to fetch availability:', error);
    return NextResponse.json(
      { error: 'Failed to fetch availability' },
      { status: 500 }
    );
  }
} 