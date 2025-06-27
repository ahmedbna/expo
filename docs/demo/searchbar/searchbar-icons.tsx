// registry/examples/searchbar-icons.tsx
import { Icon } from '@/components/ui/icon';
import { SearchBar } from '@/components/ui/searchbar';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import { MapPin, Filter, User } from 'lucide-react-native';
import React, { useState } from 'react';

export function SearchBarIcons() {
  const [locationQuery, setLocationQuery] = useState('');
  const [userQuery, setUserQuery] = useState('');
  const icon = useThemeColor({}, 'icon');

  return (
    <View style={{ gap: 16 }}>
      {/* Location search with map pin icon */}
      <SearchBar
        placeholder='Search locations...'
        value={locationQuery}
        onChangeText={setLocationQuery}
        leftIcon={<Icon IconComponent={MapPin} size={16} color={icon} />}
        onSearch={(query) => console.log('Location search:', query)}
      />

      {/* User search with custom icons */}
      <SearchBar
        placeholder='Search users...'
        value={userQuery}
        onChangeText={setUserQuery}
        leftIcon={<Icon IconComponent={User} size={16} color={icon} />}
        rightIcon={<Icon IconComponent={Filter} size={16} color={icon} />}
        showClearButton={false}
        onSearch={(query) => console.log('User search:', query)}
      />
    </View>
  );
}
