// components/ui/input.tsx
import { BORDER_RADIUS } from '@/constants/globals';
import { useThemeColor } from '@/hooks/useThemeColor';
import { forwardRef } from 'react';
import { TextInput, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  variant?: 'default' | 'outline';
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ style, variant = 'default', ...props }, ref) => {
    const backgroundColor = useThemeColor({}, 'background');
    const borderColor = useThemeColor({}, 'border');
    const textColor = useThemeColor({}, 'foreground');
    const placeholderColor = useThemeColor({}, 'mutedForeground');

    return (
      <TextInput
        ref={ref}
        style={[
          {
            width: '100%',
            height: 40,
            borderWidth: 1,
            borderColor: borderColor,
            borderRadius: BORDER_RADIUS,
            paddingHorizontal: 12,
            backgroundColor: backgroundColor,
            color: textColor,
            fontSize: 14,
          },
          style,
        ]}
        placeholderTextColor={placeholderColor}
        {...props}
      />
    );
  }
);
