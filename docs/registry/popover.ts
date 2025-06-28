// Registry configuration for popover component and examples

export const popoverRegistry = {
  // Main popover component
  popover: {
    name: 'popover',
    description:
      'A contextual overlay that displays rich content triggered by user interaction.',
    type: 'registry:ui',
    dependencies: ['react-native-reanimated'],
    registryDependencies: ['button', 'text', 'view'],
    files: [
      {
        path: 'registry/components/ui/popover.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
    preview: {
      light: 'https://ui.shadcn.com/preview/popover-light.mp4',
      dark: 'https://ui.shadcn.com/preview/popover-dark.mp4',
    },
  },

  // Default demo
  'popover-demo': {
    name: 'popover-demo',
    description: 'A basic popover with trigger button and content',
    type: 'registry:example',
    registryDependencies: ['popover', 'button', 'text'],
    files: [
      {
        path: 'registry/examples/popover/popover-demo.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://ui.shadcn.com/preview/popover-demo-light.mp4',
      dark: 'https://ui.shadcn.com/preview/popover-demo-dark.mp4',
    },
  },

  // Positioning example
  'popover-positioning': {
    name: 'popover-positioning',
    description: 'Popovers positioned on different sides of the trigger',
    type: 'registry:example',
    registryDependencies: ['popover', 'button', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/popover/popover-positioning.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://ui.shadcn.com/preview/popover-positioning-light.mp4',
      dark: 'https://ui.shadcn.com/preview/popover-positioning-dark.mp4',
    },
  },

  // Alignment example
  'popover-alignment': {
    name: 'popover-alignment',
    description: 'Popovers with different alignment options',
    type: 'registry:example',
    registryDependencies: ['popover', 'button', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/popover/popover-alignment.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://ui.shadcn.com/preview/popover-alignment-light.mp4',
      dark: 'https://ui.shadcn.com/preview/popover-alignment-dark.mp4',
    },
  },

  // Controlled example
  'popover-controlled': {
    name: 'popover-controlled',
    description: 'A controlled popover with external state management',
    type: 'registry:example',
    registryDependencies: ['popover', 'button', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/popover/popover-controlled.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://ui.shadcn.com/preview/popover-controlled-light.mp4',
      dark: 'https://ui.shadcn.com/preview/popover-controlled-dark.mp4',
    },
  },

  // Custom content example
  'popover-custom': {
    name: 'popover-custom',
    description: 'Popovers with custom content and styling',
    type: 'registry:example',
    registryDependencies: ['popover', 'button', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/popover/popover-custom.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://ui.shadcn.com/preview/popover-custom-light.mp4',
      dark: 'https://ui.shadcn.com/preview/popover-custom-dark.mp4',
    },
  },

  // Form content example
  'popover-form': {
    name: 'popover-form',
    description: 'A popover containing form elements',
    type: 'registry:example',
    registryDependencies: ['popover', 'button', 'text', 'view', 'input'],
    files: [
      {
        path: 'registry/examples/popover/popover-form.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://ui.shadcn.com/preview/popover-form-light.mp4',
      dark: 'https://ui.shadcn.com/preview/popover-form-dark.mp4',
    },
  },

  // Menu style example
  'popover-menu': {
    name: 'popover-menu',
    description: 'A popover styled as a dropdown menu',
    type: 'registry:example',
    registryDependencies: ['popover', 'button', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/popover/popover-menu.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://ui.shadcn.com/preview/popover-menu-light.mp4',
      dark: 'https://ui.shadcn.com/preview/popover-menu-dark.mp4',
    },
  },
};
