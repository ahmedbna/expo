// Registry configuration for text component and examples

export const textRegistry = {
  // Main text component
  text: {
    name: 'text',
    description:
      'A foundational View component with transparent background and ref forwarding support.',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: 'registry/components/ui/text.tsx',
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
  'text-demo': {
    name: 'text-demo',
    description: 'Basic text component showing different variants',
    type: 'registry:example',
    registryDependencies: ['text'],
    files: [
      {
        path: 'registry/examples/text/text-demo.tsx',
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

  'text-variants': {
    name: 'text-variants',
    description: 'All text variants showing the typography hierarchy',
    type: 'registry:example',
    registryDependencies: ['text'],
    files: [
      {
        path: 'registry/examples/text/text-variants.tsx',
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

  'text-colors': {
    name: 'text-colors',
    description: 'Text with custom light and dark mode colors',
    type: 'registry:example',
    registryDependencies: ['text'],
    files: [
      {
        path: 'registry/examples/text/text-colors.tsx',
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
