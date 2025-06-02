// components/ui/view.tsx
import { BorderRadius } from '@/constants/globals';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import {
  View as RNView,
  ViewProps as RNViewProps,
  ViewStyle,
} from 'react-native';

type ViewVariant =
  | 'default'
  | 'card'
  | 'muted'
  | 'accent'
  | 'destructive'
  | 'outline'
  | 'ghost';

type ViewSize = 'sm' | 'default' | 'lg' | 'xl';

export interface ViewProps extends RNViewProps {
  variant?: ViewVariant;
  size?: ViewSize;
  rounded?: keyof typeof BorderRadius | number;
  bordered?: boolean;
  shadow?: boolean;
  lightColor?: string;
  darkColor?: string;
  borderLightColor?: string;
  borderDarkColor?: string;
}

export function View({
  variant = 'default',
  size = 'default',
  rounded = 'DEFAULT',
  bordered = false,
  shadow = false,
  lightColor,
  darkColor,
  borderLightColor,
  borderDarkColor,
  style,
  ...props
}: ViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    getBackgroundColorKey(variant)
  );

  const borderColor = useThemeColor(
    { light: borderLightColor, dark: borderDarkColor },
    'border'
  );

  const getViewStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      backgroundColor,
    };

    // Border radius
    if (typeof rounded === 'number') {
      baseStyle.borderRadius = rounded;
    } else {
      baseStyle.borderRadius = BorderRadius[rounded];
    }

    // Size-based padding
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

  return <RNView style={[getViewStyle(), style]} {...props} />;
}

// Helper function to get the appropriate background color key for each variant
function getBackgroundColorKey(
  variant: ViewVariant
): keyof typeof import('@/constants/Colors').lightColors {
  switch (variant) {
    case 'card':
      return 'card';
    case 'muted':
      return 'muted';
    case 'accent':
      return 'accent';
    case 'destructive':
      return 'destructive';
    case 'outline':
    case 'ghost':
      return 'background'; // Will be overridden to transparent
    default:
      return 'background';
  }
}
