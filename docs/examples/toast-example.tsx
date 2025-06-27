// registry/examples/toast-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { ToastActions } from '@/docs/demo/toast/toast-actions';
import { ToastCompact } from '@/docs/demo/toast/toast-compact';
import { ToastDemo } from '@/docs/demo/toast/toast-demo';
import { ToastDuration } from '@/docs/demo/toast/toast-duration';
import { ToastGestures } from '@/docs/demo/toast/toast-gestures';
import { ToastMultiple } from '@/docs/demo/toast/toast-multiple';
import { ToastVariants } from '@/docs/demo/toast/toast-variants';
import React from 'react';
import { ScrollView } from 'react-native';

// Main demo screen combining all toast examples
export function ToastExample() {
  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 16,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ gap: 32, paddingBottom: 32 }}>
        <View>
          <Text variant='heading' style={{ marginBottom: 8 }}>
            Toast Examples
          </Text>
          <Text variant='body' style={{ opacity: 0.7, marginBottom: 24 }}>
            Interactive toast notifications with Dynamic Island animations
          </Text>

          <View style={{ gap: 24 }}>
            <View>
              <Text variant='title' style={{ marginBottom: 8 }}>
                Default
              </Text>
              <Text
                variant='caption'
                style={{ opacity: 0.6, marginBottom: 12 }}
              >
                Basic toast with title and description
              </Text>
              <ToastDemo />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 8 }}>
                Variants
              </Text>
              <Text
                variant='caption'
                style={{ opacity: 0.6, marginBottom: 12 }}
              >
                Different toast types with icons and colors
              </Text>
              <ToastVariants />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 8 }}>
                With Actions
              </Text>
              <Text
                variant='caption'
                style={{ opacity: 0.6, marginBottom: 12 }}
              >
                Toasts with interactive action buttons
              </Text>
              <ToastActions />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 8 }}>
                Custom Duration
              </Text>
              <Text
                variant='caption'
                style={{ opacity: 0.6, marginBottom: 12 }}
              >
                Control how long toasts stay visible
              </Text>
              <ToastDuration />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 8 }}>
                Multiple Toasts
              </Text>
              <Text
                variant='caption'
                style={{ opacity: 0.6, marginBottom: 12 }}
              >
                Stack multiple toasts and manage them
              </Text>
              <ToastMultiple />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 8 }}>
                Compact Mode
              </Text>
              <Text
                variant='caption'
                style={{ opacity: 0.6, marginBottom: 12 }}
              >
                Minimal toasts with icons only or title only
              </Text>
              <ToastCompact />
            </View>

            <View>
              <Text variant='title' style={{ marginBottom: 8 }}>
                Gesture Dismissal
              </Text>
              <Text
                variant='caption'
                style={{ opacity: 0.6, marginBottom: 12 }}
              >
                Swipe toasts to dismiss them quickly
              </Text>
              <ToastGestures />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
