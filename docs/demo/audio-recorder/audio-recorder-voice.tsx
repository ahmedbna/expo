import { AudioRecorder } from '@/components/ui/audio-recorder';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';
import { Alert } from 'react-native';

export function AudioRecorderVoice() {
  const handleRecordingComplete = (uri: string) => {
    Alert.alert(
      'Voice Note Saved',
      'Your voice note has been recorded successfully!',
      [{ text: 'OK' }]
    );
    // Here you could add the voice note to a list or send it
    console.log('Voice note saved:', uri);
  };

  return (
    <View style={{ width: '100%' }}>
      <Text variant='caption' style={{ marginBottom: 12, textAlign: 'center' }}>
        Quick voice notes with 2-minute limit
      </Text>

      <AudioRecorder
        quality='low'
        showWaveform={true}
        showTimer={true}
        maxDuration={120} // 2 minutes for voice notes
        onRecordingComplete={handleRecordingComplete}
      />
    </View>
  );
}
