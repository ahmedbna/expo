// Registry configuration for table component and examples

export const tableRegistry = {
  // Main table component
  table: {
    name: 'table',
    description:
      'A flexible data table component with sorting, filtering, pagination, and search functionality.',
    type: 'registry:ui',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['button', 'text', 'view'],
    files: [
      {
        path: 'registry/components/ui/table.tsx',
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
  'table-demo': {
    name: 'table-demo',
    description: 'A basic data table with sample data',
    type: 'registry:example',
    registryDependencies: ['table'],
    files: [
      {
        path: 'registry/examples/table/table-demo.tsx',
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

  'table-sortable': {
    name: 'table-sortable',
    description: 'Table with sortable columns',
    type: 'registry:example',
    registryDependencies: ['table'],
    files: [
      {
        path: 'registry/examples/table/table-sortable.tsx',
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

  'table-custom-cells': {
    name: 'table-custom-cells',
    description: 'Table with custom cell renderers and formatting',
    type: 'registry:example',
    registryDependencies: ['table', 'avatar', 'badge', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/table/table-custom-cells.tsx',
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

  'table-pagination': {
    name: 'table-pagination',
    description: 'Table with pagination controls',
    type: 'registry:example',
    registryDependencies: ['table'],
    files: [
      {
        path: 'registry/examples/table/table-pagination.tsx',
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

  'table-search': {
    name: 'table-search',
    description: 'Table with search functionality',
    type: 'registry:example',
    registryDependencies: ['table'],
    files: [
      {
        path: 'registry/examples/table/table-search.tsx',
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

  'table-loading': {
    name: 'table-loading',
    description: 'Table showing loading state',
    type: 'registry:example',
    registryDependencies: ['table', 'button', 'view'],
    files: [
      {
        path: 'registry/examples/table/table-loading.tsx',
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
