// Registry configuration for camera component and examples

export const cameraRegistry = {
  // Main camera component
  camera: {
    name: 'camera',
    description:
      'A powerful camera component with advanced features like zoom, timer, torch, and video recording.',
    type: 'registry:ui',
    dependencies: [
      'expo-camera',
      'react-native-gesture-handler',
      'lucide-react-native',
    ],
    registryDependencies: ['button', 'text', 'progress'],
    files: [
      {
        path: 'registry/components/ui/camera.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/camera-preview-light.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/camera-preview-dark.mp4',
    },
  },

  // Default demo
  'camera-demo': {
    name: 'camera-demo',
    description: 'A basic camera with default settings',
    type: 'registry:example',
    registryDependencies: ['camera'],
    files: [
      {
        path: 'registry/examples/camera/camera-demo.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/camera-demo-light.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/camera-demo-dark.mp4',
    },
  },

  // Custom controls example
  'camera-custom-controls': {
    name: 'camera-custom-controls',
    description: 'Camera with custom control settings',
    type: 'registry:example',
    registryDependencies: ['camera'],
    files: [
      {
        path: 'registry/examples/camera/camera-custom-controls.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/camera-custom-light.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/camera-custom-dark.mp4',
    },
  },

  // Picture only example
  'camera-picture-only': {
    name: 'camera-picture-only',
    description: 'Camera configured for picture-only mode',
    type: 'registry:example',
    registryDependencies: ['camera'],
    files: [
      {
        path: 'registry/examples/camera/camera-picture-only.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/camera-picture-light.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/camera-picture-dark.mp4',
    },
  },

  // Video example
  'camera-video': {
    name: 'camera-video',
    description: 'Camera with video recording capabilities',
    type: 'registry:example',
    registryDependencies: ['camera'],
    files: [
      {
        path: 'registry/examples/camera/camera-video.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/camera-video-light.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/camera-video-dark.mp4',
    },
  },

  // Timer example
  'camera-timer': {
    name: 'camera-timer',
    description: 'Camera with timer functionality',
    type: 'registry:example',
    registryDependencies: ['camera'],
    files: [
      {
        path: 'registry/examples/camera/camera-timer.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/camera-timer-light.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/camera-timer-dark.mp4',
    },
  },

  // Zoom example
  'camera-zoom': {
    name: 'camera-zoom',
    description: 'Camera with zoom controls and gestures',
    type: 'registry:example',
    registryDependencies: ['camera'],
    files: [
      {
        path: 'registry/examples/camera/camera-zoom.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/camera-zoom-light.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/camera-zoom-dark.mp4',
    },
  },

  // Settings example
  'camera-settings': {
    name: 'camera-settings',
    description: 'Camera with advanced settings panel',
    type: 'registry:example',
    registryDependencies: ['camera'],
    files: [
      {
        path: 'registry/examples/camera/camera-settings.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/camera-settings-light.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/camera-settings-dark.mp4',
    },
  },

  // Minimal example
  'camera-minimal': {
    name: 'camera-minimal',
    description: 'Camera with minimal controls for simple use cases',
    type: 'registry:example',
    registryDependencies: ['camera'],
    files: [
      {
        path: 'registry/examples/camera/camera-minimal.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/camera-minimal-light.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/camera-minimal-dark.mp4',
    },
  },
};
