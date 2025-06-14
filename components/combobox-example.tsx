import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Combobox, ComboboxOption } from './ui/combobox';

// Usage examples:
export const ComboboxExamples = () => {
  const [singleValue, setSingleValue] = useState('');
  const [multipleValues, setMultipleValues] = useState<string[]>([]);

  const options: ComboboxOption[] = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' },
    { label: 'Date', value: 'date', disabled: true },
    { label: 'Elderberry', value: 'elderberry' },
    { label: 'Fig', value: 'fig' },
    { label: 'Grape', value: 'grape' },
  ];

  return (
    <ScrollView style={{ width: '100%', gap: 20 }}>
      {/* Basic Combobox */}
      <View>
        <Text style={{ marginBottom: 8, fontSize: 16, fontWeight: '600' }}>
          Basic Combobox
        </Text>
        <Combobox
          options={options}
          value={singleValue}
          onValueChange={setSingleValue}
          placeholder='Choose a fruit...'
        />
      </View>

      {/* Clearable Combobox */}
      <View>
        <Text style={{ marginBottom: 8, fontSize: 16, fontWeight: '600' }}>
          Clearable Combobox
        </Text>
        <Combobox
          options={options}
          value={singleValue}
          onValueChange={setSingleValue}
          placeholder='Choose a fruit...'
          clearable
        />
      </View>

      {/* Multiple Selection */}
      <View>
        <Text style={{ marginBottom: 8, fontSize: 16, fontWeight: '600' }}>
          Multiple Selection
        </Text>
        <Combobox
          options={options}
          values={multipleValues}
          onValuesChange={setMultipleValues}
          placeholder='Choose fruits...'
          multiple
          clearable
        />
      </View>

      {/* Non-searchable */}
      <View>
        <Text style={{ marginBottom: 8, fontSize: 16, fontWeight: '600' }}>
          Non-searchable
        </Text>
        <Combobox
          options={options}
          value={singleValue}
          onValueChange={setSingleValue}
          placeholder='Choose a fruit...'
          searchable={false}
        />
      </View>

      {/* Error State */}
      <View>
        <Text style={{ marginBottom: 8, fontSize: 16, fontWeight: '600' }}>
          Error State
        </Text>
        <Combobox
          options={options}
          value={singleValue}
          onValueChange={setSingleValue}
          placeholder='Choose a fruit...'
          error
        />
      </View>

      {/* Disabled */}
      <View>
        <Text style={{ marginBottom: 8, fontSize: 16, fontWeight: '600' }}>
          Disabled
        </Text>
        <Combobox
          options={options}
          value='apple'
          onValueChange={setSingleValue}
          placeholder='Choose a fruit...'
          disabled
        />
      </View>
    </ScrollView>
  );
};
