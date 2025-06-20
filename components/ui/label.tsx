// components/ui/label.tsx
import { Text } from '@/components/ui/text';
import { useThemeColor } from '@/hooks/useThemeColor';
import { FONT_SIZE } from '@/theme/globals';
import { TextStyle } from 'react-native';

interface LabelProps {
  children: React.ReactNode;
  style?: TextStyle;
}

export function Label({ children, style }: LabelProps) {
  const foregroundColor = useThemeColor({}, 'foreground');

  return (
    <Text
      style={[
        {
          fontSize: FONT_SIZE,
          fontWeight: '500',
          color: foregroundColor,
          marginBottom: 2,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
