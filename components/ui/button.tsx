// components/ui/button.tsx
import { Text } from '@/components/ui/text';
import { useThemeColor } from '@/hooks/useThemeColor';
import { CORNERS, FONT_SIZE, HEIGHT } from '@/theme/globals';
import {
  ActivityIndicator,
  TextStyle,
  TouchableOpacity,
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
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle;
}

export function Button({
  children,
  onPress,
  variant = 'default',
  size = 'default',
  disabled = false,
  loading = false,
  style,
  textStyle,
}: ButtonProps) {
  const primaryColor = useThemeColor({}, 'primary');
  const primaryForegroundColor = useThemeColor({}, 'primaryForeground');
  const secondaryColor = useThemeColor({}, 'secondary');
  const destructiveColor = useThemeColor({}, 'red');
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

  const buttonStyle = getButtonStyle();
  const finalTextStyle = getButtonTextStyle(variant);

  return (
    <TouchableOpacity
      style={[buttonStyle, disabled && { opacity: 0.5 }, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading && (
        <ActivityIndicator
          size='small'
          color={
            variant === 'outline' || variant === 'ghost'
              ? primaryColor
              : primaryForegroundColor
          }
          style={{ marginRight: 8 }}
        />
      )}
      {typeof children === 'string' ? (
        <Text style={[finalTextStyle, textStyle]}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

export function getButtonTextStyle(
  variant: ButtonVariant = 'default'
): TextStyle {
  const primaryColor = useThemeColor({}, 'primary');
  const primaryForegroundColor = useThemeColor({}, 'primaryForeground');
  const secondaryForegroundColor = useThemeColor({}, 'secondaryForeground');
  const destructiveForegroundColor = useThemeColor({}, 'destructiveForeground');

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
}
