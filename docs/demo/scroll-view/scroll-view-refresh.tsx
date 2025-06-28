// registry/examples/scroll-view-refresh.tsx
import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useCallback, useState } from 'react';
import { RefreshControl } from 'react-native';

export function ScrollViewRefresh() {
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(
    new Date().toLocaleTimeString()
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setLastRefresh(new Date().toLocaleTimeString());
    }, 2000);
  }, []);

  return (
    <View
      style={{
        height: 300,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 8,
      }}
    >
      <ScrollView
        contentContainerStyle={{ padding: 16 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View
          style={{
            padding: 16,
            backgroundColor: '#ecfdf5',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#10b981',
            marginBottom: 16,
          }}
        >
          <Text
            style={{ fontWeight: 'bold', color: '#065f46', marginBottom: 4 }}
          >
            Pull to Refresh
          </Text>
          <Text style={{ color: '#047857' }}>
            Last refreshed: {lastRefresh}
          </Text>
        </View>

        {Array.from({ length: 15 }, (_, i) => (
          <View
            key={i}
            style={{
              padding: 16,
              backgroundColor: '#f8fafc',
              borderRadius: 8,
              marginBottom: 8,
              borderLeftWidth: 4,
              borderLeftColor: '#3b82f6',
            }}
          >
            <Text style={{ fontWeight: '600', marginBottom: 4 }}>
              News Item {i + 1}
            </Text>
            <Text style={{ color: '#6b7280' }}>
              This is a sample news item that demonstrates the pull-to-refresh
              functionality.
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
