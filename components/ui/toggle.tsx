// components/ui/toggle.tsx
import { BorderRadius } from '@/constants/globals';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { Pressable, Text, TextStyle, ViewStyle } from 'react-native';

type ToggleVariant = 'default' | 'outline';
type ToggleSize = 'default' | 'sm' | 'lg';

interface ToggleProps {
  children: React.ReactNode;
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  variant?: ToggleVariant;
  size?: ToggleSize;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Toggle({
  children,
  pressed = false,
  onPressedChange,
  variant = 'default',
  size = 'default',
  disabled = false,
  style,
  textStyle,
}: ToggleProps) {
  const mutedForegroundColor = useThemeColor({}, 'mutedForeground');
  const borderColor = useThemeColor({}, 'border');
  const accentColor = useThemeColor({}, 'accent');
  const accentForegroundColor = useThemeColor({}, 'accentForeground');

  const handlePress = () => {
    if (!disabled) {
      onPressedChange?.(!pressed);
    }
  };

  const getToggleStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: BorderRadius.DEFAULT,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      borderWidth: variant === 'outline' ? 1 : 0,
      borderColor: pressed ? 'transparent' : borderColor,
    };

    // Size variants
    switch (size) {
      case 'sm':
        Object.assign(baseStyle, { height: 32, paddingHorizontal: 8 });
        break;
      case 'lg':
        Object.assign(baseStyle, { height: 44, paddingHorizontal: 16 });
        break;
      default:
        Object.assign(baseStyle, { height: 36, paddingHorizontal: 12 });
    }

    // State and variant styles
    if (pressed) {
      switch (variant) {
        case 'outline':
          return { ...baseStyle, backgroundColor: accentColor };
        default:
          return { ...baseStyle, backgroundColor: accentColor };
      }
    } else {
      switch (variant) {
        case 'outline':
          return { ...baseStyle, backgroundColor: 'transparent' };
        default:
          return { ...baseStyle, backgroundColor: 'transparent' };
      }
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      fontSize: size === 'sm' ? 12 : size === 'lg' ? 16 : 14,
      fontWeight: '500',
    };

    if (pressed) {
      return { ...baseTextStyle, color: accentForegroundColor };
    } else {
      return { ...baseTextStyle, color: mutedForegroundColor };
    }
  };

  const toggleStyle = getToggleStyle();
  const finalTextStyle = getTextStyle();

  return (
    <Pressable
      style={[toggleStyle, disabled && { opacity: 0.5 }, style]}
      onPress={handlePress}
      disabled={disabled}
    >
      {({ pressed: isPressing }) => (
        <>
          {typeof children === 'string' ? (
            <Text
              style={[
                finalTextStyle,
                isPressing && { opacity: 0.8 },
                textStyle,
              ]}
            >
              {children}
            </Text>
          ) : (
            children
          )}
        </>
      )}
    </Pressable>
  );
}
