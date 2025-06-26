// registry/examples/media-picker-custom.tsx
import { Button } from '@/components/ui/button';
import { MediaPicker } from '@/components/ui/media-picker';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Camera, Upload } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

export function MediaPickerCustom() {
  const borderColor = useThemeColor({}, 'border');
  const textColor = useThemeColor({}, 'text');
  const mutedColor = useThemeColor({}, 'mutedForeground');

  return (
    <View style={{ gap: 16 }}>
      {/* Custom trigger with MediaPicker children */}
      <MediaPicker
        mediaType='image'
        onSelectionChange={(assets) => console.log('Custom picker:', assets)}
      >
        <TouchableOpacity style={[styles.customTrigger, { borderColor }]}>
          <Camera size={24} color={mutedColor} />
          <Text style={{ color: textColor }}>Custom Camera Button</Text>
        </TouchableOpacity>
      </MediaPicker>

      {/* Another custom style */}
      <MediaPicker
        mediaType='all'
        multiple={true}
        onSelectionChange={(assets) => console.log('Upload style:', assets)}
      >
        <View style={styles.uploadArea}>
          <Upload size={32} color={mutedColor} />
          <Text variant='title' style={{ color: textColor }}>
            Drag & Drop
          </Text>
          <Text variant='caption'>or click to select files</Text>
        </View>
      </MediaPicker>
    </View>
  );
}

const styles = StyleSheet.create({
  customTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    gap: 12,
  },
  uploadArea: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    borderWidth: 2,
    borderRadius: 12,
    borderStyle: 'dashed',
    gap: 8,
  },
});
