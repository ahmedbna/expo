// registry/examples/input-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { InputDemo } from '@/docs/demo/input/input-demo';
import { InputIcons } from '@/docs/demo/input/input-icons';
import { InputVariants } from '@/docs/demo/input/input-variants';
import { InputValidation } from '@/docs/demo/input/input-validation';
import { InputRightComponents } from '@/docs/demo/input/input-right-components';
import { InputDisabled } from '@/docs/demo/input/input-disabled';
import { InputGrouped } from '@/docs/demo/input/input-grouped';
import { InputForm } from '@/docs/demo/input/input-form';
import React from 'react';
import { ScrollView } from 'react-native';

// Main demo screen combining all examples
export function InputExample() {
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
            Input Examples
          </Text>

          <View style={{ gap: 24 }}>
            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Default
              </Text>
              <InputDemo />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                With Icons
              </Text>
              <InputIcons />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Variants
              </Text>
              <InputVariants />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Validation States
              </Text>
              <InputValidation />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Right Components
              </Text>
              <InputRightComponents />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Disabled State
              </Text>
              <InputDisabled />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Grouped Inputs
              </Text>
              <InputGrouped />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Complete Form
              </Text>
              <InputForm />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
