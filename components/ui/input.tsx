import { BlurView } from 'expo-blur';
import { X } from 'lucide-react-native';
import { forwardRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';

interface InputProps extends TextInputProps {
  variant?: 'default' | 'outline';
  label?: string;
  rightElement?: React.ReactNode;
  showClearButton?: boolean;
}

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      style,
      variant = 'default',
      label,
      rightElement,
      showClearButton = true,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = useState('');

    return (
      <View style={[styles.container, style]}>
        <BlurView intensity={20} tint='dark' style={[styles.blurContainer]}>
          <View style={styles.content}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.inputRow}>
              <TextInput
                ref={ref}
                value={value}
                onChangeText={setValue}
                // onFocus={() => setIsFocused(true)}
                // onBlur={() => setIsFocused(false)}
                placeholderTextColor='rgba(255, 255, 255, 0.4)'
                style={[styles.input, label && styles.inputWithLabel]}
                {...props}
              />
              {rightElement && (
                <View style={styles.rightElement}>{rightElement}</View>
              )}
              {showClearButton && value.length > 0 && (
                <TouchableOpacity
                  onPress={() => setValue('')}
                  style={styles.clearButtonContainer}
                >
                  <View style={styles.clearButton}>
                    <X
                      size={12}
                      color='rgba(255, 255, 255, 0.6)'
                      strokeWidth={2}
                    />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </BlurView>
      </View>
    );
  }
);

// Helper component for grouped inputs like in iOS Settings
export const InputGroup = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: any;
}) => <View style={[styles.group, style]}>{children}</View>;

const styles = StyleSheet.create({
  container: {
    marginVertical: 1,
  },
  blurContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(28, 28, 30, 0.8)',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  focusedContainer: {
    borderColor: 'rgba(10, 132, 255, 0.8)',
    backgroundColor: 'rgba(28, 28, 30, 0.9)',
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 44,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
    color: 'white',
    marginBottom: 2,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: 'white',
    fontWeight: '400',
    padding: 0,
    margin: 0,
  },
  inputWithLabel: {
    fontSize: 16,
    marginTop: 2,
  },
  rightElement: {
    marginLeft: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearButtonContainer: {
    marginLeft: 8,
    padding: 4,
  },
  clearButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  group: {
    backgroundColor: 'rgba(28, 28, 30, 0.6)',
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 8,
  },
});

// Usage example:
export const ExampleUsage = () => (
  <View style={{ padding: 20 }}>
    <InputGroup>
      <Input
        label='Name'
        placeholder='Network Name'
        // rightElement={
        //   <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16 }}>
        //     Network Name
        //   </Text>
        // }
      />
    </InputGroup>

    <InputGroup>
      <Input
        label='Security'
        rightElement={
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                color: 'rgba(255,255,255,0.4)',
                fontSize: 16,
                marginRight: 8,
              }}
            >
              WPA2/WPA3
            </Text>
            <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 18 }}>
              ›
            </Text>
          </View>
        }
        editable={false}
      />
    </InputGroup>

    <InputGroup>
      <Input label='Password' secureTextEntry placeholder='Enter password' />
    </InputGroup>
  </View>
);
