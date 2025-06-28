// Registry configuration for parallax-scrollview component and examples

export const parallaxScrollViewRegistry = {
  // Main parallax-scrollview component
  'parallax-scrollview': {
    name: 'parallax-scrollview',
    description:
      'A scroll view with parallax header effect that transforms as the user scrolls.',
    type: 'registry:ui',
    dependencies: ['react-native-reanimated'],
    registryDependencies: ['view'],
    files: [
      {
        path: 'registry/components/ui/parallax-scrollview.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    },
  },

  // Default demo
  'parallax-scrollview-demo': {
    name: 'parallax-scrollview-demo',
    description: 'A basic parallax scroll view with header image',
    type: 'registry:example',
    registryDependencies: ['parallax-scrollview', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/parallax-scrollview/parallax-scrollview-demo.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    },
  },

  // Custom height example
  'parallax-scrollview-custom-height': {
    name: 'parallax-scrollview-custom-height',
    description: 'Parallax scroll view with custom header height',
    type: 'registry:example',
    registryDependencies: ['parallax-scrollview', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/parallax-scrollview/parallax-scrollview-custom-height.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    },
  },

  // Gradient example
  'parallax-scrollview-gradient': {
    name: 'parallax-scrollview-gradient',
    description: 'Parallax scroll view with gradient overlay header',
    type: 'registry:example',
    dependencies: ['expo-linear-gradient'],
    registryDependencies: ['parallax-scrollview', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/parallax-scrollview/parallax-scrollview-gradient.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    },
  },

  // Profile example
  'parallax-scrollview-profile': {
    name: 'parallax-scrollview-profile',
    description: 'Complete profile screen using parallax scroll view',
    type: 'registry:example',
    dependencies: ['expo-linear-gradient'],
    registryDependencies: ['parallax-scrollview', 'avatar', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/parallax-scrollview/parallax-scrollview-profile.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    },
  },

  // Article example
  'parallax-scrollview-article': {
    name: 'parallax-scrollview-article',
    description: 'Article layout with parallax hero image',
    type: 'registry:example',
    dependencies: ['expo-linear-gradient'],
    registryDependencies: ['parallax-scrollview', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/parallax-scrollview/parallax-scrollview-article.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    },
  },

  // Product example
  'parallax-scrollview-product': {
    name: 'parallax-scrollview-product',
    description: 'Product detail screen with parallax image gallery',
    type: 'registry:example',
    registryDependencies: ['parallax-scrollview', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/parallax-scrollview/parallax-scrollview-product.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    },
  },
};
