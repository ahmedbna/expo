// Registry configuration for file-picker component and examples

export const filePickerRegistry = {
  // Main file-picker component
  'file-picker': {
    name: 'file-picker',
    description:
      ' A customizable file picker component with validation, preview, and multiple file support.',
    type: 'registry:ui',
    dependencies: ['lucide-react-native', 'expo-document-picker'],
    registryDependencies: ['button', 'text', 'view'],
    files: [
      {
        path: 'registry/components/ui/file-picker.tsx',
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
  'file-picker-demo': {
    name: 'file-picker-demo',
    description: 'A basic file picker with validation and preview',
    type: 'registry:example',
    registryDependencies: ['file-picker'],
    files: [
      {
        path: 'registry/examples/file-picker/file-picker-demo.tsx',
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
  'file-picker-images': {
    name: 'file-picker-images',
    description: 'File picker configured for images only',
    type: 'registry:example',
    registryDependencies: ['file-picker', 'view', 'text'],
    files: [
      {
        path: 'registry/examples/file-picker/file-picker-images.tsx',
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
  'file-picker-single': {
    name: 'file-picker-single',
    description: 'File picker for selecting a single file',
    type: 'registry:example',
    registryDependencies: ['file-picker', 'view', 'text'],
    files: [
      {
        path: 'registry/examples/file-picker/file-picker-single.tsx',
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
  'file-picker-validation': {
    name: 'file-picker-validation',
    description: 'File picker with size limits and extension validation',
    type: 'registry:example',
    registryDependencies: ['file-picker', 'view', 'text'],
    files: [
      {
        path: 'registry/examples/file-picker/file-picker-validation.tsx',
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
  'file-picker-styled': {
    name: 'file-picker-styled',
    description: 'File picker with custom styling and colors',
    type: 'registry:example',
    registryDependencies: ['file-picker', 'view', 'text'],
    files: [
      {
        path: 'registry/examples/file-picker/file-picker-styled.tsx',
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
  'file-picker-controlled': {
    name: 'file-picker-controlled',
    description: 'Controlled file picker using the useFilePicker hook',
    type: 'registry:example',
    registryDependencies: ['file-picker', 'button', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/file-picker/file-picker-controlled.tsx',
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
  'file-picker-info': {
    name: 'file-picker-info',
    description: 'File picker displaying detailed file information',
    type: 'registry:example',
    registryDependencies: ['file-picker', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/file-picker/file-picker-info.tsx',
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
