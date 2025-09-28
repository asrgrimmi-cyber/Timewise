import type { Activity, ActivityCategory, CalendarEvent } from '@/lib/types';
import { Briefcase, Brain, Dumbbell, Home, Book } from 'lucide-react';

export const categories: ActivityCategory[] = [
  { id: 'cat-work', name: 'Work', icon: Briefcase, color: 'hsl(var(--chart-1))' },
  { id: 'cat-learning', name: 'Learning', icon: Book, color: 'hsl(var(--chart-2))' },
  { id: 'cat-personal', name: 'Personal', icon: Home, color: 'hsl(var(--chart-3))' },
  { id: 'cat-fitness', name: 'Fitness', icon: Dumbbell, color: 'hsl(var(--chart-4))' },
];

const today = new Date();
const createDate = (h: number, m: number) => new Date(today.getFullYear(), today.getMonth(), today.getDate(), h, m);

export const activities: Activity[] = [
  { 
    id: 'act-1', 
    title: 'Morning workout', 
    startTime: createDate(7, 0), 
    endTime: createDate(7, 45), 
    duration: 45, 
    categoryId: 'cat-fitness',
    notes: 'Cardio and stretching'
  },
  { 
    id: 'act-2', 
    title: 'Team Standup', 
    startTime: createDate(9, 0), 
    endTime: createDate(9, 15), 
    duration: 15, 
    categoryId: 'cat-work',
    notes: 'Discussed project blockers.'
  },
  { 
    id: 'act-3', 
    title: 'Develop new feature', 
    startTime: createDate(9, 15), 
    endTime: createDate(12, 5), 
    duration: 170, 
    categoryId: 'cat-work',
    notes: 'Worked on the activity logging form.'
  },
  { 
    id: 'act-4', 
    title: 'Lunch break', 
    startTime: createDate(12, 5), 
    endTime: createDate(13, 0), 
    duration: 55, 
    categoryId: 'cat-personal' 
  },
    { 
    id: 'act-5', 
    title: 'Read Next.js docs', 
    startTime: createDate(13, 0), 
    endTime: createDate(14, 0), 
    duration: 60, 
    categoryId: 'cat-learning',
    notes: 'Chapter on Server Actions.'
  },
  { 
    id: 'act-6', 
    title: 'Code Review', 
    startTime: createDate(14, 0), 
    endTime: createDate(14, 45), 
    duration: 45, 
    categoryId: 'cat-work',
  },
  { 
    id: 'act-7', 
    title: 'Client Call', 
    startTime: createDate(15, 0), 
    endTime: createDate(16, 0), 
    duration: 60, 
    categoryId: 'cat-work',
    notes: 'Follow-up on requirements.'
  },
  { 
    id: 'act-8', 
    title: 'Quick scroll on social media', 
    startTime: createDate(16, 0), 
    endTime: createDate(16, 30), 
    duration: 30, 
    categoryId: 'cat-personal',
    notes: 'Unplanned break'
  },
];

export const calendarEvents: CalendarEvent[] = [
  { 
    id: 'cal-1', 
    title: 'Daily Standup', 
    startTime: createDate(9, 0), 
    endTime: createDate(9, 15), 
    source: 'google',
    categoryId: 'cat-work',
  },
  { 
    id: 'cal-2', 
    title: 'Focus: Feature Development', 
    startTime: createDate(9, 30), 
    endTime: createDate(12, 0), 
    source: 'google',
    categoryId: 'cat-work',
  },
  { 
    id: 'cal-3', 
    title: 'Lunch', 
    startTime: createDate(12, 0), 
    endTime: createDate(13, 0), 
    source: 'teams',
    categoryId: 'cat-personal',
  },
  { 
    id: 'cal-4', 
    title: 'Client Sync', 
    startTime: createDate(15, 0), 
    endTime: createDate(15, 30), 
    source: 'google',
    categoryId: 'cat-work',
  }
];

export const quickAddTemplates = [
  { id: 'qa-1', title: 'Coffee Break', duration: 15, categoryId: 'cat-personal'},
  { id: 'qa-2', title: 'Team Huddle', duration: 15, categoryId: 'cat-work'},
  { id: 'qa-3', title: 'Reading articles', duration: 30, categoryId: 'cat-learning'},
  { id: 'qa-4', title: 'Quick walk', duration: 20, categoryId: 'cat-fitness'},
];
