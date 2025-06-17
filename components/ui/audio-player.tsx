// components/ui/audio-player.tsx
import { AudioWaveform } from '@/components/ui/audio-waveform';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useThemeColor } from '@/hooks/useThemeColor';
import { CORNERS } from '@/theme/globals';
import { AudioSource, useAudioPlayer } from 'expo-audio';
import { Pause, Play, RotateCcw, Square } from 'lucide-react-native';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

export interface AudioPlayerProps {
  source: AudioSource;
  style?: ViewStyle;
  showControls?: boolean;
  showWaveform?: boolean;
  showTimer?: boolean;
  autoPlay?: boolean;
  onPlaybackStatusUpdate?: (status: any) => void;
}

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

  // Enhanced waveform data - more bars for smoother visualization
  const [waveformData] = useState<number[]>(
    Array.from({ length: 60 }, (_, i) => {
      // Create more varied and realistic waveform pattern
      const base1 = Math.sin((i / 60) * Math.PI * 6) * 0.4 + 0.5;
      const base2 = Math.sin((i / 60) * Math.PI * 2.5) * 0.3 + 0.4;
      const noise = (Math.random() - 0.5) * 0.25;
      const peak = Math.random() < 0.15 ? Math.random() * 0.4 : 0; // Occasional peaks
      return Math.max(0.15, Math.min(0.95, (base1 + base2) / 2 + noise + peak));
    })
  );

  // Theme colors
  const primaryColor = useThemeColor({}, 'primary');
  const redColor = useThemeColor({}, 'destructive');
  const secondaryColor = useThemeColor({}, 'secondary');
  const textColor = useThemeColor({}, 'text');
  const mutedColor = useThemeColor({}, 'textMuted');
  const borderColor = useThemeColor({}, 'border');

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
    }, 100); // Balanced update frequency - smooth but not excessive

    return () => clearInterval(interval);
  }, [player, onPlaybackStatusUpdate]);

  const handlePlayPause = () => {
    if (player.playing) {
      player.pause();
    } else {
      player.play();
    }
  };

  const handleBackFiveSeconds = () => {
    player.seekTo(0);
  };

  const handleRestart = () => {
    player.seekTo(0);
  };

  const handleWaveformSeek = useCallback(
    (seekPosition: number) => {
      if (duration > 0) {
        const newPosition = (seekPosition / 100) * duration;
        player.seekTo(newPosition);
      }
    },
    [duration, player]
  );

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
      {/* Waveform Visualization with live progress */}
      {showWaveform && (
        <View style={styles.waveformContainer}>
          <AudioWaveform
            data={waveformData}
            isPlaying={player.playing}
            progress={progressPercentage}
            onSeek={handleWaveformSeek}
            height={80}
            barCount={60}
            barWidth={2.5}
            barGap={1.5}
            activeColor={redColor}
            inactiveColor={mutedColor}
            animated={true}
            showProgress={true} // Enable progress visualization
          />
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
            onPress={handleBackFiveSeconds}
            style={styles.controlButton}
          >
            <RotateCcw size={18} color={textColor} />
          </Button>

          <Button
            variant='destructive'
            size='icon'
            onPress={handlePlayPause}
            disabled={!player.isLoaded}
          >
            {player.playing ? (
              <Pause size={20} color='white' />
            ) : (
              <Play size={20} color='white' />
            )}
          </Button>

          <Button
            variant='ghost'
            size='icon'
            onPress={handleRestart}
            style={styles.controlButton}
          >
            <Square fill={textColor} size={18} color={textColor} />
          </Button>
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
