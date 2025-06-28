// registry/examples/parallax-scrollview-custom-height.tsx
import { ParallaxScrollView } from '@/components/ui/parallax-scrollview';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { Image } from 'expo-image';
import React from 'react';

export function ParallaxScrollViewCustomHeight() {
  return (
    <ParallaxScrollView
      headerHeight={400}
      headerImage={
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop',
          }}
          style={{ width: '100%', height: '100%' }}
          contentFit='cover'
        />
      }
    >
      <View style={{ gap: 16 }}>
        <Text variant='heading'>Custom Header Height</Text>
        <Text>
          This example demonstrates a taller header (400px) that provides more
          visual impact and space for the parallax effect.
        </Text>
        <Text>
          Larger headers work great for hero sections, profile pages, or any
          screen where you want to make a strong visual impression.
        </Text>
        <Text>
          The parallax animation remains smooth regardless of the header size,
          automatically adjusting the transformation values based on the
          specified height.
        </Text>
        <View style={{ height: 200, backgroundColor: '#f0f0f0', padding: 16 }}>
          <Text>Additional content section</Text>
        </View>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </View>
    </ParallaxScrollView>
  );
}
