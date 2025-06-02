// components/ui/checkbox.tsx
import { BorderRadius } from '@/constants/globals';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { Text, View } from 'react-native';

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
          width: 20,
          height: 20,
          borderRadius: BorderRadius.sm,
          borderWidth: 2,
          borderColor: checked ? primaryColor : borderColor,
          backgroundColor: checked ? primaryColor : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: label ? 8 : 0,
        }}
      >
        {checked && (
          <Text
            style={{
              color: primaryForegroundColor,
              fontSize: 12,
              fontWeight: 'bold',
            }}
          >
            ✓
          </Text>
        )}
      </View>
      {label && (
        <Text
          style={{
            color: foregroundColor,
            fontSize: 14,
          }}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}
