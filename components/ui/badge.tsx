// components/ui/badge.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { BORDER_RADIUS } from '@/constants/globals';
import { useThemeColor } from '@/hooks/useThemeColor';
import { TextStyle, ViewStyle } from 'react-native';

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Badge({
  children,
  variant = 'default',
  style,
  textStyle,
}: BadgeProps) {
  const primaryColor = useThemeColor({}, 'primary');
  const primaryForegroundColor = useThemeColor({}, 'primaryForeground');
  const secondaryColor = useThemeColor({}, 'secondary');
  const secondaryForegroundColor = useThemeColor({}, 'secondaryForeground');
  const destructiveColor = useThemeColor({}, 'destructive');
  const destructiveForegroundColor = useThemeColor({}, 'destructiveForeground');
  const borderColor = useThemeColor({}, 'border');

  const getBadgeStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      paddingHorizontal: 8,
      borderRadius: BORDER_RADIUS,
    };

    switch (variant) {
      case 'secondary':
        return { ...baseStyle, backgroundColor: secondaryColor };
      case 'destructive':
        return { ...baseStyle, backgroundColor: destructiveColor };
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor,
        };
      default:
        return { ...baseStyle, backgroundColor: primaryColor };
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      fontSize: 12,
      fontWeight: '500',
    };

    switch (variant) {
      case 'secondary':
        return { ...baseTextStyle, color: secondaryForegroundColor };
      case 'destructive':
        return { ...baseTextStyle, color: destructiveForegroundColor };
      case 'outline':
        return { ...baseTextStyle, color: primaryColor };
      default:
        return { ...baseTextStyle, color: primaryForegroundColor };
    }
  };

  return (
    <View style={[getBadgeStyle(), style]}>
      <Text style={[getTextStyle(), textStyle]}>{children}</Text>
    </View>
  );
}
