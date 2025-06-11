// components/ui/progress.tsx
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import { HEIGHT } from '@/theme/globals';
import React, { useEffect } from 'react';
import { ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface ProgressProps {
  value: number; // 0-100
  style?: ViewStyle;
  height?: number;
  onValueChange?: (value: number) => void;
  interactive?: boolean;
}

export function Progress({
  value,
  style,
  height = HEIGHT,
  onValueChange,
  interactive = false,
}: ProgressProps) {
  const primaryColor = useThemeColor({}, 'primary');
  const mutedColor = useThemeColor({}, 'muted');

  const clampedValue = Math.max(0, Math.min(100, value));
  const progressWidth = useSharedValue(clampedValue);
  const containerWidth = useSharedValue(200); // Default width, will be updated

  // Update animation when value prop changes
  useEffect(() => {
    progressWidth.value = withTiming(clampedValue, { duration: 300 });
  }, [clampedValue]);

  const updateValue = (newValue: number) => {
    const clamped = Math.max(0, Math.min(100, newValue));
    onValueChange?.(clamped);
  };

  // Create pan gesture using the new Gesture API
  const panGesture = Gesture.Pan()
    .onStart(() => {
      // Optional: Add haptic feedback or visual indication
    })
    .onUpdate((event) => {
      if (!interactive) return;

      // Calculate new progress based on gesture position
      const newProgress = (event.x / containerWidth.value) * 100;
      const clampedProgress = Math.max(0, Math.min(100, newProgress));

      progressWidth.value = clampedProgress;
      runOnJS(updateValue)(clampedProgress);
    })
    .onEnd(() => {
      // Optional: Add snap-to behavior or validation here
    });

  const animatedProgressStyle = useAnimatedStyle(() => {
    return {
      width: `${progressWidth.value}%`,
    };
  });

  const containerStyle: ViewStyle[] = [
    {
      height: height,
      width: '100%' as const,
      backgroundColor: mutedColor,
      borderRadius: height / 2,
      overflow: 'hidden' as const,
    },
    ...(style ? [style] : []),
  ];

  const onLayout = (event: any) => {
    containerWidth.value = event.nativeEvent.layout.width;
  };

  if (interactive) {
    return (
      <GestureDetector gesture={panGesture}>
        <Animated.View style={containerStyle} onLayout={onLayout}>
          <Animated.View
            style={[
              {
                height: '100%' as const,
                backgroundColor: primaryColor,
                borderRadius: height / 2,
              },
              animatedProgressStyle,
            ]}
          />
        </Animated.View>
      </GestureDetector>
    );
  }

  return (
    <View style={containerStyle} onLayout={onLayout}>
      <Animated.View
        style={[
          {
            height: '100%' as const,
            backgroundColor: primaryColor,
            borderRadius: height / 2,
          },
          animatedProgressStyle,
        ]}
      />
    </View>
  );
}
