// Registry configuration for switch component and examples

export const switchRegistry = {
  // Main switch component
  switch: {
    name: 'switch',
    description:
      'A control that allows the user to toggle between checked and not checked states.',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: ['text', 'view'],
    files: [
      {
        path: 'registry/components/ui/switch.tsx',
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
  'switch-demo': {
    name: 'switch-demo',
    description: 'A basic switch with label',
    type: 'registry:example',
    registryDependencies: ['switch'],
    files: [
      {
        path: 'registry/examples/switch/switch-demo.tsx',
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

  'switch-simple': {
    name: 'switch-simple',
    description: 'A switch without label text',
    type: 'registry:example',
    registryDependencies: ['switch', 'view'],
    files: [
      {
        path: 'registry/examples/switch/switch-simple.tsx',
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

  'switch-error': {
    name: 'switch-error',
    description: 'Switch with error message and styling',
    type: 'registry:example',
    registryDependencies: ['switch', 'view'],
    files: [
      {
        path: 'registry/examples/switch/switch-error.tsx',
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

  'switch-disabled': {
    name: 'switch-disabled',
    description: 'Switches in disabled state',
    type: 'registry:example',
    registryDependencies: ['switch', 'view'],
    files: [
      {
        path: 'registry/examples/switch/switch-disabled.tsx',
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

  'switch-settings': {
    name: 'switch-settings',
    description: 'Multiple switches arranged in a settings list',
    type: 'registry:example',
    registryDependencies: ['switch', 'view'],
    files: [
      {
        path: 'registry/examples/switch/switch-settings.tsx',
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

  'switch-colors': {
    name: 'switch-colors',
    description: 'Switches with custom colors and styling',
    type: 'registry:example',
    registryDependencies: ['switch', 'view'],
    files: [
      {
        path: 'registry/examples/switch/switch-colors.tsx',
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
