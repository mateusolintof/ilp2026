'use client';

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { cn } from '@/lib/utils';

export interface LineChartData {
  name: string;
  [key: string]: string | number;
}

export interface LineConfig {
  key: string;
  color: string;
  name?: string;
  strokeWidth?: number;
  dashed?: boolean;
}

export interface LineChartProps {
  data: LineChartData[];
  lines: LineConfig[];
  height?: number;
  showGrid?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  showAxis?: boolean;
  formatValue?: (value: number) => string;
  className?: string;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; name: string; color: string }>;
  label?: string;
  formatValue: (value: number) => string;
}

const CustomTooltip = ({ active, payload, label, formatValue }: TooltipProps) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-surface-elevated border border-white/10 rounded-lg p-3 shadow-lg">
      <p className="text-sm font-medium text-muted mb-2">{label}</p>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-foreground">{entry.name}:</span>
          <span className="text-sm font-bold text-foreground">
            {formatValue(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
};

export function LineChart({
  data,
  lines,
  height = 300,
  showGrid = true,
  showTooltip = true,
  showLegend = true,
  showAxis = true,
  formatValue = (v) => v.toLocaleString('pt-BR'),
  className,
}: LineChartProps) {
  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data}
          margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.1)"
            />
          )}
          {showAxis && (
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
          {showTooltip && (
            <Tooltip
              content={<CustomTooltip formatValue={formatValue} />}
            />
          )}
          {showLegend && (
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value) => (
                <span className="text-sm text-foreground">{value}</span>
              )}
            />
          )}
          {lines.map((line) => (
            <Line
              key={line.key}
              type="monotone"
              dataKey={line.key}
              name={line.name || line.key}
              stroke={line.color}
              strokeWidth={line.strokeWidth || 2}
              strokeDasharray={line.dashed ? '5 5' : undefined}
              dot={{ fill: line.color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: line.color, strokeWidth: 2 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
