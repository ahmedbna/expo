import { AudioPlayer } from '@/components/ui/audio-player';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function AudioPlayerMinimal() {
  const sampleAudioUrl =
    'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav';

  return (
    <View style={{ width: '100%' }}>
      <Text variant='caption' style={{ marginBottom: 12, textAlign: 'center' }}>
        Minimal player with only essential controls
      </Text>

      <AudioPlayer
        source={{ uri: sampleAudioUrl }}
        showControls={true}
        showWaveform={false}
        showTimer={false}
        showProgressBar={true}
        autoPlay={false}
      />
    </View>
  );
}
