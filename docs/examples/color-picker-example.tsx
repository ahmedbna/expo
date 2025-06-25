// registry/examples/color-picker-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { ColorPickerColors } from '@/docs/demo/color-picker/color-picker-colors';
import { ColorPickerDemo } from '@/docs/demo/color-picker/color-picker-demo';
import { ColorPickerDisabled } from '@/docs/demo/color-picker/color-picker-disabled';
import { ColorPickerLabeled } from '@/docs/demo/color-picker/color-picker-labeled';
import { ColorPickerPalette } from '@/docs/demo/color-picker/color-picker-palette';
import { ColorPickerSizes } from '@/docs/demo/color-picker/color-picker-sizes';
import { ColorPickerStyled } from '@/docs/demo/color-picker/color-picker-styled';
import { ColorSwatchDemo } from '@/docs/demo/color-picker/color-swatch-demo';
import React from 'react';
import { ScrollView } from 'react-native';

// Main demo screen combining all examples
export function ColorPickerExample() {
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
            Color Picker Examples
          </Text>

          <View style={{ gap: 24 }}>
            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Default
              </Text>
              <ColorPickerDemo />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Different Sizes
              </Text>
              <ColorPickerSizes />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                With Initial Colors
              </Text>
              <ColorPickerColors />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Disabled State
              </Text>
              <ColorPickerDisabled />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Color Swatch Only
              </Text>
              <ColorSwatchDemo />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Custom Styling
              </Text>
              <ColorPickerStyled />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Color Palette
              </Text>
              <ColorPickerPalette />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                With Labels
              </Text>
              <ColorPickerLabeled />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
