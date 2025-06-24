// docs/registry/audio-waveform.ts
// Registry configuration for audio-waveform component and examples

export const audioWaveformRegistry = {
  // Main audio-waveform component
  'audio-waveform': {
    name: 'audio-waveform',
    description:
      'A customizable audio waveform visualization component with playback progress and interactive seeking capabilities.',
    type: 'registry:ui',
    registryDependencies: ['text', 'view'],
    files: [
      {
        path: 'registry/components/ui/audio-waveform.tsx',
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

  // Basic demo
  'audio-waveform-demo': {
    name: 'audio-waveform-demo',
    description:
      'A basic audio waveform with playback controls and progress tracking',
    type: 'registry:example',
    registryDependencies: ['audio-waveform', 'button', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/audio-waveform/audio-waveform-demo.tsx',
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

  // Recording demo
  'audio-waveform-recording': {
    name: 'audio-waveform-recording',
    description:
      'An animated waveform for recording visualization with real-time audio levels',
    type: 'registry:example',
    registryDependencies: ['audio-waveform', 'button', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/audio-waveform/audio-waveform-recording.tsx',
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

  // Interactive demo
  'audio-waveform-interactive': {
    name: 'audio-waveform-interactive',
    description:
      'A waveform with touch-based seeking functionality and custom audio data',
    type: 'registry:example',
    registryDependencies: ['audio-waveform', 'button', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/audio-waveform/audio-waveform-interactive.tsx',
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

  // Styled demo
  'audio-waveform-styled': {
    name: 'audio-waveform-styled',
    description:
      'Multiple themed waveforms with custom colors, dimensions, and styles',
    type: 'registry:example',
    registryDependencies: ['audio-waveform', 'button', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/audio-waveform/audio-waveform-styled.tsx',
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

  // Real-time demo
  'audio-waveform-realtime': {
    name: 'audio-waveform-realtime',
    description:
      'A waveform that updates with real-time audio data and configurable patterns',
    type: 'registry:example',
    registryDependencies: ['audio-waveform', 'button', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/audio-waveform/audio-waveform-realtime.tsx',
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

  // Compact demo
  'audio-waveform-compact': {
    name: 'audio-waveform-compact',
    description:
      'Compact waveforms suitable for chat messages and minimal interfaces',
    type: 'registry:example',
    registryDependencies: ['audio-waveform', 'button', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/audio-waveform/audio-waveform-compact.tsx',
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
