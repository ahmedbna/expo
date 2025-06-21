// components/ui/button.tsx

import { Icon } from '@/components/ui/icon';
import { ButtonSpinner, SpinnerVariant } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { useThemeColor } from '@/hooks/useThemeColor';
import { CORNERS, FONT_SIZE, HEIGHT } from '@/theme/globals';
import { LucideProps } from 'lucide-react-native';
import { forwardRef } from 'react';
import {
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';

export type ButtonVariant =
  | 'default'
  | 'destructive'
  | 'confirm'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link';

export interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  label?: string;
  children: React.ReactNode;
  icon?: React.ComponentType<LucideProps>;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  loading?: boolean;
  loadingVariant?: SpinnerVariant;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle;
}

export const Button = forwardRef<View, ButtonProps>(
  (
    {
      children,
      icon,
      onPress,
      variant = 'default',
      size = 'default',
      disabled = false,
      loading = false,
      loadingVariant = 'default',
      style,
      textStyle,
      ...props
    },
    ref
  ) => {
    const primaryColor = useThemeColor({}, 'primary');
    const primaryForegroundColor = useThemeColor({}, 'primaryForeground');
    const secondaryColor = useThemeColor({}, 'secondary');
    const secondaryForegroundColor = useThemeColor({}, 'secondaryForeground');
    const destructiveColor = useThemeColor({}, 'red');
    const destructiveForegroundColor = useThemeColor(
      {},
      'destructiveForeground'
    );
    const greenColor = useThemeColor({}, 'green');
    const borderColor = useThemeColor({}, 'border');

    const getButtonStyle = (): ViewStyle => {
      const baseStyle: ViewStyle = {
        borderRadius: CORNERS,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      };

      // Size variants
      switch (size) {
        case 'sm':
          Object.assign(baseStyle, { height: 44, paddingHorizontal: 24 });
          break;
        case 'lg':
          Object.assign(baseStyle, { height: 54, paddingHorizontal: 36 });
          break;
        case 'icon':
          Object.assign(baseStyle, {
            height: HEIGHT,
            width: HEIGHT,
            paddingHorizontal: 0,
          });
          break;
        default:
          Object.assign(baseStyle, { height: HEIGHT, paddingHorizontal: 32 });
      }

      // Variant styles
      switch (variant) {
        case 'destructive':
          return { ...baseStyle, backgroundColor: destructiveColor };
        case 'confirm':
          return { ...baseStyle, backgroundColor: greenColor };
        case 'outline':
          return {
            ...baseStyle,
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor,
          };
        case 'secondary':
          return { ...baseStyle, backgroundColor: secondaryColor };
        case 'ghost':
          return { ...baseStyle, backgroundColor: 'transparent' };
        case 'link':
          return {
            ...baseStyle,
            backgroundColor: 'transparent',
            height: 'auto',
            paddingHorizontal: 0,
          };
        default:
          return { ...baseStyle, backgroundColor: primaryColor };
      }
    };

    const getButtonTextStyle = (): TextStyle => {
      const baseTextStyle: TextStyle = {
        fontSize: FONT_SIZE,
        fontWeight: '500',
      };

      switch (variant) {
        case 'destructive':
          return { ...baseTextStyle, color: destructiveForegroundColor };
        case 'confirm':
          return { ...baseTextStyle, color: destructiveForegroundColor };
        case 'outline':
          return { ...baseTextStyle, color: primaryColor };
        case 'secondary':
          return { ...baseTextStyle, color: secondaryForegroundColor };
        case 'ghost':
          return { ...baseTextStyle, color: primaryColor };
        case 'link':
          return {
            ...baseTextStyle,
            color: primaryColor,
            textDecorationLine: 'underline',
          };
        default:
          return { ...baseTextStyle, color: primaryForegroundColor };
      }
    };

    const getColor = (): string => {
      switch (variant) {
        case 'destructive':
          return destructiveForegroundColor;
        case 'confirm':
          return destructiveForegroundColor;
        case 'outline':
          return primaryColor;
        case 'secondary':
          return secondaryForegroundColor;
        case 'ghost':
          return primaryColor;
        case 'link':
          return primaryColor;
        default:
          return primaryForegroundColor;
      }
    };

    // Helper function to get icon size based on button size
    const getIconSize = (): number => {
      switch (size) {
        case 'sm':
          return 16;
        case 'lg':
          return 24;
        case 'icon':
          return 20;
        default:
          return 18;
      }
    };

    const buttonStyle = getButtonStyle();
    const finalTextStyle = getButtonTextStyle();
    const contentColor = getColor();
    const iconSize = getIconSize();

    return (
      <TouchableOpacity
        ref={ref}
        style={[buttonStyle, disabled && { opacity: 0.5 }, style]}
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        {...props}
      >
        {loading ? (
          <ButtonSpinner
            size={size}
            variant={loadingVariant}
            color={contentColor}
          />
        ) : typeof children === 'string' ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            {icon && (
              <Icon IconComponent={icon} color={contentColor} size={iconSize} />
            )}
            <Text style={[finalTextStyle, textStyle]}>{children}</Text>
          </View>
        ) : (
          children
        )}
      </TouchableOpacity>
    );
  }
);

// Add display name for better debugging
Button.displayName = 'Button';
