// components/ui/checkbox.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BORDER_RADIUS, FONT_SIZE } from '@/theme/globals';
import { Check } from 'lucide-react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';

interface CheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
}

export function Checkbox({
  checked,
  onCheckedChange,
  disabled = false,
  label,
}: CheckboxProps) {
  const primaryColor = useThemeColor({}, 'primary');
  const borderColor = useThemeColor({}, 'border');
  const foregroundColor = useThemeColor({}, 'foreground');
  const primaryForegroundColor = useThemeColor({}, 'primaryForeground');

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        opacity: disabled ? 0.5 : 1,
      }}
      onPress={() => !disabled && onCheckedChange(!checked)}
      disabled={disabled}
    >
      <View
        style={{
          width: BORDER_RADIUS,
          height: BORDER_RADIUS,
          borderRadius: BORDER_RADIUS,
          borderWidth: 1,
          borderColor: checked ? primaryColor : borderColor,
          backgroundColor: checked ? primaryColor : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: label ? 8 : 0,
        }}
      >
        {checked && (
          <Check
            size={16}
            color={primaryForegroundColor}
            strokeWidth={3}
            strokeLinecap='round'
          />
        )}
      </View>
      {label && (
        <Text
          style={{
            lineHeight: BORDER_RADIUS,
            color: primaryColor,
            fontSize: FONT_SIZE,
          }}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}
