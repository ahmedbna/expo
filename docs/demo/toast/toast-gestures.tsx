// registry/examples/toast-gestures.tsx
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useToast } from '@/components/ui/toast';
import { View } from '@/components/ui/view';
import React from 'react';

export function ToastGestures() {
  const { toast } = useToast();

  const showSwipeableToast = () => {
    toast({
      title: 'Swipe to dismiss',
      description:
        'Try swiping this toast left or right to dismiss it quickly!',
      variant: 'info',
      duration: 10000, // Long duration to allow time for gesture
    });
  };

  return (
    <View style={{ gap: 16 }}>
      <View>
        <Text variant='body' style={{ marginBottom: 8, opacity: 0.7 }}>
          The toast supports swipe gestures for quick dismissal
        </Text>
        <Button onPress={showSwipeableToast} variant='outline'>
          Show Swipeable Toast
        </Button>
      </View>

      <View
        style={{
          padding: 12,
          backgroundColor: '#f0f0f0',
          borderRadius: 8,
          borderLeftWidth: 4,
          borderLeftColor: '#007AFF',
        }}
      >
        <Text variant='caption' style={{ fontWeight: '600', marginBottom: 4 }}>
          Gesture Instructions:
        </Text>
        <Text variant='caption' style={{ opacity: 0.8 }}>
          • Swipe left or right to dismiss
        </Text>
        <Text variant='caption' style={{ opacity: 0.8 }}>
          • Swipe threshold: 25% of screen width
        </Text>
        <Text variant='caption' style={{ opacity: 0.8 }}>
          • Fast swipes (velocity {'>'} 800) dismiss immediately
        </Text>
      </View>
    </View>
  );
}
