// Registry configuration for carousel component and examples

export const carouselRegistry = {
  // Main carousel component
  carousel: {
    name: 'carousel',
    description:
      'A flexible carousel component with support for auto-play, indicators, arrows, and custom layouts.',
    type: 'registry:ui',
    dependencies: [
      'expo-blur',
      'lucide-react-native',
      'react-native-gesture-handler',
    ],
    registryDependencies: ['text', 'view', 'button'],
    files: [
      {
        path: 'registry/components/ui/carousel.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
    preview: {
      light:
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      dark: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    },
  },

  // Default demo
  'carousel-demo': {
    name: 'carousel-demo',
    description: 'A basic carousel with auto-play and indicators',
    type: 'registry:example',
    registryDependencies: ['carousel'],
    files: [
      {
        path: 'registry/examples/carousel/carousel-demo.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      dark: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    },
  },

  // Arrows example
  'carousel-arrows': {
    name: 'carousel-arrows',
    description: 'Carousel with navigation arrows and indicators',
    type: 'registry:example',
    registryDependencies: ['carousel'],
    files: [
      {
        path: 'registry/examples/carousel/carousel-arrows.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop',
      dark: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop',
    },
  },

  // Custom width example
  'carousel-custom-width': {
    name: 'carousel-custom-width',
    description: 'Carousel with custom item width and spacing',
    type: 'registry:example',
    registryDependencies: ['carousel'],
    files: [
      {
        path: 'registry/examples/carousel/carousel-custom-width.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://images.unsplash.com/photo-1560472354-73c71b6391f0?w=800&h=600&fit=crop',
      dark: 'https://images.unsplash.com/photo-1560472354-73c71b6391f0?w=800&h=600&fit=crop',
    },
  },

  // Images example
  'carousel-images': {
    name: 'carousel-images',
    description: 'Image carousel with auto-play and loop',
    type: 'registry:example',
    registryDependencies: ['carousel'],
    dependencies: ['expo-image'],
    files: [
      {
        path: 'registry/examples/carousel/carousel-images.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      dark: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    },
  },

  // Cards example
  'carousel-cards': {
    name: 'carousel-cards',
    description: 'Card-based carousel with custom content',
    type: 'registry:example',
    registryDependencies: ['carousel'],
    files: [
      {
        path: 'registry/examples/carousel/carousel-cards.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
      dark: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
    },
  },

  // No indicators example
  'carousel-no-indicators': {
    name: 'carousel-no-indicators',
    description: 'Carousel without indicators, arrows only',
    type: 'registry:example',
    registryDependencies: ['carousel'],
    files: [
      {
        path: 'registry/examples/carousel/carousel-no-indicators.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      dark: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    },
  },

  // Manual control example
  'carousel-manual': {
    name: 'carousel-manual',
    description: 'Manually controlled carousel with external buttons',
    type: 'registry:example',
    registryDependencies: ['carousel', 'button'],
    files: [
      {
        path: 'registry/examples/carousel/carousel-manual.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop',
      dark: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop',
    },
  },
};
