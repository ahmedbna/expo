// components/ui/charts.tsx
import { Text } from '@/components/ui/text';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BORDER_RADIUS } from '@/theme/globals';
import React, { useEffect } from 'react';
import { View, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Svg, {
  Circle,
  Defs,
  G,
  Line,
  LinearGradient,
  Path,
  Rect,
  Stop,
  Text as SvgText,
} from 'react-native-svg';

// Types
export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface LineChartDataPoint {
  x: number;
  y: number;
  label?: string;
}

export interface ChartConfig {
  width?: number;
  height?: number;
  padding?: number;
  showGrid?: boolean;
  showLabels?: boolean;
  animated?: boolean;
  duration?: number;
  gradient?: boolean;
  interactive?: boolean;
}

// Utility functions
const createPath = (points: { x: number; y: number }[]): string => {
  if (points.length === 0) return '';

  let path = `M${points[0].x},${points[0].y}`;

  for (let i = 1; i < points.length; i++) {
    const prevPoint = points[i - 1];
    const currentPoint = points[i];

    // Create smooth curves using quadratic bezier
    const cpx = (prevPoint.x + currentPoint.x) / 2;
    const cpy = prevPoint.y;

    path += ` Q${cpx},${cpy} ${currentPoint.x},${currentPoint.y}`;
  }

  return path;
};

const createAreaPath = (
  points: { x: number; y: number }[],
  height: number
): string => {
  if (points.length === 0) return '';

  let path = createPath(points);
  const lastPoint = points[points.length - 1];
  const firstPoint = points[0];

  path += ` L${lastPoint.x},${height} L${firstPoint.x},${height} Z`;

  return path;
};

// Animated SVG Components
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedRect = Animated.createAnimatedComponent(Rect);

// Line Chart Component
export const LineChart: React.FC<{
  data: LineChartDataPoint[];
  config?: ChartConfig;
  style?: ViewStyle;
}> = ({ data, config = {}, style }) => {
  const {
    width = 300, // Default container width instead of screen width
    height = 200,
    padding = 20,
    showGrid = true,
    showLabels = true,
    animated = true,
    duration = 1000,
    gradient = false,
    interactive = false,
  } = config;

  const primaryColor = useThemeColor({}, 'primary');
  const mutedColor = useThemeColor({}, 'mutedForeground');
  const backgroundColor = useThemeColor({}, 'background');

  const animationProgress = useSharedValue(0);
  const touchX = useSharedValue(0);
  const showTooltip = useSharedValue(false);

  useEffect(() => {
    if (animated) {
      animationProgress.value = withTiming(1, { duration });
    } else {
      animationProgress.value = 1;
    }
  }, [data, animated, duration]);

  if (!data.length) return null;

  const maxValue = Math.max(...data.map((d) => d.y));
  const minValue = Math.min(...data.map((d) => d.y));
  const valueRange = maxValue - minValue || 1;

  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  // Convert data to screen coordinates
  const points = data.map((point, index) => ({
    x: padding + (index / (data.length - 1)) * chartWidth,
    y: padding + ((maxValue - point.y) / valueRange) * chartHeight,
  }));

  const pathData = createPath(points);
  const areaPathData = gradient ? createAreaPath(points, height - padding) : '';

  // Fixed animated props for SVG components
  const areaAnimatedProps = useAnimatedProps(() => ({
    strokeDasharray: animated
      ? `${animationProgress.value * 1000} 1000`
      : undefined,
  }));

  const lineAnimatedProps = useAnimatedProps(() => ({
    strokeDasharray: animated
      ? `${animationProgress.value * 1000} 1000`
      : undefined,
  }));

  // Pan gesture using new Gesture API
  const panGesture = Gesture.Pan()
    .onStart((event) => {
      if (interactive) {
        touchX.value = event.x;
        showTooltip.value = true;
      }
    })
    .onUpdate((event) => {
      if (interactive) {
        touchX.value = event.x;
      }
    })
    .onEnd(() => {
      if (interactive) {
        showTooltip.value = false;
      }
    });

  return (
    <View style={[{ width, height }, style]}>
      <GestureDetector gesture={panGesture}>
        <Animated.View>
          <Svg width={width} height={height}>
            <Defs>
              {gradient && (
                <LinearGradient id='gradient' x1='0%' y1='0%' x2='0%' y2='100%'>
                  <Stop
                    offset='0%'
                    stopColor={primaryColor}
                    stopOpacity='0.3'
                  />
                  <Stop
                    offset='100%'
                    stopColor={primaryColor}
                    stopOpacity='0.05'
                  />
                </LinearGradient>
              )}
            </Defs>

            {/* Grid lines */}
            {showGrid && (
              <G>
                {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => (
                  <Line
                    key={`grid-${index}`}
                    x1={padding}
                    y1={padding + ratio * chartHeight}
                    x2={width - padding}
                    y2={padding + ratio * chartHeight}
                    stroke={mutedColor}
                    strokeWidth={0.5}
                    opacity={0.3}
                  />
                ))}
              </G>
            )}

            {/* Area fill */}
            {gradient && (
              <AnimatedPath
                d={areaPathData}
                fill='url(#gradient)'
                animatedProps={areaAnimatedProps}
              />
            )}

            {/* Line path */}
            <AnimatedPath
              d={pathData}
              stroke={primaryColor}
              strokeWidth={2}
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
              animatedProps={lineAnimatedProps}
            />

            {/* Data points */}
            {points.map((point, index) => {
              const pointAnimatedProps = useAnimatedProps(() => ({
                opacity: animationProgress.value,
              }));

              const pointAnimatedStyle = useAnimatedStyle(() => ({
                transform: [
                  {
                    scale: withDelay(
                      index * 50,
                      withSpring(animationProgress.value)
                    ),
                  },
                ],
              }));

              return (
                <AnimatedCircle
                  key={`point-${index}`}
                  cx={point.x}
                  cy={point.y}
                  r={4}
                  fill={primaryColor}
                  animatedProps={pointAnimatedProps}
                />
              );
            })}

            {/* Labels */}
            {showLabels && (
              <G>
                {data.map((point, index) => (
                  <SvgText
                    key={`label-${index}`}
                    x={points[index].x}
                    y={height - 5}
                    textAnchor='middle'
                    fontSize={12}
                    fill={mutedColor}
                  >
                    {point.label || point.x.toString()}
                  </SvgText>
                ))}
              </G>
            )}
          </Svg>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

// Bar Chart Component
export const BarChart: React.FC<{
  data: ChartDataPoint[];
  config?: ChartConfig;
  style?: ViewStyle;
}> = ({ data, config = {}, style }) => {
  const {
    width = 300, // Default container width instead of screen width
    height = 200,
    padding = 20,
    showLabels = true,
    animated = true,
    duration = 800,
  } = config;

  const primaryColor = useThemeColor({}, 'primary');
  const mutedColor = useThemeColor({}, 'mutedForeground');

  const animationProgress = useSharedValue(0);

  useEffect(() => {
    if (animated) {
      animationProgress.value = withTiming(1, { duration });
    } else {
      animationProgress.value = 1;
    }
  }, [data, animated, duration]);

  if (!data.length) return null;

  const maxValue = Math.max(...data.map((d) => d.value));
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const barWidth = (chartWidth / data.length) * 0.8;
  const barSpacing = (chartWidth / data.length) * 0.2;

  return (
    <View style={[{ width, height }, style]}>
      <Svg width={width} height={height}>
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * chartHeight;
          const x = padding + index * (barWidth + barSpacing) + barSpacing / 2;
          const y = height - padding - barHeight;

          const barAnimatedProps = useAnimatedProps(() => ({
            transform: `scale(1, ${animationProgress.value})`,
          }));

          return (
            <G key={`bar-${index}`}>
              <AnimatedRect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={item.color || primaryColor}
                rx={4}
                animatedProps={barAnimatedProps}
              />

              {showLabels && (
                <>
                  <SvgText
                    x={x + barWidth / 2}
                    y={height - 5}
                    textAnchor='middle'
                    fontSize={12}
                    fill={mutedColor}
                  >
                    {item.label}
                  </SvgText>
                  <SvgText
                    x={x + barWidth / 2}
                    y={y - 5}
                    textAnchor='middle'
                    fontSize={11}
                    fill={mutedColor}
                    fontWeight='600'
                  >
                    {item.value}
                  </SvgText>
                </>
              )}
            </G>
          );
        })}
      </Svg>
    </View>
  );
};

