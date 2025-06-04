// components/ui/loading-spinner.tsx
import { Text } from '@/components/ui/text';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Loader2 } from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';
type SpinnerVariant = 'default' | 'primary' | 'secondary' | 'muted';

interface LoadingSpinnerProps {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  label?: string;
  showLabel?: boolean;
  style?: ViewStyle;
  color?: string;
  thickness?: number;
  type?: 'activity' | 'custom' | 'dots' | 'pulse';
}

interface SpinnerConfig {
  size: number;
  iconSize: number;
  fontSize: number;
  gap: number;
}

const sizeConfig: Record<SpinnerSize, SpinnerConfig> = {
  sm: { size: 16, iconSize: 16, fontSize: 12, gap: 6 },
  md: { size: 24, iconSize: 24, fontSize: 14, gap: 8 },
  lg: { size: 32, iconSize: 32, fontSize: 16, gap: 10 },
  xl: { size: 48, iconSize: 48, fontSize: 18, gap: 12 },
};

export function Spinner({
  size = 'md',
  variant = 'default',
  label,
  showLabel = false,
  style,
  color,
  thickness = 2,
  type = 'activity',
}: LoadingSpinnerProps) {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const dotsAnim = useRef([
    new Animated.Value(0.3),
    new Animated.Value(0.3),
    new Animated.Value(0.3),
  ]).current;

  const primaryColor = useThemeColor({}, 'primary');
  const secondaryColor = useThemeColor({}, 'secondary');
  const mutedColor = useThemeColor({}, 'textMuted');
  const textColor = useThemeColor({}, 'text');

  const config = sizeConfig[size];

  const getSpinnerColor = () => {
    if (color) return color;

    switch (variant) {
      case 'primary':
        return primaryColor;
      case 'secondary':
        return secondaryColor;
      case 'muted':
        return mutedColor;
      default:
        return primaryColor;
    }
  };

  const spinnerColor = getSpinnerColor();

  // Rotation animation for custom spinner
  useEffect(() => {
    if (type === 'custom') {
      const rotateAnimation = Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      );
      rotateAnimation.start();
      return () => rotateAnimation.stop();
    }
  }, [rotateAnim, type]);

  // Pulse animation
  useEffect(() => {
    if (type === 'pulse') {
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      );
      pulseAnimation.start();
      return () => pulseAnimation.stop();
    }
  }, [pulseAnim, type]);

  // Dots animation
  useEffect(() => {
    if (type === 'dots') {
      const createDotAnimation = (animValue: Animated.Value, delay: number) =>
        Animated.loop(
          Animated.sequence([
            Animated.delay(delay),
            Animated.timing(animValue, {
              toValue: 1,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(animValue, {
              toValue: 0.3,
              duration: 400,
              useNativeDriver: true,
            }),
          ])
        );

      const animations = dotsAnim.map((anim, index) =>
        createDotAnimation(anim, index * 200)
      );

      animations.forEach((anim) => anim.start());
      return () => animations.forEach((anim) => anim.stop());
    }
  }, [dotsAnim, type]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const renderSpinner = () => {
    switch (type) {
      case 'activity':
        return (
          <ActivityIndicator
            size={config.size}
            color={spinnerColor}
            style={styles.spinner}
          />
        );

      case 'custom':
        return (
          <Animated.View
            style={[
              styles.customSpinner,
              {
                width: config.size,
                height: config.size,
                transform: [{ rotate: spin }],
              },
            ]}
          >
            <Loader2 size={config.iconSize} color={spinnerColor} />
          </Animated.View>
        );

      case 'pulse':
        return (
          <Animated.View
            style={[
              styles.pulseSpinner,
              {
                width: config.size,
                height: config.size,
                backgroundColor: spinnerColor,
                transform: [{ scale: pulseAnim }],
              },
            ]}
          />
        );

      case 'dots':
        return (
          <View style={[styles.dotsContainer, { gap: config.size / 4 }]}>
            {dotsAnim.map((anim, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  {
                    width: config.size / 3,
                    height: config.size / 3,
                    backgroundColor: spinnerColor,
                    opacity: anim,
                  },
                ]}
              />
            ))}
          </View>
        );

      default:
        return null;
    }
  };

  const containerStyle: ViewStyle = {
    alignItems: 'center',
    justifyContent: 'center',
    gap: config.gap,
  };

  return (
    <View style={[containerStyle, style]}>
      {renderSpinner()}
      {(showLabel || label) && (
        <Text
          variant='caption'
          style={{
            color: spinnerColor,
            fontSize: config.fontSize,
            textAlign: 'center',
          }}
        >
          {label || 'Loading...'}
        </Text>
      )}
    </View>
  );
}

// Loading overlay component for full-screen loading states
interface LoadingOverlayProps extends LoadingSpinnerProps {
  visible: boolean;
  backdrop?: boolean;
  backdropColor?: string;
  backdropOpacity?: number;
}

export function LoadingOverlay({
  visible,
  backdrop = true,
  backdropColor,
  backdropOpacity = 0.5,
  ...spinnerProps
}: LoadingOverlayProps) {
  const backgroundColor = useThemeColor({}, 'background');
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(overlayOpacity, {
      toValue: visible ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [visible, overlayOpacity]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.overlay,
        {
          backgroundColor: backdrop
            ? backdropColor ||
              `${backgroundColor}${Math.round(backdropOpacity * 255)
                .toString(16)
                .padStart(2, '0')}`
            : 'transparent',
          opacity: overlayOpacity,
        },
      ]}
      pointerEvents={visible ? 'auto' : 'none'}
    >
      <Spinner {...spinnerProps} />
    </Animated.View>
  );
}

// Inline loading component for buttons and smaller spaces
interface InlineLoaderProps {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  color?: string;
}

export function InlineLoader({
  size = 'sm',
  variant = 'default',
  color,
}: InlineLoaderProps) {
  return (
    <Spinner
      size={size}
      variant={variant}
      color={color}
      type='activity'
      style={{ minHeight: 0 }}
    />
  );
}

const styles = StyleSheet.create({
  spinner: {
    alignSelf: 'center',
  },
  customSpinner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseSpinner: {
    borderRadius: 999,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    borderRadius: 999,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
});
