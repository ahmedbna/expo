import { AudioRecorder } from '@/components/ui/audio-recorder';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';
import { Alert } from 'react-native';

export function AudioRecorderDemo() {
  const handleRecordingComplete = (uri: string) => {
    Alert.alert('Recording Complete', `Audio saved to: ${uri}`, [
      { text: 'OK' },
    ]);
    console.log('Recording saved to:', uri);
  };

  const handleRecordingStart = () => {
    console.log('Recording started');
  };

  const handleRecordingStop = () => {
    console.log('Recording stopped');
  };

  return (
    <View style={{ width: '100%' }}>
      <Text variant='caption' style={{ marginBottom: 12, textAlign: 'center' }}>
        Full-featured recorder with real-time waveform and playback
      </Text>

      <AudioRecorder
        quality='high'
        showWaveform={true}
        showTimer={true}
        maxDuration={300} // 5 minutes
        onRecordingComplete={handleRecordingComplete}
        onRecordingStart={handleRecordingStart}
        onRecordingStop={handleRecordingStop}
      />
    </View>
  );
}
