// Registry configuration for skeleton component and examples

export const skeletonRegistry = {
  // Main skeleton component
  skeleton: {
    name: 'skeleton',
    description:
      'A placeholder component to show a loading state while content is being fetched.',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: 'registry/components/ui/skeleton.tsx',
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
  'skeleton-demo': {
    name: 'skeleton-demo',
    description: 'A basic skeleton loader with pulsing animation',
    type: 'registry:example',
    registryDependencies: ['skeleton'],
    files: [
      {
        path: 'registry/examples/skeleton/skeleton-demo.tsx',
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
  'skeleton-sizes': {
    name: 'skeleton-sizes',
    description: 'Skeletons in various sizes and dimensions',
    type: 'registry:example',
    registryDependencies: ['skeleton', 'view'],
    files: [
      {
        path: 'registry/examples/skeleton/skeleton-sizes.tsx',
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

  'skeleton-card': {
    name: 'skeleton-card',
    description: 'Skeleton placeholders arranged in a card layout',
    type: 'registry:example',
    registryDependencies: ['skeleton', 'view'],
    files: [
      {
        path: 'registry/examples/skeleton/skeleton-card.tsx',
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

  'skeleton-profile': {
    name: 'skeleton-profile',
    description: 'Skeleton layout mimicking a user profile',
    type: 'registry:example',
    registryDependencies: ['skeleton', 'view'],
    files: [
      {
        path: 'registry/examples/skeleton/skeleton-profile.tsx',
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

  'skeleton-list': {
    name: 'skeleton-list',
    description: 'Multiple skeleton items arranged in a list',
    type: 'registry:example',
    registryDependencies: ['skeleton', 'view'],
    files: [
      {
        path: 'registry/examples/skeleton/skeleton-list.tsx',
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

  'skeleton-shapes': {
    name: 'skeleton-shapes',
    description: 'Skeletons with custom shapes and styling',
    type: 'registry:example',
    registryDependencies: ['skeleton', 'view'],
    files: [
      {
        path: 'registry/examples/skeleton/skeleton-shapes.tsx',
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
