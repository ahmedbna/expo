// docs/registry/audio-player.ts
// Registry configuration for audio player component and examples

export const audioPlayerRegistry = {
  // Main audio player component
  'audio-player': {
    name: 'audio-player',
    description:
      'A feature-rich audio player component with waveform visualization, playback controls, and seeking capabilities for music, podcasts, and voice recordings.',
    type: 'registry:ui',
    registryDependencies: ['button', 'progress', 'text', 'audio-waveform'],
    dependencies: ['expo-audio', 'lucide-react-native'],
    files: [
      {
        path: 'registry/components/ui/audio-player.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
  },

  // Audio waveform component (dependency)
  'audio-waveform': {
    name: 'audio-waveform',
    description:
      'Interactive waveform visualization component for audio playback with seeking capabilities.',
    type: 'registry:ui',
    registryDependencies: ['view'],
    files: [
      {
        path: 'registry/components/ui/audio-waveform.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
  },

  // Default demo
  'audio-player-demo': {
    name: 'audio-player-demo',
    description: 'A complete audio player with all features enabled',
    type: 'registry:example',
    registryDependencies: ['audio-player', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/audio-player/audio-player-demo.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
  },

  // Minimal example
  'audio-player-minimal': {
    name: 'audio-player-minimal',
    description: 'A minimal audio player with only essential controls',
    type: 'registry:example',
    registryDependencies: ['audio-player', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/audio-player/audio-player-minimal.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
  },

  // Waveform focused example
  'audio-player-waveform': {
    name: 'audio-player-waveform',
    description: 'Audio player focused on waveform visualization',
    type: 'registry:example',
    registryDependencies: ['audio-player', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/audio-player/audio-player-waveform.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
  },

  // Progress bar example
  'audio-player-progress': {
    name: 'audio-player-progress',
    description: 'Audio player using only a progress bar for seeking',
    type: 'registry:example',
    registryDependencies: ['audio-player', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/audio-player/audio-player-progress.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
  },

  // Auto play example
  'audio-player-autoplay': {
    name: 'audio-player-autoplay',
    description: 'Audio player that starts playing automatically when loaded',
    type: 'registry:example',
    registryDependencies: ['audio-player', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/audio-player/audio-player-autoplay.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
  },

  // Custom styled example
  'audio-player-styled': {
    name: 'audio-player-styled',
    description: 'An audio player with custom styling and theming',
    type: 'registry:example',
    registryDependencies: ['audio-player', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/audio-player/audio-player-styled.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
  },

  // Podcast player example
  'audio-player-podcast': {
    name: 'audio-player-podcast',
    description:
      'Audio player optimized for podcast playback with episode information',
    type: 'registry:example',
    registryDependencies: ['audio-player', 'text', 'view', 'image'],
    files: [
      {
        path: 'registry/examples/audio-player/audio-player-podcast.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
  },

  // Music player example
  'audio-player-music': {
    name: 'audio-player-music',
    description:
      'Audio player with music-focused UI including album art and track info',
    type: 'registry:example',
    registryDependencies: ['audio-player', 'text', 'view', 'image', 'button'],
    files: [
      {
        path: 'registry/examples/audio-player/audio-player-music.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
  },
};
