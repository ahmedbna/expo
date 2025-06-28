// Registry configuration for icon component and examples

export const iconRegistry = {
  // Main icon component
  icon: {
    name: 'icon',
    description:
      'A themed icon component with support for Lucide React Native icons.',
    type: 'registry:ui',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['text', 'view'],
    files: [
      {
        path: 'registry/components/ui/icon.tsx',
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
  'icon-demo': {
    name: 'icon-demo',
    description: 'A basic icon with default styling',
    type: 'registry:example',
    registryDependencies: ['icon'],
    files: [
      {
        path: 'registry/examples/icon/icon-demo.tsx',
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
  'icon-sizes': {
    name: 'icon-sizes',
    description: 'Icons in different sizes',
    type: 'registry:example',
    registryDependencies: ['icon'],
    files: [
      {
        path: 'registry/examples/icon/icon-sizes.tsx',
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

  // Colors example
  'icon-colors': {
    name: 'icon-colors',
    description: 'Icons with custom colors and themed colors',
    type: 'registry:example',
    registryDependencies: ['icon'],
    files: [
      {
        path: 'registry/examples/icon/icon-colors.tsx',
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

  // Stroke weights example
  'icon-stroke': {
    name: 'icon-stroke',
    description: 'Icons with different stroke weights',
    type: 'registry:example',
    registryDependencies: ['icon'],
    files: [
      {
        path: 'registry/examples/icon/icon-stroke.tsx',
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

  // Interactive example
  'icon-interactive': {
    name: 'icon-interactive',
    description: 'Icons with press and hover interactions',
    type: 'registry:example',
    registryDependencies: ['icon'],
    files: [
      {
        path: 'registry/examples/icon/icon-interactive.tsx',
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

  // Grid example
  'icon-grid': {
    name: 'icon-grid',
    description: 'A grid of commonly used icons',
    type: 'registry:example',
    registryDependencies: ['icon'],
    files: [
      {
        path: 'registry/examples/icon/icon-grid.tsx',
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

  // Themed example
  'icon-themed': {
    name: 'icon-themed',
    description: 'Icons that adapt to light and dark themes',
    type: 'registry:example',
    registryDependencies: ['icon'],
    files: [
      {
        path: 'registry/examples/icon/icon-themed.tsx',
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
