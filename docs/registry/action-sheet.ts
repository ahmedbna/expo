// docs/registry/action-sheet.ts
// Registry configuration for action sheet component and examples

export const actionSheetRegistry = {
  // Main action sheet component
  'action-sheet': {
    name: 'action-sheet',
    description:
      'A native-feeling action sheet component that provides a menu of options triggered from the bottom of the screen.',
    type: 'registry:ui',
    registryDependencies: ['text', 'view'],
    files: [
      {
        path: 'registry/components/ui/action-sheet.tsx',
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
  'action-sheet-demo': {
    name: 'action-sheet-demo',
    description: 'A basic action sheet with multiple options',
    type: 'registry:example',
    registryDependencies: ['action-sheet', 'button'],
    files: [
      {
        path: 'registry/examples/action-sheet/action-sheet-demo.tsx',
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

  // Icons example
  'action-sheet-icons': {
    name: 'action-sheet-icons',
    description: 'An action sheet with icons next to each option',
    type: 'registry:example',
    registryDependencies: ['action-sheet', 'button', 'icon'],
    files: [
      {
        path: 'registry/examples/action-sheet/action-sheet-icons.tsx',
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

  // Destructive example
  'action-sheet-destructive': {
    name: 'action-sheet-destructive',
    description:
      'An action sheet featuring destructive actions with appropriate styling',
    type: 'registry:example',
    registryDependencies: ['action-sheet', 'button', 'icon'],
    files: [
      {
        path: 'registry/examples/action-sheet/action-sheet-destructive.tsx',
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

  // Disabled example
  'action-sheet-disabled': {
    name: 'action-sheet-disabled',
    description: 'An action sheet with some disabled options',
    type: 'registry:example',
    registryDependencies: ['action-sheet', 'button', 'icon'],
    files: [
      {
        path: 'registry/examples/action-sheet/action-sheet-disabled.tsx',
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
  'action-sheet-styled': {
    name: 'action-sheet-styled',
    description: 'An action sheet with custom styling and branding',
    type: 'registry:example',
    registryDependencies: ['action-sheet', 'button', 'icon'],
    files: [
      {
        path: 'registry/examples/action-sheet/action-sheet-styled.tsx',
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

  // Long list example
  'action-sheet-long': {
    name: 'action-sheet-long',
    description: 'An action sheet with many options that scrolls',
    type: 'registry:example',
    registryDependencies: ['action-sheet', 'button', 'icon'],
    files: [
      {
        path: 'registry/examples/action-sheet/action-sheet-long.tsx',
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

  // Hook usage example
  'action-sheet-hook': {
    name: 'action-sheet-hook',
    description: 'Using the useActionSheet hook for easier management',
    type: 'registry:example',
    registryDependencies: ['action-sheet', 'button', 'view', 'icon'],
    files: [
      {
        path: 'registry/examples/action-sheet/action-sheet-hook.tsx',
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
