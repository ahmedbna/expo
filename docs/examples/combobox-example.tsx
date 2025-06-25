// registry/examples/combobox-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { ComboboxDemo } from '@/docs/demo/combobox/combobox-demo';
import { ComboboxDisabled } from '@/docs/demo/combobox/combobox-disabled';
import { ComboboxForm } from '@/docs/demo/combobox/combobox-form';
import { ComboboxGroups } from '@/docs/demo/combobox/combobox-groups';
import { ComboboxLarge } from '@/docs/demo/combobox/combobox-large';
import { ComboboxMultiple } from '@/docs/demo/combobox/combobox-multiple';
import { ComboboxSearch } from '@/docs/demo/combobox/combobox-search';
import React from 'react';
import { ScrollView } from 'react-native';

// Main demo screen combining all examples
export function ComboboxExample() {
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
            Combobox Examples
          </Text>

          <View style={{ gap: 24 }}>
            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Default
              </Text>
              <ComboboxDemo />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                With Groups
              </Text>
              <ComboboxGroups />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Multiple Selection
              </Text>
              <ComboboxMultiple />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Disabled State
              </Text>
              <ComboboxDisabled />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Custom Search
              </Text>
              <ComboboxSearch />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Form Integration
              </Text>
              <ComboboxForm />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Large Dataset
              </Text>
              <ComboboxLarge />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
