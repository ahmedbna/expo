// registry/examples/image-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { ImageContentFit } from '@/docs/demo/image/image-content-fit';
import { ImageDemo } from '@/docs/demo/image/image-demo';
import { ImageError } from '@/docs/demo/image/image-error';
import { ImageGallery } from '@/docs/demo/image/image-gallery';
import { ImageLoading } from '@/docs/demo/image/image-loading';
import { ImageResponsive } from '@/docs/demo/image/image-responsive';
import { ImageSizes } from '@/docs/demo/image/image-sizes';
import { ImageVariants } from '@/docs/demo/image/image-variants';
import React from 'react';
import { ScrollView } from 'react-native';

// Main demo screen combining all examples
export function ImageExample() {
  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 16,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ gap: 32 }}>
        <View>
          <Text variant='heading' style={{ marginBottom: 16 }}>
            Image Examples
          </Text>

          <View style={{ gap: 24 }}>
            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Default
              </Text>
              <ImageDemo />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Variants
              </Text>
              <ImageVariants />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Different Sizes
              </Text>
              <ImageSizes />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Loading States
              </Text>
              <ImageLoading />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Error Handling
              </Text>
              <ImageError />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Content Fit Options
              </Text>
              <ImageContentFit />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Responsive Images
              </Text>
              <ImageResponsive />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Image Gallery
              </Text>
              <ImageGallery />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
