// components/ui/label.tsx
import { useThemeColor } from '@/hooks/useThemeColor';
import { Text, TextStyle } from 'react-native';

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
          fontSize: 14,
          fontWeight: '500',
          color: foregroundColor,
          marginBottom: 8,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
