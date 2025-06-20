// components/ui/switch.tsx
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';

import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import {
  Switch as RNSwitch,
  SwitchProps as RNSwitchProps,
  TextStyle,
} from 'react-native';

interface SwitchProps extends RNSwitchProps {
  label?: string;
  error?: string;
  labelStyle?: TextStyle;
}

export function Switch({ label, error, labelStyle, ...props }: SwitchProps) {
  const mutedColor = useThemeColor({}, 'muted');
  const primary = useThemeColor({}, 'primary');
  const danger = useThemeColor({}, 'red');
  const muted = useThemeColor({}, 'textMuted');

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
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

      <RNSwitch
        trackColor={{ false: mutedColor, true: '#7DD87D' }}
        thumbColor={props.value ? '#ffffff' : '#f4f3f4'}
        {...props}
      />
    </View>
  );
}
