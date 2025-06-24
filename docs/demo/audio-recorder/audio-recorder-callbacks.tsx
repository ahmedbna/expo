// docs/demo/audio-recorder/audio-recorder-callbacks.tsx
import { AudioRecorder } from '@/components/ui/audio-recorder';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';
import { Alert } from 'react-native';

export function AudioRecorderCallbacks() {
  const [status, setStatus] = useState('Ready to record');
  const [recordingCount, setRecordingCount] = useState(0);

  const handleRecordingStart = () => {
    setStatus('🔴 Recording in progress...');
    console.log('Recording started');
  };

  const handleRecordingStop = () => {
    setStatus('✅ Recording stopped');
    console.log('Recording stopped');
  };

  const handleRecordingComplete = (uri: string) => {
    setRecordingCount((prev) => prev + 1);
    setStatus(`📁 Recording #${recordingCount + 1} saved`);

    Alert.alert(
      'Recording Complete',
      `This is your ${recordingCount + 1}${getOrdinalSuffix(
        recordingCount + 1
      )} recording!`,
      [{ text: 'Great!' }]
    );

    // Reset status after 3 seconds
    setTimeout(() => setStatus('Ready to record'), 3000);
  };

  const getOrdinalSuffix = (num: number) => {
    const lastDigit = num % 10;
    const lastTwoDigits = num % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) return 'th';
    if (lastDigit === 1) return 'st';
    if (lastDigit === 2) return 'nd';
    if (lastDigit === 3) return 'rd';
    return 'th';
  };

  return (
    <View style={{ width: '100%' }}>
      <Text variant='caption' style={{ marginBottom: 8, textAlign: 'center' }}>
        Recorder with comprehensive callback handling
      </Text>

      <Text
        variant='body'
        style={{ marginBottom: 16, textAlign: 'center', fontWeight: '500' }}
      >
        Status: {status}
      </Text>

      <AudioRecorder
        quality='high'
        showWaveform={true}
        showTimer={true}
        maxDuration={180} // 3 minutes
        onRecordingStart={handleRecordingStart}
        onRecordingStop={handleRecordingStop}
        onRecordingComplete={handleRecordingComplete}
      />

      {recordingCount > 0 && (
        <Text variant='caption' style={{ marginTop: 12, textAlign: 'center' }}>
          Total recordings: {recordingCount}
        </Text>
      )}
    </View>
  );
}
