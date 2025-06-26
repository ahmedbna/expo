// registry/examples/popover-positioning.tsx
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function PopoverPositioning() {
  return (
    <View style={{ gap: 16, alignItems: 'center' }}>
      <Popover>
        <PopoverTrigger>
          <Button>Top</Button>
        </PopoverTrigger>
        <PopoverContent side='top'>
          <PopoverBody>
            <Text>Popover content positioned on top</Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>

      <View style={{ flexDirection: 'row', gap: 16 }}>
        <Popover>
          <PopoverTrigger>
            <Button>Left</Button>
          </PopoverTrigger>
          <PopoverContent side='left'>
            <PopoverBody>
              <Text>Left positioned</Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger>
            <Button>Right</Button>
          </PopoverTrigger>
          <PopoverContent side='right'>
            <PopoverBody>
              <Text>Right positioned</Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </View>

      <Popover>
        <PopoverTrigger>
          <Button>Bottom</Button>
        </PopoverTrigger>
        <PopoverContent side='bottom'>
          <PopoverBody>
            <Text>Popover content positioned on bottom</Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </View>
  );
}
