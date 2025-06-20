// Example usage of the Gallery component

import { Gallery, type GalleryItem } from '@/components/ui/gallery';
import { Text } from '@/components/ui/text';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import React from 'react';
import { Alert, ScrollView, Share, StyleSheet, View } from 'react-native';

// Sample data
const sampleImages: GalleryItem[] = [
  {
    id: '1',
    uri: 'https://picsum.photos/800/600?random=1',
    title: 'Beautiful Landscape',
    description: 'A stunning view of mountains and valleys',
    thumbnail: 'https://picsum.photos/400/300?random=1',
  },
  {
    id: '2',
    uri: 'https://picsum.photos/800/600?random=2',
    title: 'City Skyline',
    description: 'Modern architecture at sunset',
    thumbnail: 'https://picsum.photos/400/300?random=2',
  },
  {
    id: '3',
    uri: 'https://picsum.photos/800/600?random=3',
    title: 'Ocean Waves',
    description: 'Peaceful ocean scene with rolling waves',
    thumbnail: 'https://picsum.photos/400/300?random=3',
  },
  {
    id: '4',
    uri: 'https://picsum.photos/800/600?random=4',
    title: 'Forest Path',
    description: 'A winding path through ancient trees',
    thumbnail: 'https://picsum.photos/400/300?random=4',
  },
  {
    id: '5',
    uri: 'https://picsum.photos/800/600?random=5',
    title: 'Desert Dunes',
    description: 'Golden sand dunes stretching to the horizon',
    thumbnail: 'https://picsum.photos/400/300?random=5',
  },
  {
    id: '6',
    uri: 'https://picsum.photos/800/600?random=6',
    title: 'Winter Wonderland',
    description: 'Snow-covered peaks and pristine wilderness',
    thumbnail: 'https://picsum.photos/400/300?random=6',
  },
];

