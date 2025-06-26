// registry/examples/gallery/gallery-masonry.tsx
import { Gallery, GalleryItem } from '@/components/ui/gallery';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

const masonryImages: GalleryItem[] = [
  {
    id: '1',
    uri: 'https://picsum.photos/400/600?random=61',
    title: 'Tall Portrait',
  },
  {
    id: '2',
    uri: 'https://picsum.photos/400/300?random=62',
    title: 'Short Landscape',
  },
  {
    id: '3',
    uri: 'https://picsum.photos/400/400?random=63',
    title: 'Perfect Square',
  },
  {
    id: '4',
    uri: 'https://picsum.photos/400/500?random=64',
    title: 'Medium Portrait',
  },
  {
    id: '5',
    uri: 'https://picsum.photos/400/350?random=65',
    title: 'Wide Landscape',
  },
  {
    id: '6',
    uri: 'https://picsum.photos/400/450?random=66',
    title: 'Tall Image',
  },
];

export function GalleryMasonry() {
  return (
    <View style={{ gap: 24 }}>
      <View>
        <Text variant='subtitle' style={{ marginBottom: 12 }}>
          Varied Heights (Portrait Style)
        </Text>
        <Gallery
          items={masonryImages.slice(0, 4)}
          columns={2}
          spacing={12}
          borderRadius={12}
          aspectRatio={0.75} // Taller images
          showTitles={true}
        />
      </View>

      <View>
        <Text variant='subtitle' style={{ marginBottom: 12 }}>
          Mixed Aspect Ratios
        </Text>
        <Gallery
          items={masonryImages}
          columns={3}
          spacing={8}
          borderRadius={8}
          aspectRatio={1.1} // Slightly taller than square
        />
      </View>

      <View>
        <Text variant='subtitle' style={{ marginBottom: 12 }}>
          Wide Format
        </Text>
        <Gallery
          items={masonryImages.slice(0, 4)}
          columns={2}
          spacing={16}
          borderRadius={16}
          aspectRatio={1.4} // Wide format
          showTitles={true}
        />
      </View>
    </View>
  );
}
