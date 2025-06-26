// registry/examples/gallery/gallery-overlay.tsx
import { Gallery, GalleryItem } from '@/components/ui/gallery';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Heart, Star } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';

const overlayImages: GalleryItem[] = [
  {
    id: '1',
    uri: 'https://picsum.photos/400/400?random=51',
    title: 'Favorite Photo',
  },
  {
    id: '2',
    uri: 'https://picsum.photos/400/400?random=52',
    title: 'Rated Image',
  },
  {
    id: '3',
    uri: 'https://picsum.photos/400/400?random=53',
    title: 'Premium Content',
  },
  {
    id: '4',
    uri: 'https://picsum.photos/400/400?random=54',
    title: 'Popular Pick',
  },
  {
    id: '5',
    uri: 'https://picsum.photos/400/400?random=55',
    title: 'Featured Image',
  },
  {
    id: '6',
    uri: 'https://picsum.photos/400/400?random=56',
    title: 'Top Rated',
  },
];

export function GalleryOverlay() {
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});

  const primary = useThemeColor({}, 'primary');
  const background = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  const toggleLike = (itemId: string) => {
    const newLikedItems = new Set(likedItems);
    if (newLikedItems.has(itemId)) {
      newLikedItems.delete(itemId);
    } else {
      newLikedItems.add(itemId);
    }
    setLikedItems(newLikedItems);
  };

  const setRating = (itemId: string, rating: number) => {
    setRatings((prev) => ({ ...prev, [itemId]: rating }));
  };

  const renderCustomOverlay = (item: GalleryItem, index: number) => {
    const isLiked = likedItems.has(item.id);
    const currentRating = ratings[item.id] || 0;

    return (
      <View style={styles.overlayContainer}>
        {/* Top overlay with like button */}
        <View
          style={[styles.topOverlay, { backgroundColor: background + '90' }]}
        >
          <Pressable
            onPress={() => toggleLike(item.id)}
            style={styles.heartButton}
          >
            <Heart
              size={20}
              color={isLiked ? '#ff4757' : textColor}
              fill={isLiked ? '#ff4757' : 'transparent'}
            />
          </Pressable>
        </View>

        {/* Bottom overlay with rating */}
        <View
          style={[styles.bottomOverlay, { backgroundColor: background + '90' }]}
        >
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((rating) => (
              <Pressable
                key={rating}
                onPress={() => setRating(item.id, rating)}
                style={styles.starButton}
              >
                <Star
                  size={16}
                  color={rating <= currentRating ? '#ffc048' : textColor}
                  fill={rating <= currentRating ? '#ffc048' : 'transparent'}
                />
              </Pressable>
            ))}
          </View>
          <Text variant='caption' style={{ color: textColor, fontSize: 10 }}>
            #{index + 1}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <Gallery
      items={overlayImages}
      columns={3}
      spacing={8}
      borderRadius={12}
      aspectRatio={1}
      enableFullscreen={true}
      enableZoom={true}
      renderCustomOverlay={renderCustomOverlay}
    />
  );
}

const styles = StyleSheet.create({
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 12,
  },
  topOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 8,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heartButton: {
    padding: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  starButton: {
    padding: 2,
  },
});
