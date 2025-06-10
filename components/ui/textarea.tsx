// components/ui/textarea.tsx
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BORDER_RADIUS, FONT_SIZE } from '@/theme/globals';
import React from 'react';
import { TextInput, TextInputProps, ViewStyle } from 'react-native';

interface TextareaProps
  extends Omit<TextInputProps, 'multiline' | 'numberOfLines'> {
  rows?: number;
  resize?: 'none' | 'vertical';
  lightColor?: string;
  darkColor?: string;
  borderLightColor?: string;
  borderDarkColor?: string;
  containerStyle?: ViewStyle;
}

export function Textarea({
  rows = 4,
  resize = 'vertical',
  lightColor,
  darkColor,
  borderLightColor,
  borderDarkColor,
  containerStyle,
  style,
  ...props
}: TextareaProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  );
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor(
    { light: borderLightColor, dark: borderDarkColor },
    'border'
  );
  const placeholderColor = useThemeColor({}, 'mutedForeground');

  const containerStyles: ViewStyle = {
    width: '100%',
    borderWidth: 1,
    borderColor,
    borderRadius: BORDER_RADIUS,
    backgroundColor,
    overflow: 'hidden',
  };

  const inputStyles = {
    fontSize: FONT_SIZE,
    lineHeight: 20,
    color: textColor,
    paddingHorizontal: 12,
    paddingVertical: 8,
    textAlignVertical: 'top' as const,
    minHeight: rows * 20 + 16, // Approximate line height + padding
  };

  return (
    <View style={[containerStyles, containerStyle]}>
      <TextInput
        multiline
        numberOfLines={rows}
        style={[inputStyles, style]}
        placeholderTextColor={placeholderColor}
        placeholder='Type your message...'
        {...props}
      />
    </View>
  );
}
