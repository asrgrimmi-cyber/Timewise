'use client';

import { useState } from 'react';
import { format, formatDistance } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { categories, activities as initialActivities } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Calendar as CalendarIcon, RotateCw } from 'lucide-react';
import type { Activity } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '../ui/separator';

function ActivityCard({ activity }: { activity: Activity }) {
  const category = categories.find((c) => c.id === activity.categoryId);
  const Icon = category?.icon;

  return (
    <div className="relative flex items-start space-x-4 group">
      <div className="flex flex-col items-center">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-card border flex items-center justify-center z-10">
          {Icon && <Icon className="w-5 h-5 text-muted-foreground" style={{ color: category?.color }}/>}
        </div>
        <div className="w-px h-full bg-border -mt-1 group-last:hidden"></div>
      </div>

      <div className="flex-1 pt-1.5">
        <div className="flex items-center justify-between">
          <p className="font-medium text-card-foreground">{activity.title}</p>
          <p className="text-xs text-muted-foreground">
            {format(activity.startTime, 'HH:mm')} - {format(activity.endTime, 'HH:mm')}
          </p>
        </div>
        <div className="flex items-center gap-2 mt-1">
          {category && <Badge variant="outline" style={{ borderColor: category.color, color: category.color }}>{category.name}</Badge>}
          <Badge variant="secondary">{activity.duration} min</Badge>
        </div>
        {activity.notes && (
          <p className="mt-2 text-sm text-muted-foreground">{activity.notes}</p>
        )}
      </div>
    </div>
  );
}

export function TimelineView() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activities, setActivities] = useState<Activity[]>(initialActivities.sort((a, b) => a.startTime.getTime() - b.startTime.getTime()));
  
  // For demo, we'll just use the mock data regardless of date.
  // In a real app, you would filter activities based on the selected `date`.
  const totalDuration = activities.reduce((sum, act) => sum + act.duration, 0);

  const handleReset = () => {
    setActivities([]);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Activity Timeline</CardTitle>
          <CardDescription>
            {activities.length} activities logged today for a total of {totalDuration > 0 ? formatDistance(0, totalDuration * 60 * 1000, { includeSeconds: false }) : '0 minutes'}.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handleReset}>
            <RotateCw className="h-4 w-4" />
            <span className="sr-only">Reset Activities</span>
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn('w-[240px] justify-start text-left font-normal', !date && 'text-muted-foreground')}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-6">
            {activities.length > 0 ? (
              activities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground py-12">
                <p className="text-lg font-medium">No activities logged.</p>
                <p className="text-sm">Use the "Log Activity" button to add your first entry.</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
