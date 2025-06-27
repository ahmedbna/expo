// registry/examples/skeleton-profile.tsx
import { Skeleton } from '@/components/ui/skeleton';
import { View } from '@/components/ui/view';
import React from 'react';

export function SkeletonProfile() {
  return (
    <View style={{ alignItems: 'center', gap: 16 }}>
      {/* Profile Picture */}
      <Skeleton width={80} height={80} style={{ borderRadius: 40 }} />

      {/* Name and Title */}
      <View style={{ alignItems: 'center', gap: 8 }}>
        <Skeleton width={150} height={20} />
        <Skeleton width={100} height={16} />
      </View>

      {/* Stats */}
      <View style={{ flexDirection: 'row', gap: 24 }}>
        <View style={{ alignItems: 'center', gap: 4 }}>
          <Skeleton width={30} height={18} />
          <Skeleton width={50} height={14} />
        </View>
        <View style={{ alignItems: 'center', gap: 4 }}>
          <Skeleton width={30} height={18} />
          <Skeleton width={50} height={14} />
        </View>
        <View style={{ alignItems: 'center', gap: 4 }}>
          <Skeleton width={30} height={18} />
          <Skeleton width={50} height={14} />
        </View>
      </View>

      {/* Bio */}
      <View style={{ gap: 8, width: '100%' }}>
        <Skeleton width='100%' height={16} />
        <Skeleton width='90%' height={16} />
        <Skeleton width='70%' height={16} />
      </View>
    </View>
  );
}
