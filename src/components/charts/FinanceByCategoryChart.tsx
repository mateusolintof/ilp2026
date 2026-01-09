'use client';

import { useMemo } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Line,
} from 'recharts';
import { cn } from '@/lib/utils';

export interface FinanceByCategoryPoint {
  category: string;
  revenue: number;
  count: number;
}

export interface FinanceByCategoryChartProps {
  data: FinanceByCategoryPoint[];
  height?: number;
  className?: string;
}

function formatCurrencyCompact(value: number): string {
  const abs = Math.abs(value);
  if (abs >= 1_000_000) return `R$ ${(value / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `R$ ${(value / 1_000).toFixed(0)}k`;
  return `R$ ${value.toFixed(0)}`;
}

function formatNumberCompact(value: number): string {
  const abs = Math.abs(value);
  if (abs >= 1_000) return `${(value / 1_000).toFixed(1)}k`;
  return `${Math.round(value)}`;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ payload: FinanceByCategoryPoint }>;
}

function CustomTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;

  return (
    <div className="bg-surface-elevated border border-white/10 rounded-xl p-3 shadow-lg">
      <div className="text-sm font-medium text-foreground">{row.category}</div>
      <div className="mt-1 flex items-center justify-between gap-6">
        <div>
          <div className="text-[0.72rem] uppercase tracking-widest text-muted">Receita</div>
          <div className="text-lg font-bold text-gold">{row.revenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
        </div>
        <div>
          <div className="text-[0.72rem] uppercase tracking-widest text-muted">Qtd.</div>
          <div className="text-lg font-bold text-info">{row.count.toLocaleString('pt-BR')}</div>
        </div>
      </div>
    </div>
  );
}

export function FinanceByCategoryChart({ data, height = 320, className }: FinanceByCategoryChartProps) {
  const chartData = useMemo(() => {
    return data.map((d) => ({
      ...d,
      // keep key stable for recharts
      name: d.category,
    }));
  }, [data]);

  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <ResponsiveContainer
        width="100%"
        height="100%"
        minWidth={0}
        minHeight={0}
        initialDimension={{ width: 640, height }}
      >
        <ComposedChart
          data={chartData}
          margin={{ top: 12, right: 18, left: 8, bottom: 8 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.10)" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
            axisLine={{ stroke: 'rgba(255,255,255,0.10)' }}
            tickLine={{ stroke: 'rgba(255,255,255,0.10)' }}
            interval={0}
            tickMargin={10}
          />
          <YAxis
            yAxisId="revenue"
            tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
            axisLine={{ stroke: 'rgba(255,255,255,0.10)' }}
            tickLine={{ stroke: 'rgba(255,255,255,0.10)' }}
            tickFormatter={formatCurrencyCompact}
            width={68}
          />
          <YAxis
            yAxisId="count"
            orientation="right"
            tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
            axisLine={{ stroke: 'rgba(255,255,255,0.10)' }}
            tickLine={{ stroke: 'rgba(255,255,255,0.10)' }}
            tickFormatter={formatNumberCompact}
            width={42}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
          <Bar
            yAxisId="revenue"
            dataKey="revenue"
            fill="var(--color-gold)"
            radius={[8, 8, 0, 0]}
            maxBarSize={56}
          />
          <Line
            yAxisId="count"
            type="monotone"
            dataKey="count"
            stroke="var(--color-info)"
            strokeWidth={2}
            dot={{ r: 3, fill: 'var(--color-info)' }}
            activeDot={{ r: 5 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

