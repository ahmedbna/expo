// registry/examples/media-picker-gallery.tsx
import { MediaPicker } from '@/components/ui/media-picker';
import { Folder } from 'lucide-react-native';
import React from 'react';

export function MediaPickerGallery() {
  return (
    <MediaPicker
      mediaType='all'
      gallery={true}
      multiple={true}
      maxSelection={8}
      buttonText='Open Gallery'
      icon={Folder}
      variant='outline'
      onSelectionChange={(assets) => {
        console.log('Selected from gallery:', assets);
      }}
    />
  );
}
