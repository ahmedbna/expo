// components/ui/switch.tsx
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';

import { Switch as RNSwitch, SwitchProps as RNSwitchProps } from 'react-native';

interface SwitchProps extends RNSwitchProps {}

export function Switch(props: SwitchProps) {
  const primaryColor = useThemeColor({}, 'primary');
  const mutedColor = useThemeColor({}, 'muted');

  return (
    <RNSwitch
      trackColor={{ false: mutedColor, true: primaryColor }}
      thumbColor={props.value ? '#ffffff' : '#f4f3f4'}
      {...props}
    />
  );
}
