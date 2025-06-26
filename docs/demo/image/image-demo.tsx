// registry/examples/image-demo.tsx
import { Image } from '@/components/ui/image';
import React from 'react';

export function ImageDemo() {
  return (
    <Image
      source={{ uri: 'https://picsum.photos/400/300' }}
      width={400}
      height={300}
      style={{ borderRadius: 8 }}
    />
  );
}