// Pie Chart Component
export const PieChart: React.FC<{
  data: ChartDataPoint[];
  config?: ChartConfig;
  style?: ViewStyle;
}> = ({ data, config = {}, style }) => {
  const {
    width = 300, // Default container width instead of screen width
    height = 200,
    showLabels = true,
    animated = true,
    duration = 1000,
  } = config;

  const primaryColor = useThemeColor({}, 'primary');
  const mutedColor = useThemeColor({}, 'mutedForeground');

  const animationProgress = useSharedValue(0);

  useEffect(() => {
    if (animated) {
      animationProgress.value = withTiming(1, { duration });
    } else {
      animationProgress.value = 1;
    }
  }, [data, animated, duration]);

  if (!data.length) return null;

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = Math.min(width, height) / 2 - 20;
  const centerX = width / 2;
  const centerY = height / 2;

  let currentAngle = -Math.PI / 2; // Start from top

  const colors = [
    primaryColor,
    useThemeColor({}, 'blue'),
    useThemeColor({}, 'green'),
    useThemeColor({}, 'orange'),
    useThemeColor({}, 'purple'),
    useThemeColor({}, 'pink'),
  ];

  return (
    <View style={[{ width, height }, style]}>
      <Svg width={width} height={height}>
        {data.map((item, index) => {
          const sliceAngle = (item.value / total) * 2 * Math.PI;
          const startAngle = currentAngle;
          const endAngle = currentAngle + sliceAngle;

          const largeArcFlag = sliceAngle > Math.PI ? 1 : 0;

          const x1 = centerX + radius * Math.cos(startAngle);
          const y1 = centerY + radius * Math.sin(startAngle);
          const x2 = centerX + radius * Math.cos(endAngle);
          const y2 = centerY + radius * Math.sin(endAngle);

          const pathData = [
            `M ${centerX} ${centerY}`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            'Z',
          ].join(' ');

          // Label position
          const labelAngle = startAngle + sliceAngle / 2;
          const labelRadius = radius * 0.7;
          const labelX = centerX + labelRadius * Math.cos(labelAngle);
          const labelY = centerY + labelRadius * Math.sin(labelAngle);

          currentAngle = endAngle;

          const sliceAnimatedProps = useAnimatedProps(() => ({
            opacity: animationProgress.value,
          }));

          return (
            <G key={`slice-${index}`}>
              <AnimatedPath
                d={pathData}
                fill={item.color || colors[index % colors.length]}
                animatedProps={sliceAnimatedProps}
              />

              {showLabels && (
                <SvgText
                  x={labelX}
                  y={labelY}
                  textAnchor='middle'
                  fontSize={12}
                  fill='#FFFFFF'
                  fontWeight='600'
                >
                  {Math.round((item.value / total) * 100)}%
                </SvgText>
              )}
            </G>
          );
        })}
      </Svg>

      {/* Legend */}
      <View style={{ marginTop: 10 }}>
        {data.map((item, index) => (
          <View
            key={`legend-${index}`}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 5,
            }}
          >
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: item.color || colors[index % colors.length],
                marginRight: 8,
              }}
            />
            <Text variant='caption'>
              {item.label}: {item.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

// Area Chart Component
export const AreaChart: React.FC<{
  data: LineChartDataPoint[];
  config?: ChartConfig;
  style?: ViewStyle;
}> = ({ data, config = {}, style }) => {
  return (
    <LineChart
      data={data}
      config={{ ...config, gradient: true }}
      style={style}
    />
  );
};

// Chart Container Component with automatic width
export const ChartContainer: React.FC<{
  title?: string;
  description?: string;
  children: React.ReactNode;
  style?: ViewStyle;
}> = ({ title, description, children, style }) => {
  const cardColor = useThemeColor({}, 'card');

  return (
    <View
      style={[
        {
          backgroundColor: cardColor,
          borderRadius: BORDER_RADIUS,
          padding: 16,
          margin: 8,
          width: '100%', // Full container width
        },
        style,
      ]}
    >
      {title && (
        <Text variant='subtitle' style={{ marginBottom: 4 }}>
          {title}
        </Text>
      )}
      {description && (
        <Text variant='caption' style={{ marginBottom: 16 }}>
          {description}
        </Text>
      )}
      {children}
    </View>
  );
};
