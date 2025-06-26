// Registry configuration for input-otp component and examples

export const inputOtpRegistry = {
  // Main input-otp component
  'input-otp': {
    name: 'input-otp',
    description:
      'A secure input component for one-time passwords and verification codes.',
    type: 'registry:ui',
    registryDependencies: ['text'],
    files: [
      {
        path: 'registry/components/ui/input-otp.tsx',
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
  'input-otp-demo': {
    name: 'input-otp-demo',
    description: 'A basic OTP input with 6 digits',
    type: 'registry:example',
    registryDependencies: ['input-otp'],
    files: [
      {
        path: 'registry/examples/input-otp/input-otp-demo.tsx',
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

  // Lengths example
  'input-otp-lengths': {
    name: 'input-otp-lengths',
    description: 'OTP inputs with different digit lengths',
    type: 'registry:example',
    registryDependencies: ['input-otp', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/input-otp/input-otp-lengths.tsx',
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

  // Separator example
  'input-otp-separator': {
    name: 'input-otp-separator',
    description: 'OTP input with dash separators between digits',
    type: 'registry:example',
    registryDependencies: ['input-otp', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/input-otp/input-otp-separator.tsx',
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

  'input-otp-masked': {
    name: 'input-otp-masked',
    description: 'OTP input that masks digits with dots for security',
    type: 'registry:example',
    registryDependencies: ['input-otp', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/input-otp/input-otp-masked.tsx',
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

  'input-otp-error': {
    name: 'input-otp-error',
    description: 'OTP input showing error state with validation message',
    type: 'registry:example',
    registryDependencies: ['input-otp', 'text', 'view', 'button'],
    files: [
      {
        path: 'registry/examples/input-otp/input-otp-error.tsx',
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

  'input-otp-disabled': {
    name: 'input-otp-disabled',
    description: 'OTP input in disabled state',
    type: 'registry:example',
    registryDependencies: ['input-otp', 'text', 'view', 'button'],
    files: [
      {
        path: 'registry/examples/input-otp/input-otp-disabled.tsx',
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

  'input-otp-styled': {
    name: 'input-otp-styled',
    description: 'OTP input with custom colors and styling',
    type: 'registry:example',
    registryDependencies: ['input-otp', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/input-otp/input-otp-styled.tsx',
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

  'input-otp-no-cursor': {
    name: 'input-otp-no-cursor',
    description: 'OTP input without the blinking cursor indicator',
    type: 'registry:example',
    registryDependencies: ['input-otp', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/input-otp/input-otp-no-cursor.tsx',
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
