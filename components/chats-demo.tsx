// components/ui/charts/charts-example.tsx
import {
  AreaChart,
  BarChart,
  ChartContainer,
  ChartDataPoint,
  LineChart,
  LineChartDataPoint,
  PieChart,
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

  return (
    <View style={{ width: '100%' }}>
      <Text variant='heading' style={{ marginBottom: 20, textAlign: 'center' }}>
        Charts Library Demo
      </Text>

      {/* Line Chart */}
      <ChartContainer
        title='Revenue Trend'
        description='Monthly revenue over time'
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

      {/* Bar Chart */}
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

      {/* Area Chart */}
      <ChartContainer
        title='Website Traffic'
        description='Daily visitors with trend area'
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

      {/* Interactive Line Chart */}
      <ChartContainer
        title='Interactive Chart'
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

      {/* Custom styled charts */}
      <ChartContainer
        title='Custom Colors'
        description='Charts with custom color schemes'
      >
        <BarChart
          data={[
            { label: 'iOS', value: 65, color: '#007AFF' },
            { label: 'Android', value: 85, color: '#34C759' },
            { label: 'Web', value: 45, color: '#FF9500' },
            { label: 'Other', value: 25, color: '#AF52DE' },
          ]}
          config={{
            height: 180,
            showLabels: true,
            animated: true,
          }}
        />
      </ChartContainer>

      <View style={{ height: 50 }} />
    </View>
  );
};
