'use client';

import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { activities, calendarEvents, categories } from '@/lib/data';
import type { ActivityCategory } from '@/lib/types';

const chartConfig = {
  planned: { label: 'Planned', color: 'hsl(var(--secondary))' },
  actual: { label: 'Actual', color: 'hsl(var(--primary))' },
};

export function ComparisonReport() {
  const chartData = useMemo(() => {
    return categories.map((category: ActivityCategory) => {
      const plannedTime = calendarEvents
        .filter((event) => event.categoryId === category.id)
        .reduce((total, event) => total + (event.endTime.getTime() - event.startTime.getTime()) / (1000 * 60), 0);

      const actualTime = activities
        .filter((activity) => activity.categoryId === category.id)
        .reduce((total, activity) => total + activity.duration, 0);

      return {
        category: category.name,
        planned: Math.round(plannedTime),
        actual: Math.round(actualTime),
      };
    }).filter(d => d.planned > 0 || d.actual > 0);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Planned vs. Actual</CardTitle>
        <CardDescription>Comparison of time spent against your schedule.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
             <YAxis unit="m" />
            <Tooltip content={<ChartTooltipContent />} />
            <Bar dataKey="planned" fill="var(--color-planned)" radius={4} />
            <Bar dataKey="actual" fill="var(--color-actual)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
