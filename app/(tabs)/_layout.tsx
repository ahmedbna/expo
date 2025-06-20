import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import BlurBackground from '@/components/ui/blur-background';
import { HapticTab } from '@/components/ui/haptic-tab';
import { Icon } from '@/components/ui/icon';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/theme/colors';
import {
  ChartCandlestick,
  HeartHandshakeIcon,
  Home,
  LucideSquareDashedMousePointer,
} from 'lucide-react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].primary,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: BlurBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon IconComponent={Home} size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name='welcome'
        options={{
          title: 'Welcome',
          tabBarIcon: ({ color }) => (
            <Icon IconComponent={HeartHandshakeIcon} size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name='demo'
        options={{
          title: 'Demo',
          tabBarIcon: ({ color }) => (
            <Icon
              IconComponent={LucideSquareDashedMousePointer}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name='charts'
        options={{
          title: 'Charts',
          tabBarIcon: ({ color }) => (
            <Icon IconComponent={ChartCandlestick} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
