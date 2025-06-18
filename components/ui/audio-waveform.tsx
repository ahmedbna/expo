// components/ui/audio-waveform.tsx
import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  PanResponder,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

export interface AudioWaveformProps {
  data?: number[]; // Audio amplitude data
  isPlaying?: boolean;
  progress?: number; // 0-100
  onSeek?: (position: number) => void;
  onSeekStart?: () => void;
  onSeekEnd?: () => void;
  style?: ViewStyle;
  height?: number;
  barCount?: number;
  barWidth?: number;
  barGap?: number;
  activeColor?: string;
  inactiveColor?: string;
  animated?: boolean;
  showProgress?: boolean;
  interactive?: boolean; // New prop to enable seeking
}

export function AudioWaveform({
  data,
  isPlaying = false,
  progress = 0,
  onSeek,
  onSeekStart,
  onSeekEnd,
  style,
  height = 60,
  barCount = 50,
  barWidth = 3,
  barGap = 2,
  activeColor,
  inactiveColor,
  animated = true,
  showProgress = false,
  interactive = false,
}: AudioWaveformProps) {
  // Theme colors
  const primaryColor = useThemeColor({}, 'destructive');
  const mutedColor = useThemeColor({}, 'textMuted');

  const finalActiveColor = activeColor || primaryColor;
  const finalInactiveColor = inactiveColor || mutedColor;

  // Animation values for each bar
  const animatedBars = useRef(
    Array.from({ length: barCount }, () => new Animated.Value(0.2))
  ).current;

  // Animation values for playing effect
  const playingAnimations = useRef(
    Array.from({ length: barCount }, () => new Animated.Value(1))
  ).current;

  // Generate sample data if none provided
  const waveformData = data || generateSampleWaveform(barCount);

  // Container ref for measuring dimensions
  const containerRef = useRef<View>(null);
  const containerWidth = useRef(0);

  // Update animated values when data changes (for real-time updates)
  useEffect(() => {
    if (data && !animated) {
      // Direct update without animation for real-time data
      animatedBars.forEach((bar, index) => {
        const value = waveformData[index] || 0.2;
        bar.setValue(value);
      });
    }
  }, [data, animated, waveformData]);

  // Initialize bar heights
  useEffect(() => {
    animatedBars.forEach((bar, index) => {
      const value = waveformData[index] || 0.2;
      bar.setValue(value);
    });
  }, [waveformData]);

  // Simplified animation system - no shaking
  useEffect(() => {
    if (isPlaying && animated && !showProgress) {
      // Only animate for recording/non-progress waveforms
      const animateWaveform = () => {
        animatedBars.forEach((bar, index) => {
          const delay = index * 20;
          const variation = 0.9 + Math.sin(Date.now() / 1000 + index) * 0.1;
          const targetValue = waveformData[index] * variation;

          Animated.timing(bar, {
            toValue: Math.max(0.1, Math.min(1, targetValue)),
            duration: 300,
            delay,
            useNativeDriver: false,
          }).start();
        });
      };

      const interval = setInterval(animateWaveform, 300);
      return () => clearInterval(interval);
    } else {
      // Reset all animations to static state
      playingAnimations.forEach((animation) => {
        animation.setValue(1);
      });
    }
  }, [isPlaying, animated, showProgress, waveformData]);

  // Pan responder for seeking
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => interactive,
      onMoveShouldSetPanResponderCapture: () => interactive,
      onPanResponderGrant: (evt) => {
        if (!interactive) return;
        onSeekStart?.();
        handleSeek(evt.nativeEvent.locationX);
      },
      onPanResponderMove: (evt) => {
        if (!interactive) return;
        handleSeek(evt.nativeEvent.locationX);
      },
      onPanResponderRelease: () => {
        if (!interactive) return;
        onSeekEnd?.();
      },
      onPanResponderTerminate: () => {
        if (!interactive) return;
        onSeekEnd?.();
      },
    })
  ).current;

  const handleSeek = (x: number) => {
    if (!interactive || !onSeek || containerWidth.current === 0) return;

    const clampedX = Math.max(0, Math.min(containerWidth.current, x));
    const seekPercentage = (clampedX / containerWidth.current) * 100;
    onSeek(seekPercentage);
  };

  const handleBarPress = (index: number) => {
    if (!interactive || !onSeek) return;

    const position = (index / barCount) * 100;
    onSeekStart?.();
    onSeek(position);
    onSeekEnd?.();
  };

  const onLayout = (event: any) => {
    containerWidth.current = event.nativeEvent.layout.width;
  };

  const totalWidth = barCount * barWidth + (barCount - 1) * barGap;

  return (
    <View
      style={[styles.container, { height }, style]}
      {...(interactive ? panResponder.panHandlers : {})}
      onLayout={onLayout}
      ref={containerRef}
    >
      <View style={[styles.waveform, { width: totalWidth }]}>
        {animatedBars.map((animatedValue, index) => {
          const progressRatio = progress / 100;
          const barProgress = index / barCount;
          const isActive = showProgress ? barProgress <= progressRatio : false;
          const isPastProgress = showProgress
            ? barProgress > progressRatio
            : false;

          // Calculate opacity for smooth fade effect
          let opacity = 1;
          if (showProgress && isPastProgress) {
            const distanceFromProgress = barProgress - progressRatio;
            opacity = Math.max(0.4, 1 - distanceFromProgress * 1.5);
          }

          return (
            <View
              key={index}
              style={[
                styles.barContainer,
                {
                  width: barWidth,
                  marginRight: index < barCount - 1 ? barGap : 0,
                },
              ]}
            >
              <Animated.View
                style={[
                  styles.bar,
                  {
                    width: barWidth,
                    backgroundColor:
                      isActive || !showProgress
                        ? finalActiveColor
                        : finalInactiveColor,
                    opacity: opacity,
                    height: animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [4, height * 0.9],
                    }),
                  },
                ]}
              />
            </View>
          );
        })}
      </View>

      {/* Progress indicator line */}
      {showProgress && (
        <View
          style={[
            styles.progressLine,
            {
              left: (progress / 100) * totalWidth,
              height: height * 0.9,
              backgroundColor: finalActiveColor,
            },
          ]}
        />
      )}

      {/* Invisible overlay for better touch handling */}
      {interactive && (
        <View
          style={[
            styles.touchOverlay,
            {
              width: totalWidth,
              height: height,
            },
          ]}
        />
      )}
    </View>
  );
}

// Generate sample waveform data with more realistic patterns
function generateSampleWaveform(barCount: number): number[] {
  return Array.from({ length: barCount }, (_, i) => {
    // Create multiple overlapping waves for more realistic pattern
    const wave1 = Math.sin((i / barCount) * Math.PI * 4) * 0.3;
    const wave2 = Math.sin((i / barCount) * Math.PI * 8) * 0.15;
    const wave3 = Math.sin((i / barCount) * Math.PI * 2) * 0.2;
    const noise = (Math.random() - 0.5) * 0.2;
    const base = 0.4;

    // Add occasional peaks for realism
    const peak = Math.random() < 0.1 ? Math.random() * 0.3 : 0;

    return Math.max(
      0.1,
      Math.min(0.95, base + wave1 + wave2 + wave3 + noise + peak)
    );
  });
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  waveform: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  barContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  bar: {
    borderRadius: 1.5,
    minHeight: 4,
  },
  progressLine: {
    position: 'absolute',
    width: 2,
    borderRadius: 1,
    opacity: 0.8,
    top: '10%',
  },
  touchOverlay: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
});
