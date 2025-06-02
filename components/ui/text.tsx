// components/ui/text.tsx
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from 'react-native';

type TextVariant =
  | 'default'
  | 'large'
  | 'small'
  | 'muted'
  | 'lead'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4';

interface TextProps extends RNTextProps {
  variant?: TextVariant;
  lightColor?: string;
  darkColor?: string;
  children: React.ReactNode;
}

export function Text({
  variant = 'default',
  lightColor,
  darkColor,
  style,
  children,
  ...props
}: TextProps) {
  const textColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'text'
  );
  const mutedColor = useThemeColor({}, 'textMuted');

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      color: textColor,
    };

    switch (variant) {
      case 'h1':
        return {
          ...baseStyle,
          fontSize: 36,
          fontWeight: '800',
          lineHeight: 40,
          letterSpacing: -0.02,
        };
      case 'h2':
        return {
          ...baseStyle,
          fontSize: 30,
          fontWeight: '700',
          lineHeight: 36,
          letterSpacing: -0.02,
        };
      case 'h3':
        return {
          ...baseStyle,
          fontSize: 24,
          fontWeight: '600',
          lineHeight: 32,
          letterSpacing: -0.02,
        };
      case 'h4':
        return {
          ...baseStyle,
          fontSize: 20,
          fontWeight: '600',
          lineHeight: 28,
          letterSpacing: -0.02,
        };
      case 'large':
        return {
          ...baseStyle,
          fontSize: 18,
          fontWeight: '600',
          lineHeight: 28,
        };
      case 'lead':
        return {
          ...baseStyle,
          fontSize: 20,
          lineHeight: 28,
          color: mutedColor,
        };
      case 'small':
        return {
          ...baseStyle,
          fontSize: 14,
          fontWeight: '500',
          lineHeight: 20,
        };
      case 'muted':
        return {
          ...baseStyle,
          fontSize: 14,
          lineHeight: 20,
          color: mutedColor,
        };
      default:
        return {
          ...baseStyle,
          fontSize: 16,
          lineHeight: 24,
        };
    }
  };

  const textStyle = getTextStyle();

  return (
    <RNText style={[textStyle, style]} {...props}>
      {children}
    </RNText>
  );
}
