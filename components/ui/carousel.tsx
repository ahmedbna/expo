// components/ui/carousel.tsx
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BORDER_RADIUS } from '@/theme/globals';
import { BlurView } from 'expo-blur';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
const { width: screenWidth } = Dimensions.get('window');

interface CarouselProps {
  children: React.ReactNode[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showIndicators?: boolean;
  showArrows?: boolean;
  loop?: boolean;
  itemWidth?: number;
  spacing?: number;
  style?: ViewStyle;
  onIndexChange?: (index: number) => void;
}

interface CarouselItemProps {
  children: React.ReactNode;
  style?: ViewStyle[] | ViewStyle;
}

interface CarouselContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface CarouselIndicatorsProps {
  total: number;
  current: number;
  onPress?: (index: number) => void;
  style?: ViewStyle;
}

interface CarouselArrowProps {
  direction: 'left' | 'right';
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

// Main Carousel Component
export function Carousel({
  children,
  autoPlay = false,
  autoPlayInterval = 3000,
  showIndicators = true,
  showArrows = false,
  loop = false,
  itemWidth,
  spacing = 0,
  style,
  onIndexChange,
}: CarouselProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(screenWidth);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  // Use useRef to store timer ID
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate slide dimensions
  const slideWidth = itemWidth || containerWidth - spacing * 2;
  const snapToInterval = slideWidth + spacing;

  // Clear all timers
  const clearTimers = useCallback(() => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = null;
    }
  }, []);

  // Start auto play
  const startAutoPlay = useCallback(() => {
    if (!autoPlay || children.length <= 1 || isUserInteracting) return;

    clearTimers();

    (autoPlayTimerRef.current as any) = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex >= children.length) {
          return loop ? 0 : prevIndex;
        }
        return nextIndex;
      });
    }, autoPlayInterval);
  }, [
    autoPlay,
    autoPlayInterval,
    children.length,
    loop,
    isUserInteracting,
    clearTimers,
  ]);

  // Stop auto play
  const stopAutoPlay = useCallback(() => {
    clearTimers();
  }, [clearTimers]);

  // Handle auto play lifecycle
  useEffect(() => {
    if (autoPlay && !isUserInteracting) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }

    return stopAutoPlay;
  }, [autoPlay, isUserInteracting, startAutoPlay, stopAutoPlay]);

  // Scroll to current index
  const scrollToIndex = useCallback(
    (index: number, animated: boolean = true) => {
      if (scrollViewRef.current && index >= 0 && index < children.length) {
        const scrollX = index * snapToInterval;

        // Use requestAnimationFrame to ensure smooth scrolling
        requestAnimationFrame(() => {
          if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({
              x: scrollX,
              animated,
            });
          }
        });
      }
    },
    [snapToInterval, children.length]
  );

  // Handle index changes - only scroll when index actually changes
  useEffect(() => {
    scrollToIndex(currentIndex);
    onIndexChange?.(currentIndex);
  }, [currentIndex, scrollToIndex, onIndexChange]);

  // Handle scroll events - only update index from user scrolling
  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      // Only update index from scroll if user is manually scrolling
      if (isUserInteracting) {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / snapToInterval);

        if (index !== currentIndex && index >= 0 && index < children.length) {
          setCurrentIndex(index);
        }
      }
    },
    [currentIndex, snapToInterval, children.length, isUserInteracting]
  );

  // Handle momentum scroll end
  const handleMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const scrollPosition = event.nativeEvent.contentOffset.x;
      const index = Math.round(scrollPosition / snapToInterval);

      // Don't update index if it's the same as currentIndex (avoid overriding arrow press)
      if (index >= 0 && index < children.length) {
        setCurrentIndex(index);
      }

      if (autoPlay) {
        (scrollTimeoutRef.current as any) = setTimeout(() => {
          setIsUserInteracting(false);
        }, 1000);
      }
    },
    [snapToInterval, children.length, autoPlay]
  );

  // Navigation functions - force immediate scroll update
  const goToPrevious = useCallback(() => {
    const prevIndex = currentIndex - 1;
    const targetIndex =
      prevIndex >= 0 ? prevIndex : loop ? children.length - 1 : currentIndex;
    if (targetIndex !== currentIndex) {
      setIsUserInteracting(true);
      scrollToIndex(targetIndex);
    }
  }, [currentIndex, loop, children.length, scrollToIndex]);

  const goToNext = useCallback(() => {
    const nextIndex = currentIndex + 1;
    const targetIndex =
      nextIndex < children.length ? nextIndex : loop ? 0 : currentIndex;
    if (targetIndex !== currentIndex) {
      setIsUserInteracting(true);
      scrollToIndex(targetIndex);
    }
  }, [currentIndex, children.length, loop, scrollToIndex]);

  const goToSlide = useCallback(
    (index: number) => {
      if (index >= 0 && index < children.length) {
        setIsUserInteracting(true);
        scrollToIndex(index);
      }
    },
    [children.length, scrollToIndex]
  );
  // Touch handlers
  const handleTouchStart = useCallback(() => {
    setIsUserInteracting(true);
  }, []);

  const handleTouchEnd = useCallback(() => {
    // Don't immediately re-enable auto play, let momentum scroll end handle it
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, [clearTimers]);

  const horizontalPan = Gesture.Pan()
    .onBegin(() => {
      // Optional: trigger when gesture starts
    })
    .onUpdate(() => {
      // Optional: you can track gesture updates here
    })
    .onEnd(() => {
      // Optional: trigger when gesture ends
    })
    .activeOffsetX([-10, 10]) // Allow horizontal pan
    .activeOffsetY([-1000, 1000]); // Block vertical gesture

  return (
    <View
      style={[{ width: '100%' }, style]}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setContainerWidth(width);
      }}
    >
      <View style={{ position: 'relative', overflow: 'hidden' }}>
        <GestureDetector gesture={horizontalPan}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled={!itemWidth}
            snapToInterval={itemWidth ? snapToInterval : undefined}
            snapToAlignment={itemWidth ? 'start' : 'center'}
            decelerationRate={itemWidth ? 'fast' : 'normal'}
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            onMomentumScrollEnd={handleMomentumScrollEnd}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            scrollEventThrottle={16}
            bounces={false}
            contentContainerStyle={
              itemWidth
                ? {
                    paddingHorizontal: spacing,
                  }
                : {
                    width: children.length * containerWidth,
                  }
            }
          >
            {children.map((child, index) => (
              <View
                key={index}
                style={{
                  width: slideWidth,
                  marginRight: itemWidth ? spacing : 0,
                }}
              >
                {child}
              </View>
            ))}
          </ScrollView>
        </GestureDetector>

        {showArrows && children.length > 1 && (
          <>
            <CarouselArrow
              direction='left'
              onPress={goToPrevious}
              disabled={!loop && currentIndex === 0}
              style={{
                position: 'absolute',
                left: 6,
                top: '50%',
                transform: [{ translateY: -12 }],
                zIndex: 10,
              }}
            />
            <CarouselArrow
              direction='right'
              onPress={goToNext}
              disabled={!loop && currentIndex === children.length - 1}
              style={{
                position: 'absolute',
                right: 6,
                top: '50%',
                transform: [{ translateY: -12 }],
                zIndex: 10,
              }}
            />
          </>
        )}
      </View>

      {showIndicators && children.length > 1 && (
        <CarouselIndicators
          total={children.length}
          current={currentIndex}
          onPress={goToSlide}
          style={{
            marginTop: 12,
            alignSelf: 'center',
          }}
        />
      )}
    </View>
  );
}

