// components/ui/text.tsx
import { FONT_SIZE } from '@/constants/globals';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from 'react-native';

type TextVariant =
  | 'body'
  | 'title'
  | 'subtitle'
  | 'caption'
  | 'heading'
  | 'link';

interface TextProps extends RNTextProps {
  variant?: TextVariant;
  lightColor?: string;
  darkColor?: string;
  children: React.ReactNode;
}

export function Text({
  variant = 'body',
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
      case 'heading':
        return {
          ...baseStyle,
          fontSize: 28,
          fontWeight: '700',
        };
      case 'title':
        return {
          ...baseStyle,
          fontSize: 24,
          fontWeight: '700',
        };
      case 'subtitle':
        return {
          ...baseStyle,
          fontSize: FONT_SIZE,
          fontWeight: '500',
        };
      case 'caption':
        return {
          ...baseStyle,
          fontSize: FONT_SIZE,
          fontWeight: '400',
          color: mutedColor,
        };
      case 'link':
        return {
          ...baseStyle,
          fontSize: FONT_SIZE,
          fontWeight: '500',
          textDecorationLine: 'underline',
        };
      default: // 'body'
        return {
          ...baseStyle,
          fontSize: FONT_SIZE,
          fontWeight: '400',
        };
    }
  };

  return (
    <RNText style={[getTextStyle(), style]} {...props}>
      {children}
    </RNText>
  );
}
