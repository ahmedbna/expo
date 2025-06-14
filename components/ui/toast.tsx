// components/ui/toast.tsx
import { Text } from '@/components/ui/text';
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
  Platform,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

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
const DYNAMIC_ISLAND_HEIGHT = 37;
const EXPANDED_HEIGHT = 85;
const TOAST_MARGIN = 8;
const DYNAMIC_ISLAND_WIDTH = 126;
const EXPANDED_WIDTH = screenWidth - 32;

export function Toast({
  id,
  title,
  description,
  variant = 'default',
  onDismiss,
  index,
  action,
}: ToastProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasContent, setHasContent] = useState(false);

  const translateY = useRef(new Animated.Value(-100)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;
  const width = useRef(new Animated.Value(DYNAMIC_ISLAND_WIDTH)).current;
  const height = useRef(new Animated.Value(DYNAMIC_ISLAND_HEIGHT)).current;
  const borderRadius = useRef(new Animated.Value(18.5)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;

  // Dynamic Island colors (dark theme optimized)
  const backgroundColor = '#1C1C1E'; // iOS Dynamic Island background
  const textColor = useThemeColor({}, 'text');
  const mutedTextColor = '#8E8E93'; // iOS secondary text color
  const primaryColor = useThemeColor({}, 'primary');
  const destructiveColor = useThemeColor({}, 'destructive');

  const expandToast = () => {
    if (!hasContent) return;

    setIsExpanded(true);

    Animated.parallel([
      Animated.spring(width, {
        toValue: EXPANDED_WIDTH,
        tension: 80,
        friction: 8,
        useNativeDriver: false,
      }),
      Animated.spring(height, {
        toValue: EXPANDED_HEIGHT,
        tension: 80,
        friction: 8,
        useNativeDriver: false,
      }),
      Animated.spring(borderRadius, {
        toValue: 20,
        tension: 80,
        friction: 8,
        useNativeDriver: false,
      }),
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 300,
        delay: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    const hasContentToShow = Boolean(title || description || action);
    setHasContent(hasContentToShow);

    // Initial animation - appears as compact Dynamic Island
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Auto-expand after initial animation completes if there's content
      if (hasContentToShow) {
        setTimeout(() => {
          expandToast();
        }, 500);
      }
    });

    return () => {
      translateY.setValue(-100);
      opacity.setValue(0);
      scale.setValue(0.8);
    };
  }, []); // Remove dependencies to run only once on mount

  const collapseToast = () => {
    setIsExpanded(false);

    Animated.parallel([
      Animated.timing(contentOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(width, {
        toValue: DYNAMIC_ISLAND_WIDTH,
        tension: 80,
        friction: 8,
        useNativeDriver: false,
      }),
      Animated.spring(height, {
        toValue: DYNAMIC_ISLAND_HEIGHT,
        tension: 80,
        friction: 8,
        useNativeDriver: false,
      }),
      Animated.spring(borderRadius, {
        toValue: 18.5,
        tension: 80,
        friction: 8,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const getVariantColor = () => {
    switch (variant) {
      case 'success':
        return '#30D158'; // iOS green
      case 'error':
        return '#FF453A'; // iOS red
      case 'warning':
        return '#FF9F0A'; // iOS orange
      case 'info':
        return '#007AFF'; // iOS blue
      default:
        return '#8E8E93'; // iOS gray
    }
  };

  const getIcon = () => {
    const iconProps = { size: 16, color: getVariantColor() };

    switch (variant) {
      case 'success':
        return <Check {...iconProps} />;
      case 'error':
        return <X {...iconProps} />;
      case 'warning':
        return <AlertCircle {...iconProps} />;
      case 'info':
        return <Info {...iconProps} />;
      default:
        return null;
    }
  };

  const dismiss = () => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: -100,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 0.8,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss(id);
    });
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.setValue(event.translationX);
    })
    .onEnd((event) => {
      const { translationX, velocityX } = event;

      if (
        Math.abs(translationX) > screenWidth * 0.25 ||
        Math.abs(velocityX) > 800
      ) {
        // Dismiss the toast
        Animated.parallel([
          Animated.timing(translateX, {
            toValue: translationX > 0 ? screenWidth : -screenWidth,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }),
        ]).start(() => {
          runOnJS(onDismiss)(id);
        });
      } else {
        // Snap back with spring animation
        Animated.spring(translateX, {
          toValue: 0,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }).start();
      }
    });

  const tapGesture = Gesture.Tap().onEnd(() => {
    if (hasContent) {
      runOnJS(isExpanded ? collapseToast : expandToast)();
    }
  });

  const combinedGesture = Gesture.Simultaneous(panGesture, tapGesture);

  const getTopPosition = () => {
    const statusBarHeight = Platform.OS === 'ios' ? 59 : 20;
    return statusBarHeight + index * (EXPANDED_HEIGHT + TOAST_MARGIN);
  };

  const toastStyle: ViewStyle = {
    position: 'absolute',
    top: getTopPosition(),
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
    zIndex: 1000 + index,
  };

  const dynamicIslandStyle = {
    backgroundColor,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    overflow: 'hidden' as const,
  };

  return (
    <GestureDetector gesture={combinedGesture}>
      <Animated.View
        style={[
          toastStyle,
          {
            transform: [{ translateY }, { translateX }, { scale }],
            opacity,
          },
        ]}
      >
        <Animated.View
          style={[
            dynamicIslandStyle,
            {
              width,
              height,
              borderRadius,
            },
          ]}
        >
          {/* Compact state - just icon or indicator */}
          {!isExpanded && getIcon() && (
            <View style={{ opacity: hasContent ? 1 : 0 }}>{getIcon()}</View>
          )}

          {/* Expanded state - full content */}
          <Animated.View
            style={[
              {
                opacity: contentOpacity,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                paddingHorizontal: 16,
                paddingVertical: 12,
                flexDirection: 'row',
                alignItems: 'center',
              },
            ]}
            pointerEvents={isExpanded ? 'auto' : 'none'}
          >
            {getIcon() && <View style={{ marginRight: 12 }}>{getIcon()}</View>}

            <View style={{ flex: 1, minWidth: 0 }}>
              {title && (
                <Text
                  variant='subtitle'
                  style={{
                    color: '#FFFFFF',
                    fontSize: 15,
                    fontWeight: '600',
                    marginBottom: description ? 2 : 0,
                  }}
                  numberOfLines={1}
                  ellipsizeMode='tail'
                >
                  {title}
                </Text>
              )}
              {description && (
                <Text
                  variant='caption'
                  style={{
                    color: mutedTextColor,
                    fontSize: 13,
                    fontWeight: '400',
                  }}
                  numberOfLines={2}
                  ellipsizeMode='tail'
                >
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
                  backgroundColor: getVariantColor(),
                  borderRadius: 12,
                }}
              >
                <Text
                  variant='caption'
                  style={{
                    color: '#FFFFFF',
                    fontSize: 12,
                    fontWeight: '600',
                  }}
                >
                  {action.label}
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={dismiss}
              style={{
                marginLeft: 8,
                padding: 4,
                borderRadius: 8,
              }}
            >
              <X size={14} color={mutedTextColor} />
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
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

export function ToastProvider({ children, maxToasts = 3 }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addToast = useCallback(
    (toastData: Omit<ToastData, 'id'>) => {
      const id = generateId();
      const newToast: ToastData = {
        ...toastData,
        id,
        duration: toastData.duration ?? 4000, // Shorter duration for Dynamic Island
      };

      setToasts((prev) => {
        const updated = [newToast, ...prev];
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
      <GestureHandlerRootView style={{ flex: 1 }}>
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
      </GestureHandlerRootView>
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
