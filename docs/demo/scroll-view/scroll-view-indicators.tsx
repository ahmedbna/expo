// registry/examples/scroll-view-indicators.tsx
import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function ScrollViewIndicators() {
  return (
    <View style={{ gap: 16 }}>
      {/* Vertical with indicators */}
      <View>
        <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>
          With Scroll Indicators
        </Text>
        <View
          style={{
            height: 150,
            borderWidth: 1,
            borderColor: '#e5e7eb',
            borderRadius: 8,
          }}
        >
          <ScrollView
            contentContainerStyle={{ padding: 16, gap: 8 }}
            showsVerticalScrollIndicator={true}
            indicatorStyle='black'
          >
            {Array.from({ length: 12 }, (_, i) => (
              <Text
                key={i}
                style={{
                  padding: 12,
                  backgroundColor: '#dbeafe',
                  borderRadius: 6,
                  color: '#1e40af',
                }}
              >
                Item {i + 1} - Scroll indicators visible
              </Text>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Horizontal without indicators */}
      <View>
        <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>
          Without Scroll Indicators
        </Text>
        <View
          style={{
            height: 100,
            borderWidth: 1,
            borderColor: '#e5e7eb',
            borderRadius: 8,
          }}
        >
          <ScrollView
            horizontal={true}
            contentContainerStyle={{ padding: 16, gap: 12 }}
            showsHorizontalScrollIndicator={false}
          >
            {Array.from({ length: 8 }, (_, i) => (
              <View
                key={i}
                style={{
                  width: 80,
                  height: 60,
                  backgroundColor: '#fbbf24',
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                  {i + 1}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
