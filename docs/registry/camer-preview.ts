// Registry configuration for camera preview component and examples

export const cameraPreviewRegistry = {
  // Main camera preview component
  'camera-preview': {
    name: 'camera-preview',
    description:
      'A comprehensive camera component with capture, preview, and media management capabilities.',
    type: 'registry:ui',
    dependencies: [
      'expo-camera',
      'expo-media-library',
      'expo-av',
      'lucide-react-native',
      'react-native-safe-area-context',
    ],
    registryDependencies: [
      'button',
      'text',
      'view',
      'image',
      'video',
      'camera',
    ],
    files: [
      {
        path: 'registry/components/ui/camera-preview.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
    preview: {
      light:
        'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop',
      dark: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop',
    },
  },

  // Default demo
  'camera-preview-demo': {
    name: 'camera-preview-demo',
    description: 'A basic camera preview with capture and save functionality',
    type: 'registry:example',
    registryDependencies: ['camera-preview'],
    files: [
      {
        path: 'registry/examples/camera-preview/camera-preview-demo.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop',
      dark: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop',
    },
  },
};
