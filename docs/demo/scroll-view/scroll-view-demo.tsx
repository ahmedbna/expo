// registry/examples/scroll-view-demo.tsx
import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function ScrollViewDemo() {
  return (
    <View
      style={{
        height: 200,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 8,
      }}
    >
      <ScrollView style={{ padding: 16 }}>
        {Array.from({ length: 20 }, (_, i) => (
          <Text
            key={i}
            style={{
              marginBottom: 8,
              padding: 12,
              backgroundColor: '#f3f4f6',
              borderRadius: 6,
            }}
          >
            Scrollable item {i + 1}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}
