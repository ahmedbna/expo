// components/ui/gallery.tsx

import { Text } from '@/components/ui/text';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BORDER_RADIUS } from '@/theme/globals';
import { Image } from 'expo-image';
import { Download, Share, X } from 'lucide-react-native';
import { useCallback, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
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
import { Button } from './button';

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
  borderRadius?: number;
  aspectRatio?: number;
  showPages?: boolean;
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
}

const AnimatedImage = Animated.createAnimatedComponent(Image);

export function Gallery({
  items,
  columns = 4,
  spacing = 0,
  aspectRatio = 1,
  borderRadius = 0,
  showPages = false,
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
}: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [containerWidth, setContainerWidth] = useState(screenWidth);

  const fullscreenFlatListRef = useRef<FlatList>(null);
  const thumbnailFlatListRef = useRef<FlatList>(null);

  const textColor = useThemeColor({}, 'text');
  const primary = useThemeColor({}, 'primary');
  const mutedColor = useThemeColor({}, 'textMuted');
  const backgroundColor = useThemeColor({}, 'background');
  const secondary = useThemeColor({}, 'secondary');

  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedScale = useSharedValue(1);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  // Calculate item width based on container width
  const itemWidth = (containerWidth - spacing * (columns - 1)) / columns;

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
      // Scroll to selected item after modal opens
      setTimeout(() => {
        fullscreenFlatListRef.current?.scrollToIndex({
          index,
          animated: false,
        });
        thumbnailFlatListRef.current?.scrollToIndex({
          index,
          animated: true,
          viewPosition: 0.5,
        });
      }, 100);
    },
    [enableFullscreen, resetZoom]
  );

  const closeFullscreen = useCallback(() => {
    setIsModalVisible(false);
    setSelectedIndex(-1);
  }, []);

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

  const handleThumbnailPress = useCallback(
    (index: number) => {
      setSelectedIndex(index);
      fullscreenFlatListRef.current?.scrollToIndex({
        index,
        animated: true,
      });
      resetZoom();
    },
    [resetZoom]
  );

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: any) => {
      if (viewableItems.length > 0) {
        const newIndex = viewableItems[0].index;
        if (newIndex !== selectedIndex) {
          setSelectedIndex(newIndex);
          // Auto-scroll thumbnail to center
          thumbnailFlatListRef.current?.scrollToIndex({
            index: newIndex,
            animated: true,
            viewPosition: 0.5,
          });
          resetZoom();
        }
      }
    },
    [resetZoom, selectedIndex]
  );

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  // Get current item being viewed
  const getCurrentItem = useCallback(() => {
    return selectedIndex >= 0 && selectedIndex < items.length
      ? items[selectedIndex]
      : null;
  }, [selectedIndex, items]);

  // Handle download for current item
  const handleDownload = useCallback(() => {
    const currentItem = getCurrentItem();
    if (currentItem && onDownload) {
      onDownload(currentItem);
    }
  }, [getCurrentItem, onDownload]);

  // Handle share for current item
  const handleShare = useCallback(() => {
    const currentItem = getCurrentItem();
    if (currentItem && onShare) {
      onShare(currentItem);
    }
  }, [getCurrentItem, onShare]);

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
    })
    // Only allow pan when zoomed in to prevent interference with horizontal swipe
    .enabled(scale.value > 1);

  // Combine gestures - prioritize pinch over pan
  const composedGesture = Gesture.Race(pinchGesture, panGesture);

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
        {
          width: itemWidth,
          height: itemWidth * aspectRatio,
          borderRadius,
        },
      ]}
      onPress={() => handleItemPress(item, index)}
    >
      <Image
        source={{ uri: item.thumbnail || item.uri }}
        style={[styles.gridImage, { borderRadius }]}
        contentFit='cover'
        transition={200}
      />

      {renderCustomOverlay && renderCustomOverlay(item, index)}

      {(showTitles || showDescriptions) && (
        <View style={[styles.itemInfo]}>
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

  const renderFullscreenItem = ({
    item,
    index,
  }: {
    item: GalleryItem;
    index: number;
  }) => (
    <View style={styles.fullscreenSlide}>
      <GestureDetector gesture={composedGesture}>
        <Animated.View style={styles.imageContainer}>
          <AnimatedImage
            source={{ uri: item.uri }}
            style={[styles.fullscreenImage, animatedImageStyle]}
            contentFit='contain'
          />
        </Animated.View>
      </GestureDetector>
    </View>
  );

  const renderFullscreenControls = () => {
    const currentItem = getCurrentItem();

    return (
      <View style={styles.fullscreenControls}>
        {/* Top controls */}
        <View style={[styles.topControls, { backgroundColor }]}>
          <View style={styles.topRightControls}>
            {enableDownload && onDownload && (
              <Button size='icon' variant='ghost' onPress={handleDownload}>
                <Download size={24} color={primary} />
              </Button>
            )}
            {enableShare && onShare && (
              <Button size='icon' variant='ghost' onPress={handleShare}>
                <Share size={24} color={primary} />
              </Button>
            )}
          </View>

          <Button size='icon' variant='ghost' onPress={closeFullscreen}>
            <X size={26} color={primary} />
          </Button>
        </View>

        {/* Bottom thumbnail slider */}
        <View style={[styles.bottomControls, { backgroundColor }]}>
          {/* Counter */}

          {showPages && (
            <Text
              variant='caption'
              style={{
                textAlign: 'center',
                marginBottom: 8,
                color: mutedColor,
              }}
            >
              {selectedIndex + 1} of {items.length}
            </Text>
          )}

          {currentItem?.title && (
            <Text
              variant='subtitle'
              style={{ textAlign: 'center', marginBottom: 8, color: textColor }}
              numberOfLines={1}
            >
              {currentItem.title}
            </Text>
          )}

          {currentItem?.description && (
            <Text
              variant='caption'
              style={{
                textAlign: 'center',
                marginBottom: 16,
                color: mutedColor,
              }}
              numberOfLines={2}
            >
              {currentItem.description}
            </Text>
          )}

          <FlatList
            ref={thumbnailFlatListRef}
            data={items}
            renderItem={({ item, index }) => (
              <Pressable
                style={[
                  styles.thumbnailItem,
                  selectedIndex === index && {
                    borderColor: secondary,
                    borderWidth: 2,
                  },
                ]}
                onPress={() => handleThumbnailPress(index)}
              >
                <Image
                  source={{ uri: item.thumbnail || item.uri }}
                  style={styles.thumbnailImage}
                  contentFit='cover'
                />
              </Pressable>
            )}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.thumbnailContainer}
            ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
            getItemLayout={(data, index) => ({
              length: 48, // thumbnail width + separator
              offset: 56 * index, // thumbnail width + separator
              index,
            })}
          />
        </View>
      </View>
    );
  };

  if (items.length === 0) {
    return (
      <View style={[styles.emptyState]}>
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
        contentContainerStyle={[styles.grid, { gap: spacing }]}
        showsVerticalScrollIndicator={false}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          setContainerWidth(width);
        }}
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
        <View style={{ flex: 1, backgroundColor }}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <FlatList
              ref={fullscreenFlatListRef}
              data={items}
              renderItem={renderFullscreenItem}
              keyExtractor={(item) => item.id}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onViewableItemsChanged={onViewableItemsChanged}
              viewabilityConfig={viewabilityConfig}
              getItemLayout={(data, index) => ({
                length: screenWidth,
                offset: screenWidth * index,
                index,
              })}
              // Ensure smooth scrolling
              decelerationRate='fast'
              snapToInterval={screenWidth}
              snapToAlignment='start'
              disableIntervalMomentum={true}
            />
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
  fullscreenSlide: {
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    width: screenWidth,
    height: screenHeight,
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
    paddingTop: 56,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  topRightControls: {
    gap: 8,
    flexDirection: 'row',
  },
  bottomControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 46,
  },
  thumbnailContainer: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  thumbnailItem: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
    borderColor: 'transparent',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
});
