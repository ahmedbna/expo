// components/ui/searchbar.tsx
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import { CORNERS, FONT_SIZE, HEIGHT } from '@/theme/globals';
import { Search, X } from 'lucide-react-native';
import React, { useCallback, useRef, useState } from 'react';
import {
  ActivityIndicator,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

type SearchBarVariant = 'default' | 'minimal' | 'rounded';
type SearchBarSize = 'default' | 'sm' | 'lg';

interface SearchBarProps extends Omit<TextInputProps, 'style'> {
  variant?: SearchBarVariant;
  size?: SearchBarSize;
  loading?: boolean;
  onSearch?: (query: string) => void;
  onClear?: () => void;
  showClearButton?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle | ViewStyle[];
  inputStyle?: TextStyle | TextStyle[];
  debounceMs?: number;
}

export function SearchBar({
  variant = 'default',
  size = 'default',
  loading = false,
  onSearch,
  onClear,
  showClearButton = true,
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  debounceMs = 300,
  placeholder = 'Search...',
  value,
  onChangeText,
  ...props
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState(value || '');
  const [isFocused, setIsFocused] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<TextInput>(null);

  // Theme colors
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const placeholderColor = useThemeColor({}, 'textMuted');

  // Handle text change with debouncing
  const handleTextChange = useCallback(
    (text: string) => {
      setInternalValue(text);
      onChangeText?.(text);

      if (onSearch && debounceMs > 0) {
        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
        }
        (debounceRef.current as any) = setTimeout(() => {
          onSearch(text);
        }, debounceMs);
      } else if (onSearch) {
        onSearch(text);
      }
    },
    [onChangeText, onSearch, debounceMs]
  );

  // Handle clear button press
  const handleClear = useCallback(() => {
    setInternalValue('');
    onChangeText?.('');
    onClear?.();
    onSearch?.('');
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
  }, [onChangeText, onClear, onSearch]);

  // Get container style based on variant and size
  const getContainerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: cardColor,
    };

    // Size variants
    switch (size) {
      case 'sm':
        Object.assign(baseStyle, {
          height: 40,
          paddingHorizontal: 12,
        });
        break;
      case 'lg':
        Object.assign(baseStyle, {
          height: 56,
          paddingHorizontal: 20,
        });
        break;
      default:
        Object.assign(baseStyle, {
          height: HEIGHT,
          paddingHorizontal: 16,
        });
    }

    // Variant styles
    switch (variant) {
      case 'minimal':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 0,
          borderBottomWidth: 1,
          borderRadius: 0,
        };
      case 'rounded':
        return {
          ...baseStyle,
          borderRadius: CORNERS,
        };
      default:
        return {
          ...baseStyle,
          borderRadius: 12,
        };
    }
  };

  // Get input style
  const getInputStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      flex: 1,
      fontSize: FONT_SIZE,
      color: textColor,
      marginHorizontal: 8,
    };

    if (size === 'sm') {
      baseStyle.fontSize = 15;
    } else if (size === 'lg') {
      baseStyle.fontSize = 18;
    }

    return baseStyle;
  };

  // Get icon size based on component size
  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return 18;
      case 'lg':
        return 24;
      default:
        return 20;
    }
  };

  const displayValue = value !== undefined ? value : internalValue;
  const showClear = showClearButton && displayValue.length > 0;

  return (
    <View style={[getContainerStyle(), containerStyle]}>
      {/* Left Icon */}
      {leftIcon || (
        <Icon
          IconComponent={Search}
          size={getIconSize()}
          color={placeholderColor}
        />
      )}

      {/* Text Input */}
      <TextInput
        ref={inputRef}
        style={[getInputStyle(), inputStyle]}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        value={displayValue}
        onChangeText={handleTextChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />

      {/* Loading Indicator */}
      {loading && (
        <ActivityIndicator
          size='small'
          color={placeholderColor}
          style={{ marginRight: 4 }}
        />
      )}

      {/* Clear Button */}
      {showClear && !loading && (
        <TouchableOpacity
          onPress={handleClear}
          style={{
            padding: 4,
          }}
          activeOpacity={0.7}
        >
          <Icon
            IconComponent={X}
            size={getIconSize()}
            color={placeholderColor}
          />
        </TouchableOpacity>
      )}

      {/* Right Icon */}
      {rightIcon && !showClear && !loading && rightIcon}
    </View>
  );
}

// SearchBar with suggestions dropdown
interface SearchBarWithSuggestionsProps extends SearchBarProps {
  suggestions?: string[];
  onSuggestionPress?: (suggestion: string) => void;
  maxSuggestions?: number;
  showSuggestions?: boolean;
}

export function SearchBarWithSuggestions({
  suggestions = [],
  onSuggestionPress,
  maxSuggestions = 5,
  showSuggestions = true,
  containerStyle,
  ...searchBarProps
}: SearchBarWithSuggestionsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');

  const filteredSuggestions = suggestions
    .filter((suggestion) =>
      suggestion
        .toLowerCase()
        .includes((searchBarProps.value || '').toLowerCase())
    )
    .slice(0, maxSuggestions);

  const shouldShowSuggestions =
    showSuggestions &&
    isExpanded &&
    filteredSuggestions.length > 0 &&
    (searchBarProps.value || '').length > 0;

  const handleSuggestionPress = (suggestion: string) => {
    onSuggestionPress?.(suggestion);
    setIsExpanded(false);
  };

  return (
    <View style={[{ width: '100%' }, containerStyle]}>
      <SearchBar
        {...searchBarProps}
        onFocus={(e) => {
          setIsExpanded(true);
          searchBarProps.onFocus?.(e);
        }}
        onBlur={(e) => {
          // Delay hiding suggestions to allow for suggestion tap
          setTimeout(() => setIsExpanded(false), 150);
          searchBarProps.onBlur?.(e);
        }}
      />

      {/* Suggestions Dropdown */}
      {shouldShowSuggestions && (
        <View
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: cardColor,
            marginTop: 8,
            borderRadius: 12,
            maxHeight: 200,
            zIndex: 999,
          }}
        >
          {filteredSuggestions.map((suggestion, index) => (
            <TouchableOpacity
              key={`${suggestion}-${index}`}
              onPress={() => handleSuggestionPress(suggestion)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderBottomWidth:
                  index < filteredSuggestions.length - 1 ? 0.6 : 0,
                borderBottomColor: borderColor,
              }}
              activeOpacity={0.7}
            >
              <Text>{suggestion}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
