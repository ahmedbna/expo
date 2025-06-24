// docs/demo/audio-recorder/audio-recorder-hq.tsx
import { AudioRecorder } from '@/components/ui/audio-recorder';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { RecordingPresets } from 'expo-audio';
import React from 'react';
import { Alert } from 'react-native';

export function AudioRecorderHQ() {
  const handleRecordingComplete = (uri: string) => {
    Alert.alert(
      'High Quality Recording Complete',
      'Professional quality audio has been recorded and saved.',
      [{ text: 'OK' }]
    );
    console.log('HQ recording saved:', uri);
  };

  return (
    <View style={{ width: '100%' }}>
      <Text variant='caption' style={{ marginBottom: 12, textAlign: 'center' }}>
        Professional quality recording for music and interviews
      </Text>

      <AudioRecorder
        quality='high'
        showWaveform={true}
        showTimer={true}
        maxDuration={1800} // 30 minutes
        customRecordingOptions={{
          ...RecordingPresets.HIGH_QUALITY,
          sampleRate: 48000,
          bitRate: 192000,
          numberOfChannels: 2,
        }}
        onRecordingComplete={handleRecordingComplete}
      />
    </View>
  );
}
