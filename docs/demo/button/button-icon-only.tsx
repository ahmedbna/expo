import { Button } from '@/components/ui/button';
import { View } from '@/components/ui/view';
import {
  Heart,
  MessageCircle,
  MoreHorizontal,
  Settings,
  Share,
} from 'lucide-react-native';
import React from 'react';

export function ButtonIconOnly() {
  return (
    <View style={{ gap: 12, flexDirection: 'row', flexWrap: 'wrap' }}>
      <Button size='icon' onPress={() => {}}>
        <Settings size={20} color='white' />
      </Button>
      <Button size='icon' variant='outline' onPress={() => {}}>
        <Heart size={20} color='#18181b' />
      </Button>
      <Button size='icon' variant='secondary' onPress={() => {}}>
        <Share size={20} color='#18181b' />
      </Button>
      <Button size='icon' variant='ghost' onPress={() => {}}>
        <MoreHorizontal size={20} color='#18181b' />
      </Button>
      <Button size='icon' variant='destructive' onPress={() => {}}>
        <MessageCircle size={20} color='white' />
      </Button>
    </View>
  );
}
