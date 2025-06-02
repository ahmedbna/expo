// components/ui/progress.tsx
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { View, ViewStyle } from 'react-native';

interface ProgressProps {
  value: number; // 0-100
  style?: ViewStyle;
  height?: number;
}

export function Progress({ value, style, height = 8 }: ProgressProps) {
  const primaryColor = useThemeColor({}, 'primary');
  const secondaryColor = useThemeColor({}, 'secondary');

  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <View
      style={[
        {
          height: height,
          backgroundColor: secondaryColor,
          borderRadius: height / 2,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <View
        style={{
          height: '100%',
          width: `${clampedValue}%`,
          backgroundColor: primaryColor,
          borderRadius: height / 2,
        }}
      />
    </View>
  );
}
