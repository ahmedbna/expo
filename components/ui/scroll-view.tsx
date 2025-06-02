// components/ui/scrollview.tsx
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import {
  ScrollView as RNScrollView,
  ScrollViewProps as RNScrollViewProps,
} from 'react-native';

export interface ScrollViewProps extends RNScrollViewProps {
  lightColor?: string;
  darkColor?: string;
}

export function ScrollView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ScrollViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  );

  return <RNScrollView style={[{ backgroundColor }, style]} {...otherProps} />;
}
