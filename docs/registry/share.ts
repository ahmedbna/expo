// Registry configuration for share component and examples

export const shareRegistry = {
  // Main share component
  share: {
    name: 'share',
    description:
      'A button component for sharing content across platforms with native share functionality.',
    type: 'registry:ui',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['button', 'text'],
    files: [
      {
        path: 'registry/components/ui/share.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
    preview: {
      light: 'https://ui.shadcn.com/examples/share-demo-light.png',
      dark: 'https://ui.shadcn.com/examples/share-demo-dark.png',
    },
  },

  // Default demo
  'share-demo': {
    name: 'share-demo',
    description: 'A basic share button with text and URL sharing',
    type: 'registry:example',
    registryDependencies: ['share'],
    files: [
      {
        path: 'registry/examples/share/share-demo.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://ui.shadcn.com/examples/share-demo-light.png',
      dark: 'https://ui.shadcn.com/examples/share-demo-dark.png',
    },
  },

  // Variants example
  'share-variants': {
    name: 'share-variants',
    description: 'Share buttons with different visual variants',
    type: 'registry:example',
    registryDependencies: ['share', 'view'],
    files: [
      {
        path: 'registry/examples/share/share-variants.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://ui.shadcn.com/examples/share-variants-light.png',
      dark: 'https://ui.shadcn.com/examples/share-variants-dark.png',
    },
  },

  // Sizes example
  'share-sizes': {
    name: 'share-sizes',
    description: 'Share buttons in different sizes',
    type: 'registry:example',
    registryDependencies: ['share', 'view'],
    files: [
      {
        path: 'registry/examples/share/share-sizes.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://ui.shadcn.com/examples/share-sizes-light.png',
      dark: 'https://ui.shadcn.com/examples/share-sizes-dark.png',
    },
  },

  // URL only example
  'share-url-only': {
    name: 'share-url-only',
    description: 'Share button for sharing URLs without additional text',
    type: 'registry:example',
    registryDependencies: ['share', 'view'],
    files: [
      {
        path: 'registry/examples/share/share-url-only.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://ui.shadcn.com/examples/share-url-only-light.png',
      dark: 'https://ui.shadcn.com/examples/share-url-only-dark.png',
    },
  },

  // Custom content example
  'share-custom-content': {
    name: 'share-custom-content',
    description: 'Share button with custom title, subject, and content',
    type: 'registry:example',
    registryDependencies: ['share', 'view'],
    files: [
      {
        path: 'registry/examples/share/share-custom-content.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://ui.shadcn.com/examples/share-custom-content-light.png',
      dark: 'https://ui.shadcn.com/examples/share-custom-content-dark.png',
    },
  },

  // Icon only example
  'share-icon-only': {
    name: 'share-icon-only',
    description: 'Compact share button with icon only',
    type: 'registry:example',
    registryDependencies: ['share', 'view'],
    files: [
      {
        path: 'registry/examples/share/share-icon-only.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://ui.shadcn.com/examples/share-icon-only-light.png',
      dark: 'https://ui.shadcn.com/examples/share-icon-only-dark.png',
    },
  },

  // Callbacks example
  'share-callbacks': {
    name: 'share-callbacks',
    description: 'Share button with success, error, and dismiss callbacks',
    type: 'registry:example',
    registryDependencies: ['share', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/share/share-callbacks.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://ui.shadcn.com/examples/share-callbacks-light.png',
      dark: 'https://ui.shadcn.com/examples/share-callbacks-dark.png',
    },
  },

  'share-hook': {
    name: 'share-hook',
    description: 'Using the useShare hook for programmatic sharing',
    type: 'registry:example',
    registryDependencies: ['share', 'text', 'view', 'button'],
    files: [
      {
        path: 'registry/examples/share/share-hook.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://ui.shadcn.com/examples/share-hook-light.png',
      dark: 'https://ui.shadcn.com/examples/share-hook-dark.png',
    },
  },
};
