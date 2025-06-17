// components/ui/audio-waveform.tsx
import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

export interface AudioWaveformProps {
  data?: number[]; // Audio amplitude data
  isPlaying?: boolean;
  progress?: number; // 0-100
  onSeek?: (position: number) => void;
  style?: ViewStyle;
  height?: number;
  barCount?: number;
  barWidth?: number;
  barGap?: number;
  activeColor?: string;
  inactiveColor?: string;
  animated?: boolean;
  showProgress?: boolean; // New prop to enable progress visualization
}

export function AudioWaveform({
  data,
  isPlaying = false,
  progress = 0,
  onSeek,
  style,
  height = 60,
  barCount = 50,
  barWidth = 3,
  barGap = 2,
  activeColor,
  inactiveColor,
  animated = true,
  showProgress = false,
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

  const handleBarPress = (index: number) => {
    if (onSeek) {
      const position = (index / barCount) * 100;
      onSeek(position);
    }
  };

  const totalWidth = barCount * barWidth + (barCount - 1) * barGap;

  return (
    <View style={[styles.container, { height }, style]}>
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
            <TouchableOpacity
              key={index}
              onPress={() => handleBarPress(index)}
              activeOpacity={0.7}
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
            </TouchableOpacity>
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
});
