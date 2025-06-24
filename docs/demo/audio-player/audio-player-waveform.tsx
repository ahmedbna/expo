import { AudioPlayer } from '@/components/ui/audio-player';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function AudioPlayerWaveform() {
  const sampleAudioUrl =
    'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav';

  return (
    <View style={{ width: '100%' }}>
      <Text variant='caption' style={{ marginBottom: 12, textAlign: 'center' }}>
        Waveform-focused player with seeking capability
      </Text>

      <AudioPlayer
        source={{ uri: sampleAudioUrl }}
        showControls={true}
        showWaveform={true}
        showTimer={true}
        showProgressBar={false}
        autoPlay={false}
      />
    </View>
  );
}
