// components/ui/popover.tsx
import { Button } from '@/components/ui/button';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BORDER_RADIUS } from '@/theme/globals';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

// Context for sharing state between popover components
interface PopoverContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  triggerLayout: { x: number; y: number; width: number; height: number };
  setTriggerLayout: (layout: any) => void;
}

const PopoverContext = createContext<PopoverContextType | undefined>(undefined);

const usePopover = () => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error('Popover components must be used within a Popover');
  }
  return context;
};

// Main Popover wrapper
interface PopoverProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Popover({
  children,
  open = false,
  onOpenChange,
}: PopoverProps) {
  const [isOpen, setIsOpenState] = useState(open);
  const [triggerLayout, setTriggerLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  // Sync with external open state
  useEffect(() => {
    setIsOpenState(open);
  }, [open]);

  const setIsOpen = (newOpen: boolean) => {
    setIsOpenState(newOpen);
    onOpenChange?.(newOpen);
  };

  return (
    <PopoverContext.Provider
      value={{
        isOpen,
        setIsOpen,
        triggerLayout,
        setTriggerLayout,
      }}
    >
      {children}
    </PopoverContext.Provider>
  );
}

// Popover Trigger
interface PopoverTriggerProps {
  children: ReactNode;
  asChild?: boolean;
  style?: ViewStyle;
}

export function PopoverTrigger({
  children,
  asChild = false,
  style,
}: PopoverTriggerProps) {
  const { setIsOpen, setTriggerLayout, isOpen } = usePopover();
  const triggerRef = useRef<React.ComponentRef<typeof TouchableOpacity>>(null);

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

  const handlePress = () => {
    measureTrigger();
    setIsOpen(!isOpen);
  };

  if (asChild && React.isValidElement(children)) {
    // Clone the child and add onPress handler
    return React.cloneElement(children, {
      ref: triggerRef,
      onPress: handlePress,
      style: [(children.props as any).style, style],
    } as any);
  }

  return (
    <Button ref={triggerRef} style={style} onPress={handlePress}>
      {children}
    </Button>
  );
}

// Popover Content
interface PopoverContentProps {
  children: ReactNode;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
  alignOffset?: number;
  style?: ViewStyle;
  maxWidth?: number;
  maxHeight?: number;
}

export function PopoverContent({
  children,
  align = 'center',
  side = 'bottom',
  sideOffset = 8,
  alignOffset = 0,
  style,
  maxWidth = 300,
  maxHeight = 400,
}: PopoverContentProps) {
  const { isOpen, setIsOpen, triggerLayout } = usePopover();
  const popoverColor = useThemeColor({}, 'popover');
  const borderColor = useThemeColor({}, 'border');

  const handleClose = () => {
    setIsOpen(false);
  };

  // Calculate position based on side and align props
  const getPosition = () => {
    const screenDimensions = Dimensions.get('window');
    const { x, y, width, height } = triggerLayout;

    let top = 0;
    let left = 0;

    // Calculate based on side
    switch (side) {
      case 'top':
        top = y - sideOffset;
        break;
      case 'bottom':
        top = y + height + sideOffset;
        break;
      case 'left':
        left = x - sideOffset;
        break;
      case 'right':
        left = x + width + sideOffset;
        break;
    }

    // Calculate based on align
    if (side === 'top' || side === 'bottom') {
      switch (align) {
        case 'start':
          left = x + alignOffset;
          break;
        case 'center':
          left = x + width / 2 + alignOffset;
          break;
        case 'end':
          left = x + width + alignOffset;
          break;
      }
    } else {
      switch (align) {
        case 'start':
          top = y + alignOffset;
          break;
        case 'center':
          top = y + height / 2 + alignOffset;
          break;
        case 'end':
          top = y + height + alignOffset;
          break;
      }
    }

    // Adjust for screen boundaries
    const contentWidth = maxWidth;
    const contentHeight = Math.min(maxHeight, screenDimensions.height * 0.8);

    // Horizontal boundary adjustments
    if (left + contentWidth > screenDimensions.width - 16) {
      left = screenDimensions.width - contentWidth - 16;
    }
    if (left < 16) {
      left = 16;
    }

    // Vertical boundary adjustments
    if (top + contentHeight > screenDimensions.height - 16) {
      if (side === 'bottom') {
        // Try to place above trigger
        top = y - contentHeight - sideOffset;
      } else {
        top = screenDimensions.height - contentHeight - 16;
      }
    }
    if (top < 16) {
      if (side === 'top') {
        // Try to place below trigger
        top = y + height + sideOffset;
      } else {
        top = 16;
      }
    }

    return {
      top,
      left,
      maxWidth,
      maxHeight: contentHeight,
    };
  };

  const position = getPosition();

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType='fade'
      onRequestClose={handleClose}
    >
      <Pressable style={styles.overlay} onPress={handleClose}>
        <View
          style={[
            styles.content,
            {
              backgroundColor: popoverColor,
              borderColor: borderColor,
              ...position,
            },
            style,
          ]}
          onStartShouldSetResponder={() => true}
        >
          {children}
        </View>
      </Pressable>
    </Modal>
  );
}

// Popover Header
interface PopoverHeaderProps {
  children: ReactNode;
  style?: ViewStyle;
}

export function PopoverHeader({ children, style }: PopoverHeaderProps) {
  const borderColor = useThemeColor({}, 'border');

  return (
    <View style={[styles.header, { borderBottomColor: borderColor }, style]}>
      {children}
    </View>
  );
}

// Popover Body
interface PopoverBodyProps {
  children: ReactNode;
  style?: ViewStyle;
}

export function PopoverBody({ children, style }: PopoverBodyProps) {
  return <View style={[styles.body, style]}>{children}</View>;
}

// Popover Footer
interface PopoverFooterProps {
  children: ReactNode;
  style?: ViewStyle;
}

export function PopoverFooter({ children, style }: PopoverFooterProps) {
  const borderColor = useThemeColor({}, 'border');

  return (
    <View style={[styles.footer, { borderTopColor: borderColor }, style]}>
      {children}
    </View>
  );
}

// Popover Close (utility component)
interface PopoverCloseProps {
  children: ReactNode;
  asChild?: boolean;
  style?: ViewStyle;
}

export function PopoverClose({
  children,
  asChild = false,
  style,
}: PopoverCloseProps) {
  const { setIsOpen } = usePopover();

  const handlePress = () => {
    setIsOpen(false);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onPress: handlePress,
      style: [(children.props as any).style, style],
    } as any);
  }

  return (
    <TouchableOpacity style={style} onPress={handlePress} activeOpacity={0.7}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    position: 'absolute',
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  body: {
    padding: 16,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
});
