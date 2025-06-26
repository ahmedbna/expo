// registry/examples/image-variants.tsx
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function ImageVariants() {
  return (
    <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
      <View style={{ alignItems: 'center', gap: 8 }}>
        <Image
          source={{ uri: 'https://picsum.photos/200/200' }}
          width={100}
          height={100}
          variant='rounded'
        />
        <Text variant='caption'>Rounded</Text>
      </View>

      <View style={{ alignItems: 'center', gap: 8 }}>
        <Image
          source={{ uri: 'https://picsum.photos/201/201' }}
          width={100}
          height={100}
          variant='circle'
        />
        <Text variant='caption'>Circle</Text>
      </View>
    </View>
  );
}
