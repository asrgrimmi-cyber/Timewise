
'use client';

import { createContext, useContext, useState, useMemo, useCallback, ReactNode, useEffect } from 'react';
import { activities as initialActivitiesData } from '@/lib/data';
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

// Helper to parse activities with Date objects
const parseActivities = (jsonString: string): Activity[] => {
  const parsed = JSON.parse(jsonString);
  return parsed.map((activity: any) => ({
    ...activity,
    startTime: new Date(activity.startTime),
    endTime: new Date(activity.endTime),
  }));
};


export function ActivityProvider({ children }: { children: ReactNode }) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem('timeWiseActivities');
      if (item) {
        setActivities(parseActivities(item));
      } else {
        // For the first time user, populate with initial data
        setActivities(initialActivitiesData);
      }
    } catch (error) {
      console.error("Failed to read from localStorage", error);
      setActivities(initialActivitiesData);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        window.localStorage.setItem('timeWiseActivities', JSON.stringify(activities));
      } catch (error) {
        console.error("Failed to write to localStorage", error);
      }
    }
  }, [activities, isLoaded]);


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
    if (!isLoaded) {
      return {
        timeLogged: '0m',
        mostProductiveCategory: 'N/A',
        activitiesLogged: 0,
        productivityScore: 0,
        totalDuration: 0,
      };
    }
    
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
      (total: number, event: any) => {
        const eventDate = new Date(event.startTime);
        const today = new Date();
        if(eventDate.getDate() === today.getDate() && eventDate.getMonth() === today.getMonth() && eventDate.getFullYear() === today.getFullYear()) {
            return total + (event.endTime.getTime() - event.startTime.getTime()) / (1000 * 60)
        }
        return total;
      },
      0
    );
    
    const actualTime = activities.reduce((total, activity) => total + activity.duration, 0);
    const productivityScore = plannedTime > 0 ? Math.round((actualTime / plannedTime) * 100) : 0;

    return { timeLogged, mostProductiveCategory, activitiesLogged, productivityScore, totalDuration };
  }, [activities, isLoaded]);

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

  if (!isLoaded) {
    return null; // Or a loading spinner
  }

  return <ActivityContext.Provider value={value}>{children}</ActivityContext.Provider>;
}

export function useActivities() {
  const context = useContext(ActivityContext);
  if (context === undefined) {
    throw new Error('useActivities must be used within an ActivityProvider');
  }
  return context;
}
