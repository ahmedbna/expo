// components/ui/video.tsx
import { useThemeColor } from '@/hooks/useThemeColor';
import { BORDER_RADIUS } from '@/theme/globals';
import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Pause, Play, RotateCcw, Volume2, VolumeX } from 'lucide-react-native';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

// Types
interface VideoSource {
  uri: string;
  headers?: Record<string, string>;
}

interface VideoProps {
  source: VideoSource | string;
  style?: ViewStyle;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  showControls?: boolean;
  nativeControls?: boolean;
  allowsFullscreen?: boolean;
  allowsPictureInPicture?: boolean;
  resizeMode?: 'contain' | 'cover' | 'stretch';
  aspectRatio?: number;
  poster?: string;
  onLoad?: () => void;
  onError?: (error: any) => void;
  onPlaybackStatusUpdate?: (status: any) => void;
  onFullscreenUpdate?: (isFullscreen: boolean) => void;
  contentFit?: 'contain' | 'cover' | 'fill';
  startTime?: number;
  endTime?: number;
  playbackRate?: number;
  volume?: number;
  shouldPlay?: boolean;
  onBuffer?: (buffering: boolean) => void;
  onSeek?: (position: number) => void;
  onComplete?: () => void;
  testID?: string;
}

interface VideoRef {
  play: () => void;
  pause: () => void;
  seekTo: (seconds: number) => void;
  setVolume: (volume: number) => void;
  setPlaybackRate: (rate: number) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  isPlaying: () => boolean;
  isMuted: () => boolean;
  replay: () => void;
}

