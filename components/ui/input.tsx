import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BORDER_RADIUS, CORNERS, FONT_SIZE, HEIGHT } from '@/theme/globals';
import { LucideProps } from 'lucide-react-native';
import React, { forwardRef, ReactElement, useState } from 'react';
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
  rightComponent?: React.ReactNode | (() => React.ReactNode);
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
    const muted = useThemeColor({}, 'textMuted');
    const borderColor = useThemeColor({}, 'border');
    const primary = useThemeColor({}, 'primary');
    const danger = useThemeColor({}, 'red');

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
            borderColor: error ? danger : isFocused ? primary : borderColor,
            backgroundColor: 'transparent',
          };
        case 'filled':
        default:
          return {
            ...baseStyle,
            borderWidth: 1,
            borderColor: error ? danger : cardColor,
            backgroundColor: disabled ? muted + '20' : cardColor,
          };
      }
    };

    const getInputStyle = (): TextStyle => ({
      flex: 1,
      fontSize: FONT_SIZE,
      color: disabled ? muted : error ? danger : textColor,
      paddingVertical: 0, // Remove default padding
    });

    const handleFocus = (e: any) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: any) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    // Render right component - supports both direct components and functions
    const renderRightComponent = () => {
      if (!rightComponent) return null;

      // If it's a function, call it. Otherwise, render directly
      return typeof rightComponent === 'function'
        ? rightComponent()
        : rightComponent;
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
          disabled={disabled}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}
          >
            {/* Left section - Icon + Label (fixed width to simulate grid column) */}
            <View
              style={{
                width: label ? 120 : 'auto',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}
              pointerEvents='none'
            >
              {icon && (
                <Icon
                  IconComponent={icon}
                  size={16}
                  color={error ? danger : muted}
                />
              )}
              {label && (
                <Text
                  variant='caption'
                  numberOfLines={1}
                  ellipsizeMode='tail'
                  style={[
                    {
                      color: error ? danger : muted,
                    },
                    labelStyle,
                  ]}
                  pointerEvents='none'
                >
                  {label}
                </Text>
              )}
            </View>

            {/* TextInput section - takes remaining space */}
            <View style={{ flex: 1 }}>
              <TextInput
                ref={ref}
                style={[getInputStyle(), inputStyle]}
                placeholderTextColor={error ? danger + 99 : muted}
                onFocus={handleFocus}
                onBlur={handleBlur}
                editable={!disabled}
                selectionColor={primary}
                {...props}
              />
            </View>

            {/* Right Component */}
            {renderRightComponent()}
          </View>
        </Pressable>

        {/* Error Message */}
        {error && (
          <Text
            style={[
              {
                marginLeft: 14,
                marginTop: 4,
                fontSize: 14,
                color: danger,
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

export interface GroupedInputProps {
  children: React.ReactNode;
  containerStyle?: ViewStyle;
  title?: string;
  titleStyle?: TextStyle;
}

export const GroupedInput = ({
  children,
  containerStyle,
  title,
  titleStyle,
}: GroupedInputProps) => {
  const danger = useThemeColor({}, 'red');

  const childrenArray = React.Children.toArray(children);

  // Collect all errors
  const errors = childrenArray
    .filter(
      (child): child is ReactElement<any> =>
        React.isValidElement(child) && !!(child.props as any).error
    )
    .map((child) => child.props.error);

  return (
    <View style={containerStyle}>
      {!!title && (
        <Text
          variant='title'
          style={[{ marginBottom: 8, marginLeft: 8 }, titleStyle]}
        >
          {title}
        </Text>
      )}

      {childrenArray.map((child, index) => {
        const groupPosition =
          childrenArray.length === 1
            ? 'single'
            : index === 0
            ? 'first'
            : index === childrenArray.length - 1
            ? 'last'
            : 'middle';

        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            groupPosition,
            key: index,
          });
        }

        return child;
      })}

      {/* Render all errors below the group */}
      {errors.length > 0 && (
        <View style={{ marginTop: 6 }}>
          {errors.map((error, i) => (
            <Text
              key={i}
              style={{
                fontSize: 14,
                color: danger,
                marginTop: i === 0 ? 0 : 1,
                marginLeft: 8,
              }}
            >
              {error}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

export interface GroupedInputItemProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  icon?: React.ComponentType<LucideProps>;
  rightComponent?: React.ReactNode | (() => React.ReactNode);
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  disabled?: boolean;
  groupPosition?: 'first' | 'middle' | 'last' | 'single';
}

export const GroupedInputItem = forwardRef<TextInput, GroupedInputItemProps>(
  (
    {
      label,
      error,
      icon,
      rightComponent,
      inputStyle,
      labelStyle,
      errorStyle,
      disabled,
      groupPosition = 'single',
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const card = useThemeColor({}, 'card');
    const text = useThemeColor({}, 'text');
    const muted = useThemeColor({}, 'textMuted');
    const border = useThemeColor({}, 'border');
    const primary = useThemeColor({}, 'primary');
    const danger = useThemeColor({}, 'red');

    const base: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      height: HEIGHT,
      paddingHorizontal: 16,
      backgroundColor: card,
      borderColor: border,
      borderWidth: 1,
    };

    const radiusStyle: ViewStyle = {
      borderTopLeftRadius:
        groupPosition === 'first' || groupPosition === 'single'
          ? BORDER_RADIUS
          : 0,
      borderTopRightRadius:
        groupPosition === 'first' || groupPosition === 'single'
          ? BORDER_RADIUS
          : 0,
      borderBottomLeftRadius:
        groupPosition === 'last' || groupPosition === 'single'
          ? BORDER_RADIUS
          : 0,
      borderBottomRightRadius:
        groupPosition === 'last' || groupPosition === 'single'
          ? BORDER_RADIUS
          : 0,
      borderTopWidth:
        groupPosition === 'middle' || groupPosition === 'last' ? 0 : 1,
    };

    const handleFocus = (e: any) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: any) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    // Render right component - supports both direct components and functions
    const renderRightComponent = () => {
      if (!rightComponent) return null;

      // If it's a function, call it. Otherwise, render directly
      return typeof rightComponent === 'function'
        ? rightComponent()
        : rightComponent;
    };

    return (
      <Pressable
        style={[base, radiusStyle, disabled && { opacity: 0.6 }]}
        onPress={() => ref && 'current' in ref && ref.current?.focus()}
        disabled={disabled}
      >
        {/* Wrap everything in a column inside the Pressable */}
        <View style={{ flex: 1 }}>
          {/* Top Row: Icon + Label + Input + RightComponent */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}
          >
            {/* Label & Icon */}
            <View
              style={{
                width: label ? 120 : 'auto',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}
              pointerEvents='none'
            >
              {icon && (
                <Icon
                  IconComponent={icon}
                  size={16}
                  color={error ? danger : muted}
                />
              )}
              {label && (
                <Text
                  variant='caption'
                  numberOfLines={1}
                  ellipsizeMode='tail'
                  style={[
                    {
                      color: error ? danger : muted,
                    },
                    labelStyle,
                  ]}
                  pointerEvents='none'
                >
                  {label}
                </Text>
              )}
            </View>

            {/* Input */}
            <View style={{ flex: 1 }}>
              <TextInput
                ref={ref}
                style={[
                  {
                    flex: 1,
                    fontSize: FONT_SIZE,
                    color: disabled ? muted : error ? danger : text,
                    paddingVertical: 0,
                  },
                  inputStyle,
                ]}
                placeholderTextColor={error ? danger + '99' : muted}
                editable={!disabled}
                selectionColor={primary}
                onFocus={handleFocus}
                onBlur={handleBlur}
                {...props}
              />
            </View>

            {/* Right Component */}
            {renderRightComponent()}
          </View>
        </View>
      </Pressable>
    );
  }
);
