// docs/demo/tabs/tabs-vertical.tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function TabsVertical() {
  return (
    <Tabs defaultValue='profile' orientation='vertical' style={{ height: 300 }}>
      <TabsList style={{ width: 120 }}>
        <TabsTrigger value='profile'>Profile</TabsTrigger>
        <TabsTrigger value='security'>Security</TabsTrigger>
        <TabsTrigger value='notifications'>Notifications</TabsTrigger>
        <TabsTrigger value='billing'>Billing</TabsTrigger>
      </TabsList>

      <TabsContent value='profile' style={{ flex: 1, marginLeft: 16 }}>
        <View style={{ padding: 16 }}>
          <Text variant='title' style={{ marginBottom: 8 }}>
            Profile Information
          </Text>
          <Text variant='body'>
            Update your personal information and profile picture.
          </Text>
        </View>
      </TabsContent>

      <TabsContent value='security' style={{ flex: 1, marginLeft: 16 }}>
        <View style={{ padding: 16 }}>
          <Text variant='title' style={{ marginBottom: 8 }}>
            Security Settings
          </Text>
          <Text variant='body'>
            Manage two-factor authentication and login security.
          </Text>
        </View>
      </TabsContent>

      <TabsContent value='notifications' style={{ flex: 1, marginLeft: 16 }}>
        <View style={{ padding: 16 }}>
          <Text variant='title' style={{ marginBottom: 8 }}>
            Notification Preferences
          </Text>
          <Text variant='body'>
            Configure how and when you receive notifications.
          </Text>
        </View>
      </TabsContent>

      <TabsContent value='billing' style={{ flex: 1, marginLeft: 16 }}>
        <View style={{ padding: 16 }}>
          <Text variant='title' style={{ marginBottom: 8 }}>
            Billing & Subscription
          </Text>
          <Text variant='body'>
            Manage your subscription and payment methods.
          </Text>
        </View>
      </TabsContent>
    </Tabs>
  );
}
