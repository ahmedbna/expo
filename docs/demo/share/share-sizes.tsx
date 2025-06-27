// registry/examples/share-sizes.tsx
import { ShareButton } from '@/components/ui/share';
import { View } from '@/components/ui/view';
import React from 'react';

export function ShareSizes() {
  const shareContent = {
    message: 'Check out this amazing content!',
    url: 'https://example.com',
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      <ShareButton content={shareContent} size='sm'>
        Small
      </ShareButton>

      <ShareButton content={shareContent} size='default'>
        Default
      </ShareButton>

      <ShareButton content={shareContent} size='lg'>
        Large
      </ShareButton>

      <ShareButton content={shareContent} size='icon' iconSize={20} />
    </View>
  );
}
