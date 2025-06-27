// registry/examples/skeleton-shapes.tsx
import { Skeleton } from '@/components/ui/skeleton';
import { View } from '@/components/ui/view';
import React from 'react';

export function SkeletonShapes() {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
      {/* Circle */}
      <Skeleton width={60} height={60} style={{ borderRadius: 30 }} />

      {/* Square */}
      <Skeleton width={60} height={60} style={{ borderRadius: 4 }} />

      {/* Rounded Rectangle */}
      <Skeleton width={120} height={60} style={{ borderRadius: 12 }} />

      {/* Pill */}
      <Skeleton width={100} height={30} style={{ borderRadius: 15 }} />

      {/* Custom styled */}
      <Skeleton
        width={80}
        height={80}
        style={{
          borderRadius: 20,
          transform: [{ rotate: '45deg' }],
        }}
      />
    </View>
  );
}
