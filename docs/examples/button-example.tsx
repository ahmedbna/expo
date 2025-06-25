// docs/examples/button-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { ButtonAnimation } from '@/docs/demo/button/button-animation';
import { ButtonCustom } from '@/docs/demo/button/button-custom';
import { ButtonDemo } from '@/docs/demo/button/button-demo';
import { ButtonDisabled } from '@/docs/demo/button/button-disabled';
import { ButtonIconOnly } from '@/docs/demo/button/button-icon-only';
import { ButtonLoading } from '@/docs/demo/button/button-loading';
import { ButtonSizes } from '@/docs/demo/button/button-sizes';
import { ButtonVariants } from '@/docs/demo/button/button-variants';
import { ButtonWithIcons } from '@/docs/demo/button/button-with-icons';
import React from 'react';
import { ScrollView } from 'react-native';

// Main demo screen combining all button examples
export function ButtonExample() {
  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 16,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ gap: 32, paddingBottom: 32 }}>
        <View>
          <Text variant='heading' style={{ marginBottom: 16 }}>
            Button Examples
          </Text>

          <View style={{ gap: 24 }}>
            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Default
              </Text>
              <ButtonDemo />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Variants
              </Text>
              <ButtonVariants />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Different Sizes
              </Text>
              <ButtonSizes />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                With Icons
              </Text>
              <ButtonWithIcons />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Icon Only
              </Text>
              <ButtonIconOnly />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Loading States
              </Text>
              <ButtonLoading />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Disabled States
              </Text>
              <ButtonDisabled />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Custom Styling
              </Text>
              <ButtonCustom />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Animation Control
              </Text>
              <ButtonAnimation />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
