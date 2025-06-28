// registry/examples/scroll-view-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { ScrollViewDemo } from '@/docs/demo/scroll-view/scroll-view-demo';
import { ScrollViewHorizontal } from '@/docs/demo/scroll-view/scroll-view-horizontal';
import { ScrollViewIndicators } from '@/docs/demo/scroll-view/scroll-view-indicators';
import { ScrollViewInset } from '@/docs/demo/scroll-view/scroll-view-inset';
import { ScrollViewNested } from '@/docs/demo/scroll-view/scroll-view-nested';
import { ScrollViewRefresh } from '@/docs/demo/scroll-view/scroll-view-refresh';
import { ScrollViewStyled } from '@/docs/demo/scroll-view/scroll-view-styled';
import { ScrollViewVertical } from '@/docs/demo/scroll-view/scroll-view-vertical';
import React from 'react';
import { ScrollView } from 'react-native';

// Main demo screen combining all examples
export function ScrollViewExample() {
  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 16,
      }}
    >
      <View style={{ gap: 32 }}>
        <View>
          <Text variant='heading' style={{ marginBottom: 16 }}>
            ScrollView Examples
          </Text>

          <View style={{ gap: 24 }}>
            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Default
              </Text>
              <ScrollViewDemo />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Vertical Scrolling
              </Text>
              <ScrollViewVertical />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Horizontal Scrolling
              </Text>
              <ScrollViewHorizontal />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Nested ScrollViews
              </Text>
              <ScrollViewNested />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Pull to Refresh
              </Text>
              <ScrollViewRefresh />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Custom Styling
              </Text>
              <ScrollViewStyled />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Scroll Indicators
              </Text>
              <ScrollViewIndicators />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Content Inset Adjustments
              </Text>
              <ScrollViewInset />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
