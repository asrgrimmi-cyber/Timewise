
'use client';

import { useState, useMemo, useEffect } from 'react';
import { TimelineView } from "@/components/dashboard/timeline-view";
import { ComparisonReport } from "@/components/dashboard/comparison-report";
import { QuickAdd } from "@/components/dashboard/quick-add";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { activities as initialActivities, categories, calendarEvents } from '@/lib/data';
import type { Activity } from '@/lib/types';
import { formatDistance } from 'date-fns';

export default function DashboardPage() {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);

  const handleReset = () => {
    setActivities([]);
  };

  const { timeLogged, mostProductiveCategory, activitiesLogged, productivityScore, totalDuration } = useMemo(() => {
    const totalDuration = activities.reduce((sum, act) => sum + act.duration, 0);
    const timeLogged = totalDuration > 0 ? formatDistance(0, totalDuration * 60 * 1000, { includeSeconds: false }).replace('about ', '') : '0m';

    const categoryDurations: { [key: string]: number } = {};
    activities.forEach(activity => {
      if (categoryDurations[activity.categoryId]) {
        categoryDurations[activity.categoryId] += activity.duration;
      } else {
        categoryDurations[activity.categoryId] = activity.duration;
      }
    });

    let mostProductiveCategory = 'N/A';
    let maxDuration = 0;
    for (const categoryId in categoryDurations) {
      if (categoryDurations[categoryId] > maxDuration) {
        maxDuration = categoryDurations[categoryId];
        const category = categories.find(c => c.id === categoryId);
        mostProductiveCategory = category ? category.name : 'N/A';
      }
    }

    const activitiesLogged = activities.length;

    const plannedTime = calendarEvents.reduce((total, event) => total + (event.endTime.getTime() - event.startTime.getTime()) / (1000 * 60), 0);
    const actualTime = activities.reduce((total, activity) => total + activity.duration, 0);
    const productivityScore = plannedTime > 0 ? Math.round((actualTime / plannedTime) * 100) : 0;

    return { timeLogged, mostProductiveCategory, activitiesLogged, productivityScore, totalDuration };
  }, [activities]);

  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Time Logged Today</CardDescription>
              <CardTitle className="text-4xl">{timeLogged}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">+25% from yesterday</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Most Productive</CardDescription>
              <CardTitle className="text-4xl">{mostProductiveCategory}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">Category with most time</div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="pb-2">
              <CardDescription>Activities Logged</CardDescription>
              <CardTitle className="text-4xl">{activitiesLogged}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">2 more than yesterday</div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="pb-2">
              <CardDescription>Productivity Score</CardDescription>
              <CardTitle className="text-4xl">{productivityScore}%</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">Based on planned vs actual</div>
            </CardContent>
          </Card>
        </div>
        <TimelineView 
          activities={activities} 
          totalDuration={totalDuration}
          onReset={handleReset}
        />
      </div>
      <div className="grid auto-rows-max items-start gap-4 md:gap-8">
        <QuickAdd />
        <ComparisonReport activities={activities} />
      </div>
    </div>
  );
}
