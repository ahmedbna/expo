// components/ui/alert.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { BORDER_RADIUS } from '@/constants/globals';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { TextStyle, ViewStyle } from 'react-native';

type AlertVariant = 'default' | 'destructive';

interface AlertProps {
  children: React.ReactNode;
  variant?: AlertVariant;
  style?: ViewStyle;
}

export function Alert({ children, variant = 'default', style }: AlertProps) {
  const borderColor = useThemeColor({}, 'border');
  const destructiveColor = useThemeColor({}, 'destructive');
  const backgroundColor = useThemeColor({}, 'card');

  return (
    <View
      style={[
        {
          padding: 16,
          borderRadius: BORDER_RADIUS,
          borderWidth: 1,
          borderColor:
            variant === 'destructive' ? destructiveColor : borderColor,
          backgroundColor: backgroundColor,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

interface AlertTitleProps {
  children: React.ReactNode;
  style?: TextStyle;
}

export function AlertTitle({ children, style }: AlertTitleProps) {
  return (
    <Text variant='title' style={[style]}>
      {children}
    </Text>
  );
}

interface AlertDescriptionProps {
  children: React.ReactNode;
  style?: TextStyle;
}

export function AlertDescription({ children, style }: AlertDescriptionProps) {
  return (
    <Text
      variant='caption'
      style={[
        {
          marginTop: 8,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
