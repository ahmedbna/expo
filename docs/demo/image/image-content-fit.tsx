// registry/examples/image-content-fit.tsx
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function ImageContentFit() {
  const imageUri = 'https://picsum.photos/600/400?random=30';

  return (
    <View style={{ gap: 16 }}>
      <View style={{ gap: 8 }}>
        <Text variant='caption'>Cover (Default)</Text>
        <View
          style={{ backgroundColor: '#f0f0f0', padding: 4, borderRadius: 4 }}
        >
          <Image
            source={{ uri: imageUri }}
            width={150}
            height={100}
            contentFit='cover'
          />
        </View>
      </View>

      <View style={{ gap: 8 }}>
        <Text variant='caption'>Contain</Text>
        <View
          style={{ backgroundColor: '#f0f0f0', padding: 4, borderRadius: 4 }}
        >
          <Image
            source={{ uri: imageUri }}
            width={150}
            height={100}
            contentFit='contain'
          />
        </View>
      </View>

      <View style={{ gap: 8 }}>
        <Text variant='caption'>Fill</Text>
        <View
          style={{ backgroundColor: '#f0f0f0', padding: 4, borderRadius: 4 }}
        >
          <Image
            source={{ uri: imageUri }}
            width={150}
            height={100}
            contentFit='fill'
          />
        </View>
      </View>

      <View style={{ gap: 8 }}>
        <Text variant='caption'>Scale Down</Text>
        <View
          style={{ backgroundColor: '#f0f0f0', padding: 4, borderRadius: 4 }}
        >
          <Image
            source={{ uri: 'https://picsum.photos/100/80?random=31' }}
            width={150}
            height={100}
            contentFit='scale-down'
          />
        </View>
      </View>

      <View style={{ gap: 8 }}>
        <Text variant='caption'>None</Text>
        <View
          style={{ backgroundColor: '#f0f0f0', padding: 4, borderRadius: 4 }}
        >
          <Image
            source={{ uri: 'https://picsum.photos/100/60?random=32' }}
            width={150}
            height={100}
            contentFit='none'
          />
        </View>
      </View>
    </View>
  );
}
