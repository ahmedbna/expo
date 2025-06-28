// Registry configuration for mode-toggle component and examples

export const modeToggleRegistry = {
  // Main mode-toggle component
  'mode-toggle': {
    name: 'mode-toggle',
    description:
      'An animated button component for switching between light and dark themes.',
    type: 'registry:ui',
    dependencies: ['lucide-react-native', 'react-native-reanimated'],
    registryDependencies: ['button', 'icon'],
    files: [
      {
        path: 'registry/components/ui/mode-toggle.tsx',
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
  'mode-toggle-demo': {
    name: 'mode-toggle-demo',
    description: 'Animated theme toggle button',
    type: 'registry:example',
    registryDependencies: ['mode-toggle'],
    files: [
      {
        path: 'registry/examples/mode-toggle/mode-toggle-demo.tsx',
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
