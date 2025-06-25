// docs/registry/card.ts
// Registry configuration for card component and examples

export const cardRegistry = {
  // Main card component
  card: {
    name: 'card',
    description: 'Displays a card with header, content, and footer.',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: ['text', 'view'],
    files: [
      {
        path: 'registry/components/ui/card.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
    preview: {
      light: 'https://ui.bna.dev/preview/card-light.png',
      dark: 'https://ui.bna.dev/preview/card-dark.png',
    },
  },

  // Default demo
  'card-demo': {
    name: 'card-demo',
    description: 'A complete card with header, content, and footer sections',
    type: 'registry:example',
    registryDependencies: ['card', 'button'],
    files: [
      {
        path: 'registry/examples/card/card-demo.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://ui.bna.dev/preview/card-demo-light.png',
      dark: 'https://ui.bna.dev/preview/card-demo-dark.png',
    },
  },

  // Simple card example
  'card-simple': {
    name: 'card-simple',
    description: 'A minimal card with just content',
    type: 'registry:example',
    registryDependencies: ['card'],
    files: [
      {
        path: 'registry/examples/card/card-simple.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://ui.bna.dev/preview/card-simple-light.png',
      dark: 'https://ui.bna.dev/preview/card-simple-dark.png',
    },
  },

  // Card with image example
  'card-with-image': {
    name: 'card-with-image',
    description: 'Card featuring an image with content below',
    type: 'registry:example',
    registryDependencies: ['card', 'button'],
    files: [
      {
        path: 'registry/examples/card/card-with-image.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://ui.bna.dev/preview/card-with-image-light.png',
      dark: 'https://ui.bna.dev/preview/card-with-image-dark.png',
    },
  },

  // Card with form example
  'card-with-form': {
    name: 'card-with-form',
    description: 'Interactive card containing a login form',
    type: 'registry:example',
    registryDependencies: ['card', 'button'],
    files: [
      {
        path: 'registry/examples/card/card-with-form.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://ui.bna.dev/preview/card-with-form-light.png',
      dark: 'https://ui.bna.dev/preview/card-with-form-dark.png',
    },
  },

  // Statistics cards example
  'card-stats': {
    name: 'card-stats',
    description: 'Grid of cards displaying key metrics and statistics',
    type: 'registry:example',
    registryDependencies: ['card'],
    files: [
      {
        path: 'registry/examples/card/card-stats.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://ui.bna.dev/preview/card-stats-light.png',
      dark: 'https://ui.bna.dev/preview/card-stats-dark.png',
    },
  },

  // Notification card example
  'card-notification': {
    name: 'card-notification',
    description: 'Card designed for displaying notifications with actions',
    type: 'registry:example',
    registryDependencies: ['card', 'button', 'icon'],
    files: [
      {
        path: 'registry/examples/card/card-notification.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://ui.bna.dev/preview/card-notification-light.png',
      dark: 'https://ui.bna.dev/preview/card-notification-dark.png',
    },
  },

  // Pricing cards example
  'card-pricing': {
    name: 'card-pricing',
    description: 'Professional pricing cards with feature lists and CTAs',
    type: 'registry:example',
    registryDependencies: ['card', 'button', 'icon'],
    files: [
      {
        path: 'registry/examples/card/card-pricing.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://ui.bna.dev/preview/card-pricing-light.png',
      dark: 'https://ui.bna.dev/preview/card-pricing-dark.png',
    },
  },
};