// Helper function to format time
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Main Video Component
export const Video = forwardRef<VideoRef, VideoProps>(
  (
    {
      source,
      style,
      className,
      autoPlay = false,
      loop = false,
      muted = false,
      showControls = true,
      nativeControls = false,
      allowsFullscreen = true,
      allowsPictureInPicture = true,
      resizeMode = 'cover', // Changed default to 'cover' for better container filling
      aspectRatio,
      poster,
      onLoad,
      onError,
      onPlaybackStatusUpdate,
      onFullscreenUpdate,
      contentFit = 'cover', // Changed default to 'cover' for better container filling
      startTime = 0,
      endTime,
      playbackRate = 1.0,
      volume = 1.0,
      shouldPlay,
      onBuffer,
      onSeek,
      onComplete,
      testID,
      ...props
    },
    ref
  ) => {
    // Theme colors
    const textColor = useThemeColor({}, 'text');
    const cardColor = useThemeColor({}, 'card');

    // State
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [controlsVisible, setControlsVisible] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(muted);
    const [hasFinished, setHasFinished] = useState(false);
    const controlsTimeout = useRef<number | null>(null);

    // Get video source URI
    const videoUri = typeof source === 'string' ? source : source.uri;

    // Create video player
    const player = useVideoPlayer(videoUri, (player) => {
      player.loop = loop;
      player.muted = muted;
      player.playbackRate = playbackRate;
      player.volume = volume;
      player.timeUpdateEventInterval = 1; //< — — critical for event

      if (startTime > 0) {
        player.currentTime = startTime;
      }

      if (autoPlay || shouldPlay) {
        player.play();
      }
    });

    // Player events - Fixed event handling with correct property names
    const { isPlaying: playerIsPlaying } = useEvent(player, 'playingChange', {
      isPlaying: player.playing,
    });

    const { muted: playerIsMuted } = useEvent(player, 'mutedChange', {
      muted: player.muted,
    });

    const {
      currentTime: playerCurrentTime,
      currentLiveTimestamp,
      currentOffsetFromLive,
      bufferedPosition,
    } = useEvent(player, 'timeUpdate', {
      currentTime: player.currentTime,
      currentLiveTimestamp: player.currentLiveTimestamp,
      currentOffsetFromLive: player.currentOffsetFromLive,
      bufferedPosition: player.bufferedPosition,
    });

    const { status } = useEvent(player, 'statusChange', {
      status: player.status,
    });

    // Update state when player events change
    useEffect(() => {
      setIsPlaying(playerIsPlaying);
    }, [playerIsPlaying]);

    useEffect(() => {
      setIsMuted(playerIsMuted);
    }, [playerIsMuted]);

    useEffect(() => {
      setCurrentTime(playerCurrentTime);
    }, [playerCurrentTime]);

    // Handle status changes
    useEffect(() => {
      if (status === 'loading') {
        setIsLoading(true);
        setError(null);
      } else if (status === 'readyToPlay') {
        setIsLoading(false);
        setError(null);
        // Get duration when ready
        setDuration(player.duration);
        onLoad?.();
      } else if (status === 'error') {
        setIsLoading(false);
        setError('Failed to load video');
        onError?.(new Error('Failed to load video'));
      }
    }, [status, player.duration, onLoad, onError]);

    // Handle playback status updates
    useEffect(() => {
      if (onPlaybackStatusUpdate) {
        onPlaybackStatusUpdate({
          isPlaying,
          currentTime,
          duration,
          isMuted,
          status: player.status,
        });
      }
    }, [
      isPlaying,
      currentTime,
      duration,
      isMuted,
      player.status,
      onPlaybackStatusUpdate,
    ]);

    // Handle buffering
    useEffect(() => {
      if (onBuffer) {
        onBuffer(player.status === 'loading');
      }
    }, [player.status, onBuffer]);

    // Handle completion - FIXED: Properly stop both video and audio when finished
    useEffect(() => {
      if (currentTime > 0 && duration > 0) {
        const isNearEnd = Math.abs(currentTime - duration) < 0.5; // Within 0.5 seconds of end

        if (isNearEnd && !hasFinished) {
          setHasFinished(true);

          // If not looping, completely stop the player
          if (!loop) {
            player.pause();
            // Reset to beginning to ensure audio stops
            player.currentTime = 0;
            // Force stop any remaining audio
            const originalVolume = player.volume;
            player.volume = 0;
            setTimeout(() => {
              player.volume = originalVolume;
            }, 100);
          }

          onComplete?.();
        } else if (!isNearEnd && hasFinished) {
          // Reset hasFinished if we're not near the end (e.g., user seeked or replayed)
          setHasFinished(false);
        }
      }
    }, [currentTime, duration, hasFinished, loop, onComplete, player]);

    // Handle end time
    useEffect(() => {
      if (endTime && currentTime >= endTime) {
        player.pause();
        // Reset to beginning to stop audio completely
        player.currentTime = 0;
        // Force stop any remaining audio
        const originalVolume = player.volume;
        player.volume = 0;
        setTimeout(() => {
          player.volume = originalVolume;
        }, 100);
      }
    }, [currentTime, endTime, player]);

    // Auto-hide controls
    useEffect(() => {
      if (showControls && !nativeControls && controlsVisible) {
        if (controlsTimeout.current) {
          clearTimeout(controlsTimeout.current);
        }
        controlsTimeout.current = setTimeout(() => {
          if (isPlaying) {
            setControlsVisible(false);
          }
        }, 3000);
      }
      return () => {
        if (controlsTimeout.current) {
          clearTimeout(controlsTimeout.current);
        }
      };
    }, [showControls, nativeControls, controlsVisible, isPlaying]);

    // Imperative methods
    useImperativeHandle(ref, () => ({
      play: () => {
        setHasFinished(false);
        player.play();
      },
      pause: () => player.pause(),
      seekTo: (seconds: number) => {
        player.currentTime = seconds;
        setHasFinished(false);
        onSeek?.(seconds);
      },
      setVolume: (vol: number) => {
        player.volume = vol;
      },
      setPlaybackRate: (rate: number) => {
        player.playbackRate = rate;
      },
      getCurrentTime: () => currentTime,
      getDuration: () => duration,
      isPlaying: () => isPlaying,
      isMuted: () => isMuted,
      replay: () => {
        setHasFinished(false);
        player.currentTime = startTime;
        player.play();
      },
    }));

    // Control handlers
    const handlePlayPause = () => {
      if (isPlaying) {
        player.pause();
      } else {
        setHasFinished(false);
        player.play();
      }
    };

    const handleMuteToggle = () => {
      player.muted = !player.muted;
    };

    const handleSeek = (time: number) => {
      player.currentTime = time;
      setHasFinished(false);
      onSeek?.(time);
    };

    const handleReplay = () => {
      setHasFinished(false);
      player.currentTime = startTime;
      player.play();
    };

    const handlePress = () => {
      if (showControls && !nativeControls) {
        setControlsVisible(!controlsVisible);
      }
    };

    // FIXED: Calculate container style to fill parent completely
    const containerStyle = [
      styles.container,
      {
        backgroundColor: cardColor,
      },
      style, // User's style takes precedence
    ];

    if (error) {
      return (
        <View style={[containerStyle, styles.errorContainer]}>
          <Text style={[styles.errorText, { color: textColor }]}>{error}</Text>
        </View>
      );
    }

    return (
      <View style={containerStyle} testID={testID}>
        <Pressable onPress={handlePress} style={styles.videoContainer}>
          <VideoView
            player={player}
            style={styles.video}
            allowsFullscreen={allowsFullscreen}
            allowsPictureInPicture={allowsPictureInPicture}
            nativeControls={nativeControls}
            contentFit={contentFit}
            onFullscreenEnter={() => onFullscreenUpdate?.(true)}
            onFullscreenExit={() => onFullscreenUpdate?.(false)}
            {...props}
          />

          {/* Loading indicator */}
          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size='large' color={textColor} />
            </View>
          )}

          {/* Custom controls */}
          {showControls && !nativeControls && (
            <VideoControls
              isPlaying={isPlaying}
              isMuted={isMuted}
              currentTime={currentTime}
              duration={duration}
              onPlayPause={handlePlayPause}
              onMuteToggle={handleMuteToggle}
              onReplay={handleReplay}
              onSeek={handleSeek}
              visible={controlsVisible}
              textColor={textColor}
            />
          )}
        </Pressable>
      </View>
    );
  }
);

