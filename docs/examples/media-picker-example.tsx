// registry/examples/media-picker-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { MediaPickerCustom } from '@/docs/demo/media-picker/media-picker-custom';
import { MediaPickerDemo } from '@/docs/demo/media-picker/media-picker-demo';
import { MediaPickerGallery } from '@/docs/demo/media-picker/media-picker-gallery';
import { MediaPickerImages } from '@/docs/demo/media-picker/media-picker-images';
import { MediaPickerMultiple } from '@/docs/demo/media-picker/media-picker-multiple';
import { MediaPickerPreview } from '@/docs/demo/media-picker/media-picker-preview';
import { MediaPickerQuality } from '@/docs/demo/media-picker/media-picker-quality';
import { MediaPickerVideos } from '@/docs/demo/media-picker/media-picker-videos';
import React from 'react';
import { ScrollView } from 'react-native';

// Main demo screen combining all examples
export function MediaPickerExample() {
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
            MediaPicker Examples
          </Text>

          <View style={{ gap: 24 }}>
            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Default
              </Text>
              <MediaPickerDemo />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Images Only
              </Text>
              <MediaPickerImages />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Videos Only
              </Text>
              <MediaPickerVideos />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Multiple Selection
              </Text>
              <MediaPickerMultiple />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Custom Gallery
              </Text>
              <MediaPickerGallery />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Custom Trigger Buttons
              </Text>
              <MediaPickerCustom />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                With Preview
              </Text>
              <MediaPickerPreview />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Quality Settings
              </Text>
              <MediaPickerQuality />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
