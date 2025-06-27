// registry/examples/switch-disabled.tsx
import { Switch } from '@/components/ui/switch';
import { View } from '@/components/ui/view';
import React from 'react';

export function SwitchDisabled() {
  return (
    <View style={{ gap: 12 }}>
      <Switch
        label='Disabled (Off)'
        value={false}
        onValueChange={() => {}}
        disabled={true}
      />
      <Switch
        label='Disabled (On)'
        value={true}
        onValueChange={() => {}}
        disabled={true}
      />
    </View>
  );
}
