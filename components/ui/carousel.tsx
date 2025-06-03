// components/ui/carousel.tsx
import { View } from '@/components/ui/view';
import { Radius } from '@/constants/globals';
import { useThemeColor } from '@/hooks/useThemeColor';
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
  spacing = 0, // Changed default to 0 for full-width slides
  style,
  onIndexChange,
}: CarouselProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const [containerWidth, setContainerWidth] = useState(screenWidth);
  // Fixed TypeScript error: Use number instead of NodeJS.Timeout
  const autoPlayTimerRef = useRef<number | null>(null);

  // Calculate slide dimensions - full width by default
  const slideWidth = itemWidth || containerWidth - spacing * 2;
  const snapToInterval = slideWidth + spacing;

  const startAutoPlay = useCallback(() => {
    if (!autoPlay || children.length <= 1) return;

    // Fixed: Use window.setInterval for React Native
    autoPlayTimerRef.current = window.setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex >= children.length) {
          return loop ? 0 : prevIndex;
        }
        return nextIndex;
      });
    }, autoPlayInterval);
  }, [autoPlay, autoPlayInterval, children.length, loop]);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayTimerRef.current) {
      // Fixed: Use window.clearInterval for React Native
      window.clearInterval(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isAutoPlaying) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }

    return () => {
      stopAutoPlay();
    };
  }, [isAutoPlaying, startAutoPlay, stopAutoPlay]);

  // Fixed: Properly scroll to the current slide
  useEffect(() => {
    if (
      scrollViewRef.current &&
      currentIndex >= 0 &&
      currentIndex < children.length
    ) {
      const scrollX = currentIndex * snapToInterval;
      scrollViewRef.current.scrollTo({
        x: scrollX,
        animated: true,
      });
    }
    onIndexChange?.(currentIndex);
  }, [currentIndex, snapToInterval, onIndexChange, children.length]);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const scrollPosition = event.nativeEvent.contentOffset.x;
      const index = Math.round(scrollPosition / snapToInterval);

      if (index !== currentIndex && index >= 0 && index < children.length) {
        setCurrentIndex(index);
      }
    },
    [currentIndex, snapToInterval, children.length]
  );

  // Fixed: Improved slide navigation functions
  const goToSlide = useCallback(
    (index: number) => {
      if (index >= 0 && index < children.length && index !== currentIndex) {
        setCurrentIndex(index);
        // Manually scroll to the slide
        if (scrollViewRef.current) {
          const scrollX = index * snapToInterval;
          scrollViewRef.current.scrollTo({
            x: scrollX,
            animated: true,
          });
        }
        // Stop auto-play temporarily when manually navigating
        if (autoPlay) {
          setIsAutoPlaying(false);
          // Restart after delay
          setTimeout(() => setIsAutoPlaying(true), 2000);
        }
      }
    },
    [currentIndex, children.length, snapToInterval, autoPlay]
  );

  const goToPrevious = useCallback(() => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      goToSlide(prevIndex);
    } else if (loop) {
      goToSlide(children.length - 1);
    }
  }, [currentIndex, loop, children.length, goToSlide]);

  const goToNext = useCallback(() => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < children.length) {
      goToSlide(nextIndex);
    } else if (loop) {
      goToSlide(0);
    }
  }, [currentIndex, children.length, loop, goToSlide]);

  const handleTouchStart = () => {
    if (autoPlay) {
      setIsAutoPlaying(false);
    }
  };

  const handleTouchEnd = () => {
    if (autoPlay) {
      // Delay restart to allow user interaction to complete
      setTimeout(() => {
        setIsAutoPlaying(true);
      }, 1000);
    }
  };

  const handleMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const scrollPosition = event.nativeEvent.contentOffset.x;
      const index = Math.round(scrollPosition / snapToInterval);

      if (index !== currentIndex && index >= 0 && index < children.length) {
        setCurrentIndex(index);
      }
    },
    [currentIndex, snapToInterval, children.length]
  );

  return (
    <View
      style={[{ width: '100%' }, style]}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setContainerWidth(width);
      }}
    >
      <View style={{ position: 'relative', overflow: 'hidden' }}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled={!itemWidth} // Enable paging for full-width slides
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
            marginTop: 16,
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
          borderRadius: Radius.lg,
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
  const mutedColor = useThemeColor({}, 'muted');

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 8,
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
            borderRadius: 4,
            backgroundColor: index === current ? primaryColor : mutedColor,
            opacity: index === current ? 1 : 0.5,
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
  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor({}, 'border');
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
          borderRadius: 20,
          backgroundColor,
          borderWidth: 1,
          borderColor,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: disabled ? 0.3 : 1,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3.84,
          elevation: 5,
        },
        style,
      ]}
      activeOpacity={0.7}
    >
      <IconComponent size={20} color={primaryColor} />
    </TouchableOpacity>
  );
}

// Hook for carousel control
export function useCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const goToNext = useCallback(() => {
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
  }, []);

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
