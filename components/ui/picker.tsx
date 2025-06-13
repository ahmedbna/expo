// components/ui/picker.tsx
import { Icon } from '@/components/ui/icon';
import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BORDER_RADIUS, CORNERS, FONT_SIZE, HEIGHT } from '@/theme/globals';
import { ChevronDown, LucideProps } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  TextInput,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

export interface PickerOption {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
}

export interface PickerSection {
  title?: string;
  options: PickerOption[];
}

interface PickerProps {
  options?: PickerOption[];
  sections?: PickerSection[];
  value?: string;
  placeholder?: string;
  error?: string;
  variant?: 'outline' | 'filled' | 'group';
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  style?: ViewStyle;
  multiple?: boolean;
  values?: string[];
  onValuesChange?: (values: string[]) => void;

  // Styling props
  label?: string;
  icon?: React.ComponentType<LucideProps>;
  rightComponent?: React.ReactNode | (() => React.ReactNode);
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;

  // Modal props
  modalTitle?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
}

export function Picker({
  options = [],
  sections = [],
  value,
  values = [],
  error,
  variant = 'filled',
  placeholder = 'Select an option...',
  onValueChange,
  onValuesChange,
  disabled = false,
  style,
  multiple = false,
  label,
  icon,
  rightComponent,
  inputStyle,
  labelStyle,
  errorStyle,
  modalTitle,
  searchable = false,
  searchPlaceholder = 'Search options...',
}: PickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Move ALL theme color hooks to the top level
  const borderColor = useThemeColor({}, 'border');
  const text = useThemeColor({}, 'text');
  const muted = useThemeColor({}, 'mutedForeground');
  const cardColor = useThemeColor({}, 'card');
  const danger = useThemeColor({}, 'red');
  const accent = useThemeColor({}, 'accent');
  const primary = useThemeColor({}, 'primary');
  const primaryForeground = useThemeColor({}, 'primaryForeground');
  const input = useThemeColor({}, 'input');
  const mutedBg = useThemeColor({}, 'muted');

  // Normalize data structure - convert options to sections format
  const normalizedSections: PickerSection[] =
    sections.length > 0 ? sections : [{ options }];

  // Filter sections based on search query
  const filteredSections =
    searchable && searchQuery
      ? normalizedSections
          .map((section) => ({
            ...section,
            options: section.options.filter((option) =>
              option.label.toLowerCase().includes(searchQuery.toLowerCase())
            ),
          }))
          .filter((section) => section.options.length > 0)
      : normalizedSections;

  // Get selected options for display
  const getSelectedOptions = () => {
    const allOptions = normalizedSections.flatMap((section) => section.options);

    if (multiple) {
      return allOptions.filter((option) => values.includes(option.value));
    } else {
      return allOptions.filter((option) => option.value === value);
    }
  };

  const selectedOptions = getSelectedOptions();

  const handleSelect = (optionValue: string) => {
    if (multiple) {
      const newValues = values.includes(optionValue)
        ? values.filter((v) => v !== optionValue)
        : [...values, optionValue];
      onValuesChange?.(newValues);
    } else {
      onValueChange?.(optionValue);
      setIsOpen(false);
    }
  };

  const getDisplayText = () => {
    if (selectedOptions.length === 0) return placeholder;

    if (multiple) {
      if (selectedOptions.length === 1) {
        return selectedOptions[0].label;
      }
      return `${selectedOptions.length} selected`;
    }

    return selectedOptions[0]?.label || placeholder;
  };

  const triggerStyle: ViewStyle = {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: variant === 'group' ? 0 : 16,
    borderWidth: variant === 'group' ? 0 : 1,
    borderColor: variant === 'outline' ? borderColor : cardColor,
    borderRadius: CORNERS,
    backgroundColor: variant === 'outline' ? 'transparent' : cardColor,
    minHeight: variant === 'group' ? 'auto' : HEIGHT,
    opacity: disabled ? 0.5 : 1,
  };

  const renderOption = (
    option: PickerOption,
    sectionIndex: number,
    optionIndex: number
  ) => {
    const isSelected = multiple
      ? values.includes(option.value)
      : value === option.value;

    const isLastInSection =
      optionIndex === filteredSections[sectionIndex].options.length - 1;
    const isLastSection = sectionIndex === filteredSections.length - 1;

    return (
      <TouchableOpacity
        key={`${sectionIndex}-${option.value}`}
        style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderBottomWidth: !isLastInSection || !isLastSection ? 1 : 0,
          borderBottomColor: borderColor,
          backgroundColor: isSelected ? accent : 'transparent',
          opacity: option.disabled ? 0.5 : 1,
        }}
        onPress={() => !option.disabled && handleSelect(option.value)}
        activeOpacity={0.7}
        disabled={option.disabled}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: FONT_SIZE,
                color: text,
                fontWeight: isSelected ? '500' : '400',
              }}
            >
              {option.label}
            </Text>
            {option.description && (
              <Text
                variant='caption'
                style={{
                  marginTop: 2,
                  fontSize: 14,
                }}
              >
                {option.description}
              </Text>
            )}
          </View>
          {multiple && isSelected && (
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: primary, // Now using the pre-defined variable
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 8,
              }}
            >
              <Text
                style={{
                  color: primaryForeground, // Now using the pre-defined variable
                  fontSize: 12,
                }}
              >
                ✓
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <TouchableOpacity
        style={[triggerStyle, style]}
        onPress={() => !disabled && setIsOpen(true)}
        disabled={disabled}
        activeOpacity={0.8}
      >
        {/* Icon & Label */}
        <View
          style={{
            width: label ? 128 : 'auto',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}
          pointerEvents='none'
        >
          {icon && (
            <Icon
              IconComponent={icon}
              size={16}
              color={error ? danger : muted}
            />
          )}
          {label && (
            <Text
              variant='caption'
              numberOfLines={1}
              ellipsizeMode='tail'
              style={[
                {
                  color: error ? danger : muted,
                },
                labelStyle,
              ]}
              pointerEvents='none'
            >
              {label}
            </Text>
          )}
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={[
              {
                fontSize: FONT_SIZE,
                color:
                  selectedOptions.length > 0
                    ? text
                    : disabled
                    ? muted
                    : error
                    ? danger
                    : muted,
              },
              inputStyle,
            ]}
            numberOfLines={1}
            ellipsizeMode='tail'
          >
            {getDisplayText()}
          </Text>

          {rightComponent ? (
            typeof rightComponent === 'function' ? (
              rightComponent()
            ) : (
              rightComponent
            )
          ) : (
            <ChevronDown
              size={16}
              color={error ? danger : muted}
              style={{
                transform: [{ rotate: isOpen ? '180deg' : '0deg' }],
              }}
            />
          )}
        </View>
      </TouchableOpacity>

      {/* Error message */}
      {error && (
        <Text
          variant='caption'
          style={[
            {
              color: danger,
              marginTop: 4,
            },
            errorStyle,
          ]}
        >
          {error}
        </Text>
      )}

      <Modal
        visible={isOpen}
        transparent
        animationType='fade'
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingBottom: 32,
            paddingHorizontal: 8,
          }}
          onPress={() => setIsOpen(false)}
        >
          <Pressable
            style={{
              backgroundColor: cardColor,
              borderRadius: BORDER_RADIUS,
              borderWidth: 1,
              borderColor,
              maxHeight: '70%',
              width: '100%',
              padding: 0,
              overflow: 'hidden',
            }}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Header */}
            {(modalTitle || multiple) && (
              <View
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  borderBottomWidth: 1,
                  borderBottomColor: borderColor,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Text variant='subtitle'>{modalTitle || 'Select Options'}</Text>
                {multiple && (
                  <TouchableOpacity onPress={() => setIsOpen(false)}>
                    <Text
                      style={{
                        color: primary, // Now using the pre-defined variable
                        fontWeight: '500',
                      }}
                    >
                      Done
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            {/* Search */}
            {searchable && (
              <View
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderBottomWidth: 1,
                  borderBottomColor: borderColor,
                }}
              >
                <TextInput
                  style={{
                    height: 36,
                    paddingHorizontal: 12,
                    borderRadius: 8,
                    backgroundColor: input, // Now using the pre-defined variable
                    color: text,
                    fontSize: FONT_SIZE,
                  }}
                  placeholder={searchPlaceholder}
                  placeholderTextColor={muted}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
            )}

            {/* Options */}
            <ScrollView
              style={{
                maxHeight: 460,
              }}
              showsVerticalScrollIndicator={false}
            >
              {filteredSections.map((section, sectionIndex) => (
                <View key={sectionIndex}>
                  {section.title && (
                    <View
                      style={{
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        backgroundColor: mutedBg, // Now using the pre-defined variable
                      }}
                    >
                      <Text
                        variant='caption'
                        style={{
                          fontWeight: '600',
                          color: text,
                        }}
                      >
                        {section.title}
                      </Text>
                    </View>
                  )}
                  {section.options.map((option, optionIndex) =>
                    renderOption(option, sectionIndex, optionIndex)
                  )}
                </View>
              ))}

              {filteredSections.every(
                (section) => section.options.length === 0
              ) && (
                <View
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 24,
                    alignItems: 'center',
                  }}
                >
                  <Text variant='caption'>
                    {searchQuery ? 'No results found' : 'No options available'}
                  </Text>
                </View>
              )}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}
