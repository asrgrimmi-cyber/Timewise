
'use client';

import { createContext, useContext, useState, useMemo, useCallback, ReactNode } from 'react';
import { activities as initialActivities } from '@/lib/data';
import type { Activity } from '@/lib/types';
import { formatDistance } from 'date-fns';

interface ActivityContextType {
  activities: Activity[];
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
  handleReset: () => void;
  timeLogged: string;
  mostProductiveCategory: string;
  activitiesLogged: number;
  productivityScore: number;
  totalDuration: number;
}

const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

export function ActivityProvider({ children }: { children: ReactNode }) {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);

  const handleReset = useCallback(() => {
    setActivities([]);
  }, []);

  const {
    timeLogged,
    mostProductiveCategory,
    activitiesLogged,
    productivityScore,
    totalDuration,
  } = useMemo(() => {
    const { categories, calendarEvents } = require('@/lib/data');
    const totalDuration = activities.reduce((sum, act) => sum + act.duration, 0);
    const timeLogged =
      totalDuration > 0
        ? formatDistance(0, totalDuration * 60 * 1000, { includeSeconds: false }).replace('about ', '')
        : '0m';

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
        const category = categories.find((c: any) => c.id === categoryId);
        mostProductiveCategory = category ? category.name : 'N/A';
      }
    }

    const activitiesLogged = activities.length;

    const plannedTime = calendarEvents.reduce(
      (total: number, event: any) =>
        total + (event.endTime.getTime() - event.startTime.getTime()) / (1000 * 60),
      0
    );
    const actualTime = activities.reduce((total, activity) => total + activity.duration, 0);
    const productivityScore = plannedTime > 0 ? Math.round((actualTime / plannedTime) * 100) : 0;

    return { timeLogged, mostProductiveCategory, activitiesLogged, productivityScore, totalDuration };
  }, [activities]);

  const value = {
    activities,
    setActivities,
    handleReset,
    timeLogged,
    mostProductiveCategory,
    activitiesLogged,
    productivityScore,
    totalDuration,
  };

  return <ActivityContext.Provider value={value}>{children}</ActivityContext.Provider>;
}

export function useActivities() {
  const context = useContext(ActivityContext);
  if (context === undefined) {
    throw new Error('useActivities must be used within an ActivityProvider');
  }
  return context;
}
