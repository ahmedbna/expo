// components/ui/audio-player.tsx
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useThemeColor } from '@/hooks/useThemeColor';
import { CORNERS } from '@/theme/globals';
import { AudioSource, useAudioPlayer } from 'expo-audio';
import { Pause, Play, RotateCcw, Volume2 } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

export interface AudioPlayerProps {
  source: AudioSource;
  style?: ViewStyle;
  showControls?: boolean;
  showWaveform?: boolean;
  showTimer?: boolean;
  autoPlay?: boolean;
  onPlaybackStatusUpdate?: (status: any) => void;
}

const { width: screenWidth } = Dimensions.get('window');

export function AudioPlayer({
  source,
  style,
  showControls = true,
  showWaveform = true,
  showTimer = true,
  autoPlay = false,
  onPlaybackStatusUpdate,
}: AudioPlayerProps) {
  const player = useAudioPlayer(source);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  // Theme colors
  const primaryColor = useThemeColor({}, 'primary');
  const secondaryColor = useThemeColor({}, 'secondary');
  const textColor = useThemeColor({}, 'text');
  const mutedColor = useThemeColor({}, 'textMuted');
  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor({}, 'border');

  // Animation values for waveform
  const waveformBars = useRef(
    Array.from({ length: 20 }, () => new Animated.Value(0.3))
  ).current;

  useEffect(() => {
    if (autoPlay && player.isLoaded && !player.playing) {
      player.play();
    }
  }, [autoPlay, player.isLoaded]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (player.isLoaded) {
        setDuration(player.duration || 0);
        setPosition(player.currentTime || 0);

        if (onPlaybackStatusUpdate) {
          onPlaybackStatusUpdate({
            isLoaded: player.isLoaded,
            playing: player.playing,
            duration: player.duration,
            position: player.currentTime,
          });
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [player, onPlaybackStatusUpdate]);

  // Animate waveform bars
  useEffect(() => {
    if (player.playing) {
      const animateWaveform = () => {
        waveformBars.forEach((bar, index) => {
          Animated.timing(bar, {
            toValue: Math.random() * 0.8 + 0.2,
            duration: 200 + Math.random() * 300,
            useNativeDriver: false,
          }).start();
        });
      };

      const waveformInterval = setInterval(animateWaveform, 150);
      return () => clearInterval(waveformInterval);
    } else {
      // Reset bars when paused
      waveformBars.forEach((bar) => {
        Animated.timing(bar, {
          toValue: 0.3,
          duration: 200,
          useNativeDriver: false,
        }).start();
      });
    }
  }, [player.playing]);

  const handlePlayPause = () => {
    if (player.playing) {
      player.pause();
    } else {
      player.play();
    }
  };

  const handleRestart = () => {
    player.seekTo(-player.currentTime || 0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (position / duration) * 100 : 0;

  return (
    <View
      style={[styles.container, { backgroundColor: secondaryColor }, style]}
    >
      {/* Waveform Visualization */}
      {showWaveform && (
        <View style={styles.waveformContainer}>
          <View style={styles.waveform}>
            {waveformBars.map((bar, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.waveformBar,
                  {
                    backgroundColor:
                      index < (waveformBars.length * progressPercentage) / 100
                        ? primaryColor
                        : mutedColor,
                    height: bar.interpolate({
                      inputRange: [0, 1],
                      outputRange: [4, 32],
                    }),
                  },
                ]}
              />
            ))}
          </View>
        </View>
      )}

      {/* Progress Bar */}
      <View
        style={[styles.progressContainer, { backgroundColor: borderColor }]}
      >
        <View
          style={[
            styles.progressBar,
            {
              width: `${progressPercentage}%`,
              backgroundColor: primaryColor,
            },
          ]}
        />
      </View>

      {/* Controls */}
      {showControls && (
        <View style={styles.controlsContainer}>
          <Button
            variant='ghost'
            size='icon'
            onPress={handleRestart}
            style={styles.controlButton}
          >
            <RotateCcw size={18} color={textColor} />
          </Button>

          <Button
            variant='default'
            size='icon'
            onPress={handlePlayPause}
            disabled={!player.isLoaded}
            style={[styles.playButton, { backgroundColor: primaryColor }]}
          >
            {player.playing ? (
              <Pause size={20} color='white' />
            ) : (
              <Play size={20} color='white' />
            )}
          </Button>

          <View style={styles.volumeContainer}>
            <Volume2 size={18} color={mutedColor} />
          </View>
        </View>
      )}

      {/* Timer */}
      {showTimer && (
        <View style={styles.timerContainer}>
          <Text variant='caption' style={{ color: mutedColor }}>
            {formatTime(position)} / {formatTime(duration)}
          </Text>
        </View>
      )}

      {/* Loading State */}
      {!player.isLoaded && (
        <View style={styles.loadingContainer}>
          <Text variant='caption' style={{ color: mutedColor }}>
            Loading audio...
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: CORNERS,
    padding: 16,
    margin: 8,
  },
  waveformContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  waveform: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    gap: 2,
  },
  waveformBar: {
    width: 3,
    borderRadius: 2,
    minHeight: 4,
  },
  progressContainer: {
    height: 4,
    borderRadius: 2,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 8,
  },
  controlButton: {
    width: 40,
    height: 40,
  },
  playButton: {
    width: 48,
    height: 48,
  },
  volumeContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerContainer: {
    alignItems: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 8,
  },
});
