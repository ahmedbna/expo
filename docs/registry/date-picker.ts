// Registry configuration for date-picker component and examples

export const datePickerRegistry = {
  // Main date-picker component
  'date-picker': {
    name: 'date-picker',
    description:
      'A customizable date and time picker component with bottom sheet UI.',
    type: 'registry:ui',
    dependencies: ['lucide-react-native'],
    registryDependencies: [
      'bottom-sheet',
      'button',
      'icon',
      'scroll-view',
      'text',
      'view',
    ],
    files: [
      {
        path: 'registry/components/ui/date-picker.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/DatePickerPreview.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/DatePickerPreview.mp4',
    },
  },

  // Default demo
  'date-picker-demo': {
    name: 'date-picker-demo',
    description: 'A basic date picker with calendar view',
    type: 'registry:example',
    registryDependencies: ['date-picker'],
    files: [
      {
        path: 'registry/examples/date-picker/date-picker-demo.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/DatePickerDemo.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/DatePickerDemo.mp4',
    },
  },

  // Time picker example
  'date-picker-time': {
    name: 'date-picker-time',
    description: 'A time picker with hour and minute selection',
    type: 'registry:example',
    registryDependencies: ['date-picker', 'view'],
    files: [
      {
        path: 'registry/examples/date-picker/date-picker-time.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/DatePickerTime.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/DatePickerTime.mp4',
    },
  },

  // DateTime picker example
  'date-picker-datetime': {
    name: 'date-picker-datetime',
    description: 'A combined date and time picker',
    type: 'registry:example',
    registryDependencies: ['date-picker'],
    files: [
      {
        path: 'registry/examples/date-picker/date-picker-datetime.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/DatePickerDateTime.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/DatePickerDateTime.mp4',
    },
  },

  // Constraints example
  'date-picker-constraints': {
    name: 'date-picker-constraints',
    description: 'Date picker with minimum and maximum date limits',
    type: 'registry:example',
    registryDependencies: ['date-picker', 'view'],
    files: [
      {
        path: 'registry/examples/date-picker/date-picker-constraints.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/DatePickerConstraints.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/DatePickerConstraints.mp4',
    },
  },

  // Variants example
  'date-picker-variants': {
    name: 'date-picker-variants',
    description: 'Date pickers with different styling variants',
    type: 'registry:example',
    registryDependencies: ['date-picker', 'view'],
    files: [
      {
        path: 'registry/examples/date-picker/date-picker-variants.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/DatePickerVariants.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/DatePickerVariants.mp4',
    },
  },

  // Formats example
  'date-picker-formats': {
    name: 'date-picker-formats',
    description: 'Time picker with 12-hour and 24-hour formats',
    type: 'registry:example',
    registryDependencies: ['date-picker', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/date-picker/date-picker-formats.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/DatePickerFormats.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/DatePickerFormats.mp4',
    },
  },

  // Form integration example
  'date-picker-form': {
    name: 'date-picker-form',
    description: 'Date picker integrated within a form with validation',
    type: 'registry:example',
    registryDependencies: ['date-picker', 'button', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/date-picker/date-picker-form.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/DatePickerForm.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/DatePickerForm.mp4',
    },
  },
};
