// Registry configuration for hello-wave component and examples

export const helloWaveRegistry = {
  // Main hello-wave component
  'hello-wave': {
    name: 'hello-wave',
    description:
      'An animated waving hand emoji component with smooth rotation animation.',
    type: 'registry:ui',
    dependencies: ['react-native-reanimated'],
    registryDependencies: ['text', 'view'],
    files: [
      {
        path: 'registry/components/ui/hello-wave.tsx',
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

  // Default demo
  'hello-wave-demo': {
    name: 'hello-wave-demo',
    description: 'An animated waving hand emoji',
    type: 'registry:example',
    registryDependencies: ['hello-wave'],
    files: [
      {
        path: 'registry/examples/hello-wave/hello-wave-demo.tsx',
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
