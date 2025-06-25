// registry/examples/color-picker-palette.tsx
import { ColorPicker } from '@/components/ui/color-picker';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function ColorPickerPalette() {
  const [colors, setColors] = useState([
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#F9CA24',
    '#6C5CE7',
    '#A29BFE',
    '#FD79A8',
    '#00B894',
  ]);

  const updateColor = (index: number, newColor: string) => {
    const newColors = [...colors];
    newColors[index] = newColor;
    setColors(newColors);
  };

  return (
    <View style={{ gap: 16 }}>
      <Text variant='title'>Color Palette</Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 12,
          justifyContent: 'center',
          padding: 16,
          backgroundColor: '#f8f9fa',
          borderRadius: 12,
        }}
      >
        {colors.map((color, index) => (
          <View key={index} style={{ alignItems: 'center', gap: 4 }}>
            <ColorPicker
              value={color}
              onColorChange={(newColor) => updateColor(index, newColor)}
              onColorSelect={(newColor) => updateColor(index, newColor)}
              swatchSize={36}
            />
            <Text variant='caption' style={{ fontSize: 10 }}>
              {color.toUpperCase()}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
