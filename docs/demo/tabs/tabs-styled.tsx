// docs/demo/tabs/tabs-styled.tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function TabsStyled() {
  return (
    <Tabs defaultValue='design' style={{ width: 400 }}>
      <TabsList
        style={{
          backgroundColor: '#f8fafc',
          borderWidth: 1,
          borderColor: '#e2e8f0',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <TabsTrigger
          value='design'
          style={{ borderRadius: 8 }}
          textStyle={{ fontWeight: '600', color: '#3b82f6' }}
        >
          Design
        </TabsTrigger>
        <TabsTrigger
          value='development'
          style={{ borderRadius: 8 }}
          textStyle={{ fontWeight: '600', color: '#10b981' }}
        >
          Development
        </TabsTrigger>
        <TabsTrigger
          value='testing'
          style={{ borderRadius: 8 }}
          textStyle={{ fontWeight: '600', color: '#f59e0b' }}
        >
          Testing
        </TabsTrigger>
      </TabsList>

      <TabsContent value='design'>
        <View
          style={{
            padding: 20,
            backgroundColor: '#eff6ff',
            borderRadius: 12,
            marginTop: 8,
          }}
        >
          <Text variant='title' style={{ color: '#1e40af', marginBottom: 8 }}>
            Design Phase
          </Text>
          <Text variant='body' style={{ color: '#1e40af' }}>
            Create wireframes, mockups, and design systems for your project.
          </Text>
        </View>
      </TabsContent>

      <TabsContent value='development'>
        <View
          style={{
            padding: 20,
            backgroundColor: '#ecfdf5',
            borderRadius: 12,
            marginTop: 8,
          }}
        >
          <Text variant='title' style={{ color: '#047857', marginBottom: 8 }}>
            Development Phase
          </Text>
          <Text variant='body' style={{ color: '#047857' }}>
            Build and implement the features based on the design specifications.
          </Text>
        </View>
      </TabsContent>

      <TabsContent value='testing'>
        <View
          style={{
            padding: 20,
            backgroundColor: '#fffbeb',
            borderRadius: 12,
            marginTop: 8,
          }}
        >
          <Text variant='title' style={{ color: '#92400e', marginBottom: 8 }}>
            Testing Phase
          </Text>
          <Text variant='body' style={{ color: '#92400e' }}>
            Perform quality assurance and user acceptance testing.
          </Text>
        </View>
      </TabsContent>
    </Tabs>
  );
}
