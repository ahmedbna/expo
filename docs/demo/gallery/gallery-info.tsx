// registry/examples/gallery/gallery-info.tsx
import { Gallery, GalleryItem } from '@/components/ui/gallery';
import React from 'react';

const infoImages: GalleryItem[] = [
  {
    id: '1',
    uri: 'https://picsum.photos/400/400?random=21',
    title: 'Sunrise Over Mountains',
    description:
      'Golden hour light illuminating the peaks with warm colors and dramatic shadows.',
  },
  {
    id: '2',
    uri: 'https://picsum.photos/400/400?random=22',
    title: 'Ancient Architecture',
    description:
      'Historical building showcasing intricate stonework and timeless design.',
  },
  {
    id: '3',
    uri: 'https://picsum.photos/400/400?random=23',
    title: 'Tropical Paradise',
    description: 'Crystal clear waters meeting pristine white sand beaches.',
  },
  {
    id: '4',
    uri: 'https://picsum.photos/400/400?random=24',
    title: 'Urban Street Art',
    description: 'Vibrant mural expressing creativity and cultural identity.',
  },
  {
    id: '5',
    uri: 'https://picsum.photos/400/400?random=25',
    title: 'Misty Forest',
    description:
      'Ethereal fog weaving through tall pine trees in early morning.',
  },
  {
    id: '6',
    uri: 'https://picsum.photos/400/400?random=26',
    title: 'Starry Night Sky',
    description:
      'Millions of stars visible in the clear dark sky away from city lights.',
  },
];

export function GalleryInfo() {
  return (
    <Gallery
      items={infoImages}
      columns={2}
      spacing={16}
      borderRadius={12}
      aspectRatio={1}
      showTitles={true}
      showDescriptions={true}
      showPages={true}
      enableFullscreen={true}
      enableZoom={true}
    />
  );
}
