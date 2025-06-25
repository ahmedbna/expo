import { Button } from '@/components/ui/button';
import { View } from '@/components/ui/view';
import { Star } from 'lucide-react-native';
import React from 'react';

export function ButtonCustom() {
  return (
    <View style={{ gap: 12, flexDirection: 'row', flexWrap: 'wrap' }}>
      <Button
        style={{ backgroundColor: '#8B5CF6', borderRadius: 12 }}
        textStyle={{ color: 'white', fontWeight: 'bold' }}
        onPress={() => {}}
      >
        Custom Purple
      </Button>
      <Button
        variant='outline'
        style={{
          borderColor: '#F59E0B',
          borderWidth: 2,
          borderRadius: 20,
        }}
        textStyle={{ color: '#F59E0B', fontWeight: '600' }}
        onPress={() => {}}
      >
        Custom Orange
      </Button>
      <Button
        icon={Star}
        style={{
          backgroundColor: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
          borderRadius: 25,
        }}
        onPress={() => {}}
      >
        Gradient Style
      </Button>
    </View>
  );
}
