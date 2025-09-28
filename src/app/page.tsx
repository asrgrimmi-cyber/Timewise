
'use client';

import { TimelineView } from "@/components/dashboard/timeline-view";
import { ComparisonReport } from "@/components/dashboard/comparison-report";
import { QuickAdd } from "@/components/dashboard/quick-add";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useActivities } from '@/components/activity-provider';


export default function DashboardPage() {
  const { 
    activities,
    handleReset,
    timeLogged,
    mostProductiveCategory,
    activitiesLogged,
    productivityScore,
    totalDuration
   } = useActivities();

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
