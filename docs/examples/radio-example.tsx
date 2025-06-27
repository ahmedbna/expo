// registry/examples/radio-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { RadioDemo } from '@/docs/demo/radio/radio-demo';
import { RadioDisabled } from '@/docs/demo/radio/radio-disabled';
import { RadioForm } from '@/docs/demo/radio/radio-form';
import { RadioHorizontal } from '@/docs/demo/radio/radio-horizontal';
import { RadioLarge } from '@/docs/demo/radio/radio-large';
import { RadioSingle } from '@/docs/demo/radio/radio-single';
import { RadioStyled } from '@/docs/demo/radio/radio-styled';
import React from 'react';
import { ScrollView } from 'react-native';

// Main demo screen combining all examples
export function RadioExample() {
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
            Radio Examples
          </Text>

          <View style={{ gap: 24 }}>
            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Default
              </Text>
              <RadioDemo />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Horizontal Layout
              </Text>
              <RadioHorizontal />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Disabled Options
              </Text>
              <RadioDisabled />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Custom Styling
              </Text>
              <RadioStyled />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Large Size
              </Text>
              <RadioLarge />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Individual Radio Buttons
              </Text>
              <RadioSingle />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Form Integration
              </Text>
              <RadioForm />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