export function GalleryDemo() {
  const handleDownload = async (item: GalleryItem) => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission needed',
          'Please grant media library permissions to download images.'
        );
        return;
      }

      const fileUri = FileSystem.documentDirectory + `${item.id}.jpg`;
      const { uri } = await FileSystem.downloadAsync(item.uri, fileUri);

      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('Gallery Downloads', asset, false);

      Alert.alert('Success', 'Image downloaded to your gallery!');
    } catch (error) {
      Alert.alert('Error', 'Failed to download image');
    }
  };

  const handleShare = async (item: GalleryItem) => {
    try {
      await Share.share({
        message: `Check out this image: ${item.title || 'Shared from Gallery'}`,
        url: item.uri,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share image');
    }
  };

  const handleItemPress = (item: GalleryItem, index: number) => {
    console.log('Item pressed:', item.title, 'at index:', index);
  };

  const aspectRatios = [0.8, 1.2, 1.0, 1.5, 0.9, 1.1]; // Varied ratios

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text variant='heading' style={styles.title}>
        Gallery Examples
      </Text>

      {/* Basic Gallery */}
      <View style={styles.section}>
        <Text variant='title' style={styles.sectionTitle}>
          Basic Gallery (2 columns)
        </Text>
        <View style={styles.galleryContainer}>
          <Gallery
            items={sampleImages.slice(0, 4)}
            columns={2}
            spacing={12}
            aspectRatio={0.75}
          />
        </View>
      </View>

      {/* Gallery with titles and descriptions */}
      <View style={styles.section}>
        <Text variant='title' style={styles.sectionTitle}>
          With Titles & Descriptions
        </Text>
        <View style={styles.galleryContainer}>
          <Gallery
            items={sampleImages.slice(0, 3)}
            columns={1}
            aspectRatio={1.5}
            showTitles
            showDescriptions
            spacing={16}
          />
        </View>
      </View>

      {/* Gallery with custom functionality */}
      <View style={styles.section}>
        <Text variant='title' style={styles.sectionTitle}>
          With Download & Share
        </Text>
        <View style={styles.galleryContainer}>
          <Gallery
            items={sampleImages.slice(0, 6)}
            columns={3}
            aspectRatio={1}
            enableDownload
            enableShare
            onDownload={handleDownload}
            onShare={handleShare}
            onItemPress={handleItemPress}
            spacing={8}
          />
        </View>
      </View>

      {/* Gallery with custom overlay */}
      <View style={styles.section}>
        <Text variant='title' style={styles.sectionTitle}>
          With Custom Overlay
        </Text>
        <View style={styles.galleryContainer}>
          <Gallery
            items={sampleImages.slice(0, 4)}
            columns={2}
            aspectRatio={1}
            renderCustomOverlay={(item, index) => (
              <View style={styles.customOverlay}>
                <Text variant='caption' style={styles.overlayText}>
                  #{index + 1}
                </Text>
              </View>
            )}
          />
        </View>
      </View>

      {/* Compact Gallery */}
      <View style={styles.section}>
        <Text variant='title' style={styles.sectionTitle}>
          Compact Grid (4 columns)
        </Text>
        <View style={styles.galleryContainer}>
          <Gallery
            items={sampleImages}
            columns={4}
            aspectRatio={1}
            spacing={4}
            enableZoom={false}
          />
        </View>
      </View>

      {/* Minimal Gallery */}
      <View style={styles.section}>
        <Text variant='title' style={styles.sectionTitle}>
          Minimal Gallery (No Fullscreen)
        </Text>
        <View style={styles.galleryContainer}>
          <Gallery
            items={sampleImages.slice(0, 4)}
            columns={2}
            spacing={8}
            aspectRatio={1}
            enableFullscreen={false}
          />
        </View>
      </View>

      {/* Photo Grid */}
      <View style={styles.section}>
        <Text variant='title' style={styles.sectionTitle}>
          Photo Grid
        </Text>
        <View style={styles.galleryContainer}>
          <Gallery
            items={sampleImages.slice(0, 6)}
            columns={3}
            spacing={2}
            aspectRatio={1}
            enableZoom
            enableShare
            onShare={async (item) => {
              await Share.share({
                message: `Check out this photo!`,
                url: item.uri,
              });
            }}
          />
        </View>
      </View>

      {/* Portfolio Gallery */}
      <View style={styles.section}>
        <Text variant='title' style={styles.sectionTitle}>
          Portfolio Gallery
        </Text>
        <View style={styles.galleryContainer}>
          <Gallery
            items={sampleImages.slice(0, 3)}
            columns={1}
            spacing={16}
            aspectRatio={1.33}
            showTitles
            showDescriptions
            enableFullscreen
            enableZoom
            enableShare
            onShare={async (item) => {
              await Share.share({
                message: `${item.title}: ${item.description}`,
                url: item.uri,
              });
            }}
          />
        </View>
      </View>

      {/* Masonry-style Gallery */}
      <View style={styles.section}>
        <Text variant='title' style={styles.sectionTitle}>
          Masonry-style Layout
        </Text>
        <View style={styles.masonryContainer}>
          {sampleImages.slice(0, 4).map((item, index) => (
            <View key={item.id} style={styles.masonryItem}>
              <Gallery
                items={[item]}
                columns={1}
                spacing={0}
                aspectRatio={aspectRatios[index % aspectRatios.length]}
                showTitles
                enableFullscreen
              />
            </View>
          ))}
        </View>
      </View>

      {/* Empty state demo */}
      <View style={styles.section}>
        <Text variant='title' style={styles.sectionTitle}>
          Empty Gallery
        </Text>
        <View style={styles.galleryContainer}>
          <Gallery items={[]} columns={2} spacing={8} aspectRatio={1} />
        </View>
      </View>

      {/* Bottom spacing */}
      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  galleryContainer: {
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    // Fixed height to prevent layout issues
    minHeight: 200,
  },
  masonryContainer: {
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  masonryItem: {
    marginBottom: 8,
  },
  customOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  overlayText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  bottomSpacing: {
    height: 50,
  },
});
