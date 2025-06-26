// registry/examples/image-responsive.tsx
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function ImageResponsive() {
  return (
    <View style={{ gap: 16 }}>
      <View style={{ gap: 8 }}>
        <Text variant='caption'>Full Width (Container Responsive)</Text>
        <View
          style={{
            backgroundColor: '#f0f0f0',
            padding: 16,
            borderRadius: 8,
          }}
        >
          <Image
            source={{ uri: 'https://picsum.photos/800/300?random=20' }}
            full={true}
            aspectRatio={8 / 3}
          />
        </View>
      </View>

      <View style={{ gap: 8 }}>
        <Text variant='caption'>Percentage Width</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Image
            source={{ uri: 'https://picsum.photos/400/300?random=21' }}
            width='48%'
            aspectRatio={4 / 3}
          />
          <Image
            source={{ uri: 'https://picsum.photos/400/300?random=22' }}
            width='48%'
            aspectRatio={4 / 3}
          />
        </View>
      </View>

      <View style={{ gap: 8 }}>
        <Text variant='caption'>Flex Layout</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <View style={{ flex: 2 }}>
            <Image
              source={{ uri: 'https://picsum.photos/600/400?random=23' }}
              full={true}
              aspectRatio={3 / 2}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Image
              source={{ uri: 'https://picsum.photos/300/400?random=24' }}
              full={true}
              aspectRatio={3 / 4}
            />
          </View>
        </View>
      </View>

      <View style={{ gap: 8 }}>
        <Text variant='caption'>Card Layout</Text>
        <View
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 12,
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Image
            source={{ uri: 'https://picsum.photos/800/400?random=25' }}
            full={true}
            aspectRatio={2}
          />
          <View style={{ padding: 16 }}>
            <Text variant='body'>Responsive card with full-width image</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
