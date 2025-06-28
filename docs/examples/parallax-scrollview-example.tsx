// registry/examples/parallax-scrollview-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { ParallaxScrollViewArticle } from '@/docs/demo/parallax-scrollview/parallax-scrollview-article';
import { ParallaxScrollViewCustomHeight } from '@/docs/demo/parallax-scrollview/parallax-scrollview-custom-height';
import { ParallaxScrollViewDemo } from '@/docs/demo/parallax-scrollview/parallax-scrollview-demo';
import { ParallaxScrollViewGradient } from '@/docs/demo/parallax-scrollview/parallax-scrollview-gradient';
import { ParallaxScrollViewProduct } from '@/docs/demo/parallax-scrollview/parallax-scrollview-product';
import { ParallaxScrollViewProfile } from '@/docs/demo/parallax-scrollview/parallax-scrollview-profile';
import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';

const examples = [
  { key: 'demo', title: 'Default', component: ParallaxScrollViewDemo },
  {
    key: 'custom-height',
    title: 'Custom Height',
    component: ParallaxScrollViewCustomHeight,
  },
  {
    key: 'gradient',
    title: 'Gradient Header',
    component: ParallaxScrollViewGradient,
  },
  {
    key: 'profile',
    title: 'Profile Screen',
    component: ParallaxScrollViewProfile,
  },
  {
    key: 'article',
    title: 'Article View',
    component: ParallaxScrollViewArticle,
  },
  {
    key: 'product',
    title: 'Product Gallery',
    component: ParallaxScrollViewProduct,
  },
];

// Main demo screen combining all examples
export function ParallaxScrollViewExample() {
  const [selectedExample, setSelectedExample] = useState('demo');

  const SelectedComponent =
    examples.find((example) => example.key === selectedExample)?.component ||
    ParallaxScrollViewDemo;

  return (
    <View style={{ flex: 1 }}>
      {/* Tab Bar */}
      <View
        style={{
          backgroundColor: '#f9fafb',
          borderBottomWidth: 1,
          borderBottomColor: '#e5e7eb',
        }}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingVertical: 12,
            gap: 8,
          }}
        >
          {examples.map((example) => (
            <TouchableOpacity
              key={example.key}
              onPress={() => setSelectedExample(example.key)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20,
                backgroundColor:
                  selectedExample === example.key ? '#3b82f6' : 'white',
                borderWidth: 1,
                borderColor:
                  selectedExample === example.key ? '#3b82f6' : '#d1d5db',
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: selectedExample === example.key ? 'white' : '#374151',
                }}
              >
                {example.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Selected Example */}
      <View style={{ flex: 1 }}>
        <SelectedComponent />
      </View>
    </View>
  );
}
