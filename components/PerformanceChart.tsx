'use client';

import { PortfolioDataPoint } from '@/types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

interface PerformanceChartProps {
  data: PortfolioDataPoint[];
}

export default function PerformanceChart({ data }: PerformanceChartProps) {
  // Format data for recharts
  const chartData = data.map((point) => ({
    timestamp: point.timestamp.getTime(),
    value: point.value,
    displayDate: format(point.timestamp, 'MMM dd HH:mm')
  }));

  const formatTooltipValue = (value: number) => {
    return value.toFixed(2);
  };

  const formatYAxis = (value: number) => {
    return value.toFixed(0);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Portfolio Performance
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Indexed to 100 • Updates every 10 minutes
        </p>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(timestamp) => format(new Date(timestamp), 'MMM dd')}
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            tickFormatter={formatYAxis}
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
            label={{ value: 'Index Value', angle: -90, position: 'insideLeft', style: { fill: '#9CA3AF' } }}
          />
          <Tooltip
            labelFormatter={(timestamp) => format(new Date(timestamp), 'MMM dd, yyyy HH:mm')}
            formatter={(value: number) => [formatTooltipValue(value), 'Index Value']}
            contentStyle={{
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              borderRadius: '0.5rem',
              color: '#F9FAFB'
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={false}
            name="Portfolio Index"
            animationDuration={300}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Current Index</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {chartData[chartData.length - 1]?.value.toFixed(2) || '100.00'}
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Starting Index</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {chartData[0]?.value.toFixed(2) || '100.00'}
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Change</p>
          <p className={`text-2xl font-bold ${
            (chartData[chartData.length - 1]?.value || 0) >= (chartData[0]?.value || 0)
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-600 dark:text-red-400'
          }`}>
            {((chartData[chartData.length - 1]?.value || 0) - (chartData[0]?.value || 0)).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
