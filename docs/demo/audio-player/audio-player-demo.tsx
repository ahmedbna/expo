import { AudioPlayer } from '@/components/ui/audio-player';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function AudioPlayerDemo() {
  // Sample audio URL - replace with your actual audio source
  const sampleAudioUrl =
    'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav';

  return (
    <View style={{ width: '100%' }}>
      <Text variant='caption' style={{ marginBottom: 12, textAlign: 'center' }}>
        Full-featured audio player with waveform, controls, and timer
      </Text>

      <AudioPlayer
        source={{ uri: sampleAudioUrl }}
        showControls={true}
        showWaveform={true}
        showTimer={true}
        showProgressBar={true}
        autoPlay={false}
        onPlaybackStatusUpdate={(status) => {
          console.log('Playback status:', status);
        }}
      />
    </View>
  );
}
