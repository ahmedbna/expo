import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function TabsScrollable() {
  return (
    <Tabs defaultValue='account' style={{ width: 400 }}>
      <TabsList>
        <TabsTrigger value='account'>Account</TabsTrigger>
        <TabsTrigger value='password'>Password</TabsTrigger>
        <TabsTrigger value='settings'>Settings</TabsTrigger>
        <TabsTrigger value='one'>One</TabsTrigger>
        <TabsTrigger value='two'>Two</TabsTrigger>
        <TabsTrigger value='three'>Three</TabsTrigger>
      </TabsList>

      <TabsContent value='account'>
        <View style={{ padding: 16 }}>
          <Text variant='title' style={{ marginBottom: 8 }}>
            Account Settings
          </Text>
          <Text variant='body'>
            Manage your account information and preferences here.
          </Text>
        </View>
      </TabsContent>

      <TabsContent value='password'>
        <View style={{ padding: 16 }}>
          <Text variant='title' style={{ marginBottom: 8 }}>
            Password Settings
          </Text>
          <Text variant='body'>
            Change your password and security settings.
          </Text>
        </View>
      </TabsContent>

      <TabsContent value='settings'>
        <View style={{ padding: 16 }}>
          <Text variant='title' style={{ marginBottom: 8 }}>
            General Settings
          </Text>
          <Text variant='body'>
            Configure your application preferences and options.
          </Text>
        </View>
      </TabsContent>
    </Tabs>
  );
}
