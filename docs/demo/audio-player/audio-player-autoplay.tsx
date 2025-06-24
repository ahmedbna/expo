import { AudioPlayer } from '@/components/ui/audio-player';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function AudioPlayerAutoplay() {
  const sampleAudioUrl =
    'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav';

  return (
    <View style={{ width: '100%' }}>
      <Text variant='caption' style={{ marginBottom: 12, textAlign: 'center' }}>
        Player that starts automatically when loaded
      </Text>

      <AudioPlayer
        source={{ uri: sampleAudioUrl }}
        showControls={true}
        showWaveform={true}
        showTimer={true}
        showProgressBar={true}
        autoPlay={true}
        onPlaybackStatusUpdate={(status) => {
          if (status.isLoaded && status.playing) {
            console.log('Auto-playing audio');
          }
        }}
      />
    </View>
  );
}
