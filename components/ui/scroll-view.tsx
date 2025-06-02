// components/ui/scrollview.tsx
import { BorderRadius } from '@/constants/globals';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import {
  ScrollView as RNScrollView,
  ScrollViewProps as RNScrollViewProps,
  ViewStyle,
} from 'react-native';

type ScrollViewVariant =
  | 'default'
  | 'card'
  | 'muted'
  | 'accent'
  | 'outline'
  | 'ghost';

type ScrollViewSize = 'sm' | 'default' | 'lg' | 'xl';

export interface ScrollViewProps extends RNScrollViewProps {
  variant?: ScrollViewVariant;
  size?: ScrollViewSize;
  rounded?: keyof typeof BorderRadius | number;
  bordered?: boolean;
  shadow?: boolean;
  lightColor?: string;
  darkColor?: string;
  borderLightColor?: string;
  borderDarkColor?: string;
  fade?: boolean; // Enable fade edges
  maxHeight?: number;
}

export function ScrollView({
  variant = 'default',
  size = 'default',
  rounded = 'DEFAULT',
  bordered = false,
  shadow = false,
  lightColor,
  darkColor,
  borderLightColor,
  borderDarkColor,
  fade = false,
  maxHeight,
  style,
  contentContainerStyle,
  showsVerticalScrollIndicator = true,
  showsHorizontalScrollIndicator = true,
  ...props
}: ScrollViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    getBackgroundColorKey(variant)
  );

  const borderColor = useThemeColor(
    { light: borderLightColor, dark: borderDarkColor },
    'border'
  );

  const getScrollViewStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      backgroundColor,
    };

    // Border radius
    if (typeof rounded === 'number') {
      baseStyle.borderRadius = rounded;
    } else {
      baseStyle.borderRadius = BorderRadius[rounded];
    }

    // Max height
    if (maxHeight) {
      baseStyle.maxHeight = maxHeight;
    }

    // Border
    if (bordered || variant === 'outline') {
      baseStyle.borderWidth = 1;
      baseStyle.borderColor = borderColor;
    }

    // Shadow (basic shadow for React Native)
    if (shadow) {
      baseStyle.shadowColor = '#000';
      baseStyle.shadowOffset = {
        width: 0,
        height: 2,
      };
      baseStyle.shadowOpacity = 0.1;
      baseStyle.shadowRadius = 8;
      baseStyle.elevation = 4; // Android shadow
    }

    // Variant-specific overrides
    switch (variant) {
      case 'ghost':
        baseStyle.backgroundColor = 'transparent';
        break;
      case 'outline':
        baseStyle.backgroundColor = 'transparent';
        break;
    }

    return baseStyle;
  };

  const getContentContainerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {};

    // Size-based padding for content
    switch (size) {
      case 'sm':
        baseStyle.padding = 8;
        break;
      case 'lg':
        baseStyle.padding = 24;
        break;
      case 'xl':
        baseStyle.padding = 32;
        break;
      default:
        baseStyle.padding = 16;
    }

    return baseStyle;
  };

  const scrollViewStyle = getScrollViewStyle();
  const defaultContentStyle = getContentContainerStyle();

  return (
    <RNScrollView
      style={[scrollViewStyle, style]}
      contentContainerStyle={[defaultContentStyle, contentContainerStyle]}
      showsVerticalScrollIndicator={fade ? false : showsVerticalScrollIndicator}
      showsHorizontalScrollIndicator={
        fade ? false : showsHorizontalScrollIndicator
      }
      fadingEdgeLength={fade ? 50 : undefined} // Android fade edges
      {...props}
    />
  );
}

// Horizontal ScrollView variant
export interface HorizontalScrollViewProps
  extends Omit<ScrollViewProps, 'horizontal'> {
  spacing?: number; // Space between items
}

export function HorizontalScrollView({
  spacing = 16,
  contentContainerStyle,
  ...props
}: HorizontalScrollViewProps) {
  const horizontalContentStyle: ViewStyle = {
    flexDirection: 'row',
    gap: spacing, // Note: gap might not work on older RN versions, use marginRight on children instead
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[horizontalContentStyle, contentContainerStyle]}
      {...props}
    />
  );
}

// Helper function to get the appropriate background color key for each variant
function getBackgroundColorKey(
  variant: ScrollViewVariant
): keyof typeof import('@/constants/Colors').lightColors {
  switch (variant) {
    case 'card':
      return 'card';
    case 'muted':
      return 'muted';
    case 'accent':
      return 'accent';
    case 'outline':
    case 'ghost':
      return 'background'; // Will be overridden to transparent
    default:
      return 'background';
  }
}

// Backward compatibility - Simple themed ScrollView
export interface ThemedScrollViewProps extends RNScrollViewProps {
  lightColor?: string;
  darkColor?: string;
}

export function ThemedScrollView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedScrollViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  );

  return <RNScrollView style={[{ backgroundColor }, style]} {...otherProps} />;
}
