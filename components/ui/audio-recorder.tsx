// components/ui/audio-recorder.tsx
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useThemeColor } from '@/hooks/useThemeColor';
import { CORNERS } from '@/theme/globals';
import {
  AudioModule,
  RecordingOptions,
  RecordingPresets,
  useAudioRecorder,
} from 'expo-audio';
import { Circle, Mic, Save, Square, Trash2 } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Platform,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

export interface AudioRecorderProps {
  style?: ViewStyle;
  quality?: 'high' | 'low';
  showWaveform?: boolean;
  showTimer?: boolean;
  maxDuration?: number; // in seconds
  onRecordingComplete?: (uri: string) => void;
  onRecordingStart?: () => void;
  onRecordingStop?: () => void;
  customRecordingOptions?: RecordingOptions;
}

export function AudioRecorder({
  style,
  quality = 'high',
  showWaveform = true,
  showTimer = true,
  maxDuration,
  onRecordingComplete,
  onRecordingStart,
  onRecordingStop,
  customRecordingOptions,
}: AudioRecorderProps) {
  const recordingOptions =
    customRecordingOptions ||
    (quality === 'high'
      ? RecordingPresets.HIGH_QUALITY
      : RecordingPresets.LOW_QUALITY);

  const recorder = useAudioRecorder(recordingOptions);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);

  // Theme colors
  const primaryColor = useThemeColor({}, 'primary');
  const secondaryColor = useThemeColor({}, 'secondary');
  const textColor = useThemeColor({}, 'text');
  const mutedColor = useThemeColor({}, 'textMuted');
  const redColor = useThemeColor({}, 'red');
  const greenColor = useThemeColor({}, 'green');

  // Animation values
  const recordingPulse = useRef(new Animated.Value(1)).current;
  const waveformBars = useRef(
    Array.from({ length: 15 }, () => new Animated.Value(0.2))
  ).current;

  // Request permissions on mount
  useEffect(() => {
    (async () => {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      setPermissionGranted(status.granted);

      if (!status.granted) {
        Alert.alert(
          'Permission Required',
          'Please grant microphone permission to record audio.',
          [{ text: 'OK' }]
        );
      }
    })();
  }, []);

  // Update duration during recording
  useEffect(() => {
    let interval: number;

    if (recorder.isRecording) {
      interval = setInterval(() => {
        setDuration((prev) => prev + 0.1);
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [recorder.isRecording]);

  // Recording pulse animation
  useEffect(() => {
    if (recorder.isRecording) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(recordingPulse, {
            toValue: 1.2,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(recordingPulse, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();

      return () => pulse.stop();
    } else {
      recordingPulse.setValue(1);
    }
  }, [recorder.isRecording]);

  // Waveform animation during recording
  useEffect(() => {
    if (recorder.isRecording) {
      const animateWaveform = () => {
        waveformBars.forEach((bar, index) => {
          Animated.timing(bar, {
            toValue: Math.random() * 0.9 + 0.1,
            duration: 100 + Math.random() * 200,
            useNativeDriver: false,
          }).start();
        });
      };

      const waveformInterval = setInterval(animateWaveform, 100);
      return () => clearInterval(waveformInterval);
    } else {
      // Reset bars when not recording
      waveformBars.forEach((bar) => {
        Animated.timing(bar, {
          toValue: 0.2,
          duration: 200,
          useNativeDriver: false,
        }).start();
      });
    }
  }, [recorder.isRecording]);

  // Auto-stop recording when max duration is reached
  useEffect(() => {
    if (maxDuration && duration >= maxDuration && recorder.isRecording) {
      handleStopRecording();
    }
  }, [duration, maxDuration, recorder.isRecording]);

  const handleStartRecording = async () => {
    if (!permissionGranted) {
      Alert.alert(
        'Permission Required',
        'Microphone permission is required to record audio.'
      );
      return;
    }

    try {
      setDuration(0);
      setRecordingUri(null);
      await recorder.prepareToRecordAsync();
      await recorder.record();
      onRecordingStart?.();
    } catch (error) {
      console.error('Error starting recording:', error);
      Alert.alert('Error', 'Failed to start recording. Please try again.');
    }
  };

  const handleStopRecording = async () => {
    try {
      await recorder.stop();
      const uri = recorder.uri;
      setRecordingUri(uri);
      onRecordingStop?.();

      if (uri && onRecordingComplete) {
        onRecordingComplete(uri);
      }
    } catch (error) {
      console.error('Error stopping recording:', error);
      Alert.alert('Error', 'Failed to stop recording. Please try again.');
    }
  };

  const handleDeleteRecording = () => {
    Alert.alert(
      'Delete Recording',
      'Are you sure you want to delete this recording?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setRecordingUri(null);
            setDuration(0);
          },
        },
      ]
    );
  };

  const handleSaveRecording = () => {
    if (recordingUri && onRecordingComplete) {
      onRecordingComplete(recordingUri);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const centisecs = Math.floor((seconds % 1) * 100);
    return `${mins}:${secs.toString().padStart(2, '0')}.${centisecs
      .toString()
      .padStart(2, '0')}`;
  };

  if (!permissionGranted) {
    return (
      <View
        style={[styles.container, { backgroundColor: secondaryColor }, style]}
      >
        <Text variant='body' style={{ color: textColor, textAlign: 'center' }}>
          Microphone permission is required to record audio.
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[styles.container, { backgroundColor: secondaryColor }, style]}
    >
      {/* Recording Status */}
      {recorder.isRecording && (
        <View style={styles.recordingStatus}>
          <View style={styles.recordingIndicator}>
            <Circle size={8} color={redColor} fill={redColor} />
            <Text variant='caption' style={{ color: redColor, marginLeft: 8 }}>
              Recording
            </Text>
          </View>
        </View>
      )}

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
                    backgroundColor: recorder.isRecording
                      ? primaryColor
                      : mutedColor,
                    height: bar.interpolate({
                      inputRange: [0, 1],
                      outputRange: [4, 48],
                    }),
                  },
                ]}
              />
            ))}
          </View>
        </View>
      )}

      {/* Timer */}
      {showTimer && (
        <View style={styles.timerContainer}>
          <Text
            variant='title'
            style={{
              color: recorder.isRecording ? redColor : textColor,
              fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
            }}
          >
            {formatTime(duration)}
          </Text>
          {maxDuration && (
            <Text variant='caption' style={{ color: mutedColor }}>
              Max: {formatTime(maxDuration)}
            </Text>
          )}
        </View>
      )}

      {/* Controls */}
      <View style={styles.controlsContainer}>
        {!recorder.isRecording && !recordingUri && (
          <Animated.View style={{ transform: [{ scale: recordingPulse }] }}>
            <Button
              variant='default'
              size='lg'
              onPress={handleStartRecording}
              style={[styles.recordButton, { backgroundColor: redColor }]}
            >
              <Mic size={24} color='white' />
            </Button>
          </Animated.View>
        )}

        {recorder.isRecording && (
          <Button
            variant='default'
            size='lg'
            onPress={handleStopRecording}
            style={[styles.stopButton, { backgroundColor: redColor }]}
          >
            <Square size={20} color='white' />
          </Button>
        )}

        {recordingUri && !recorder.isRecording && (
          <View style={styles.playbackControls}>
            <Button
              variant='outline'
              size='icon'
              onPress={handleDeleteRecording}
              style={styles.controlButton}
            >
              <Trash2 size={20} color={redColor} />
            </Button>

            <Button
              variant='default'
              onPress={handleSaveRecording}
              style={[styles.saveButton, { backgroundColor: greenColor }]}
            >
              <Save size={20} color='white' />
              <Text style={{ color: 'white', marginLeft: 8 }}>Save</Text>
            </Button>
          </View>
        )}
      </View>

      {/* Recording Info */}
      {recordingUri && (
        <View style={styles.infoContainer}>
          <Text
            variant='caption'
            style={{ color: mutedColor, textAlign: 'center' }}
          >
            Recording completed • {formatTime(duration)}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: CORNERS,
    padding: 20,
    margin: 8,
    alignItems: 'center',
  },
  recordingStatus: {
    marginBottom: 16,
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  waveformContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  waveform: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    gap: 3,
  },
  waveformBar: {
    width: 4,
    borderRadius: 2,
    minHeight: 4,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  controlsContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  stopButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  playbackControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  controlButton: {
    width: 48,
    height: 48,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  infoContainer: {
    marginTop: 8,
  },
});
