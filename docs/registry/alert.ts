// docs/registry/alert.ts
// Registry configuration for alert component and examples

export const alertRegistry = {
  // Main alert component
  alert: {
    name: 'alert',
    description:
      'Display important messages to users with both visual inline alerts and native system alerts.',
    type: 'registry:ui',
    registryDependencies: ['text', 'view'],
    files: [
      {
        path: 'registry/components/ui/alert.tsx',
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

  // Two button alert demo
  'alert-demo': {
    name: 'alert-demo',
    description: 'A basic native alert with two buttons',
    type: 'registry:example',
    registryDependencies: ['alert', 'button'],
    files: [
      {
        path: 'registry/examples/alert/alert-demo.tsx',
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

  // Three button alert demo
  'alert-three-button-demo': {
    name: 'alert-three-button-demo',
    description: 'A native alert with three button options',
    type: 'registry:example',
    registryDependencies: ['alert', 'button'],
    files: [
      {
        path: 'registry/examples/alert/alert-three-button-demo.tsx',
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

  // Success alert demo
  'alert-success-demo': {
    name: 'alert-success-demo',
    description: 'Success alert with positive messaging',
    type: 'registry:example',
    registryDependencies: ['alert', 'button'],
    files: [
      {
        path: 'registry/examples/alert/alert-success-demo.tsx',
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

  // Error alert demo
  'alert-error-demo': {
    name: 'alert-error-demo',
    description: 'Error alert with destructive styling',
    type: 'registry:example',
    registryDependencies: ['alert', 'button'],
    files: [
      {
        path: 'registry/examples/alert/alert-error-demo.tsx',
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

  // Confirm alert demo
  'alert-confirm-demo': {
    name: 'alert-confirm-demo',
    description: 'Confirmation alert for destructive actions',
    type: 'registry:example',
    registryDependencies: ['alert', 'button'],
    files: [
      {
        path: 'registry/examples/alert/alert-confirm-demo.tsx',
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

  // Custom alert demo
  'alert-custom-demo': {
    name: 'alert-custom-demo',
    description: 'Custom native alert with multiple options',
    type: 'registry:example',
    registryDependencies: ['alert', 'button'],
    files: [
      {
        path: 'registry/examples/alert/alert-custom-demo.tsx',
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

  // Visual alert demo
  'alert-visual-demo': {
    name: 'alert-visual-demo',
    description: 'Inline visual alerts that appear within your content',
    type: 'registry:example',
    registryDependencies: ['alert', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/alert/alert-visual-demo.tsx',
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

  // Visual destructive alert demo
  'alert-visual-destructive-demo': {
    name: 'alert-visual-destructive-demo',
    description: 'Destructive visual alerts for error messages',
    type: 'registry:example',
    registryDependencies: ['alert', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/alert/alert-visual-destructive-demo.tsx',
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

  // Advanced examples combining multiple alert types
  'alert-advanced-demo': {
    name: 'alert-advanced-demo',
    description: 'Advanced alert usage patterns and combinations',
    type: 'registry:example',
    registryDependencies: ['alert', 'button', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/alert/alert-advanced-demo.tsx',
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
