// Example usage of Loading Spinner components
import { Button } from '@/components/ui/button';
import { InlineLoader, LoadingOverlay, Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';

export default function LoadingSpinnerExample() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleButtonPress = async () => {
    setButtonLoading(true);
    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setButtonLoading(false);
  };

  const handleOverlayDemo = async () => {
    setShowOverlay(true);
    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setShowOverlay(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, padding: 20 }}>
        <View style={{ gap: 24 }}>
          {/* Basic Spinners */}
          <View style={{ gap: 16 }}>
            <Text variant='title'>Basic Spinners</Text>

            <View
              style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}
            >
              <Spinner size='sm' />
              <Spinner size='md' />
              <Spinner size='lg' />
              <Spinner size='xl' />
            </View>
          </View>

          {/* Spinner Variants */}
          <View style={{ gap: 16 }}>
            <Text variant='title'>Spinner Variants</Text>

            <View
              style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}
            >
              <Spinner variant='default' />
              <Spinner variant='primary' />
              <Spinner variant='secondary' />
              <Spinner variant='muted' />
            </View>
          </View>

          {/* Spinner Types */}
          <View style={{ gap: 16 }}>
            <Text variant='title'>Spinner Types</Text>

            <View style={{ gap: 12 }}>
              <View
                style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}
              >
                <Spinner type='activity' size='lg' />
                <Text variant='caption'>Activity Indicator</Text>
              </View>

              <View
                style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}
              >
                <Spinner type='custom' size='lg' />
                <Text variant='caption'>Custom Icon</Text>
              </View>

              <View
                style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}
              >
                <Spinner type='pulse' size='lg' />
                <Text variant='caption'>Pulse Animation</Text>
              </View>

              <View
                style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}
              >
                <Spinner type='dots' size='lg' />
                <Text variant='caption'>Dots Animation</Text>
              </View>
            </View>
          </View>

          {/* Spinners with Labels */}
          <View style={{ gap: 16 }}>
            <Text variant='title'>With Labels</Text>

            <View style={{ gap: 12 }}>
              <Spinner size='lg' showLabel label='Loading data...' />

              <Spinner
                type='dots'
                size='md'
                showLabel
                label='Processing...'
                variant='primary'
              />
            </View>
          </View>

          {/* Inline Usage */}
          <View style={{ gap: 16 }}>
            <Text variant='title'>Inline Usage</Text>

            <View
              style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}
            >
              <InlineLoader />
              <Text variant='body'>Loading content...</Text>
            </View>

            <View
              style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}
            >
              <Text variant='body'>Saving</Text>
              <InlineLoader size='sm' variant='muted' />
            </View>
          </View>

          {/* Button with Loading State */}
          <View style={{ gap: 16 }}>
            <Text variant='title'>Button Integration</Text>

            <Button
              onPress={handleButtonPress}
              disabled={buttonLoading}
              loading={buttonLoading}
              style={{ alignSelf: 'flex-start' }}
            >
              {buttonLoading ? 'Processing...' : 'Click me'}
            </Button>
          </View>

          {/* Overlay Demo */}
          <View style={{ gap: 16 }}>
            <Text variant='title'>Loading Overlay</Text>

            <Button
              onPress={handleOverlayDemo}
              variant='outline'
              style={{ alignSelf: 'flex-start' }}
            >
              Show Loading Overlay
            </Button>
          </View>

          {/* Custom Colors */}
          <View style={{ gap: 16 }}>
            <Text variant='title'>Custom Colors</Text>

            <View
              style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}
            >
              <Spinner color='#ff6b6b' size='lg' />
              <Spinner color='#4ecdc4' size='lg' type='pulse' />
              <Spinner color='#45b7d1' size='lg' type='dots' />
              <Spinner color='#96ceb4' size='lg' type='custom' />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Loading Overlay */}
      <LoadingOverlay
        visible={showOverlay}
        size='xl'
        type='custom'
        label='Loading your data...'
        showLabel
      />
    </View>
  );
}

// Example: Enhanced Button with built-in loading state

interface LoadingButtonProps {
  children: React.ReactNode;
  onPress?: () => Promise<void> | void;
  variant?: any;
  size?: any;
  disabled?: boolean;
  style?: any;
  textStyle?: any;
  loadingText?: string;
}

export function LoadingButton({
  children,
  onPress,
  loadingText,
  ...props
}: LoadingButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = async () => {
    if (!onPress || isLoading) return;

    setIsLoading(true);
    try {
      await onPress();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      {...props}
      onPress={handlePress}
      disabled={props.disabled || isLoading}
      style={[{ flexDirection: 'row', gap: 8 }, props.style]}
    >
      {isLoading && <InlineLoader size='sm' />}
      <Text>{isLoading ? loadingText || 'Loading...' : children}</Text>
    </Button>
  );
}
