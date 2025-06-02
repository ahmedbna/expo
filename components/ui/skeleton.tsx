// components/ui/skeleton.tsx
import { BorderRadius } from '@/constants/globals';
import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  style?: ViewStyle;
}

export function Skeleton({
  width = '100%',
  height = 100,
  style,
}: SkeletonProps) {
  const mutedColor = useThemeColor({}, 'muted');
  const opacity = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        {
          width: width as any, // Type assertion to bypass the strict typing
          height,
          backgroundColor: mutedColor,
          borderRadius: BorderRadius.md,
          opacity,
        },
        style,
      ]}
    />
  );
}
