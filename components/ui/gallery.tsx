// components/ui/gallery.tsx

import { Text } from '@/components/ui/text';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BORDER_RADIUS, CORNERS } from '@/theme/globals';
import { Image } from 'expo-image';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Share,
  X,
} from 'lucide-react-native';
import React, { useCallback, useState } from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export interface GalleryItem {
  id: string;
  uri: string;
  title?: string;
  description?: string;
  thumbnail?: string;
}

interface GalleryProps {
  items: GalleryItem[];
  columns?: number;
  spacing?: number;
  aspectRatio?: number;
  showTitles?: boolean;
  showDescriptions?: boolean;
  enableFullscreen?: boolean;
  enableZoom?: boolean;
  enableDownload?: boolean;
  enableShare?: boolean;
  onItemPress?: (item: GalleryItem, index: number) => void;
  onDownload?: (item: GalleryItem) => void;
  onShare?: (item: GalleryItem) => void;
  renderCustomOverlay?: (item: GalleryItem, index: number) => React.ReactNode;
  lightColor?: string;
  darkColor?: string;
}

const AnimatedImage = Animated.createAnimatedComponent(Image);

export function Gallery({
  items,
  columns = 2,
  spacing = 8,
  aspectRatio = 1,
  showTitles = false,
  showDescriptions = false,
  enableFullscreen = true,
  enableZoom = true,
  enableDownload = false,
  enableShare = false,
  onItemPress,
  onDownload,
  onShare,
  renderCustomOverlay,
  lightColor,
  darkColor,
}: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  );
  const cardColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');
  const textColor = useThemeColor({}, 'text');
  const mutedColor = useThemeColor({}, 'textMuted');

  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedScale = useSharedValue(1);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  const itemWidth = (screenWidth - spacing * (columns + 1)) / columns;

  const resetZoom = useCallback(() => {
    scale.value = 1;
    translateX.value = 0;
    translateY.value = 0;
    savedScale.value = 1;
    savedTranslateX.value = 0;
    savedTranslateY.value = 0;
  }, [
    scale,
    translateX,
    translateY,
    savedScale,
    savedTranslateX,
    savedTranslateY,
  ]);

  const openFullscreen = useCallback(
    (index: number) => {
      if (!enableFullscreen) return;
      setSelectedIndex(index);
      setIsModalVisible(true);
      resetZoom();
    },
    [enableFullscreen, resetZoom]
  );

  const closeFullscreen = useCallback(() => {
    setIsModalVisible(false);
    setSelectedIndex(-1);
  }, []);

  const navigateToNext = useCallback(() => {
    if (selectedIndex < items.length - 1) {
      setSelectedIndex(selectedIndex + 1);
      // Reset zoom with animation
      scale.value = withSpring(1);
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      savedScale.value = 1;
      savedTranslateX.value = 0;
      savedTranslateY.value = 0;
    }
  }, [
    selectedIndex,
    items.length,
    scale,
    translateX,
    translateY,
    savedScale,
    savedTranslateX,
    savedTranslateY,
  ]);

  const navigateToPrevious = useCallback(() => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
      // Reset zoom with animation
      scale.value = withSpring(1);
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      savedScale.value = 1;
      savedTranslateX.value = 0;
      savedTranslateY.value = 0;
    }
  }, [
    selectedIndex,
    scale,
    translateX,
    translateY,
    savedScale,
    savedTranslateX,
    savedTranslateY,
  ]);

  const handleItemPress = useCallback(
    (item: GalleryItem, index: number) => {
      if (onItemPress) {
        onItemPress(item, index);
      } else if (enableFullscreen) {
        openFullscreen(index);
      }
    },
    [onItemPress, enableFullscreen, openFullscreen]
  );

  // Pinch gesture for zooming
  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      savedScale.value = scale.value;
    })
    .onUpdate((event) => {
      if (!enableZoom) return;
      scale.value = Math.max(0.5, Math.min(savedScale.value * event.scale, 4));
    })
    .onEnd(() => {
      if (scale.value < 1) {
        scale.value = withSpring(1);
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        savedTranslateX.value = 0;
        savedTranslateY.value = 0;
      }
      savedScale.value = scale.value;
    });

  // Pan gesture for moving when zoomed
  const panGesture = Gesture.Pan()
    .onStart(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    })
    .onUpdate((event) => {
      if (scale.value > 1) {
        const maxTranslateX = (scale.value - 1) * (screenWidth / 2);
        const maxTranslateY = (scale.value - 1) * (screenHeight / 2);

        translateX.value = Math.max(
          -maxTranslateX,
          Math.min(maxTranslateX, savedTranslateX.value + event.translationX)
        );
        translateY.value = Math.max(
          -maxTranslateY,
          Math.min(maxTranslateY, savedTranslateY.value + event.translationY)
        );
      }
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });

  // Combine gestures
  const composedGesture = Gesture.Simultaneous(pinchGesture, panGesture);

  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  const renderGalleryItem = ({
    item,
    index,
  }: {
    item: GalleryItem;
    index: number;
  }) => (
    <Pressable
      key={item.id}
      style={[
        styles.gridItem,
        {
          width: itemWidth,
          height: itemWidth * aspectRatio,
          marginBottom: spacing,
          backgroundColor: cardColor,
          borderColor: borderColor,
          borderRadius: BORDER_RADIUS,
        },
      ]}
      onPress={() => handleItemPress(item, index)}
    >
      <Image
        source={{ uri: item.thumbnail || item.uri }}
        style={[styles.gridImage, { borderRadius: BORDER_RADIUS }]}
        contentFit='cover'
        transition={200}
      />

      {renderCustomOverlay && renderCustomOverlay(item, index)}

      {(showTitles || showDescriptions) && (
        <View style={[styles.itemInfo, { backgroundColor: cardColor }]}>
          {showTitles && item.title && (
            <Text
              variant='subtitle'
              numberOfLines={1}
              style={{ color: textColor }}
            >
              {item.title}
            </Text>
          )}
          {showDescriptions && item.description && (
            <Text
              variant='caption'
              numberOfLines={2}
              style={{ color: mutedColor }}
            >
              {item.description}
            </Text>
          )}
        </View>
      )}
    </Pressable>
  );

  const renderFullscreenControls = () => (
    <View style={styles.fullscreenControls}>
      {/* Top controls */}
      <View
        style={[styles.topControls, { backgroundColor: 'rgba(0,0,0,0.5)' }]}
      >
        <Pressable style={styles.controlButton} onPress={closeFullscreen}>
          <X size={24} color='white' />
        </Pressable>

        <View style={styles.topRightControls}>
          {enableDownload && onDownload && (
            <Pressable
              style={styles.controlButton}
              onPress={() => onDownload(items[selectedIndex])}
            >
              <Download size={24} color='white' />
            </Pressable>
          )}
          {enableShare && onShare && (
            <Pressable
              style={styles.controlButton}
              onPress={() => onShare(items[selectedIndex])}
            >
              <Share size={24} color='white' />
            </Pressable>
          )}
        </View>
      </View>

      {/* Navigation controls */}
      {selectedIndex > 0 && (
        <Pressable
          style={[styles.navButton, styles.navButtonLeft]}
          onPress={navigateToPrevious}
        >
          <ChevronLeft size={32} color='white' />
        </Pressable>
      )}

      {selectedIndex < items.length - 1 && (
        <Pressable
          style={[styles.navButton, styles.navButtonRight]}
          onPress={navigateToNext}
        >
          <ChevronRight size={32} color='white' />
        </Pressable>
      )}

      {/* Bottom info */}
      <View
        style={[styles.bottomControls, { backgroundColor: 'rgba(0,0,0,0.5)' }]}
      >
        <Text variant='caption' style={{ color: 'white', textAlign: 'center' }}>
          {selectedIndex + 1} of {items.length}
        </Text>
        {items[selectedIndex]?.title && (
          <Text
            variant='subtitle'
            style={{ color: 'white', textAlign: 'center' }}
          >
            {items[selectedIndex].title}
          </Text>
        )}
        {items[selectedIndex]?.description && (
          <Text
            variant='caption'
            style={{ color: 'white', textAlign: 'center' }}
          >
            {items[selectedIndex].description}
          </Text>
        )}
      </View>
    </View>
  );

  if (items.length === 0) {
    return (
      <View style={[styles.emptyState, { backgroundColor: cardColor }]}>
        <Text variant='subtitle' style={{ color: mutedColor }}>
          No images to display
        </Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView
        style={[styles.container, { backgroundColor }]}
        contentContainerStyle={[
          styles.grid,
          { paddingHorizontal: spacing, paddingTop: spacing },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {items.map((item, index) => renderGalleryItem({ item, index }))}
      </ScrollView>

      {/* Fullscreen Modal */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType='fade'
        onRequestClose={closeFullscreen}
      >
        <View style={styles.fullscreenContainer}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <GestureDetector gesture={composedGesture}>
              <Animated.View style={{ flex: 1 }}>
                {selectedIndex >= 0 && (
                  <AnimatedImage
                    source={{ uri: items[selectedIndex].uri }}
                    style={[styles.fullscreenImage, animatedImageStyle]}
                    contentFit='contain'
                  />
                )}
              </Animated.View>
            </GestureDetector>
          </GestureHandlerRootView>

          {renderFullscreenControls()}
        </View>
      </Modal>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    borderWidth: 1,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  gridImage: {
    flex: 1,
  },
  itemInfo: {
    padding: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    borderRadius: BORDER_RADIUS,
    margin: 16,
  },
  fullscreenContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenImage: {
    width: screenWidth,
    height: screenHeight,
  },
  fullscreenControls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'box-none',
  },
  topControls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 44,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  topRightControls: {
    flexDirection: 'row',
  },
  controlButton: {
    padding: 8,
    borderRadius: CORNERS,
    marginLeft: 8,
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: CORNERS,
    padding: 12,
    transform: [{ translateY: -24 }],
  },
  navButtonLeft: {
    left: 16,
  },
  navButtonRight: {
    right: 16,
  },
  bottomControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 32,
  },
});
