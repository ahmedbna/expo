import { ActionSheet } from '@/components/ui/action-sheet';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import {
  Archive,
  Bookmark,
  Copy,
  Download,
  Edit,
  EyeOff,
  Flag,
  Heart,
  Pin,
  Send,
  Share,
  Star,
  Trash2,
} from 'lucide-react-native';
import React, { useState } from 'react';

export function ActionSheetLong() {
  const [visible, setVisible] = useState(false);

  const options = [
    {
      title: 'Edit Document',
      onPress: () => console.log('Edit'),
      icon: <Icon IconComponent={Edit} size={20} />,
    },
    {
      title: 'Share',
      onPress: () => console.log('Share'),
      icon: <Icon IconComponent={Share} size={20} />,
    },
    {
      title: 'Download',
      onPress: () => console.log('Download'),
      icon: <Icon IconComponent={Download} size={20} />,
    },
    {
      title: 'Copy Link',
      onPress: () => console.log('Copy link'),
      icon: <Icon IconComponent={Copy} size={20} />,
    },
    {
      title: 'Archive',
      onPress: () => console.log('Archive'),
      icon: <Icon IconComponent={Archive} size={20} />,
    },
    {
      title: 'Pin to Top',
      onPress: () => console.log('Pin'),
      icon: <Icon IconComponent={Pin} size={20} />,
    },
    {
      title: 'Add to Favorites',
      onPress: () => console.log('Favorite'),
      icon: <Icon IconComponent={Heart} size={20} />,
    },
    {
      title: 'Rate & Review',
      onPress: () => console.log('Rate'),
      icon: <Icon IconComponent={Star} size={20} />,
    },
    {
      title: 'Bookmark',
      onPress: () => console.log('Bookmark'),
      icon: <Icon IconComponent={Bookmark} size={20} />,
    },
    {
      title: 'Send Message',
      onPress: () => console.log('Send message'),
      icon: <Icon IconComponent={Send} size={20} />,
    },
    {
      title: 'Hide from Feed',
      onPress: () => console.log('Hide'),
      icon: <Icon IconComponent={EyeOff} size={20} />,
    },
    {
      title: 'Report Issue',
      onPress: () => console.log('Report'),
      icon: <Icon IconComponent={Flag} size={20} />,
    },
    {
      title: 'Delete',
      onPress: () => console.log('Delete'),
      destructive: true,
      icon: <Icon IconComponent={Trash2} size={20} />,
    },
  ];

  return (
    <>
      <Button onPress={() => setVisible(true)}>Show Long List</Button>
      <ActionSheet
        visible={visible}
        onClose={() => setVisible(false)}
        title='All Actions'
        message='Scroll to see all available options'
        options={options}
      />
    </>
  );
}
