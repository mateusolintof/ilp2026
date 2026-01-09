'use client';

import { useMemo } from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { cn } from '@/lib/utils';

export interface BarChartData {
  name: string;
  value: number;
  color?: string;
}

export interface BarChartProps {
  data: BarChartData[];
  height?: number;
  layout?: 'horizontal' | 'vertical';
  showGrid?: boolean;
  showTooltip?: boolean;
  showAxis?: boolean;
  colors?: string[];
  formatValue?: (value: number) => string;
  className?: string;
}

const defaultColors = [
  'var(--color-chart-1)',
  'var(--color-chart-2)',
  'var(--color-chart-3)',
  'var(--color-chart-4)',
  'var(--color-chart-5)',
  'var(--color-chart-6)',
];

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: BarChartData }>;
  formatValue: (value: number) => string;
}

const CustomTooltip = ({ active, payload, formatValue }: TooltipProps) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0];
  return (
    <div className="bg-surface-elevated border border-white/10 rounded-lg p-3 shadow-lg">
      <p className="text-sm font-medium text-foreground">{data.payload.name}</p>
      <p className="text-lg font-bold text-accent">{formatValue(data.value)}</p>
    </div>
  );
};

export function BarChart({
  data,
  height = 300,
  layout = 'vertical',
  showGrid = true,
  showTooltip = true,
  showAxis = true,
  colors = defaultColors,
  formatValue = (v) => v.toLocaleString('pt-BR'),
  className,
}: BarChartProps) {
  const chartData = useMemo(() => {
    return data.map((item, index) => ({
      ...item,
      color: item.color || colors[index % colors.length],
    }));
  }, [data, colors]);

  const isHorizontal = layout === 'horizontal';

  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <ResponsiveContainer
        width="100%"
        height="100%"
        minWidth={0}
        minHeight={0}
        initialDimension={{ width: 320, height }}
      >
        <RechartsBarChart
          data={chartData}
          layout={isHorizontal ? 'horizontal' : 'vertical'}
          margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.1)"
              horizontal={isHorizontal}
              vertical={!isHorizontal}
            />
          )}
          {showAxis && isHorizontal && (
            <>
              <XAxis
                dataKey="name"
                tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              />
              <YAxis
                tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                tickFormatter={formatValue}
              />
            </>
          )}
          {showAxis && !isHorizontal && (
            <>
              <XAxis
                type="number"
                tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                tickFormatter={formatValue}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                width={120}
              />
            </>
          )}
          {showTooltip && (
            <Tooltip
              content={<CustomTooltip formatValue={formatValue} />}
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
            />
          )}
          <Bar
            dataKey="value"
            radius={[4, 4, 4, 4]}
            maxBarSize={50}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
