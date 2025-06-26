// registry/examples/date-picker-example.tsx
import { FilePickerDemo } from '@/components/file-picker-demo';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { FilePickerControlled } from '@/docs/demo/file-picker/file-picker-controlled';
import { FilePickerImages } from '@/docs/demo/file-picker/file-picker-images';
import { FilePickerInfo } from '@/docs/demo/file-picker/file-picker-info';
import { FilePickerSingle } from '@/docs/demo/file-picker/file-picker-single';
import { FilePickerStyled } from '@/docs/demo/file-picker/file-picker-styled';
import { FilePickerValidation } from '@/docs/demo/file-picker/file-picker-validation';
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
            File Picker Examples
          </Text>

          <View style={{ gap: 24 }}>
            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Default File Picker
              </Text>
              <FilePickerDemo />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Image Only
              </Text>
              <FilePickerImages />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Single File
              </Text>
              <FilePickerSingle />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                With Validation
              </Text>
              <FilePickerValidation />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Custom Styling
              </Text>
              <FilePickerStyled />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Controlled
              </Text>
              <FilePickerControlled />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                With File Info
              </Text>
              <FilePickerInfo />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
