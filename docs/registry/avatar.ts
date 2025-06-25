// Registry configuration for avatar component and examples

export const avatarRegistry = {
  // Main avatar component
  avatar: {
    name: 'avatar',
    description: 'An image element with a fallback for representing the user.',
    type: 'registry:ui',
    dependencies: ['expo-image'],
    registryDependencies: ['text', 'view', 'image'],
    files: [
      {
        path: 'registry/components/ui/avatar.tsx',
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
  'avatar-demo': {
    name: 'avatar-demo',
    description: 'A basic avatar with image and fallback text',
    type: 'registry:example',
    registryDependencies: ['avatar'],
    files: [
      {
        path: 'registry/examples/avatar/avatar-demo.tsx',
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
  'avatar-sizes': {
    name: 'avatar-sizes',
    description: 'Avatars in different sizes',
    type: 'registry:example',
    registryDependencies: ['avatar'],
    files: [
      {
        path: 'registry/examples/avatar/avatar-sizes.tsx',
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

  // Fallback example
  'avatar-fallback': {
    name: 'avatar-fallback',
    description: 'Avatars with fallback text when no image is provided',
    type: 'registry:example',
    registryDependencies: ['avatar'],
    files: [
      {
        path: 'registry/examples/avatar/avatar-fallback.tsx',
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
  'avatar-styled': {
    name: 'avatar-styled',
    description: 'Avatars with custom styling and colors',
    type: 'registry:example',
    registryDependencies: ['avatar'],
    files: [
      {
        path: 'registry/examples/avatar/avatar-styled.tsx',
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

  // Group example
  'avatar-group': {
    name: 'avatar-group',
    description: 'Multiple avatars arranged in a group layout',
    type: 'registry:example',
    registryDependencies: ['avatar'],
    files: [
      {
        path: 'registry/examples/avatar/avatar-group.tsx',
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
  'avatar-status': {
    name: 'avatar-status',
    description: 'Avatars with online/offline status indicators',
    type: 'registry:example',
    registryDependencies: ['avatar'],
    files: [
      {
        path: 'registry/examples/avatar/avatar-status.tsx',
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

  // Bordered example
  'avatar-bordered': {
    name: 'avatar-bordered',
    description: 'Avatars with custom borders and shadows',
    type: 'registry:example',
    registryDependencies: ['avatar'],
    files: [
      {
        path: 'registry/examples/avatar/avatar-bordered.tsx',
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
