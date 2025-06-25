// registry/examples/badge-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { BadgeDemo } from '@/docs/demo/badge/badge-demo';
import { BadgeIcons } from '@/docs/demo/badge/badge-icons';
import { BadgeInteractive } from '@/docs/demo/badge/badge-interactive';
import { BadgeNotifications } from '@/docs/demo/badge/badge-notifications';
import { BadgeSizes } from '@/docs/demo/badge/badge-sizes';
import { BadgeStatus } from '@/docs/demo/badge/badge-status';
import { BadgeStyled } from '@/docs/demo/badge/badge-styled';
import React from 'react';
import { ScrollView } from 'react-native';

// Main demo screen combining all examples
export function BadgeExample() {
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
            Badge Examples
          </Text>

          <View style={{ gap: 24 }}>
            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Default Variants
              </Text>
              <BadgeDemo />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                With Icons
              </Text>
              <BadgeIcons />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Notification Badges
              </Text>
              <BadgeNotifications />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Custom Styling
              </Text>
              <BadgeStyled />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Interactive Badges
              </Text>
              <BadgeInteractive />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Different Sizes
              </Text>
              <BadgeSizes />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Status Indicators
              </Text>
              <BadgeStatus />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
