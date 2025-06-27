// docs/registry/toggle.ts
// Registry configuration for toggle component and examples

export const toggleRegistry = {
  // Main toggle component
  toggle: {
    name: 'toggle',
    description: 'A two-state button that can be either on or off.',
    type: 'registry:ui',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['text', 'view', 'icon'],
    files: [
      {
        path: 'registry/components/ui/toggle.tsx',
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
  'toggle-demo': {
    name: 'toggle-demo',
    description: 'A basic toggle button with icon',
    type: 'registry:example',
    registryDependencies: ['toggle'],
    files: [
      {
        path: 'registry/examples/toggle/toggle-demo.tsx',
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

  // Variants example
  'toggle-variants': {
    name: 'toggle-variants',
    description: 'Toggle buttons in different variants',
    type: 'registry:example',
    registryDependencies: ['toggle'],
    files: [
      {
        path: 'registry/examples/toggle/toggle-variants.tsx',
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

  // Sizes example
  'toggle-sizes': {
    name: 'toggle-sizes',
    description: 'Toggle buttons in different sizes',
    type: 'registry:example',
    registryDependencies: ['toggle'],
    files: [
      {
        path: 'registry/examples/toggle/toggle-sizes.tsx',
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

  // Text example
  'toggle-text': {
    name: 'toggle-text',
    description: 'Toggle buttons with text labels',
    type: 'registry:example',
    registryDependencies: ['toggle'],
    files: [
      {
        path: 'registry/examples/toggle/toggle-text.tsx',
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

  // Disabled example
  'toggle-disabled': {
    name: 'toggle-disabled',
    description: 'Disabled toggle buttons',
    type: 'registry:example',
    registryDependencies: ['toggle'],
    files: [
      {
        path: 'registry/examples/toggle/toggle-disabled.tsx',
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

  // Single toggle group example
  'toggle-group-single': {
    name: 'toggle-group-single',
    description: 'Single selection toggle group',
    type: 'registry:example',
    registryDependencies: ['toggle'],
    files: [
      {
        path: 'registry/examples/toggle/toggle-group-single.tsx',
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

  // Multiple toggle group example
  'toggle-group-multiple': {
    name: 'toggle-group-multiple',
    description: 'Multiple selection toggle group',
    type: 'registry:example',
    registryDependencies: ['toggle'],
    files: [
      {
        path: 'registry/examples/toggle/toggle-group-multiple.tsx',
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

  // Vertical toggle group example
  'toggle-group-vertical': {
    name: 'toggle-group-vertical',
    description: 'Vertical toggle group layout',
    type: 'registry:example',
    registryDependencies: ['toggle'],
    files: [
      {
        path: 'registry/examples/toggle/toggle-group-vertical.tsx',
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

  // Outline toggle group example
  'toggle-group-outline': {
    name: 'toggle-group-outline',
    description: 'Toggle group with outline variant',
    type: 'registry:example',
    registryDependencies: ['toggle'],
    files: [
      {
        path: 'registry/examples/toggle/toggle-group-outline.tsx',
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
