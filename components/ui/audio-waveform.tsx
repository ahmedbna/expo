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
}: AudioWaveformProps) {
  // Theme colors
  const primaryColor = useThemeColor({}, 'primary');
  const mutedColor = useThemeColor({}, 'textMuted');

  const finalActiveColor = activeColor || primaryColor;
  const finalInactiveColor = inactiveColor || mutedColor;

  // Animation values for each bar
  const animatedBars = useRef(
    Array.from({ length: barCount }, () => new Animated.Value(0.2))
  ).current;

  // Generate sample data if none provided
  const waveformData = data || generateSampleWaveform(barCount);

  // Animate bars when playing
  useEffect(() => {
    if (isPlaying && animated) {
      const animateWaveform = () => {
        animatedBars.forEach((bar, index) => {
          const delay = index * 50;
          Animated.timing(bar, {
            toValue: waveformData[index] || Math.random() * 0.8 + 0.2,
            duration: 200 + Math.random() * 300,
            delay,
            useNativeDriver: false,
          }).start();
        });
      };

      const interval = setInterval(animateWaveform, 300);
      return () => clearInterval(interval);
    } else {
      // Reset to static state
      animatedBars.forEach((bar, index) => {
        Animated.timing(bar, {
          toValue: waveformData[index] || 0.3,
          duration: 200,
          useNativeDriver: false,
        }).start();
      });
    }
  }, [isPlaying, animated, waveformData]);

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
          const isActive = index < (barCount * progress) / 100;

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
                    backgroundColor: isActive
                      ? finalActiveColor
                      : finalInactiveColor,
                    height: animated
                      ? animatedValue.interpolate({
                          inputRange: [0, 1],
                          outputRange: [4, height * 0.8],
                        })
                      : (waveformData[index] || 0.3) * height * 0.8,
                  },
                ]}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// Generate sample waveform data
function generateSampleWaveform(barCount: number): number[] {
  return Array.from({ length: barCount }, (_, i) => {
    // Create a more realistic waveform pattern
    const base = Math.sin((i / barCount) * Math.PI * 4) * 0.3 + 0.5;
    const noise = (Math.random() - 0.5) * 0.3;
    return Math.max(0.1, Math.min(1, base + noise));
  });
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
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
    borderRadius: 2,
    minHeight: 4,
  },
});