// Carousel Content Component
export function CarouselContent({ children, style }: CarouselContentProps) {
  return <View style={style}>{children}</View>;
}

// Carousel Item Component
export function CarouselItem({ children, style }: CarouselItemProps) {
  const backgroundColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');

  return (
    <View
      style={[
        {
          backgroundColor,
          borderRadius: BORDER_RADIUS,
          borderWidth: 1,
          borderColor,
          padding: 16,
          minHeight: 200,
          flex: 1,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

// Carousel Indicators Component
export function CarouselIndicators({
  total,
  current,
  onPress,
  style,
}: CarouselIndicatorsProps) {
  const primaryColor = useThemeColor({}, 'primary');
  const secondaryColor = useThemeColor({}, 'secondary');

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 6,
        },
        style,
      ]}
    >
      {Array.from({ length: total }, (_, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onPress?.(index)}
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            backgroundColor: index === current ? primaryColor : secondaryColor,
          }}
          activeOpacity={0.7}
        />
      ))}
    </View>
  );
}

// Carousel Arrow Component
export function CarouselArrow({
  direction,
  onPress,
  disabled = false,
  style,
}: CarouselArrowProps) {
  const primaryColor = useThemeColor({}, 'primary');
  const IconComponent = direction === 'left' ? ChevronLeft : ChevronRight;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        {
          width: 24,
          height: 24,
          borderRadius: 999,
          overflow: 'hidden',
          opacity: disabled ? 0.3 : 1,
        },
        style,
      ]}
      activeOpacity={0.7}
    >
      <BlurView
        tint='systemChromeMaterial' // or "light"/"dark" depending on theme
        intensity={100}
        style={{
          flex: 1,
          borderRadius: 999,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <IconComponent size={20} color={primaryColor} />
      </BlurView>
    </TouchableOpacity>
  );
}

// Hook for carousel control
export function useCarousel(totalSlides: number = 0) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalSlides) {
        setCurrentIndex(index);
      }
    },
    [totalSlides]
  );

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1 < totalSlides ? prev + 1 : prev));
  }, [totalSlides]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  return {
    currentIndex,
    goToSlide,
    goToNext,
    goToPrevious,
  };
}
