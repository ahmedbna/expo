// registry/examples/gallery/gallery-grid.tsx
import { Gallery, GalleryItem } from '@/components/ui/gallery';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

const gridImages: GalleryItem[] = [
  {
    id: '1',
    uri: 'https://picsum.photos/600/400?random=11',
  },
  {
    id: '2',
    uri: 'https://picsum.photos/600/400?random=12',
  },
  {
    id: '3',
    uri: 'https://picsum.photos/600/400?random=13',
  },
  {
    id: '4',
    uri: 'https://picsum.photos/600/400?random=14',
  },
  {
    id: '5',
    uri: 'https://picsum.photos/600/400?random=15',
  },
  {
    id: '6',
    uri: 'https://picsum.photos/600/400?random=16',
  },
];

export function GalleryGrid() {
  return (
    <View style={{ gap: 24 }}>
      <View>
        <Text variant='subtitle' style={{ marginBottom: 12 }}>
          3 Columns with Spacing
        </Text>
        <Gallery
          items={gridImages.slice(0, 6)}
          columns={3}
          spacing={12}
          borderRadius={8}
          aspectRatio={1.2}
        />
      </View>

      <View>
        <Text variant='subtitle' style={{ marginBottom: 12 }}>
          4 Columns, No Spacing
        </Text>
        <Gallery
          items={gridImages}
          columns={4}
          spacing={0}
          borderRadius={0}
          aspectRatio={1}
        />
      </View>

      <View>
        <Text variant='subtitle' style={{ marginBottom: 12 }}>
          2 Columns, Large Spacing
        </Text>
        <Gallery
          items={gridImages.slice(0, 4)}
          columns={2}
          spacing={20}
          borderRadius={16}
          aspectRatio={0.8}
        />
      </View>
    </View>
  );
}
