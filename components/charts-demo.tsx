// components/charts-demo.tsx
import {
  AreaChart,
  BarChart,
  BubbleChart,
  BubbleChartDataPoint,
  ChartContainer,
  ChartDataPoint,
  ColumnChart,
  DoughnutChart,
  LineChart,
  LineChartDataPoint,
  PieChart,
  PolarAreaChart,
  RadarChart,
  RadarChartDataPoint,
  ScatterPlot,
} from '@/components/ui/charts';
import { Text } from '@/components/ui/text';
import React from 'react';
import { View } from 'react-native';

export const ChartsDemo: React.FC = () => {
  // Sample data for different chart types
  const lineChartData: LineChartDataPoint[] = [
    { x: 1, y: 10, label: 'Jan' },
    { x: 2, y: 25, label: 'Feb' },
    { x: 3, y: 15, label: 'Mar' },
    { x: 4, y: 40, label: 'Apr' },
    { x: 5, y: 30, label: 'May' },
    { x: 6, y: 55, label: 'Jun' },
    { x: 7, y: 45, label: 'Jul' },
  ];

  const barChartData: ChartDataPoint[] = [
    { label: 'Q1', value: 4500 },
    { label: 'Q2', value: 6200 },
    { label: 'Q3', value: 5800 },
    { label: 'Q4', value: 7200 },
  ];

  const pieChartData: ChartDataPoint[] = [
    { label: 'Mobile', value: 45 },
    { label: 'Desktop', value: 35 },
    { label: 'Tablet', value: 20 },
  ];

  const areaChartData: LineChartDataPoint[] = [
    { x: 1, y: 20 },
    { x: 2, y: 35 },
    { x: 3, y: 25 },
    { x: 4, y: 50 },
    { x: 5, y: 40 },
    { x: 6, y: 65 },
    { x: 7, y: 55 },
  ];

  const columnChartData: ChartDataPoint[] = [
    { label: 'Marketing', value: 85, color: '#FF6B6B' },
    { label: 'Development', value: 72, color: '#4ECDC4' },
    { label: 'Design', value: 68, color: '#45B7D1' },
    { label: 'Sales', value: 91, color: '#96CEB4' },
    { label: 'Support', value: 79, color: '#FFEAA7' },
  ];

  const doughnutChartData: ChartDataPoint[] = [
    { label: 'React', value: 40, color: '#61DAFB' },
    { label: 'Vue', value: 25, color: '#4FC08D' },
    { label: 'Angular', value: 20, color: '#DD0031' },
    { label: 'Svelte', value: 10, color: '#FF3E00' },
    { label: 'Other', value: 5, color: '#8B5CF6' },
  ];

  const scatterPlotData: LineChartDataPoint[] = [
    { x: 10, y: 20 },
    { x: 15, y: 35 },
    { x: 20, y: 25 },
    { x: 25, y: 45 },
    { x: 30, y: 40 },
    { x: 35, y: 60 },
    { x: 40, y: 55 },
    { x: 45, y: 70 },
    { x: 50, y: 65 },
    { x: 55, y: 80 },
  ];

  const bubbleChartData: BubbleChartDataPoint[] = [
    { x: 10, y: 20, size: 15, label: 'A', color: '#FF6B6B' },
    { x: 25, y: 35, size: 25, label: 'B', color: '#4ECDC4' },
    { x: 40, y: 25, size: 20, label: 'C', color: '#45B7D1' },
    { x: 55, y: 45, size: 30, label: 'D', color: '#96CEB4' },
    { x: 70, y: 40, size: 18, label: 'E', color: '#FFEAA7' },
    { x: 85, y: 60, size: 35, label: 'F', color: '#FDA7DF' },
  ];

  const radarChartData: RadarChartDataPoint[] = [
    { label: 'Speed', value: 80 },
    { label: 'Reliability', value: 90 },
    { label: 'Comfort', value: 70 },
    { label: 'Safety', value: 95 },
    { label: 'Efficiency', value: 85 },
    { label: 'Design', value: 75 },
  ];

  const polarAreaData: ChartDataPoint[] = [
    { label: 'JavaScript', value: 35, color: '#F7DF1E' },
    { label: 'Python', value: 25, color: '#3776AB' },
    { label: 'Java', value: 20, color: '#ED8B00' },
    { label: 'C++', value: 15, color: '#00599C' },
    { label: 'Go', value: 10, color: '#00ADD8' },
    { label: 'Rust', value: 8, color: '#000000' },
  ];

  return (
    <View style={{ width: '100%' }}>
      <Text
        variant='heading'
        style={{ marginBottom: 30, textAlign: 'center', fontSize: 24 }}
      >
        Complete Charts Library Demo
      </Text>

      {/* Line Chart */}
      <ChartContainer
        title='Revenue Trend'
        description='Monthly revenue growth over time'
      >
        <LineChart
          data={lineChartData}
          config={{
            height: 220,
            showGrid: true,
            showLabels: true,
            animated: true,
            duration: 1500,
            interactive: true,
          }}
        />
      </ChartContainer>

      {/* Area Chart */}
      <ChartContainer
        title='Website Traffic'
        description='Daily visitors with gradient fill'
      >
        <AreaChart
          data={areaChartData}
          config={{
            height: 200,
            showGrid: true,
            showLabels: false,
            animated: true,
            duration: 1800,
            gradient: true,
          }}
        />
      </ChartContainer>

      {/* Bar Chart (Vertical) */}
      <ChartContainer
        title='Quarterly Sales'
        description='Sales performance by quarter'
      >
        <BarChart
          data={barChartData}
          config={{
            height: 200,
            showLabels: true,
            animated: true,
            duration: 1000,
          }}
        />
      </ChartContainer>

      {/* Column Chart (Horizontal) */}
      <ChartContainer
        title='Department Performance'
        description='Performance metrics by department'
      >
        <ColumnChart
          data={columnChartData}
          config={{
            height: 250,
            showLabels: true,
            animated: true,
            duration: 1200,
          }}
        />
      </ChartContainer>

      {/* Pie Chart */}
      <ChartContainer
        title='Device Usage'
        description='User device preferences'
      >
        <PieChart
          data={pieChartData}
          config={{
            height: 250,
            showLabels: true,
            animated: true,
            duration: 1200,
          }}
        />
      </ChartContainer>

      {/* Doughnut Chart */}
      <ChartContainer
        title='Frontend Framework Usage'
        description='Popular frontend frameworks in 2024'
      >
        <DoughnutChart
          data={doughnutChartData}
          config={{
            height: 300,
            showLabels: true,
            animated: true,
            duration: 1500,
            innerRadius: 0.6,
          }}
        />
      </ChartContainer>

      {/* Scatter Plot */}
      <ChartContainer
        title='Performance vs Experience'
        description='Correlation between experience and performance scores'
      >
        <ScatterPlot
          data={scatterPlotData}
          config={{
            height: 220,
            showGrid: true,
            showLabels: true,
            animated: true,
            duration: 1000,
          }}
        />
      </ChartContainer>

      {/* Bubble Chart */}
      <ChartContainer
        title='Product Portfolio Analysis'
        description='Revenue vs Market Share (bubble size = profit margin)'
      >
        <BubbleChart
          data={bubbleChartData}
          config={{
            height: 250,
            showGrid: true,
            showLabels: true,
            animated: true,
            duration: 1300,
          }}
        />
      </ChartContainer>

      {/* Radar Chart */}
      <ChartContainer
        title='Product Evaluation'
        description='Multi-dimensional product assessment'
      >
        <RadarChart
          data={radarChartData}
          config={{
            height: 280,
            showLabels: true,
            animated: true,
            duration: 1600,
            maxValue: 100,
          }}
        />
      </ChartContainer>

      {/* Polar Area Chart */}
      <ChartContainer
        title='Programming Language Popularity'
        description='Usage distribution across programming languages'
      >
        <PolarAreaChart
          data={polarAreaData}
          config={{
            height: 300,
            showLabels: true,
            animated: true,
            duration: 1400,
          }}
        />
      </ChartContainer>

      {/* Interactive Examples */}
      <ChartContainer
        title='Interactive Line Chart'
        description='Touch and drag to explore data points'
      >
        <LineChart
          data={lineChartData}
          config={{
            height: 200,
            showGrid: true,
            showLabels: true,
            animated: true,
            interactive: true,
            gradient: false,
          }}
        />
      </ChartContainer>

      {/* Custom Styled Charts */}
      <ChartContainer
        title='Custom Color Schemes'
        description='Charts with brand-specific colors'
      >
        <BarChart
          data={[
            { label: 'iOS', value: 65, color: '#007AFF' },
            { label: 'Android', value: 85, color: '#34C759' },
            { label: 'Web', value: 45, color: '#FF9500' },
            { label: 'Desktop', value: 35, color: '#AF52DE' },
          ]}
          config={{
            height: 180,
            showLabels: true,
            animated: true,
            duration: 800,
          }}
        />
      </ChartContainer>

      {/* High-frequency Data Example */}
      <ChartContainer
        title='High-Frequency Data'
        description='Large dataset visualization'
      >
        <LineChart
          data={Array.from({ length: 50 }, (_, i) => ({
            x: i,
            y: Math.sin(i * 0.2) * 30 + 50 + Math.random() * 10,
            label: `Point ${i + 1}`,
          }))}
          config={{
            height: 200,
            showGrid: true,
            showLabels: false,
            animated: true,
            duration: 2000,
            interactive: true,
          }}
        />
      </ChartContainer>

      {/* Comparison Charts */}
      <ChartContainer
        title='Multi-Series Comparison'
        description='Comparing different data series'
      >
        <AreaChart
          data={[
            { x: 1, y: 20 },
            { x: 2, y: 45 },
            { x: 3, y: 35 },
            { x: 4, y: 60 },
            { x: 5, y: 50 },
            { x: 6, y: 75 },
            { x: 7, y: 65 },
            { x: 8, y: 80 },
          ]}
          config={{
            height: 220,
            showGrid: true,
            showLabels: true,
            animated: true,
            duration: 1500,
            gradient: true,
          }}
        />
      </ChartContainer>

      <View style={{ height: 50 }} />
    </View>
  );
};
