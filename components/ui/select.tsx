// components/ui/select.tsx
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
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  placeholder?: string;
  error?: string;
  variant?: 'outline' | 'filled' | 'group';
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  style?: ViewStyle;

  label?: string;
  icon?: React.ComponentType<LucideProps>;
  rightComponent?: React.ReactNode | (() => React.ReactNode);
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
}

export function Select({
  options,
  value,
  error,
  variant = 'filled',
  placeholder = 'Select an option...',
  onValueChange,
  disabled = false,
  style,
  label,
  icon,
  labelStyle,
  errorStyle,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const borderColor = useThemeColor({}, 'border');
  const text = useThemeColor({}, 'text');
  const muted = useThemeColor({}, 'mutedForeground');
  const cardColor = useThemeColor({}, 'card');
  const danger = useThemeColor({}, 'red');

  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = (optionValue: string) => {
    onValueChange?.(optionValue);
    setIsOpen(false);
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
            style={{
              fontSize: FONT_SIZE,
              color: selectedOption
                ? text
                : disabled
                ? muted
                : error
                ? danger
                : muted,
            }}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </Text>
          <ChevronDown
            size={16}
            color={error ? danger : muted}
            style={{
              transform: [{ rotate: isOpen ? '180deg' : '0deg' }],
            }}
          />
        </View>
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
                      color: text,
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
