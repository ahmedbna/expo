// components/ui/toast.tsx
import { Text } from '@/components/ui/text';
import { BORDER_RADIUS } from '@/constants/globals';
import { useThemeColor } from '@/hooks/useThemeColor';
import { AlertCircle, Check, Info, X } from 'lucide-react-native';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  Dimensions,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
} from 'react-native-gesture-handler';

export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

export interface ToastData {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  action?: {
    label: string;
    onPress: () => void;
  };
}

interface ToastProps extends ToastData {
  onDismiss: (id: string) => void;
  index: number;
}

const { width: screenWidth } = Dimensions.get('window');
const TOAST_HEIGHT = 72;
const TOAST_MARGIN = 8;

export function Toast({
  id,
  title,
  description,
  variant = 'default',
  onDismiss,
  index,
  action,
}: ToastProps) {
  const translateY = useRef(new Animated.Value(-100)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.95)).current;

  const backgroundColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');
  const textColor = useThemeColor({}, 'text');
  const mutedTextColor = useThemeColor({}, 'textMuted');
  const primaryColor = useThemeColor({}, 'primary');
  const destructiveColor = useThemeColor({}, 'destructive');

  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return {
          borderLeftColor: '#10b981',
          borderLeftWidth: 4,
        };
      case 'error':
        return {
          borderLeftColor: destructiveColor,
          borderLeftWidth: 4,
        };
      case 'warning':
        return {
          borderLeftColor: '#f59e0b',
          borderLeftWidth: 4,
        };
      case 'info':
        return {
          borderLeftColor: '#3b82f6',
          borderLeftWidth: 4,
        };
      default:
        return {};
    }
  };

  const getIcon = () => {
    const iconProps = { size: 20, color: textColor };

    switch (variant) {
      case 'success':
        return <Check {...iconProps} color='#10b981' />;
      case 'error':
        return <X {...iconProps} color={destructiveColor} />;
      case 'warning':
        return <AlertCircle {...iconProps} color='#f59e0b' />;
      case 'info':
        return <Info {...iconProps} color='#3b82f6' />;
      default:
        return null;
    }
  };

  useEffect(() => {
    // Animate in
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    return () => {
      translateY.setValue(-100);
      opacity.setValue(0);
      scale.setValue(0.95);
    };
  }, []);

  const dismiss = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.95,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss(id);
    });
  };

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event: PanGestureHandlerGestureEvent) => {
    if (event.nativeEvent.state === State.END) {
      const { translationX, velocityX } = event.nativeEvent;

      if (
        Math.abs(translationX) > screenWidth * 0.3 ||
        Math.abs(velocityX) > 500
      ) {
        // Dismiss the toast
        Animated.parallel([
          Animated.timing(translateX, {
            toValue: translationX > 0 ? screenWidth : -screenWidth,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start(() => {
          onDismiss(id);
        });
      } else {
        // Snap back
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  const toastStyle: ViewStyle = {
    position: 'absolute',
    top: 60 + index * (TOAST_HEIGHT + TOAST_MARGIN),
    left: 16,
    right: 16,
    backgroundColor,
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
    borderColor,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: TOAST_HEIGHT,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1000 + index,
    ...getVariantStyles(),
  };

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
    >
      <Animated.View
        style={[
          toastStyle,
          {
            transform: [{ translateY }, { translateX }, { scale }],
            opacity,
          },
        ]}
      >
        {getIcon() && <View style={{ marginRight: 12 }}>{getIcon()}</View>}

        <View style={{ flex: 1 }}>
          {title && (
            <Text
              variant='subtitle'
              style={{ color: textColor, marginBottom: description ? 2 : 0 }}
            >
              {title}
            </Text>
          )}
          {description && (
            <Text variant='caption' style={{ color: mutedTextColor }}>
              {description}
            </Text>
          )}
        </View>

        {action && (
          <TouchableOpacity
            onPress={action.onPress}
            style={{
              marginLeft: 12,
              paddingHorizontal: 12,
              paddingVertical: 6,
              backgroundColor: primaryColor,
              borderRadius: BORDER_RADIUS / 2,
            }}
          >
            <Text
              variant='caption'
              style={{ color: useThemeColor({}, 'primaryForeground') }}
            >
              {action.label}
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={dismiss}
          style={{
            marginLeft: 12,
            padding: 4,
          }}
        >
          <X size={16} color={mutedTextColor} />
        </TouchableOpacity>
      </Animated.View>
    </PanGestureHandler>
  );
}

interface ToastContextType {
  toast: (toast: Omit<ToastData, 'id'>) => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  warning: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

interface ToastProviderProps {
  children: React.ReactNode;
  maxToasts?: number;
}

export function ToastProvider({ children, maxToasts = 5 }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addToast = useCallback(
    (toastData: Omit<ToastData, 'id'>) => {
      const id = generateId();
      const newToast: ToastData = {
        ...toastData,
        id,
        duration: toastData.duration ?? 5000,
      };

      setToasts((prev) => {
        const updated = [newToast, ...prev];
        // Keep only the maximum number of toasts
        return updated.slice(0, maxToasts);
      });

      // Auto dismiss after duration
      if (newToast.duration && newToast.duration > 0) {
        setTimeout(() => {
          dismissToast(id);
        }, newToast.duration);
      }
    },
    [maxToasts]
  );

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  const createVariantToast = useCallback(
    (variant: ToastVariant, title: string, description?: string) => {
      addToast({
        title,
        description,
        variant,
      });
    },
    [addToast]
  );

  const contextValue: ToastContextType = {
    toast: addToast,
    success: (title, description) =>
      createVariantToast('success', title, description),
    error: (title, description) =>
      createVariantToast('error', title, description),
    warning: (title, description) =>
      createVariantToast('warning', title, description),
    info: (title, description) =>
      createVariantToast('info', title, description),
    dismiss: dismissToast,
    dismissAll,
  };

  const containerStyle: ViewStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    pointerEvents: 'box-none',
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <View style={containerStyle} pointerEvents='box-none'>
        {toasts.map((toast, index) => (
          <Toast
            key={toast.id}
            {...toast}
            index={index}
            onDismiss={dismissToast}
          />
        ))}
      </View>
    </ToastContext.Provider>
  );
}

// Hook to use toast
export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}
