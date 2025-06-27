// Registry configuration for radio component and examples

export const radioRegistry = {
  // Main radio component
  radio: {
    name: 'radio',
    description:
      'A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.',
    type: 'registry:ui',
    dependencies: ['react-native'],
    registryDependencies: ['text', 'view'],
    files: [
      {
        path: 'registry/components/ui/radio.tsx',
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
  'radio-demo': {
    name: 'radio-demo',
    description: 'A basic radio group with multiple options',
    type: 'registry:example',
    registryDependencies: ['radio'],
    files: [
      {
        path: 'registry/examples/radio/radio-demo.tsx',
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

  // Horizontal layout example
  'radio-horizontal': {
    name: 'radio-horizontal',
    description: 'Radio buttons arranged horizontally',
    type: 'registry:example',
    registryDependencies: ['radio'],
    files: [
      {
        path: 'registry/examples/radio/radio-horizontal.tsx',
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

  // Disabled options example
  'radio-disabled': {
    name: 'radio-disabled',
    description: 'Radio group with some disabled options',
    type: 'registry:example',
    registryDependencies: ['radio', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/radio/radio-disabled.tsx',
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
  'radio-styled': {
    name: 'radio-styled',
    description: 'Radio buttons with custom colors and styling',
    type: 'registry:example',
    registryDependencies: ['radio', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/radio/radio-styled.tsx',
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

  // Form integration example
  'radio-form': {
    name: 'radio-form',
    description: 'Radio group integrated with form validation',
    type: 'registry:example',
    registryDependencies: ['radio', 'button', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/radio/radio-form.tsx',
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

  // Large size example
  'radio-large': {
    name: 'radio-large',
    description: 'Radio buttons with larger size and spacing',
    type: 'registry:example',
    registryDependencies: ['radio'],
    files: [
      {
        path: 'registry/examples/radio/radio-large.tsx',
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

  // Single radio button example
  'radio-single': {
    name: 'radio-single',
    description: 'Individual radio button component usage',
    type: 'registry:example',
    registryDependencies: ['radio', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/radio/radio-single.tsx',
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
