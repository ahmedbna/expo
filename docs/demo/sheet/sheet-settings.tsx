// registry/examples/sheet-settings.tsx
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import {
  Settings,
  Bell,
  Moon,
  Shield,
  HelpCircle,
  ChevronRight,
} from 'lucide-react-native';
import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Switch } from 'react-native';

export function SheetSettings() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoSync: true,
    biometrics: false,
  });

  const textColor = useThemeColor({}, 'text');
  const mutedColor = useThemeColor({}, 'textMuted');
  const borderColor = useThemeColor({}, 'border');
  const backgroundColor = useThemeColor({}, 'background');

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [setting]: !prev[setting] }));
  };

  const settingsSections = [
    {
      title: 'Preferences',
      items: [
        {
          id: 'notifications',
          label: 'Push Notifications',
          description: 'Receive notifications for new messages',
          icon: Bell,
          type: 'toggle' as const,
          value: settings.notifications,
        },
        {
          id: 'darkMode',
          label: 'Dark Mode',
          description: 'Use dark theme for better night viewing',
          icon: Moon,
          type: 'toggle' as const,
          value: settings.darkMode,
        },
        {
          id: 'autoSync',
          label: 'Auto Sync',
          description: 'Automatically sync data in background',
          icon: Shield,
          type: 'toggle' as const,
          value: settings.autoSync,
        },
      ],
    },
    {
      title: 'Security',
      items: [
        {
          id: 'biometrics',
          label: 'Biometric Authentication',
          description: 'Use fingerprint or face ID to unlock',
          icon: Shield,
          type: 'toggle' as const,
          value: settings.biometrics,
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          id: 'help',
          label: 'Help & Support',
          description: 'Get help and contact support',
          icon: HelpCircle,
          type: 'navigation' as const,
        },
      ],
    },
  ];

  const renderSettingItem = (item: any) => {
    const IconComponent = item.icon;

    return (
      <TouchableOpacity
        key={item.id}
        style={[styles.settingItem, { borderColor }]}
        onPress={() => {
          if (item.type === 'toggle') {
            handleToggle(item.id);
          } else {
            // Handle navigation
            console.log(`Navigate to ${item.id}`);
          }
        }}
      >
        <View style={styles.settingContent}>
          <View style={styles.settingIcon}>
            <IconComponent size={20} color={textColor} />
          </View>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingLabel, { color: textColor }]}>
              {item.label}
            </Text>
            <Text style={[styles.settingDescription, { color: mutedColor }]}>
              {item.description}
            </Text>
          </View>
        </View>
        {item.type === 'toggle' ? (
          <Switch
            value={item.value}
            onValueChange={() => handleToggle(item.id)}
            trackColor={{ false: borderColor, true: '#007AFF' }}
            thumbColor={item.value ? 'white' : '#f4f3f4'}
          />
        ) : (
          <ChevronRight size={20} color={mutedColor} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Button>
          <Settings size={16} color='white' />
          <Text style={{ color: 'white', marginLeft: 8 }}>Settings</Text>
        </Button>
      </SheetTrigger>
    </Sheet>
  );
}
