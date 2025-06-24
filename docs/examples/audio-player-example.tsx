// docs/examples/audio-player-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';

import { AudioPlayerAutoplay } from '@/docs/demo/audio-player/audio-player-autoplay';
import { AudioPlayerDemo } from '@/docs/demo/audio-player/audio-player-demo';
import { AudioPlayerMinimal } from '@/docs/demo/audio-player/audio-player-minimal';
import { AudioPlayerProgress } from '@/docs/demo/audio-player/audio-player-progress';
import { AudioPlayerStyled } from '@/docs/demo/audio-player/audio-player-styled';
import { AudioPlayerWaveform } from '@/docs/demo/audio-player/audio-player-waveform';
import { AudioPlayerMusic } from '../demo/audio-player/audio-player-music';

// Main demo screen combining all examples
export function AudioPlayerExample() {
  return (
    <View style={{ width: '100%', gap: 24 }}>
      <View>
        <Text variant='title'>Default</Text>
        <Text variant='caption' style={{ marginBottom: 16 }}>
          Full-featured audio player with waveform, controls, and timer
        </Text>
        <AudioPlayerDemo />
      </View>

      <View>
        <Text variant='title'>Minimal Player</Text>
        <Text variant='caption' style={{ marginBottom: 16 }}>
          Simple player with only essential controls and progress bar
        </Text>
        <AudioPlayerMinimal />
      </View>

      <View>
        <Text variant='title'>Waveform Focus</Text>
        <Text variant='caption' style={{ marginBottom: 16 }}>
          Player emphasizing waveform visualization for audio content
        </Text>
        <AudioPlayerWaveform />
      </View>

      <View>
        <Text variant='title'>Progress Bar Only</Text>
        <Text variant='caption' style={{ marginBottom: 16 }}>
          Clean interface using progress bar for seeking and playback
        </Text>
        <AudioPlayerProgress />
      </View>

      <View>
        <Text variant='title'>Auto Play</Text>
        <Text variant='caption' style={{ marginBottom: 16 }}>
          Player that automatically starts when audio is loaded
        </Text>
        <AudioPlayerAutoplay />
      </View>

      <View>
        <Text variant='title'>Custom Styling</Text>
        <Text variant='caption' style={{ marginBottom: 16 }}>
          Styled player with custom appearance and shadow effects
        </Text>
        <AudioPlayerStyled />
      </View>

      <View>
        <Text variant='title'>Audio Player Music</Text>
        <Text variant='caption' style={{ marginBottom: 16 }}>
          Audio player designed for music playback
        </Text>
        <AudioPlayerMusic />
      </View>
    </View>
  );
}
