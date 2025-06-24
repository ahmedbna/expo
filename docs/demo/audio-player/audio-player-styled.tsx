import { AudioPlayer } from '@/components/ui/audio-player';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';
import { StyleSheet } from 'react-native';

export function AudioPlayerStyled() {
  const sampleAudioUrl =
    'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav';

  return (
    <View style={{ width: '100%' }}>
      <Text variant='caption' style={{ marginBottom: 12, textAlign: 'center' }}>
        Custom styled player with rounded corners and shadow
      </Text>

      <AudioPlayer
        source={{ uri: sampleAudioUrl }}
        showControls={true}
        showWaveform={true}
        showTimer={true}
        showProgressBar={true}
        autoPlay={false}
        style={styles.customPlayer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  customPlayer: {
    borderRadius: 20,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
});
