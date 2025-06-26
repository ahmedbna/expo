// registry/examples/gallery/gallery-controls.tsx
import { Gallery, GalleryItem } from '@/components/ui/gallery';
import React from 'react';
import { Alert } from 'react-native';

const controlImages: GalleryItem[] = [
  {
    id: '1',
    uri: 'https://picsum.photos/400/400?random=41',
    title: 'Download Me',
    description: 'Click the download button to save this image',
  },
  {
    id: '2',
    uri: 'https://picsum.photos/400/400?random=42',
    title: 'Share This',
    description: 'Use the share button to send this image to friends',
  },
  {
    id: '3',
    uri: 'https://picsum.photos/400/400?random=43',
    title: 'Interactive Gallery',
    description: 'Zoom, pan, and navigate through the images',
  },
  {
    id: '4',
    uri: 'https://picsum.photos/400/400?random=44',
    title: 'Full Controls',
    description: 'All features enabled for the best experience',
  },
];

export function GalleryControls() {
  const handleDownload = (item: GalleryItem) => {
    Alert.alert('Download', `Downloading: ${item.title || 'Image'}`, [
      { text: 'OK' },
    ]);
  };

  const handleShare = (item: GalleryItem) => {
    Alert.alert('Share', `Sharing: ${item.title || 'Image'}`, [{ text: 'OK' }]);
  };

  const handleItemPress = (item: GalleryItem, index: number) => {
    console.log(`Pressed item ${index}: ${item.title}`);
  };

  return (
    <Gallery
      items={controlImages}
      columns={2}
      spacing={12}
      borderRadius={12}
      aspectRatio={1}
      showTitles={true}
      showDescriptions={true}
      showPages={true}
      enableFullscreen={true}
      enableZoom={true}
      enableDownload={true}
      enableShare={true}
      onDownload={handleDownload}
      onShare={handleShare}
      onItemPress={handleItemPress}
    />
  );
}
