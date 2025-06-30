// registry/examples/avatar-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { AvatarBordered } from '@/docs/demo/avatar/avatar-bordered';
import { AvatarDemo } from '@/docs/demo/avatar/avatar-demo';
import { AvatarFallbackDemo } from '@/docs/demo/avatar/avatar-fallback';
import { AvatarGroup } from '@/docs/demo/avatar/avatar-group';
import { AvatarSizes } from '@/docs/demo/avatar/avatar-sizes';
import { AvatarStatus } from '@/docs/demo/avatar/avatar-status';
import { AvatarStyled } from '@/docs/demo/avatar/avatar-styled';
import React from 'react';
import { ScrollView } from 'react-native';

// Main demo screen combining all examples
export function AvatarExample() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: 'center',
      }}
    >
      <Text variant='heading' style={{ marginBottom: 16 }}>
        Avatar
      </Text>

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Default
        </Text>
        <AvatarDemo />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Different Sizes
        </Text>
        <AvatarSizes />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Fallback Only
        </Text>
        <AvatarFallbackDemo />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Custom Styling
        </Text>
        <AvatarStyled />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Avatar Group
        </Text>
        <AvatarGroup />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          With Status Indicators
        </Text>
        <AvatarStatus />
      </View> */}

      <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Bordered with Shadows
        </Text>
        <AvatarBordered />
      </View>
    </View>
  );
}
