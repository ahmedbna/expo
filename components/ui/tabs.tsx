// components/ui/tabs.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import { CORNERS, FONT_SIZE } from '@/theme/globals';
import React, { createContext, useContext, useState } from 'react';
import {
  ScrollView,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

// Types
interface TabsContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

interface TabsProps {
  children: React.ReactNode;
  defaultValue: string;
  orientation?: 'horizontal' | 'vertical';
  style?: ViewStyle;
}

interface TabsListProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface TabsTriggerProps {
  children: React.ReactNode;
  value: string;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

interface TabsContentProps {
  children: React.ReactNode;
  value: string;
  style?: ViewStyle;
}

// Context
const TabsContext = createContext<TabsContextType | undefined>(undefined);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider');
  }
  return context;
};

// Main Tabs component
export function Tabs({
  children,
  defaultValue,
  orientation = 'horizontal',
  style,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <View
        style={[
          {
            flex: 1,
            flexDirection: orientation === 'horizontal' ? 'column' : 'row',
          },
          style,
        ]}
      >
        {children}
      </View>
    </TabsContext.Provider>
  );
}

// TabsList component - FIXED
export function TabsList({ children, style }: TabsListProps) {
  const backgroundColor = useThemeColor({}, 'muted');

  return (
    <View
      style={[
        {
          backgroundColor,
          borderRadius: CORNERS,
          padding: 6,
        },
        style,
      ]}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: 'row',
          minWidth: '100%', // Ensures content takes at least full width
        }}
        style={{
          flexGrow: 0, // Prevents ScrollView from taking more space than needed
        }}
      >
        {children}
      </ScrollView>
    </View>
  );
}

// TabsTrigger component
export function TabsTrigger({
  children,
  value,
  disabled = false,
  style,
  textStyle,
}: TabsTriggerProps) {
  const { activeTab, setActiveTab } = useTabsContext();
  const isActive = activeTab === value;

  const primaryColor = useThemeColor({}, 'primary');
  const mutedForegroundColor = useThemeColor({}, 'mutedForeground');
  const backgroundColor = useThemeColor({}, 'background');

  const handlePress = () => {
    if (!disabled) {
      setActiveTab(value);
    }
  };

  const triggerStyle: ViewStyle = {
    paddingHorizontal: 12,
    borderRadius: CORNERS,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
    backgroundColor: isActive ? backgroundColor : 'transparent',
    opacity: disabled ? 0.5 : 1,
    flex: 1, // This makes tabs distribute evenly when they fit
    ...style,
  };

  const triggerTextStyle: TextStyle = {
    fontSize: FONT_SIZE,
    fontWeight: '500',
    color: isActive ? primaryColor : mutedForegroundColor,
    ...textStyle,
  };

  return (
    <TouchableOpacity
      style={triggerStyle}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {typeof children === 'string' ? (
        <Text style={triggerTextStyle}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

// TabsContent component
export function TabsContent({ children, value, style }: TabsContentProps) {
  const { activeTab } = useTabsContext();
  const isActive = activeTab === value;

  if (!isActive) {
    return null;
  }

  return (
    <View
      style={[
        {
          flex: 1,
          paddingTop: 16,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
