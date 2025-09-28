import type { LucideIcon } from 'lucide-react';

export type ActivityCategory = {
  id: string;
  name: string;
  icon: LucideIcon | ((props: React.ComponentProps<'svg'>) => JSX.Element);
  color: string;
};

export type Activity = {
  id: string;
  title: string;
  notes?: string;
  startTime: Date;
  endTime: Date;
  duration: number; // in minutes
  categoryId: string;
};

export type CalendarEvent = {
  id:string;
  title: string;
  startTime: Date;
  endTime: Date;
  source: 'google' | 'teams';
  categoryId: string;
};
