import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useThemeColor } from '@/hooks/useThemeColor';
import { CORNERS, FONT_SIZE, HEIGHT } from '@/theme/globals';
import { LucideProps } from 'lucide-react-native';
import React, { forwardRef, useState } from 'react';
import {
  Pressable,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  icon?: React.ComponentType<LucideProps>;
  rightComponent?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  variant?: 'filled' | 'outline';
  disabled?: boolean;
}

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      icon,
      rightComponent,
      containerStyle,
      inputStyle,
      labelStyle,
      errorStyle,
      variant = 'filled',
      disabled = false,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    // Theme colors
    const cardColor = useThemeColor({}, 'card');
    const textColor = useThemeColor({}, 'text');
    const textMutedColor = useThemeColor({}, 'textMuted');
    const borderColor = useThemeColor({}, 'border');
    const primaryColor = useThemeColor({}, 'primary');
    const errorColor = useThemeColor({}, 'red');

    // Variant styles
    const getVariantStyle = (): ViewStyle => {
      const baseStyle: ViewStyle = {
        borderRadius: CORNERS,
        flexDirection: 'row',
        alignItems: 'center',
        height: HEIGHT,
        paddingHorizontal: 16,
      };

      switch (variant) {
        case 'outline':
          return {
            ...baseStyle,
            borderWidth: 1,
            borderColor: error
              ? errorColor
              : isFocused
              ? primaryColor
              : borderColor,
            backgroundColor: 'transparent',
          };
        case 'filled':
        default:
          return {
            ...baseStyle,
            borderWidth: 1,
            borderColor: error ? errorColor : cardColor,
            backgroundColor: disabled ? textMutedColor + '20' : cardColor,
          };
      }
    };

    const getInputStyle = (): TextStyle => ({
      flex: 1,
      fontSize: FONT_SIZE,
      color: disabled ? textMutedColor : textColor,
      paddingVertical: 0, // Remove default padding
      marginLeft: icon ? 8 : 0,
      marginRight: rightComponent || label ? 8 : 0,
    });

    const handleFocus = (e: any) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: any) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    return (
      <View style={containerStyle}>
        {/* Input Container */}
        <Pressable
          style={[getVariantStyle(), disabled && { opacity: 0.6 }]}
          onPress={() => {
            if (!disabled && ref && 'current' in ref && ref.current) {
              ref.current.focus();
            }
          }}
        >
          {/* Left Icon */}
          {icon && (
            <Icon IconComponent={icon} size={18} style={{ marginRight: 6 }} />
          )}

          {/* Label on the right */}
          {label && (
            <Text
              variant='caption'
              style={[
                {
                  color: error ? errorColor : textMutedColor,
                  marginRight: 8,
                },
                labelStyle,
              ]}
            >
              {label}
            </Text>
          )}

          {/* Text Input */}
          <TextInput
            ref={ref}
            style={[getInputStyle(), inputStyle]}
            placeholderTextColor={error ? errorColor + 99 : textMutedColor}
            onFocus={handleFocus}
            onBlur={handleBlur}
            editable={!disabled}
            selectionColor={primaryColor}
            {...props}
          />

          {/* Right Component */}
          {/* {rightComponent && <View style={{ marginLeft: 8 }}>{rightComponent}</View>} */}
        </Pressable>

        {/* Error Message */}
        {error && (
          <Text
            style={[
              {
                marginLeft: 14,
                marginTop: 4,
                fontSize: 14,
                color: errorColor,
              },
              errorStyle,
            ]}
          >
            {error}
          </Text>
        )}
      </View>
    );
  }
);
