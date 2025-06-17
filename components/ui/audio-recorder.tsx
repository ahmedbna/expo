// components/ui/audio-recorder.tsx
import { AudioWaveform } from '@/components/ui/audio-waveform';
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
import { Circle, Download, Mic, Square, Trash2 } from 'lucide-react-native';
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
  const [isRecording, setIsRecording] = useState(false);

  // Waveform data for real-time visualization
  const [waveformData, setWaveformData] = useState<number[]>(
    Array.from({ length: 30 }, () => 0.2)
  );

  // Store the current metering levels
  const meteringLevelsRef = useRef<number[]>([]);

  // Theme colors
  const primaryColor = useThemeColor({}, 'primary');
  const secondaryColor = useThemeColor({}, 'secondary');
  const textColor = useThemeColor({}, 'text');
  const mutedColor = useThemeColor({}, 'textMuted');
  const redColor = useThemeColor({}, 'red');
  const greenColor = useThemeColor({}, 'green');

  // Animation values
  const recordingPulse = useRef(new Animated.Value(1)).current;
  const durationInterval = useRef<number | null>(null);
  const meteringInterval = useRef<number | null>(null);

  // Request permissions on mount
  useEffect(() => {
    (async () => {
      try {
        const status = await AudioModule.requestRecordingPermissionsAsync();
        setPermissionGranted(status.granted);

        if (!status.granted) {
          Alert.alert(
            'Permission Required',
            'Please grant microphone permission to record audio.',
            [{ text: 'OK' }]
          );
        }
      } catch (error) {
        console.error('Error requesting permissions:', error);
        setPermissionGranted(false);
      }
    })();
  }, []);

  // Recording pulse animation
  useEffect(() => {
    if (isRecording) {
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
  }, [isRecording]);

  // Start metering when recording starts
  useEffect(() => {
    if (isRecording) {
      // Start metering interval to get audio levels
      meteringInterval.current = setInterval(async () => {
        try {
          // Get the current metering level from the recorder
          const meteringResult = recorder.getStatus();

          if (meteringResult && meteringResult.metering !== undefined) {
            const level = meteringResult.metering;

            // Convert metering level to a normalized value (0-1)
            // Expo Audio metering is typically in dB, ranging from -160 to 0
            const normalizedLevel = Math.max(0, Math.min(1, (level + 50) / 50));

            // Add some variation to make it look more dynamic
            const adjustedLevel = Math.max(
              0.1,
              normalizedLevel + (Math.random() - 0.5) * 0.2
            );

            // Update the metering levels array (keep only recent values)
            meteringLevelsRef.current = [
              ...meteringLevelsRef.current,
              adjustedLevel,
            ].slice(-30);

            // Update waveform data with recent metering levels
            setWaveformData((prev) => {
              const newData = [...prev];
              newData.shift(); // Remove first element
              newData.push(adjustedLevel); // Add new level
              return newData;
            });
          } else {
            // Fallback: generate more realistic random data if metering is not available
            const baseLevel = 0.3 + Math.random() * 0.4;
            const variation = (Math.random() - 0.5) * 0.3;
            const level = Math.max(0.1, Math.min(0.8, baseLevel + variation));

            setWaveformData((prev) => {
              const newData = [...prev];
              newData.shift();
              newData.push(level);
              return newData;
            });
          }
        } catch (error) {
          console.log('Metering not available, using simulated data');
          // Fallback to simulated data
          const level = 0.2 + Math.random() * 0.6;
          setWaveformData((prev) => {
            const newData = [...prev];
            newData.shift();
            newData.push(level);
            return newData;
          });
        }
      }, 100); // Update every 100ms for smooth animation

      return () => {
        if (meteringInterval.current) {
          clearInterval(meteringInterval.current);
          meteringInterval.current = null;
        }
      };
    } else {
      // Reset to quiet state when not recording
      setWaveformData(Array.from({ length: 30 }, () => 0.2));
      meteringLevelsRef.current = [];

      if (meteringInterval.current) {
        clearInterval(meteringInterval.current);
        meteringInterval.current = null;
      }
    }
  }, [isRecording, recorder]);

  // Auto-stop recording when max duration is reached
  useEffect(() => {
    if (maxDuration && duration >= maxDuration && isRecording) {
      handleStopRecording();
    }
  }, [duration, maxDuration, isRecording]);

  const startDurationTimer = () => {
    setDuration(0);
    durationInterval.current = setInterval(() => {
      setDuration((prev) => prev + 0.1);
    }, 100);
  };

  const stopDurationTimer = () => {
    if (durationInterval.current) {
      clearInterval(durationInterval.current);
      durationInterval.current = null;
    }
  };

  const handleStartRecording = async () => {
    if (!permissionGranted) {
      Alert.alert(
        'Permission Required',
        'Microphone permission is required to record audio.'
      );
      return;
    }

    try {
      console.log('Starting recording...');
      setRecordingUri(null);
      setIsRecording(true);
      startDurationTimer();

      // Enable metering in recording options
      const meteringOptions = {
        ...recordingOptions,
        isMeteringEnabled: true,
      };

      await recorder.prepareToRecordAsync(meteringOptions);
      await recorder.record();

      onRecordingStart?.();
      console.log('Recording started successfully');
    } catch (error) {
      console.error('Error starting recording:', error);
      setIsRecording(false);
      stopDurationTimer();
      Alert.alert('Error', 'Failed to start recording. Please try again.');
    }
  };

  const handleStopRecording = async () => {
    try {
      console.log('Stopping recording...');
      setIsRecording(false);
      stopDurationTimer();

      await recorder.stop();
      const uri = recorder.uri;
      console.log('Recording stopped, URI:', uri);

      if (uri) {
        setRecordingUri(uri);
        onRecordingComplete?.(uri);
      }

      onRecordingStop?.();
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
      {isRecording ? (
        <View style={styles.recordingStatus}>
          <View style={styles.recordingIndicator}>
            <Circle size={8} color={redColor} fill={redColor} />
            <Text variant='caption' style={{ color: redColor, marginLeft: 8 }}>
              Recording
            </Text>
          </View>
        </View>
      ) : (
        <View style={{ height: 36 }} />
      )}

      {/* Waveform Visualization using AudioWaveform component */}
      {showWaveform && (
        <View style={styles.waveformContainer}>
          <AudioWaveform
            data={waveformData}
            isPlaying={isRecording}
            progress={0}
            height={60}
            barCount={30}
            barWidth={4}
            barGap={2}
            activeColor={isRecording ? primaryColor : redColor}
            inactiveColor={mutedColor}
            animated={isRecording}
          />
        </View>
      )}

      {/* Timer */}
      {showTimer && (
        <View style={styles.timerContainer}>
          <Text
            variant='title'
            style={{
              color: isRecording ? redColor : textColor,
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
        {!isRecording && !recordingUri && (
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

        {isRecording && (
          <Button
            variant='default'
            size='lg'
            onPress={handleStopRecording}
            style={[styles.stopButton, { backgroundColor: redColor }]}
          >
            <Square size={24} fill='white' color='white' />
          </Button>
        )}

        {recordingUri && !isRecording && (
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
              <Download size={20} color='white' />
              <Text style={{ color: 'white', marginLeft: 8 }}>Save</Text>
            </Button>
          </View>
        )}
      </View>
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
    height: 36,
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
