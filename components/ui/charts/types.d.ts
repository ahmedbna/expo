// components/ui/charts/types.d.tsx

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

export interface BubbleChartDataPoint {
  x: number;
  y: number;
  size: number;
  label?: string;
  color?: string;
}

export interface RadarChartDataPoint {
  label: string;
  value: number;
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
  innerRadius?: number; // For doughnut charts
  maxValue?: number; // For radar charts
}
