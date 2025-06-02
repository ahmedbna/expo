// components/ui/bottom-sheet.tsx
import { Radius } from '@/constants/globals';
import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
} from 'react-native-gesture-handler';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface BottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  snapPoints?: string[];
  initialSnapIndex?: number;
  enableBackdropDismiss?: boolean;
  enableSwipeDown?: boolean;
}

export function BottomSheet({
  isVisible,
  onClose,
  children,
  snapPoints = ['50%'],
  initialSnapIndex = 0,
  enableBackdropDismiss = true,
  enableSwipeDown = true,
}: BottomSheetProps) {
  const backgroundColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');
  const backdropColor = useThemeColor(
    { light: 'rgba(0,0,0,0.5)', dark: 'rgba(0,0,0,0.7)' },
    'background'
  );

  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const lastGesture = useRef(0);
  const [currentSnapIndex, setCurrentSnapIndex] = useState(initialSnapIndex);

  // Convert snap points to actual heights
  const snapHeights = snapPoints.map((point) => {
    if (point.includes('%')) {
      return (SCREEN_HEIGHT * parseInt(point)) / 100;
    }
    return parseInt(point);
  });

  const currentHeight = snapHeights[currentSnapIndex];

  useEffect(() => {
    if (isVisible) {
      openSheet();
    } else {
      closeSheet();
    }
  }, [isVisible]);

  const openSheet = () => {
    Animated.spring(translateY, {
      toValue: SCREEN_HEIGHT - currentHeight,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  };

  const closeSheet = () => {
    Animated.spring(translateY, {
      toValue: SCREEN_HEIGHT,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  };

  const snapToPoint = (index: number) => {
    const targetHeight = snapHeights[index];
    setCurrentSnapIndex(index);

    Animated.spring(translateY, {
      toValue: SCREEN_HEIGHT - targetHeight,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  };

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    {
      useNativeDriver: true,
      listener: (event: PanGestureHandlerGestureEvent) => {
        lastGesture.current = event.nativeEvent.translationY;
      },
    }
  );

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const { translationY, velocityY } = event.nativeEvent;

      // Determine if we should close the sheet
      const shouldClose =
        translationY > currentHeight * 0.3 || velocityY > 1000;

      if (shouldClose) {
        onClose();
        return;
      }

      // Find the closest snap point
      let closestSnapIndex = 0;
      let closestDistance = Math.abs(translationY - snapHeights[0]);

      snapHeights.forEach((height, index) => {
        const distance = Math.abs(translationY - height);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestSnapIndex = index;
        }
      });

      snapToPoint(closestSnapIndex);
    }
  };

  const handleBackdropPress = () => {
    if (enableBackdropDismiss) {
      onClose();
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Modal
      transparent
      visible={isVisible}
      animationType='none'
      onRequestClose={onClose}
    >
      <GestureHandlerRootView style={styles.container}>
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <View style={[styles.backdrop, { backgroundColor: backdropColor }]} />
        </TouchableWithoutFeedback>

        <PanGestureHandler
          enabled={enableSwipeDown}
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}
        >
          <Animated.View
            style={[
              styles.bottomSheet,
              {
                transform: [{ translateY }],
                backgroundColor,
                borderColor,
                minHeight: currentHeight,
              },
            ]}
          >
            {/* Drag Handle */}
            <View style={styles.dragHandle}>
              <View
                style={[styles.dragIndicator, { backgroundColor: borderColor }]}
              />
            </View>

            {/* Content */}
            <View style={styles.content}>{children}</View>
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </Modal>
  );
}

// Bottom Sheet Header Component
interface BottomSheetHeaderProps {
  children: React.ReactNode;
}

export function BottomSheetHeader({ children }: BottomSheetHeaderProps) {
  const borderColor = useThemeColor({}, 'border');

  return (
    <View style={[styles.header, { borderBottomColor: borderColor }]}>
      {children}
    </View>
  );
}

// Bottom Sheet Content Component
interface BottomSheetContentProps {
  children: React.ReactNode;
}

export function BottomSheetContent({ children }: BottomSheetContentProps) {
  return <View style={styles.sheetContent}>{children}</View>;
}

// Bottom Sheet Footer Component
interface BottomSheetFooterProps {
  children: React.ReactNode;
}

export function BottomSheetFooter({ children }: BottomSheetFooterProps) {
  const borderColor = useThemeColor({}, 'border');

  return (
    <View style={[styles.footer, { borderTopColor: borderColor }]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomSheet: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT,
    borderTopLeftRadius: Radius.lg,
    borderTopRightRadius: Radius.lg,
    borderTopWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 16,
  },
  dragHandle: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  dragIndicator: {
    width: 32,
    height: 4,
    borderRadius: Radius.full,
    opacity: 0.4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    marginBottom: 8,
  },
  sheetContent: {
    flex: 1,
    paddingVertical: 8,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    marginTop: 8,
  },
});

// Hook for managing bottom sheet state
export function useBottomSheet() {
  const [isVisible, setIsVisible] = useState(false);

  const open = () => setIsVisible(true);
  const close = () => setIsVisible(false);
  const toggle = () => setIsVisible((prev) => !prev);

  return {
    isVisible,
    open,
    close,
    toggle,
  };
}
