import { Button } from '@/components/ui/button';
import { View } from '@/components/ui/view';
import React from 'react';

export function ButtonVariants() {
  return (
    <View style={{ gap: 12, flexDirection: 'row', flexWrap: 'wrap' }}>
      <Button variant='default' onPress={() => {}}>
        Default
      </Button>
      <Button variant='destructive' onPress={() => {}}>
        Destructive
      </Button>
      <Button variant='success' onPress={() => {}}>
        Success
      </Button>
      <Button variant='outline' onPress={() => {}}>
        Outline
      </Button>
      <Button variant='secondary' onPress={() => {}}>
        Secondary
      </Button>
      <Button variant='ghost' onPress={() => {}}>
        Ghost
      </Button>
      <Button variant='link' onPress={() => {}}>
        Link
      </Button>
    </View>
  );
}
