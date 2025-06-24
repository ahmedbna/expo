// docs/demo/audio-recorder/audio-recorder-minimal.tsx
import { AudioRecorder } from '@/components/ui/audio-recorder';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';
import { Alert } from 'react-native';

export function AudioRecorderMinimal() {
  const handleRecordingComplete = (uri: string) => {
    Alert.alert('Recording Saved', 'Your audio has been recorded.', [
      { text: 'OK' },
    ]);
  };

  return (
    <View style={{ width: '100%' }}>
      <Text variant='caption' style={{ marginBottom: 12, textAlign: 'center' }}>
        Clean, minimal interface for simple recording
      </Text>

      <AudioRecorder
        quality='low'
        showWaveform={false}
        showTimer={true}
        maxDuration={60} // 1 minute
        onRecordingComplete={handleRecordingComplete}
      />
    </View>
  );
}
