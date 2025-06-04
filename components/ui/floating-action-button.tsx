// components/ui/floating-action-button.tsx
import { Text } from '@/components/ui/text';
import { BORDER_RADIUS } from '@/constants/globals';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

type FABSize = 'sm' | 'md' | 'lg';
type FABVariant = 'primary' | 'secondary' | 'destructive';
type FABPosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';

interface FloatingActionButtonProps {
  onPress?: () => void;
  icon?: React.ReactNode;
  label?: string;
  size?: FABSize;
  variant?: FABVariant;
  position?: FABPosition;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  shadow?: boolean;
  extended?: boolean; // Shows label alongside icon
  absolute?: boolean; // Whether to use absolute positioning (default: true)
}

export function FloatingActionButton({
  onPress,
  icon,
  label,
  size = 'md',
  variant = 'primary',
  position = 'bottom-right',
  disabled = false,
  loading = false,
  style,
  textStyle,
  shadow = true,
  extended = false,
  absolute = true,
}: FloatingActionButtonProps) {
  const primaryColor = useThemeColor({}, 'primary');
  const primaryForegroundColor = useThemeColor({}, 'primaryForeground');
  const secondaryColor = useThemeColor({}, 'secondary');
  const secondaryForegroundColor = useThemeColor({}, 'secondaryForeground');
  const destructiveColor = useThemeColor({}, 'destructive');
  const destructiveForegroundColor = useThemeColor({}, 'destructiveForeground');

  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case 'sm':
        return {
          width: extended ? undefined : 40,
          height: 40,
          minWidth: extended ? 40 : undefined,
          paddingHorizontal: extended ? 16 : 0,
        };
      case 'lg':
        return {
          width: extended ? undefined : 64,
          height: 64,
          minWidth: extended ? 64 : undefined,
          paddingHorizontal: extended ? 24 : 0,
        };
      default: // 'md'
        return {
          width: extended ? undefined : 56,
          height: 56,
          minWidth: extended ? 56 : undefined,
          paddingHorizontal: extended ? 20 : 0,
        };
    }
  };

  const getVariantStyle = (): { backgroundColor: string; color: string } => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: secondaryColor,
          color: secondaryForegroundColor,
        };
      case 'destructive':
        return {
          backgroundColor: destructiveColor,
          color: destructiveForegroundColor,
        };
      default: // 'primary'
        return {
          backgroundColor: primaryColor,
          color: primaryForegroundColor,
        };
    }
  };

  const getPositionStyle = (): ViewStyle => {
    if (!absolute) return {};

    const basePositionStyle: ViewStyle = {
      position: 'absolute',
      zIndex: 1000,
    };

    const offset = 20; // Increased offset for better visual separation

    switch (position) {
      case 'bottom-left':
        return { ...basePositionStyle, bottom: offset, left: offset };
      case 'top-right':
        return { ...basePositionStyle, top: offset, right: offset };
      case 'top-left':
        return { ...basePositionStyle, top: offset, left: offset };
      default: // 'bottom-right'
        return { ...basePositionStyle, bottom: offset, right: offset };
    }
  };

  const getShadowStyle = (): ViewStyle => {
    if (!shadow) return {};

    return {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 8, // Android shadow
    };
  };

  const sizeStyle = getSizeStyle();
  const variantStyle = getVariantStyle();
  const positionStyle = getPositionStyle();
  const shadowStyle = getShadowStyle();

  const buttonStyle: ViewStyle = {
    ...sizeStyle,
    backgroundColor: variantStyle.backgroundColor,
    borderRadius: extended ? BORDER_RADIUS : 999,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: extended ? 'row' : 'column',
    ...shadowStyle,
  };

  const labelTextStyle: TextStyle = {
    color: variantStyle.color,
    fontSize: size === 'sm' ? 12 : size === 'lg' ? 16 : 14,
    fontWeight: '600',
    marginLeft: extended && icon ? 8 : 0,
  };

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator
          size={size === 'sm' ? 'small' : 'small'}
          color={variantStyle.color}
        />
      );
    }

    if (extended && icon && label) {
      return (
        <>
          {icon}
          <Text style={[labelTextStyle, textStyle]}>{label}</Text>
        </>
      );
    }

    if (icon) {
      return icon;
    }

    if (label) {
      return (
        <Text style={[labelTextStyle, textStyle]}>
          {label.charAt(0).toUpperCase()}
        </Text>
      );
    }

    return null;
  };

  return (
    <TouchableOpacity
      style={[buttonStyle, positionStyle, disabled && { opacity: 0.5 }, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {renderContent()}
    </TouchableOpacity>
  );
}

// Mini FAB component for quick actions
interface MiniFABProps
  extends Omit<FloatingActionButtonProps, 'size' | 'extended'> {
  children?: React.ReactNode;
}

export function MiniFAB({ children, icon, ...props }: MiniFABProps) {
  return (
    <FloatingActionButton
      {...props}
      size='sm'
      extended={false}
      icon={children || icon}
    />
  );
}

// Extended FAB component for labeled actions
interface ExtendedFABProps extends Omit<FloatingActionButtonProps, 'extended'> {
  children?: React.ReactNode;
}

export function ExtendedFAB({ children, label, ...props }: ExtendedFABProps) {
  return (
    <FloatingActionButton
      {...props}
      extended={true}
      label={label}
      icon={children}
    />
  );
}

// Compound component pattern
FloatingActionButton.Mini = MiniFAB;
FloatingActionButton.Extended = ExtendedFAB;

// FloatingContainer component to ensure FAB floats above scroll content
interface FloatingContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function FloatingContainer({ children, style }: FloatingContainerProps) {
  const { width, height } = Dimensions.get('window');

  return (
    <View
      style={[
        {
          position: 'absolute',
          top: 0,
          left: 0,
          width,
          height,
          zIndex: 999,
          pointerEvents: 'box-none', // Allow touches to pass through to content below
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

// Add FloatingContainer to compound components
FloatingActionButton.Container = FloatingContainer;

// Export default as FloatingActionButton
export default FloatingActionButton;
