'use client';

import { useMemo } from 'react';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { cn } from '@/lib/utils';

export interface PieChartData {
  name: string;
  value: number;
  color?: string;
}

export interface PieChartProps {
  data: PieChartData[];
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
  showTooltip?: boolean;
  showLegend?: boolean;
  showLabels?: boolean;
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
  payload?: Array<{ value: number; name: string; payload: PieChartData }>;
  formatValue: (value: number) => string;
  total: number;
}

const CustomTooltip = ({ active, payload, formatValue, total }: TooltipProps) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0];
  const percentage = ((data.value / total) * 100).toFixed(1);

  return (
    <div className="bg-surface-elevated border border-white/10 rounded-lg p-3 shadow-lg">
      <p className="text-sm font-medium text-foreground">{data.name}</p>
      <p className="text-lg font-bold text-accent">{formatValue(data.value)}</p>
      <p className="text-sm text-muted">{percentage}% do total</p>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderCustomLabel = (props: any, total: number) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, value } = props;
  if (typeof cx !== 'number' || typeof cy !== 'number' || typeof midAngle !== 'number') return null;

  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const percentage = ((value / total) * 100).toFixed(0);

  if (parseInt(percentage) < 5) return null;

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-xs font-medium"
    >
      {percentage}%
    </text>
  );
};

export function PieChart({
  data,
  height = 300,
  innerRadius = 60,
  outerRadius = 100,
  showTooltip = true,
  showLegend = true,
  showLabels = true,
  colors = defaultColors,
  formatValue = (v) => v.toLocaleString('pt-BR'),
  className,
}: PieChartProps) {
  const chartData = useMemo(() => {
    return data.map((item, index) => ({
      ...item,
      color: item.color || colors[index % colors.length],
    }));
  }, [data, colors]);

  const total = useMemo(() => {
    return data.reduce((sum, item) => sum + item.value, 0);
  }, [data]);

  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <ResponsiveContainer
        width="100%"
        height="100%"
        minWidth={0}
        minHeight={0}
        initialDimension={{ width: 320, height }}
      >
        <RechartsPieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={2}
            dataKey="value"
            label={showLabels ? (props) => renderCustomLabel(props, total) : undefined}
            labelLine={false}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          {showTooltip && (
            <Tooltip
              content={<CustomTooltip formatValue={formatValue} total={total} />}
            />
          )}
          {showLegend && (
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              formatter={(value) => (
                <span className="text-sm text-foreground">{value}</span>
              )}
            />
          )}
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}
