// components/ui/sortable.tsx
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import { CORNERS } from '@/theme/globals';
import * as Haptics from 'expo-haptics';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { LayoutChangeEvent, ScrollView, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

export interface SortableItem {
  id: string | number;
  [key: string]: any;
}

export interface SortableItemProps<T extends SortableItem> {
  item: T;
  index: number;
  isActive: boolean;
  isDragging: boolean;
  onLongPress?: (item: T, index: number) => void;
}

export interface SortableLayout {
  type: 'list' | 'grid';
  columns?: number;
  itemWidth?: number | 'auto';
  itemHeight: number;
  gap?: number;
  horizontalGap?: number;
  verticalGap?: number;
}

export interface SortableProps<T extends SortableItem> {
  data?: T[] | null;
  onReorder: (newData: T[]) => void;
  renderItem: (props: SortableItemProps<T>) => React.ReactElement;
  layout?: SortableLayout;
  style?: ViewStyle;
  scrollViewStyle?: ViewStyle;
  dragActivationDelay?: number;
  hapticFeedback?: boolean;
  showDragIndicator?: boolean;
  disabled?: boolean;
  autoScroll?: boolean;
  autoScrollThreshold?: number;
  autoScrollSpeed?: number;
  dragScale?: number;
  dragOpacity?: number;
  springConfig?: {
    damping?: number;
    stiffness?: number;
    mass?: number;
  };
  scrollEnabled?: boolean;
  bounces?: boolean;
}

export function Sortable<T extends SortableItem>({
  data,
  onReorder,
  renderItem,
  layout = { type: 'list', itemHeight: 60, gap: 8 },
  style,
  scrollViewStyle,
  dragActivationDelay = 200,
  hapticFeedback = true,
  showDragIndicator = true,
  disabled = false,
  autoScroll = true,
  autoScrollThreshold = 50,
  autoScrollSpeed = 10,
  dragScale = 1.05,
  dragOpacity = 0.9,
  springConfig = { damping: 15, stiffness: 150, mass: 1 },
  scrollEnabled = true,
  bounces = true,
}: SortableProps<T>) {
  // Theme colors
  const borderColor = useThemeColor({}, 'border');
  const backgroundColor = useThemeColor({}, 'card');
  const mutedColor = useThemeColor({}, 'muted');

  // Refs
  const scrollViewRef = useRef<ScrollView>(null);
  const containerRef = useRef<React.ComponentRef<typeof View>>(null);
  const autoScrollInterval = useRef<number | null>(null);

  // State
  const [activeId, setActiveId] = useState<string | number | null>(null);
  const [containerLayout, setContainerLayout] = useState({
    width: 0,
    height: 0,
  });
  const [scrollViewLayout, setScrollViewLayout] = useState({
    width: 0,
    height: 0,
  });
  const [contentOffset, setContentOffset] = useState({ x: 0, y: 0 });

  // Shared values
  const draggedItem = useSharedValue<number>(-1);
  const dragPosition = useSharedValue({ x: 0, y: 0 });
  const scrollOffset = useSharedValue(0);
  const isDragging = useSharedValue(false);

  // Layout calculations
  const layoutConfig = useMemo(() => {
    const isGrid = layout.type === 'grid';
    const columns = isGrid ? layout.columns || 2 : 1;
    const itemWidth =
      layout.itemWidth === 'auto' || !layout.itemWidth
        ? (containerLayout.width -
            (columns - 1) * (layout.horizontalGap || layout.gap || 8)) /
          columns
        : layout.itemWidth;

    return {
      isGrid,
      columns,
      itemWidth,
      itemHeight: layout.itemHeight,
      horizontalGap: layout.horizontalGap || layout.gap || 8,
      verticalGap: layout.verticalGap || layout.gap || 8,
    };
  }, [layout, containerLayout.width]);

  // Safely normalize data
  const safeData = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    return data.filter(
      (item) =>
        item &&
        typeof item === 'object' &&
        item.id !== undefined &&
        item.id !== null
    );
  }, [data]);

  // Calculate item positions
  const getItemPosition = useCallback(
    (index: number) => {
      if (layoutConfig.isGrid) {
        const row = Math.floor(index / layoutConfig.columns);
        const col = index % layoutConfig.columns;
        return {
          x: col * (layoutConfig.itemWidth + layoutConfig.horizontalGap),
          y: row * (layoutConfig.itemHeight + layoutConfig.verticalGap),
        };
      } else {
        return {
          x: 0,
          y: index * (layoutConfig.itemHeight + layoutConfig.verticalGap),
        };
      }
    },
    [layoutConfig]
  );

  // Get index from position
  const getIndexFromPosition = useCallback(
    (x: number, y: number) => {
      if (layoutConfig.isGrid) {
        const col = Math.max(
          0,
          Math.min(
            layoutConfig.columns - 1,
            Math.round(
              x / (layoutConfig.itemWidth + layoutConfig.horizontalGap)
            )
          )
        );
        const row = Math.max(
          0,
          Math.round(y / (layoutConfig.itemHeight + layoutConfig.verticalGap))
        );
        const index = row * layoutConfig.columns + col;
        return Math.min(index, safeData.length - 1);
      } else {
        return Math.max(
          0,
          Math.min(
            safeData.length - 1,
            Math.round(y / (layoutConfig.itemHeight + layoutConfig.verticalGap))
          )
        );
      }
    },
    [layoutConfig, safeData.length]
  );

  // Pre-create shared values for all items
  const maxItems = 1000;
  const sharedPositions = useMemo(
    () =>
      Array.from({ length: maxItems }, (_, i) => ({
        x: useSharedValue(0),
        y: useSharedValue(0),
        order: useSharedValue(i),
      })),
    []
  );

  // Initialize positions
  useEffect(() => {
    safeData.forEach((item, index) => {
      if (index < maxItems) {
        const position = getItemPosition(index);
        sharedPositions[index].x.value = position.x;
        sharedPositions[index].y.value = position.y;
        sharedPositions[index].order.value = index;
      }
    });
  }, [safeData, getItemPosition, sharedPositions]);

  // Auto-scroll functionality
  const startAutoScroll = useCallback(
    (direction: 'up' | 'down', speed: number) => {
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
      }

      autoScrollInterval.current = setInterval(() => {
        scrollViewRef.current?.scrollTo({
          y: contentOffset.y + (direction === 'down' ? speed : -speed),
          animated: false,
        });
      }, 16); // ~60fps
    },
    [contentOffset.y]
  );

  const stopAutoScroll = useCallback(() => {
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
      autoScrollInterval.current = null;
    }
  }, []);

  // Move item function
  const moveItem = useCallback(
    (fromIndex: number, toIndex: number) => {
      'worklet';
      if (fromIndex === toIndex || safeData.length === 0) return;

      const newData = [...safeData];
      const [movedItem] = newData.splice(fromIndex, 1);
      newData.splice(toIndex, 0, movedItem);

      runOnJS(onReorder)(newData);

      if (hapticFeedback) {
        runOnJS(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light))();
      }
    },
    [safeData, onReorder, hapticFeedback]
  );

  // Create gesture for item
  const createGestureForItem = useCallback(
    (item: T, index: number) => {
      const panGesture = Gesture.Pan()
        .activateAfterLongPress(dragActivationDelay)
        .onStart((event) => {
          if (disabled) return;

          isDragging.value = true;
          draggedItem.value = index;
          dragPosition.value = { x: event.x, y: event.y };

          runOnJS(setActiveId)(item.id);

          if (hapticFeedback) {
            runOnJS(() =>
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
            )();
          }
        })
        .onUpdate((event) => {
          if (disabled || draggedItem.value !== index) return;

          const absoluteY = event.absoluteY;
          dragPosition.value = { x: event.translationX, y: event.translationY };

          // Auto-scroll logic
          if (autoScroll && scrollViewRef.current) {
            const scrollViewTop =
              scrollViewLayout.height - containerLayout.height;
            const scrollViewBottom = scrollViewLayout.height;

            if (absoluteY < autoScrollThreshold) {
              runOnJS(startAutoScroll)('up', autoScrollSpeed);
            } else if (absoluteY > scrollViewBottom - autoScrollThreshold) {
              runOnJS(startAutoScroll)('down', autoScrollSpeed);
            } else {
              runOnJS(stopAutoScroll)();
            }
          }

          // Calculate new position
          const originalPos = getItemPosition(index);
          const newX = originalPos.x + event.translationX;
          const newY = originalPos.y + event.translationY + scrollOffset.value;

          const newIndex = getIndexFromPosition(newX, newY);

          if (
            newIndex !== index &&
            newIndex >= 0 &&
            newIndex < safeData.length
          ) {
            // Animate other items to new positions
            const targetPos = getItemPosition(newIndex);
            const currentPos = getItemPosition(index);

            // Update positions with spring animation
            for (
              let i = Math.min(index, newIndex);
              i <= Math.max(index, newIndex);
              i++
            ) {
              if (i === index) continue;

              const pos =
                i < index ? getItemPosition(i + 1) : getItemPosition(i - 1);
              if (i < maxItems) {
                sharedPositions[i].x.value = withSpring(pos.x, springConfig);
                sharedPositions[i].y.value = withSpring(pos.y, springConfig);
              }
            }
          }
        })
        .onEnd((event) => {
          if (disabled || draggedItem.value !== index) return;

          runOnJS(stopAutoScroll)();

          const originalPos = getItemPosition(index);
          const newX = originalPos.x + event.translationX;
          const newY = originalPos.y + event.translationY + scrollOffset.value;

          const newIndex = getIndexFromPosition(newX, newY);

          if (
            newIndex !== index &&
            newIndex >= 0 &&
            newIndex < safeData.length
          ) {
            runOnJS(moveItem)(index, newIndex);
          }

          // Reset positions
          dragPosition.value = withSpring({ x: 0, y: 0 }, springConfig);
          isDragging.value = false;
          draggedItem.value = -1;

          runOnJS(setActiveId)(null);
        });

      return panGesture;
    },
    [
      dragActivationDelay,
      disabled,
      hapticFeedback,
      autoScroll,
      autoScrollThreshold,
      autoScrollSpeed,
      getItemPosition,
      getIndexFromPosition,
      safeData.length,
      moveItem,
      springConfig,
      sharedPositions,
      scrollViewLayout.height,
      containerLayout.height,
    ]
  );

  // Sortable item component
  const SortableItem = React.memo(
    ({ item, index }: { item: T; index: number }) => {
      const gesture = createGestureForItem(item, index);
      const isActive = activeId === item.id;
      const isDraggingThis = draggedItem.value === index;

      const animatedStyle = useAnimatedStyle(() => {
        const basePosition = getItemPosition(index);
        const isBeingDragged = draggedItem.value === index;

        let translateX = basePosition.x;
        let translateY = basePosition.y;

        if (index < maxItems) {
          translateX = sharedPositions[index].x.value;
          translateY = sharedPositions[index].y.value;
        }

        if (isBeingDragged) {
          translateX += dragPosition.value.x;
          translateY += dragPosition.value.y;
        }

        const scale = isBeingDragged
          ? withSpring(dragScale, springConfig)
          : withSpring(1, springConfig);
        const opacity = isBeingDragged
          ? withTiming(dragOpacity)
          : withTiming(1);
        const zIndex = isBeingDragged ? 1000 : 1;
        const shadowOpacity = isBeingDragged ? withTiming(0.3) : withTiming(0);
        const shadowRadius = isBeingDragged ? withTiming(8) : withTiming(0);
        const elevation = isBeingDragged ? 8 : 0;

        return {
          position: 'absolute',
          width: layoutConfig.itemWidth,
          height: layoutConfig.itemHeight,
          transform: [{ translateX }, { translateY }, { scale }],
          opacity,
          zIndex,
          shadowOpacity,
          shadowRadius,
          shadowOffset: { width: 0, height: isBeingDragged ? 4 : 0 },
          elevation,
        };
      });

      const itemContainerStyle = useAnimatedStyle(() => {
        const isBeingDragged = draggedItem.value === index;
        return {
          backgroundColor: isBeingDragged ? mutedColor : backgroundColor,
          borderRadius: CORNERS,
          borderWidth: 1,
          borderColor: isBeingDragged ? borderColor : 'transparent',
          width: '100%',
          height: '100%',
        };
      });

      return (
        <Animated.View style={animatedStyle}>
          <GestureDetector gesture={gesture}>
            <Animated.View style={itemContainerStyle}>
              {renderItem({
                item,
                index,
                isActive,
                isDragging: isDraggingThis,
                onLongPress: (item, index) => {
                  // Custom long press handler if needed
                },
              })}
            </Animated.View>
          </GestureDetector>
        </Animated.View>
      );
    }
  );

  // Calculate container dimensions
  const containerDimensions = useMemo(() => {
    if (safeData.length === 0) return { width: 0, height: 0 };

    if (layoutConfig.isGrid) {
      const rows = Math.ceil(safeData.length / layoutConfig.columns);
      return {
        width:
          layoutConfig.columns * layoutConfig.itemWidth +
          (layoutConfig.columns - 1) * layoutConfig.horizontalGap,
        height:
          rows * layoutConfig.itemHeight +
          (rows - 1) * layoutConfig.verticalGap,
      };
    } else {
      return {
        width: layoutConfig.itemWidth,
        height:
          safeData.length * layoutConfig.itemHeight +
          (safeData.length - 1) * layoutConfig.verticalGap,
      };
    }
  }, [safeData.length, layoutConfig]);

  // Handle scroll
  const handleScroll = useCallback((event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    scrollOffset.value = offsetY;
    setContentOffset({ x: event.nativeEvent.contentOffset.x, y: offsetY });
  }, []);

  // Handle layout changes
  const handleContainerLayout = useCallback((event: LayoutChangeEvent) => {
    setContainerLayout({
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height,
    });
  }, []);

  const handleScrollViewLayout = useCallback((event: LayoutChangeEvent) => {
    setScrollViewLayout({
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height,
    });
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAutoScroll();
    };
  }, [stopAutoScroll]);

  if (safeData.length === 0) {
    return <View style={[{ height: 0 }, style]} />;
  }

  return (
    <ScrollView
      ref={scrollViewRef}
      style={[{ flex: 1 }, scrollViewStyle]}
      contentContainerStyle={{ minHeight: containerDimensions.height }}
      scrollEnabled={scrollEnabled && !isDragging.value}
      bounces={bounces}
      onScroll={handleScroll}
      onLayout={handleScrollViewLayout}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View
        ref={containerRef}
        style={[
          {
            width: containerDimensions.width,
            height: containerDimensions.height,
            position: 'relative',
          },
          style,
        ]}
        onLayout={handleContainerLayout}
      >
        {safeData.map((item, index) => (
          <SortableItem key={item.id} item={item} index={index} />
        ))}
      </View>
    </ScrollView>
  );
}

