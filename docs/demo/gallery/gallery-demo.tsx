// registry/examples/gallery/gallery-demo.tsx
import { Gallery, GalleryItem } from '@/components/ui/gallery';
import React from 'react';

const sampleImages: GalleryItem[] = [
  {
    id: '1',
    uri: 'https://picsum.photos/400/400?random=1',
    title: 'Beautiful Landscape',
    description: 'A stunning view of mountains and valleys',
  },
  {
    id: '2',
    uri: 'https://picsum.photos/400/400?random=2',
    title: 'City Skyline',
    description: 'Urban architecture at its finest',
  },
  {
    id: '3',
    uri: 'https://picsum.photos/400/400?random=3',
    title: 'Ocean View',
    description: 'Peaceful waves and endless horizon',
  },
  {
    id: '4',
    uri: 'https://picsum.photos/400/400?random=4',
    title: 'Forest Path',
    description: 'A winding trail through ancient trees',
  },
  {
    id: '5',
    uri: 'https://picsum.photos/400/400?random=5',
    title: 'Desert Dunes',
    description: 'Golden sand patterns in the wind',
  },
  {
    id: '6',
    uri: 'https://picsum.photos/400/400?random=6',
    title: 'Mountain Peak',
    description: 'Snow-capped summit reaching the clouds',
  },
  {
    id: '7',
    uri: 'https://picsum.photos/400/400?random=7',
    title: 'Autumn Leaves',
    description: 'Vibrant colors of the changing season',
  },
  {
    id: '8',
    uri: 'https://picsum.photos/400/400?random=8',
    title: 'Waterfall',
    description: 'Cascading water over moss-covered rocks',
  },
];

export function GalleryDemo() {
  return (
    <Gallery
      items={sampleImages}
      columns={2}
      spacing={8}
      borderRadius={12}
      enableFullscreen={true}
      enableZoom={true}
    />
  );
}
