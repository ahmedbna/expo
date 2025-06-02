// components/ui/alert.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { Radius } from '@/constants/globals';
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
          borderRadius: Radius.md,
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
  const foregroundColor = useThemeColor({}, 'foreground');

  return (
    <Text
      style={[
        {
          fontSize: 16,
          fontWeight: '600',
          color: foregroundColor,
          marginBottom: 4,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

interface AlertDescriptionProps {
  children: React.ReactNode;
  style?: TextStyle;
}

export function AlertDescription({ children, style }: AlertDescriptionProps) {
  const mutedForegroundColor = useThemeColor({}, 'mutedForeground');

  return (
    <Text
      style={[
        {
          fontSize: 14,
          color: mutedForegroundColor,
          lineHeight: 20,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
