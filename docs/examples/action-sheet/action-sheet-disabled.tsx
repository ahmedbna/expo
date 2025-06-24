import { ActionSheet } from '@/components/ui/action-sheet';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Copy, Edit, Share, Trash2 } from 'lucide-react-native';
import React, { useState } from 'react';

export function ActionSheetDisabled() {
  const [visible, setVisible] = useState(false);

  const options = [
    {
      title: 'Edit',
      onPress: () => console.log('Edit pressed'),
      icon: <Icon IconComponent={Edit} size={20} />,
    },
    {
      title: 'Copy',
      onPress: () => console.log('Copy pressed'),
      icon: <Icon IconComponent={Copy} size={20} />,
      disabled: true,
    },
    {
      title: 'Share',
      onPress: () => console.log('Share pressed'),
      icon: <Icon IconComponent={Share} size={20} />,
      disabled: true,
    },
    {
      title: 'Delete',
      onPress: () => console.log('Delete pressed'),
      destructive: true,
      icon: <Icon IconComponent={Trash2} size={20} />,
    },
  ];

  return (
    <>
      <Button onPress={() => setVisible(true)}>
        Show with Disabled Options
      </Button>
      <ActionSheet
        visible={visible}
        onClose={() => setVisible(false)}
        title='Document Actions'
        message='Some actions are not available'
        options={options}
      />
    </>
  );
}
