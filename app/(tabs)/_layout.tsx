import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import BlurBackground from '@/components/ui/blur-background';
import { HapticTab } from '@/components/ui/haptic-tab';
import { Icon } from '@/components/ui/icon';
import { useThemeColor } from '@/hooks/useThemeColor';
import {
  ChartCandlestick,
  HeartHandshakeIcon,
  Home,
  LucideSquareDashedMousePointer,
  MapPlus,
} from 'lucide-react-native';

export default function TabLayout() {
  const primary = useThemeColor({}, 'primary');

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: primary,
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
        name='maps'
        options={{
          title: 'Maps',
          tabBarIcon: ({ color }) => (
            <Icon IconComponent={MapPlus} size={24} color={color} />
          ),
          tabBarStyle: { display: 'none' }, // This line hides the tab bar for the 'maps' screen
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
