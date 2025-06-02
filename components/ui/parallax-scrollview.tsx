import { useBottomTabOverflow } from '@/components/ui/tabs-background';
import { View } from '@/components/ui/view';
import { useColorScheme } from '@/hooks/useColorScheme';
import type { PropsWithChildren, ReactElement } from 'react';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

type Props = PropsWithChildren<{
  headerHeight?: number;
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}>;

export function ParallaxScrollView({
  children,
  headerHeight = 250,
  headerImage,
  headerBackgroundColor,
}: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const bottom = useBottomTabOverflow();
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-headerHeight, 0, headerHeight],
            [-headerHeight / 2, 0, headerHeight * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-headerHeight, 0, headerHeight],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}
      >
        <Animated.View
          style={[
            {
              height: headerHeight,
              overflow: 'hidden',
            },
            { backgroundColor: headerBackgroundColor[colorScheme] },
            headerAnimatedStyle,
          ]}
        >
          {headerImage}
        </Animated.View>
        <View
          style={{
            flex: 1,
            padding: 32,
            gap: 16,
            overflow: 'hidden',
          }}
        >
          {children}
        </View>
      </Animated.ScrollView>
    </View>
  );
}
