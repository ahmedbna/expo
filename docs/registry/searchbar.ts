// Registry configuration for searchbar component and examples

export const searchbarRegistry = {
  // Main searchbar component
  searchbar: {
    name: 'searchbar',
    description:
      'A customizable search input with debouncing, loading states, and suggestions.',
    type: 'registry:ui',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['icon', 'text', 'view'],
    files: [
      {
        path: 'registry/components/ui/searchbar.tsx',
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
  'searchbar-demo': {
    name: 'searchbar-demo',
    description: 'A basic search bar with search functionality',
    type: 'registry:example',
    registryDependencies: ['searchbar'],
    files: [
      {
        path: 'registry/examples/searchbar/searchbar-demo.tsx',
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

  // Loading state example
  'searchbar-loading': {
    name: 'searchbar-loading',
    description: 'Search bar with loading indicator',
    type: 'registry:example',
    registryDependencies: ['searchbar'],
    files: [
      {
        path: 'registry/examples/searchbar/searchbar-loading.tsx',
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

  // Custom icons example
  'searchbar-icons': {
    name: 'searchbar-icons',
    description: 'Search bar with custom left and right icons',
    type: 'registry:example',
    registryDependencies: ['searchbar', 'icon'],
    files: [
      {
        path: 'registry/examples/searchbar/searchbar-icons.tsx',
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

  // Suggestions example
  'searchbar-suggestions': {
    name: 'searchbar-suggestions',
    description: 'Search bar with dropdown suggestions',
    type: 'registry:example',
    registryDependencies: ['searchbar'],
    files: [
      {
        path: 'registry/examples/searchbar/searchbar-suggestions.tsx',
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
  'searchbar-styled': {
    name: 'searchbar-styled',
    description: 'Search bar with custom styling and colors',
    type: 'registry:example',
    registryDependencies: ['searchbar'],
    files: [
      {
        path: 'registry/examples/searchbar/searchbar-styled.tsx',
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

  // No clear button example
  'searchbar-no-clear': {
    name: 'searchbar-no-clear',
    description: 'Search bar without the clear button',
    type: 'registry:example',
    registryDependencies: ['searchbar'],
    files: [
      {
        path: 'registry/examples/searchbar/searchbar-no-clear.tsx',
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

  // Instant search example
  'searchbar-instant': {
    name: 'searchbar-instant',
    description: 'Search bar with no debounce for instant search',
    type: 'registry:example',
    registryDependencies: ['searchbar', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/searchbar/searchbar-instant.tsx',
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
