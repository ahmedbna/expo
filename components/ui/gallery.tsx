// components/ui/gallery.tsx

import { Text } from '@/components/ui/text';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BORDER_RADIUS } from '@/theme/globals';
import { Image } from 'expo-image';
import { Download, Share, X } from 'lucide-react-native';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
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
  runOnJS,
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

// Improved zoom hook with better gesture handling
interface UseImageZoomProps {
  enableZoom: boolean;
  onSetCanSwipe: (canSwipe: boolean) => void;
  shouldReset?: boolean;
}

export const useImageZoom = ({
  enableZoom,
  onSetCanSwipe,
  shouldReset = false,
}: UseImageZoomProps) => {
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedScale = useSharedValue(1);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  const minScale = 0.8;
  const maxScale = 4;

  const resetZoom = useCallback(() => {
    'worklet';
    scale.value = withSpring(1, { damping: 20, stiffness: 300 });
    translateX.value = withSpring(0, { damping: 20, stiffness: 300 });
    translateY.value = withSpring(0, { damping: 20, stiffness: 300 });
    savedScale.value = 1;
    savedTranslateX.value = 0;
    savedTranslateY.value = 0;
    runOnJS(onSetCanSwipe)(true);
  }, [
    scale,
    translateX,
    translateY,
    savedScale,
    savedTranslateX,
    savedTranslateY,
    onSetCanSwipe,
  ]);

  // Reset zoom when shouldReset changes
  useEffect(() => {
    if (shouldReset) {
      resetZoom();
    }
  }, [shouldReset, resetZoom]);

  const constrainTranslation = useCallback(
    (newScale: number, newTranslateX: number, newTranslateY: number) => {
      'worklet';
      const maxTranslateX = Math.max(
        0,
        (screenWidth * newScale - screenWidth) / 2
      );
      const maxTranslateY = Math.max(
        0,
        (screenHeight * newScale - screenHeight) / 2
      );

      const constrainedX = Math.max(
        -maxTranslateX,
        Math.min(maxTranslateX, newTranslateX)
      );
      const constrainedY = Math.max(
        -maxTranslateY,
        Math.min(maxTranslateY, newTranslateY)
      );

      return { x: constrainedX, y: constrainedY };
    },
    []
  );

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd((event) => {
      if (!enableZoom) return;
      ('worklet');

      if (scale.value > 1.1) {
        resetZoom();
      } else {
        const targetScale = 2.5;
        const tapX = event.x - screenWidth / 2;
        const tapY = event.y - screenHeight / 2;

        const newTranslateX = (-tapX * (targetScale - 1)) / targetScale;
        const newTranslateY = (-tapY * (targetScale - 1)) / targetScale;

        const constrained = constrainTranslation(
          targetScale,
          newTranslateX,
          newTranslateY
        );

        scale.value = withSpring(targetScale, { damping: 20, stiffness: 300 });
        translateX.value = withSpring(constrained.x, {
          damping: 20,
          stiffness: 300,
        });
        translateY.value = withSpring(constrained.y, {
          damping: 20,
          stiffness: 300,
        });

        savedScale.value = targetScale;
        savedTranslateX.value = constrained.x;
        savedTranslateY.value = constrained.y;

        runOnJS(onSetCanSwipe)(false);
      }
    });

  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      if (!enableZoom) return;
      ('worklet');
      savedScale.value = scale.value;
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    })
    .onUpdate((event) => {
      if (!enableZoom) return;
      ('worklet');

      const newScale = Math.max(
        minScale,
        Math.min(maxScale, savedScale.value * event.scale)
      );

      // Calculate focal point relative to the image center
      const focalX = event.focalX - screenWidth / 2;
      const focalY = event.focalY - screenHeight / 2;

      // Calculate new translation to keep focal point in place
      const scaleDiff = newScale / savedScale.value;
      const newTranslateX = savedTranslateX.value + focalX * (1 - scaleDiff);
      const newTranslateY = savedTranslateY.value + focalY * (1 - scaleDiff);

      const constrained = constrainTranslation(
        newScale,
        newTranslateX,
        newTranslateY
      );

      scale.value = newScale;
      translateX.value = constrained.x;
      translateY.value = constrained.y;
    })
    .onEnd(() => {
      if (!enableZoom) return;
      ('worklet');

      if (scale.value < 1) {
        resetZoom();
      } else {
        savedScale.value = scale.value;
        savedTranslateX.value = translateX.value;
        savedTranslateY.value = translateY.value;
        runOnJS(onSetCanSwipe)(scale.value <= 1.1);
      }
    });

  const panGesture = Gesture.Pan()
    .minPointers(1)
    .maxPointers(1)
    .onStart(() => {
      'worklet';
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    })
    .onUpdate((event) => {
      if (!enableZoom || scale.value <= 1.1) return;
      ('worklet');

      const newTranslateX = savedTranslateX.value + event.translationX;
      const newTranslateY = savedTranslateY.value + event.translationY;

      const constrained = constrainTranslation(
        scale.value,
        newTranslateX,
        newTranslateY
      );

      translateX.value = constrained.x;
      translateY.value = constrained.y;
    })
    .onEnd(() => {
      'worklet';
      if (scale.value > 1.1) {
        savedTranslateX.value = translateX.value;
        savedTranslateY.value = translateY.value;
      }
    });

  const composedGesture = Gesture.Race(
    doubleTapGesture,
    Gesture.Simultaneous(pinchGesture, panGesture)
  );

  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return {
    animatedImageStyle,
    composedGesture,
    resetZoom,
    currentScale: scale,
  };
};

