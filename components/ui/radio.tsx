// components/ui/radio.tsx
import { Text } from '@/components/ui/text';
import { useThemeColor } from '@/hooks/useThemeColor';
import { CORNERS, FONT_SIZE } from '@/theme/globals';
import React from 'react';
import { TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

export interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  orientation?: 'vertical' | 'horizontal';
  style?: ViewStyle;
  optionStyle?: ViewStyle;
  labelStyle?: TextStyle;
}

interface RadioButtonProps {
  option: RadioOption;
  selected: boolean;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

export function RadioButton({
  option,
  selected,
  onPress,
  disabled = false,
  style,
  labelStyle,
}: RadioButtonProps) {
  const primaryColor = useThemeColor({}, 'primary');
  const borderColor = useThemeColor({}, 'border');
  const textColor = useThemeColor({}, 'text');
  const mutedColor = useThemeColor({}, 'textMuted');
  const backgroundColor = useThemeColor({}, 'background');

  const isDisabled = disabled || option.disabled;

  const radioButtonStyle: ViewStyle = {
    width: 20,
    height: 20,
    borderRadius: CORNERS,
    borderWidth: 2,
    borderColor: selected ? primaryColor : borderColor,
    backgroundColor: backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  };

  const innerCircleStyle: ViewStyle = {
    width: 10,
    height: 10,
    borderRadius: CORNERS,
    backgroundColor: selected ? primaryColor : 'transparent',
  };

  const containerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    opacity: isDisabled ? 0.5 : 1,
  };

  const textStyle: TextStyle = {
    color: isDisabled ? mutedColor : textColor,
    fontSize: FONT_SIZE,
    fontWeight: '400',
    lineHeight: 24,
  };

  return (
    <TouchableOpacity
      style={[containerStyle, style]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
    >
      <View style={radioButtonStyle}>
        <View style={innerCircleStyle} />
      </View>
      <Text style={[textStyle, labelStyle]}>{option.label}</Text>
    </TouchableOpacity>
  );
}

export function RadioGroup({
  options,
  value,
  onValueChange,
  disabled = false,
  orientation = 'vertical',
  style,
  optionStyle,
  labelStyle,
}: RadioGroupProps) {
  const containerStyle: ViewStyle = {
    flexDirection: orientation === 'horizontal' ? 'row' : 'column',
    gap: orientation === 'horizontal' ? 16 : 4,
  };

  const handlePress = (optionValue: string) => {
    if (onValueChange && !disabled) {
      onValueChange(optionValue);
    }
  };

  return (
    <View style={[containerStyle, style]}>
      {options.map((option) => (
        <RadioButton
          key={option.value}
          option={option}
          selected={value === option.value}
          onPress={() => handlePress(option.value)}
          disabled={disabled}
          style={optionStyle}
          labelStyle={labelStyle}
        />
      ))}
    </View>
  );
}

// Compound component pattern for better API
RadioGroup.Button = RadioButton;

// Export default as RadioGroup
export default RadioGroup;
