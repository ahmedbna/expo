// Registry configuration for image component and examples

export const imageRegistry = {
  // Main image component
  image: {
    name: 'image',
    description:
      'A responsive image component with loading states, error handling, and flexible styling options.',
    type: 'registry:ui',
    dependencies: ['expo-image'],
    registryDependencies: ['text', 'view'],
    files: [
      {
        path: 'registry/components/ui/image.tsx',
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
  'image-demo': {
    name: 'image-demo',
    description: 'A basic image with loading indicator and error fallback',
    type: 'registry:example',
    registryDependencies: ['image'],
    files: [
      {
        path: 'registry/examples/image/image-demo.tsx',
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
  'image-variants': {
    name: 'image-variants',
    description: 'Images with different border radius variants',
    type: 'registry:example',
    registryDependencies: ['image'],
    files: [
      {
        path: 'registry/examples/image/image-variants.tsx',
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
  'image-sizes': {
    name: 'image-sizes',
    description: 'Images in different sizes and aspect ratios',
    type: 'registry:example',
    registryDependencies: ['image'],
    files: [
      {
        path: 'registry/examples/image/image-sizes.tsx',
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

  // Loading states example
  'image-loading': {
    name: 'image-loading',
    description: 'Images with different loading indicator configurations',
    type: 'registry:example',
    registryDependencies: ['image'],
    files: [
      {
        path: 'registry/examples/image/image-loading.tsx',
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

  'image-gallery': {
    name: 'image-gallery',
    description: 'Multiple images arranged in a gallery layout',
    type: 'registry:example',
    registryDependencies: ['image'],
    files: [
      {
        path: 'registry/examples/image/image-gallery.tsx',
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

  'image-responsive': {
    name: 'image-responsive',
    description: 'Responsive images that adapt to container size',
    type: 'registry:example',
    registryDependencies: ['image'],
    files: [
      {
        path: 'registry/examples/image/image-responsive.tsx',
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

  'image-content-fit': {
    name: 'image-content-fit',
    description: 'Images with different content fit modes',
    type: 'registry:example',
    registryDependencies: ['image'],
    files: [
      {
        path: 'registry/examples/image/image-content-fit.tsx',
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
