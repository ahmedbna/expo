// docs/demo/audio-recorder/audio-recorder-styled.tsx
import { AudioRecorder } from '@/components/ui/audio-recorder';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';
import { Alert, StyleSheet } from 'react-native';

export function AudioRecorderStyled() {
  const handleRecordingComplete = (uri: string) => {
    Alert.alert(
      '🎵 Recording Complete',
      'Your custom styled recording is ready!',
      [{ text: 'Awesome!' }]
    );
  };

  return (
    <View style={{ width: '100%' }}>
      <Text variant='caption' style={{ marginBottom: 12, textAlign: 'center' }}>
        Custom styled recorder with branding
      </Text>

      <AudioRecorder
        quality='high'
        showWaveform={true}
        showTimer={true}
        maxDuration={300}
        style={styles.customRecorder}
        onRecordingComplete={handleRecordingComplete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  customRecorder: {
    backgroundColor: '#f0f9ff',
    borderWidth: 2,
    borderColor: '#0ea5e9',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#0ea5e9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
});
