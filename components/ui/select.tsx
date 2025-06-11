// components/ui/select.tsx
import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BORDER_RADIUS, CORNERS, FONT_SIZE, HEIGHT } from '@/theme/globals';
import { ChevronDown } from 'lucide-react-native';
import React, { useState } from 'react';
import { Modal, Pressable, TouchableOpacity, ViewStyle } from 'react-native';

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export function Select({
  options,
  value,
  placeholder = 'Select an option...',
  onValueChange,
  disabled = false,
  style,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor({}, 'border');
  const textColor = useThemeColor({}, 'text');
  const mutedColor = useThemeColor({}, 'mutedForeground');
  const cardColor = useThemeColor({}, 'card');

  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = (optionValue: string) => {
    onValueChange?.(optionValue);
    setIsOpen(false);
  };

  const triggerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: HEIGHT,
    gap: 8,
    paddingHorizontal: 32,
    borderWidth: 1,
    borderColor,
    borderRadius: CORNERS,
    backgroundColor,
    opacity: disabled ? 0.5 : 1,
  };

  return (
    <>
      <TouchableOpacity
        style={[triggerStyle, style]}
        onPress={() => !disabled && setIsOpen(true)}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <Text
          style={{
            fontSize: FONT_SIZE,
            color: selectedOption ? textColor : mutedColor,
          }}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <ChevronDown
          size={16}
          color={mutedColor}
          style={{
            transform: [{ rotate: isOpen ? '180deg' : '0deg' }],
          }}
        />
      </TouchableOpacity>

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
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}
          onPress={() => setIsOpen(false)}
        >
          <Pressable
            style={{
              backgroundColor: cardColor,
              borderRadius: BORDER_RADIUS,
              borderWidth: 1,
              borderColor,
              maxHeight: 300,
              width: '100%',
              maxWidth: 400,
              padding: 8,
            }}
            onPress={(e) => e.stopPropagation()}
          >
            <ScrollView
              style={{
                maxHeight: 300,
                borderRadius: BORDER_RADIUS,
              }}
              showsVerticalScrollIndicator={false}
            >
              {options.map((option, index) => (
                <TouchableOpacity
                  key={option.value}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    borderBottomWidth: index < options.length - 1 ? 1 : 0,
                    borderBottomColor: borderColor,
                    backgroundColor:
                      value === option.value
                        ? useThemeColor({}, 'accent')
                        : 'transparent',
                  }}
                  onPress={() => handleSelect(option.value)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={{
                      fontSize: FONT_SIZE,
                      color: textColor,
                      fontWeight: value === option.value ? '500' : '400',
                    }}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}