// Fixed fullscreen image component
interface FullscreenImageProps {
  item: GalleryItem;
  index: number;
  selectedIndex: number;
  enableZoom: boolean;
  onSetCanSwipe: (canSwipe: boolean) => void;
}

const FullscreenImage = memo(
  ({
    item,
    index,
    selectedIndex,
    enableZoom,
    onSetCanSwipe,
  }: FullscreenImageProps) => {
    // Only reset zoom when this image becomes the selected one
    const shouldReset = index === selectedIndex;

    const { animatedImageStyle, composedGesture } = useImageZoom({
      enableZoom,
      onSetCanSwipe,
      shouldReset,
    });

    return (
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
  }
);

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
  const [flatListScrollEnabled, setFlatListScrollEnabled] = useState(true);

  const fullscreenFlatListRef = useRef<FlatList>(null);
  const thumbnailFlatListRef = useRef<FlatList>(null);

  // Theme colors
  const textColor = useThemeColor({}, 'text');
  const primary = useThemeColor({}, 'primary');
  const mutedColor = useThemeColor({}, 'textMuted');
  const backgroundColor = useThemeColor({}, 'background');
  const secondary = useThemeColor({}, 'secondary');

  // Calculate item width based on container width
  const itemWidth = (containerWidth - spacing * (columns - 1)) / columns;

  const openFullscreen = useCallback(
    (index: number) => {
      if (!enableFullscreen) return;
      setSelectedIndex(index);
      setIsModalVisible(true);
      setFlatListScrollEnabled(true);

      // Use setTimeout to ensure the modal is rendered and the FlatList is ready
      setTimeout(() => {
        fullscreenFlatListRef.current?.scrollToIndex({
          index,
          animated: false,
        });
        thumbnailFlatListRef.current?.scrollToIndex({
          index,
          animated: false,
          viewPosition: 0.5,
        });
      }, 100);
    },
    [enableFullscreen]
  );

  const closeFullscreen = useCallback(() => {
    setIsModalVisible(false);
    setSelectedIndex(-1);
    setFlatListScrollEnabled(true);
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

  const handleThumbnailPress = useCallback((index: number) => {
    setSelectedIndex(index);
    setFlatListScrollEnabled(true);
    fullscreenFlatListRef.current?.scrollToIndex({
      index,
      animated: true,
    });
  }, []);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: any) => {
      if (viewableItems.length > 0) {
        const newIndex = viewableItems[0].index;
        if (
          newIndex !== selectedIndex &&
          newIndex !== null &&
          newIndex !== undefined
        ) {
          setSelectedIndex(newIndex);
          // Sync thumbnail scroll
          setTimeout(() => {
            thumbnailFlatListRef.current?.scrollToIndex({
              index: newIndex,
              animated: true,
              viewPosition: 0.5,
            });
          }, 100);
        }
      }
    },
    [selectedIndex]
  );

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const getCurrentItem = useCallback(() => {
    return selectedIndex >= 0 && selectedIndex < items.length
      ? items[selectedIndex]
      : null;
  }, [selectedIndex, items]);

  const handleDownload = useCallback(() => {
    const currentItem = getCurrentItem();
    if (currentItem && onDownload) {
      onDownload(currentItem);
    }
  }, [getCurrentItem, onDownload]);

  const handleShare = useCallback(() => {
    const currentItem = getCurrentItem();
    if (currentItem && onShare) {
      onShare(currentItem);
    }
  }, [getCurrentItem, onShare]);

  const renderGalleryItem = useCallback(
    ({ item, index }: { item: GalleryItem; index: number }) => (
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
    ),
    [
      itemWidth,
      aspectRatio,
      borderRadius,
      handleItemPress,
      renderCustomOverlay,
      showTitles,
      showDescriptions,
      textColor,
      mutedColor,
    ]
  );

  const renderFullscreenItem = useCallback(
    ({ item, index }: { item: GalleryItem; index: number }) => (
      <FullscreenImage
        key={`fullscreen-${item.id}`}
        item={item}
        index={index}
        selectedIndex={selectedIndex}
        enableZoom={enableZoom}
        onSetCanSwipe={setFlatListScrollEnabled}
      />
    ),
    [enableZoom, selectedIndex]
  );

  const renderFullscreenControls = () => {
    const currentItem = getCurrentItem();

    return (
      <View style={styles.fullscreenControls} pointerEvents='box-none'>
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

        <View style={[styles.bottomControls, { backgroundColor }]}>
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
              length: 48,
              offset: 56 * index,
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

      <Modal
        visible={isModalVisible}
        transparent
        animationType='fade'
        onRequestClose={closeFullscreen}
      >
        <View style={{ flex: 1, backgroundColor: 'black' }}>
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
              scrollEnabled={flatListScrollEnabled}
              removeClippedSubviews={false}
              initialNumToRender={3}
              maxToRenderPerBatch={3}
              windowSize={21}
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
    backgroundColor: 'black',
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
