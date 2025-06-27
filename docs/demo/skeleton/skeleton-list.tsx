// registry/examples/skeleton-list.tsx
import { Skeleton } from '@/components/ui/skeleton';
import { View } from '@/components/ui/view';
import React from 'react';

export function SkeletonList() {
  return (
    <View style={{ gap: 16 }}>
      {Array.from({ length: 5 }, (_, i) => (
        <View
          key={i}
          style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}
        >
          <Skeleton width={50} height={50} style={{ borderRadius: 25 }} />
          <View style={{ flex: 1, gap: 6 }}>
            <Skeleton width='70%' height={16} />
            <Skeleton width='50%' height={14} />
            <Skeleton width='30%' height={12} />
          </View>
        </View>
      ))}
    </View>
  );
}