// Enhanced utility hook for managing sortable data
export function useSortableData<T extends SortableItem>(
  initialData?: T[] | null
) {
  const [data, setData] = useState<T[]>(() => {
    if (!initialData || !Array.isArray(initialData)) return [];
    return initialData.filter(
      (item) =>
        item &&
        typeof item === 'object' &&
        item.id !== undefined &&
        item.id !== null
    );
  });

  const [isReordering, setIsReordering] = useState(false);

  const reorderItems = useCallback((newData: T[]) => {
    if (!newData || !Array.isArray(newData)) return;
    setIsReordering(true);
    setData(newData);
    // Reset reordering flag after a short delay to allow for animations
    setTimeout(() => setIsReordering(false), 100);
  }, []);

  const addItem = useCallback((item: T, index?: number) => {
    if (
      !item ||
      typeof item !== 'object' ||
      item.id === undefined ||
      item.id === null
    )
      return;

    setData((prevData) => {
      const newData = [...prevData];
      if (typeof index === 'number' && index >= 0 && index <= newData.length) {
        newData.splice(index, 0, item);
      } else {
        newData.push(item);
      }
      return newData;
    });
  }, []);

  const removeItem = useCallback((id: string | number) => {
    if (id === undefined || id === null) return;
    setData((prevData) => prevData.filter((item) => item.id !== id));
  }, []);

  const updateItem = useCallback((id: string | number, updates: Partial<T>) => {
    if (
      id === undefined ||
      id === null ||
      !updates ||
      typeof updates !== 'object'
    )
      return;
    setData((prevData) =>
      prevData.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  }, []);

  const resetData = useCallback((newData?: T[] | null) => {
    if (!newData || !Array.isArray(newData)) {
      setData([]);
      return;
    }
    const validData = newData.filter(
      (item) =>
        item &&
        typeof item === 'object' &&
        item.id !== undefined &&
        item.id !== null
    );
    setData(validData);
  }, []);

  const moveItem = useCallback((fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;

    setData((prevData) => {
      const newData = [...prevData];
      const [movedItem] = newData.splice(fromIndex, 1);
      newData.splice(toIndex, 0, movedItem);
      return newData;
    });
  }, []);

  return {
    data,
    setData: (newData: T[]) => {
      if (!newData || !Array.isArray(newData)) {
        setData([]);
        return;
      }
      const validData = newData.filter(
        (item) =>
          item &&
          typeof item === 'object' &&
          item.id !== undefined &&
          item.id !== null
      );
      setData(validData);
    },
    reorderItems,
    addItem,
    removeItem,
    updateItem,
    resetData,
    moveItem,
    isReordering,
  };
}
