// registry/examples/date-picker-example.tsx
import { GalleryDemo } from '@/components/gallery-demo';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { GalleryControls } from '@/docs/demo/gallery/gallery-controls';
import { GalleryGrid } from '@/docs/demo/gallery/gallery-grid';
import { GalleryInfo } from '@/docs/demo/gallery/gallery-info';
import { GalleryLayouts } from '@/docs/demo/gallery/gallery-layouts';
import { GalleryMasonry } from '@/docs/demo/gallery/gallery-masonry';
import { GalleryOverlay } from '@/docs/demo/gallery/gallery-overlay';
import React from 'react';
import { ScrollView } from 'react-native';

// Main demo screen combining all examples
export function GalleryExample() {
  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 16,
      }}
    >
      <View style={{ gap: 32 }}>
        <View>
          <Text variant='heading' style={{ marginBottom: 16 }}>
            Gallery Examples
          </Text>

          <View style={{ gap: 24 }}>
            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Default Gallery
              </Text>
              <GalleryDemo />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Custom Grid
              </Text>
              <GalleryGrid />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                With Titles and Descriptions
              </Text>
              <GalleryInfo />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Different Layouts
              </Text>
              <GalleryLayouts />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                With Controls
              </Text>
              <GalleryControls />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Custom Overlays
              </Text>
              <GalleryOverlay />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Masonry Layout
              </Text>
              <GalleryMasonry />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
