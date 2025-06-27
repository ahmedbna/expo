// Registry configuration for view component and examples

export const viewRegistry = {
  // Main view component
  view: {
    name: 'view',
    description:
      'A foundational View component with transparent background and ref forwarding support.',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: ['text', 'view'],
    files: [
      {
        path: 'registry/components/ui/view.tsx',
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
  'view-demo': {
    name: 'view-demo',
    description: 'Basic view container with content',
    type: 'registry:example',
    registryDependencies: ['view'],
    files: [
      {
        path: 'registry/examples/view/view-demo.tsx',
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
