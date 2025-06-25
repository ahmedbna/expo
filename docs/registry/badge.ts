// Registry configuration for badge component and examples

export const badgeRegistry = {
  // Main badge component
  badge: {
    name: 'badge',
    description: 'A small status descriptor for UI elements.',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: ['text', 'view'],
    files: [
      {
        path: 'registry/components/ui/badge.tsx',
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
  'badge-demo': {
    name: 'badge-demo',
    description: 'Basic badges showing all available variants',
    type: 'registry:example',
    registryDependencies: ['badge'],
    files: [
      {
        path: 'registry/examples/badge/badge-demo.tsx',
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

  // Icons example
  'badge-icons': {
    name: 'badge-icons',
    description: 'Badges with icons and custom content',
    type: 'registry:example',
    registryDependencies: ['badge'],
    files: [
      {
        path: 'registry/examples/badge/badge-icons.tsx',
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

  // Notifications example
  'badge-notifications': {
    name: 'badge-notifications',
    description: 'Small notification badges for counters and status',
    type: 'registry:example',
    registryDependencies: ['badge'],
    files: [
      {
        path: 'registry/examples/badge/badge-notifications.tsx',
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
  'badge-styled': {
    name: 'badge-styled',
    description: 'Badges with custom colors and styling',
    type: 'registry:example',
    registryDependencies: ['badge'],
    files: [
      {
        path: 'registry/examples/badge/badge-styled.tsx',
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
  'badge-interactive': {
    name: 'badge-interactive',
    description: 'Badges that can be pressed or dismissed',
    type: 'registry:example',
    registryDependencies: ['badge'],
    files: [
      {
        path: 'registry/examples/badge/badge-interactive.tsx',
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
  'badge-sizes': {
    name: 'badge-sizes',
    description: 'Badges in different sizes',
    type: 'registry:example',
    registryDependencies: ['badge'],
    files: [
      {
        path: 'registry/examples/badge/badge-sizes.tsx',
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

  // Status example
  'badge-status': {
    name: 'badge-status',
    description: 'Badges used as status indicators',
    type: 'registry:example',
    registryDependencies: ['badge'],
    files: [
      {
        path: 'registry/examples/badge/badge-status.tsx',
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
