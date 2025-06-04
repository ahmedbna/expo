// components/ui/tabs.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { BORDER_RADIUS } from '@/constants/globals';
import { useThemeColor } from '@/hooks/useThemeColor';
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

// TabsList component
export function TabsList({ children, style }: TabsListProps) {
  const backgroundColor = useThemeColor({}, 'muted');
  const borderColor = useThemeColor({}, 'border');

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        flexDirection: 'row',
        backgroundColor,
        borderRadius: BORDER_RADIUS,
        padding: 4,
        borderWidth: 1,
        borderColor,
        ...style,
      }}
      scrollEnabled={false} // Disable scroll by default, can be overridden
    >
      {children}
    </ScrollView>
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
  const primaryForegroundColor = useThemeColor({}, 'primaryForeground');
  const mutedForegroundColor = useThemeColor({}, 'mutedForeground');
  const backgroundColor = useThemeColor({}, 'background');

  const handlePress = () => {
    if (!disabled) {
      setActiveTab(value);
    }
  };

  const triggerStyle: ViewStyle = {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: BORDER_RADIUS,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 36,
    backgroundColor: isActive ? backgroundColor : 'transparent',
    opacity: disabled ? 0.5 : 1,
    ...style,
  };

  const triggerTextStyle: TextStyle = {
    fontSize: 14,
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