type VideoControlsProps = {
  isPlaying: boolean;
  isMuted: boolean;
  currentTime: number;
  duration: number;
  onPlayPause: () => void;
  onMuteToggle: () => void;
  onReplay: () => void;
  onSeek: (time: number) => void;
  visible: boolean;
  textColor: string;
};

// Custom Controls Component
const VideoControls = ({
  isPlaying,
  isMuted,
  currentTime,
  duration,
  onPlayPause,
  onMuteToggle,
  onReplay,
  onSeek,
  visible,
  textColor,
}: VideoControlsProps) => {
  const opacity = useSharedValue(visible ? 1 : 0);

  useEffect(() => {
    opacity.value = withTiming(visible ? 1 : 0, { duration: 300 });
  }, [visible, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const progress = duration > 0 ? currentTime / duration : 0;

  const handleProgressPress = (event: any) => {
    const { locationX } = event.nativeEvent;
    const { width } = event.currentTarget.measureInWindow(
      (x: number, y: number, width: number) => {
        const percentage = locationX / width;
        const seekTime = percentage * duration;
        onSeek(seekTime);
      }
    );
  };

  return (
    <Animated.View style={[styles.controlsContainer, animatedStyle]}>
      {/* Gradient overlay */}
      <View
        style={[styles.controlsOverlay, { backgroundColor: 'rgba(0,0,0,0.5)' }]}
      />

      {/* Bottom controls */}
      <View style={styles.bottomControls}>
        {/* Progress bar */}
        <View style={styles.progressContainer}>
          <Pressable
            onPress={handleProgressPress}
            style={styles.progressBarContainer}
          >
            <View
              style={[
                styles.progressBar,
                { backgroundColor: 'rgba(255,255,255,0.3)' },
              ]}
            >
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${progress * 100}%`,
                    backgroundColor: textColor,
                  },
                ]}
              />
            </View>
          </Pressable>
          <Text style={[styles.timeText, { color: 'white' }]}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </Text>
        </View>

        {/* Control buttons */}
        <View style={styles.controlButtons}>
          <Pressable
            onPress={onReplay}
            style={[
              styles.controlButton,
              { backgroundColor: 'rgba(255,255,255,0.2)' },
            ]}
          >
            <RotateCcw size={20} color='white' />
          </Pressable>

          <Pressable
            onPress={onPlayPause}
            style={[
              styles.playButton,
              { backgroundColor: 'rgba(255,255,255,0.2)' },
            ]}
          >
            {isPlaying ? (
              <Pause size={24} color='white' />
            ) : (
              <Play size={24} color='white' />
            )}
          </Pressable>

          <Pressable
            onPress={onMuteToggle}
            style={[
              styles.controlButton,
              { backgroundColor: 'rgba(255,255,255,0.2)' },
            ]}
          >
            {isMuted ? (
              <VolumeX size={20} color='white' />
            ) : (
              <Volume2 size={20} color='white' />
            )}
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
};

Video.displayName = 'Video';

const styles = StyleSheet.create({
  container: {
    // FIXED: Ensure the container fills its parent completely
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: BORDER_RADIUS,
    overflow: 'hidden',
    position: 'relative',
  },
  videoContainer: {
    // FIXED: Ensure video container fills the entire space
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  video: {
    // FIXED: Video should fill the entire container
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
  controlsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },
  controlsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bottomControls: {
    padding: 16,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBarContainer: {
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  timeText: {
    fontSize: 12,
    textAlign: 'center',
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  controlButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// Export types for consumers
export type { VideoProps, VideoRef, VideoSource };
