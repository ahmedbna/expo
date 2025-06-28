// registry/examples/link-custom.tsx
import { Link } from '@/components/ui/link';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { ArrowRight, ExternalLink, Mail } from 'lucide-react-native';
import React from 'react';

export function LinkCustom() {
  return (
    <View style={{ gap: 16 }}>
      <Link href='/'>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            padding: 12,
            backgroundColor: '#f3f4f6',
            borderRadius: 8,
          }}
        >
          <Text style={{ flex: 1 }}>View Profile</Text>
          <ArrowRight size={16} color='#6b7280' />
        </View>
      </Link>

      <Link href='https://github.com'>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            padding: 12,
            backgroundColor: '#dbeafe',
            borderRadius: 8,
          }}
        >
          <ExternalLink size={16} color='#3b82f6' />
          <Text style={{ color: '#3b82f6' }}>External Link</Text>
        </View>
      </Link>

      <Link href='mailto:contact@example.com'>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            padding: 12,
            backgroundColor: '#dcfce7',
            borderRadius: 8,
          }}
        >
          <Mail size={16} color='#16a34a' />
          <Text style={{ color: '#16a34a' }}>Send Email</Text>
        </View>
      </Link>
    </View>
  );
}
