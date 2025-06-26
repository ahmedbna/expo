// registry/examples/date-picker-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { DatePickerConstraints } from '@/docs/demo/date-picker/date-picker-constraints';
import { DatePickerDateTime } from '@/docs/demo/date-picker/date-picker-datetime';
import { DatePickerDemo } from '@/docs/demo/date-picker/date-picker-demo';
import { DatePickerForm } from '@/docs/demo/date-picker/date-picker-form';
import { DatePickerFormats } from '@/docs/demo/date-picker/date-picker-formats';
import { DatePickerTime } from '@/docs/demo/date-picker/date-picker-time';
import { DatePickerVariants } from '@/docs/demo/date-picker/date-picker-variants';
import React from 'react';
import { ScrollView } from 'react-native';

// Main demo screen combining all examples
export function DatePickerExample() {
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
            Date Picker Examples
          </Text>

          <View style={{ gap: 24 }}>
            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Default Date Picker
              </Text>
              <DatePickerDemo />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Time Picker
              </Text>
              <DatePickerTime />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Date Time Picker
              </Text>
              <DatePickerDateTime />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                With Constraints
              </Text>
              <DatePickerConstraints />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Different Variants
              </Text>
              <DatePickerVariants />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Time Formats
              </Text>
              <DatePickerFormats />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Form Integration
              </Text>
              <DatePickerForm />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
