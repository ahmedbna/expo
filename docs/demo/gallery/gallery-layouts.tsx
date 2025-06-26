// registry/examples/gallery/gallery-layouts.tsx
import { Gallery, GalleryItem } from '@/components/ui/gallery';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

const layoutImages: GalleryItem[] = [
  {
    id: '1',
    uri: 'https://picsum.photos/400/600?random=31',
    title: 'Portrait',
  },
  {
    id: '2',
    uri: 'https://picsum.photos/600/400?random=32',
    title: 'Landscape',
  },
  {
    id: '3',
    uri: 'https://picsum.photos/400/400?random=33',
    title: 'Square',
  },
  {
    id: '4',
    uri: 'https://picsum.photos/400/600?random=34',
    title: 'Portrait',
  },
  {
    id: '5',
    uri: 'https://picsum.photos/600/400?random=35',
    title: 'Landscape',
  },
  {
    id: '6',
    uri: 'https://picsum.photos/400/400?random=36',
    title: 'Square',
  },
];

export function GalleryLayouts() {
  return (
    <View style={{ gap: 32 }}>
      <View>
        <Text variant='subtitle' style={{ marginBottom: 12 }}>
          Single Column (Feed Style)
        </Text>
        <Gallery
          items={layoutImages.slice(0, 3)}
          columns={1}
          spacing={16}
          borderRadius={12}
          aspectRatio={1.2}
          showTitles={true}
        />
      </View>

      <View>
        <Text variant='subtitle' style={{ marginBottom: 12 }}>
          Square Grid
        </Text>
        <Gallery
          items={layoutImages}
          columns={3}
          spacing={4}
          borderRadius={8}
          aspectRatio={1}
        />
      </View>

      <View>
        <Text variant='subtitle' style={{ marginBottom: 12 }}>
          Wide Thumbnails
        </Text>
        <Gallery
          items={layoutImages.slice(0, 4)}
          columns={2}
          spacing={8}
          borderRadius={16}
          aspectRatio={1.5}
        />
      </View>
    </View>
  );
}
