// registry/examples/skeleton-card.tsx
import { Skeleton } from '@/components/ui/skeleton';
import { View } from '@/components/ui/view';
import React from 'react';

export function SkeletonCard() {
  return (
    <View
      style={{
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#f8f9fa',
        gap: 12,
      }}
    >
      {/* Header */}
      <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
        <Skeleton width={40} height={40} style={{ borderRadius: 20 }} />
        <View style={{ flex: 1, gap: 4 }}>
          <Skeleton width='60%' height={16} />
          <Skeleton width='40%' height={12} />
        </View>
      </View>

      {/* Content */}
      <Skeleton width='100%' height={200} />

      {/* Footer */}
      <View style={{ gap: 8 }}>
        <Skeleton width='100%' height={16} />
        <Skeleton width='80%' height={16} />
        <Skeleton width='60%' height={16} />
      </View>
    </View>
  );
}
