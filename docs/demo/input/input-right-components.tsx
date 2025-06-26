// registry/examples/input/input-right-components.tsx
import { Input } from '@/components/ui/input';
import { View } from '@/components/ui/view';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Search, Eye, EyeOff, Copy } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable } from 'react-native';

export function InputRightComponents() {
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <View style={{ gap: 16 }}>
      <Input
        label='Search'
        placeholder='Search with button...'
        icon={Search}
        rightComponent={
          <Button size='sm' variant='secondary'>
            <Text>Go</Text>
          </Button>
        }
      />

      <Input
        label='Password'
        placeholder='Toggle visibility'
        secureTextEntry={!showPassword}
        rightComponent={
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </Pressable>
        }
      />

      <Input
        label='API Key'
        placeholder='sk-1234567890abcdef'
        rightComponent={
          <Pressable onPress={handleCopy}>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
            >
              <Copy size={16} />
              <Text variant='caption'>{copied ? 'Copied!' : 'Copy'}</Text>
            </View>
          </Pressable>
        }
      />
    </View>
  );
}
