// components/ui/combobox.tsx
import { useThemeColor } from '@/hooks/useThemeColor';
import { BORDER_RADIUS, CORNERS, FONT_SIZE, HEIGHT } from '@/theme/globals';
import { Check, ChevronDown, Search, X } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export interface ComboboxOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  error?: boolean;
  emptyText?: string;
  maxHeight?: number;
  searchable?: boolean;
  clearable?: boolean;
  multiple?: boolean;
  values?: string[];
  onValuesChange?: (values: string[]) => void;
}

export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = 'Select an option...',
  searchPlaceholder = 'Search...',
  disabled = false,
  error = false,
  emptyText = 'No options found',
  maxHeight = 400,
  searchable = true,
  clearable = false,
  multiple = false,
  values = [],
  onValuesChange,
}: ComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [triggerLayout, setTriggerLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  // @ts-ignore
  const triggerRef = useRef<TouchableOpacity>(null);

  // Theme colors
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const mutedColor = useThemeColor({}, 'textMuted');
  const borderColor = useThemeColor({}, 'border');
  const primaryColor = useThemeColor({}, 'primary');
  const destructiveColor = useThemeColor({}, 'destructive');

  // Get current selection
  const selectedOption = options.find((option) => option.value === value);
  const selectedOptions = multiple
    ? options.filter((option) => values.includes(option.value))
    : [];

  // Filter options based on search
  const filteredOptions = searchable
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  // Measure trigger position
  const measureTrigger = () => {
    if (triggerRef.current) {
      triggerRef.current.measure(
        (
          x: number,
          y: number,
          width: number,
          height: number,
          pageX: number,
          pageY: number
        ) => {
          setTriggerLayout({ x: pageX, y: pageY, width, height });
        }
      );
    }
  };

  const handleSelect = (option: ComboboxOption) => {
    if (option.disabled) return;

    if (multiple) {
      const newValues = values.includes(option.value)
        ? values.filter((v) => v !== option.value)
        : [...values, option.value];
      onValuesChange?.(newValues);
    } else {
      onValueChange?.(option.value);
      setIsOpen(false);
    }
    setSearchQuery('');
  };

  const handleClear = () => {
    if (multiple) {
      onValuesChange?.([]);
    } else {
      onValueChange?.('');
    }
  };

  const handleOpen = () => {
    if (disabled) return;
    measureTrigger();
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchQuery('');
  };

  const getDisplayText = () => {
    if (multiple) {
      if (selectedOptions.length === 0) return placeholder;
      if (selectedOptions.length === 1) return selectedOptions[0].label;
      return `${selectedOptions.length} selected`;
    }
    return selectedOption?.label || placeholder;
  };

  const isSelected = (option: ComboboxOption) => {
    return multiple ? values.includes(option.value) : value === option.value;
  };

  const screenHeight = Dimensions.get('window').height;
  const availableHeight =
    screenHeight - triggerLayout.y - triggerLayout.height - 100;
  const dropdownHeight = Math.min(maxHeight, availableHeight);

  return (
    <>
      <TouchableOpacity
        ref={triggerRef}
        style={[
          styles.trigger,
          {
            backgroundColor: cardColor,
            borderColor: error ? destructiveColor : cardColor,
            opacity: disabled ? 0.6 : 1,
          },
        ]}
        onPress={handleOpen}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.triggerText,
            {
              color:
                (multiple && selectedOptions.length > 0) || selectedOption
                  ? textColor
                  : mutedColor,
            },
          ]}
          numberOfLines={1}
        >
          {getDisplayText()}
        </Text>

        <View style={styles.triggerIcons}>
          {clearable &&
            ((multiple && selectedOptions.length > 0) ||
              (!multiple && selectedOption)) && (
              <TouchableOpacity
                onPress={handleClear}
                style={styles.clearButton}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <X size={16} color={mutedColor} strokeWidth={2} />
              </TouchableOpacity>
            )}
          <ChevronDown
            size={20}
            color={mutedColor}
            strokeWidth={2}
            style={[
              styles.chevron,
              { transform: [{ rotate: isOpen ? '180deg' : '0deg' }] },
            ]}
          />
        </View>
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType='fade'
        onRequestClose={handleClose}
      >
        <Pressable style={styles.overlay} onPress={handleClose}>
          <View
            style={[
              styles.dropdown,
              {
                backgroundColor: cardColor,
                borderColor: borderColor,
                top: triggerLayout.y + triggerLayout.height + 6,
                left: triggerLayout.x,
                width: triggerLayout.width,
                maxHeight: dropdownHeight,
              },
            ]}
          >
            {searchable && (
              <View
                style={[
                  styles.searchContainer,
                  { borderBottomColor: borderColor },
                ]}
              >
                <Search size={16} color={mutedColor} strokeWidth={2} />
                <TextInput
                  style={[styles.searchInput, { color: textColor }]}
                  placeholder={searchPlaceholder}
                  placeholderTextColor={mutedColor}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  autoFocus
                />
              </View>
            )}

            <ScrollView
              style={styles.optionsList}
              showsVerticalScrollIndicator={false}
            >
              {filteredOptions.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Text style={[styles.emptyText, { color: mutedColor }]}>
                    {emptyText}
                  </Text>
                </View>
              ) : (
                filteredOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.option,
                      {
                        backgroundColor: isSelected(option)
                          ? `${primaryColor}15`
                          : 'transparent',
                        opacity: option.disabled ? 0.5 : 1,
                      },
                    ]}
                    onPress={() => handleSelect(option)}
                    disabled={option.disabled}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        {
                          color: textColor,
                          fontWeight: isSelected(option) ? '600' : '400',
                        },
                      ]}
                    >
                      {option.label}
                    </Text>
                    {isSelected(option) && (
                      <Check size={16} color={primaryColor} strokeWidth={2.5} />
                    )}
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    height: HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderRadius: CORNERS,
    // borderRadius: BORDER_RADIUS / 2,
    borderWidth: 1,
  },
  triggerText: {
    fontSize: FONT_SIZE,
    flex: 1,
  },
  triggerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  clearButton: {
    padding: 2,
  },
  chevron: {
    marginLeft: 4,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  dropdown: {
    position: 'absolute',
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderBottomWidth: 1,
    gap: 8,
    height: HEIGHT,
  },
  searchInput: {
    flex: 1,
    fontSize: FONT_SIZE,
    paddingVertical: 4,
  },
  optionsList: {
    maxHeight: 400,
  },
  emptyContainer: {
    padding: 16,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: FONT_SIZE,
    fontStyle: 'italic',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 44,
  },
  optionText: {
    fontSize: FONT_SIZE,
    flex: 1,
  },
});
