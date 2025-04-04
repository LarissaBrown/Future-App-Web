import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { 
  VenueImage, 
  GalleryImage, 
  HeadshotImage, 
  PerformanceImage 
} from '@/types/artist';

// This would typically come from your database
let venueImages: VenueImage[] = [];
let galleryImages: GalleryImage[] = [];
let headshotImages: HeadshotImage[] = [];
let performanceImages: PerformanceImage[] = [];

export async function POST(
  request: NextRequest,
  { params }: { params: { artistId: string } }
) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string;
    const metadata = JSON.parse(formData.get('metadata') as string);

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const filename = `${uuidv4()}-${file.name}`;
    const imagePath = `/images/artists/${params.artistId}/${type}/${filename}`;
    const fullPath = join(process.cwd(), 'public', imagePath);

    // Save file
    await writeFile(fullPath, buffer);

    // Create image record
    const imageRecord = {
      id: uuidv4(),
      imagePath,
      description: metadata.description,
      uploadDate: new Date(),
      ...metadata
    };

    // Add to appropriate collection
    switch (type) {
      case 'venue':
        venueImages.push(imageRecord as VenueImage);
        break;
      case 'gallery':
        galleryImages.push(imageRecord as GalleryImage);
        break;
      case 'headshot':
        headshotImages.push(imageRecord as HeadshotImage);
        break;
      case 'performance':
        performanceImages.push(imageRecord as PerformanceImage);
        break;
    }

    return NextResponse.json(imageRecord);
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { error: 'Error uploading image' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { artistId: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const imageId = searchParams.get('imageId');
    const type = searchParams.get('type');

    if (!imageId || !type) {
      return NextResponse.json(
        { error: 'Missing imageId or type' },
        { status: 400 }
      );
    }

    // Remove from appropriate collection
    switch (type) {
      case 'venue':
        venueImages = venueImages.filter(img => img.id !== imageId);
        break;
      case 'gallery':
        galleryImages = galleryImages.filter(img => img.id !== imageId);
        break;
      case 'headshot':
        headshotImages = headshotImages.filter(img => img.id !== imageId);
        break;
      case 'performance':
        performanceImages = performanceImages.filter(img => img.id !== imageId);
        break;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { error: 'Error deleting image' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { artistId: string } }
) {
  try {
    const { imageId, type, updates } = await request.json();

    if (!imageId || !type || !updates) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Update in appropriate collection
    let updatedImage;
    switch (type) {
      case 'venue':
        venueImages = venueImages.map(img => 
          img.id === imageId ? { ...img, ...updates } : img
        );
        updatedImage = venueImages.find(img => img.id === imageId);
        break;
      case 'gallery':
        galleryImages = galleryImages.map(img => 
          img.id === imageId ? { ...img, ...updates } : img
        );
        updatedImage = galleryImages.find(img => img.id === imageId);
        break;
      case 'headshot':
        headshotImages = headshotImages.map(img => 
          img.id === imageId ? { ...img, ...updates } : img
        );
        updatedImage = headshotImages.find(img => img.id === imageId);
        break;
      case 'performance':
        performanceImages = performanceImages.map(img => 
          img.id === imageId ? { ...img, ...updates } : img
        );
        updatedImage = performanceImages.find(img => img.id === imageId);
        break;
    }

    if (!updatedImage) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedImage);
  } catch (error) {
    console.error('Error updating image:', error);
    return NextResponse.json(
      { error: 'Error updating image' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { artistId: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (!type) {
      return NextResponse.json(
        { error: 'Missing type parameter' },
        { status: 400 }
      );
    }

    // Return appropriate collection
    switch (type) {
      case 'venue':
        return NextResponse.json(venueImages);
      case 'gallery':
        return NextResponse.json(galleryImages);
      case 'headshot':
        return NextResponse.json(headshotImages);
      case 'performance':
        return NextResponse.json(performanceImages);
      default:
        return NextResponse.json(
          { error: 'Invalid type' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json(
      { error: 'Error fetching images' },
      { status: 500 }
    );
  }
} 