// registry/examples/input-otp-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { InputOTPDemo } from '@/docs/demo/input-otp/input-otp-demo';
import { InputOTPDisabled } from '@/docs/demo/input-otp/input-otp-disabled';
import { InputOTPError } from '@/docs/demo/input-otp/input-otp-error';
import { InputOTPLengths } from '@/docs/demo/input-otp/input-otp-lengths';
import { InputOTPMasked } from '@/docs/demo/input-otp/input-otp-masked';
import { InputOTPNoCursor } from '@/docs/demo/input-otp/input-otp-no-cursor';
import { InputOTPSeparator } from '@/docs/demo/input-otp/input-otp-separator';
import { InputOTPStyled } from '@/docs/demo/input-otp/input-otp-styled';
import React from 'react';
import { ScrollView } from 'react-native';

// Main demo screen combining all examples
export function InputOTPExample() {
  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 16,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ gap: 32 }}>
        <View>
          <Text variant='heading' style={{ marginBottom: 16 }}>
            Input OTP Examples
          </Text>

          <View style={{ gap: 32 }}>
            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Default
              </Text>
              <InputOTPDemo />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Different Lengths
              </Text>
              <InputOTPLengths />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                With Separators
              </Text>
              <InputOTPSeparator />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Masked Input
              </Text>
              <InputOTPMasked />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Error State
              </Text>
              <InputOTPError />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Disabled State
              </Text>
              <InputOTPDisabled />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Custom Styling
              </Text>
              <InputOTPStyled />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 12 }}>
                Cursor Options
              </Text>
              <InputOTPNoCursor />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
