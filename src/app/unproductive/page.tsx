
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { activities } from '@/lib/data';
import { format } from 'date-fns';

export default function ProductivityAnalysisPage() {
  const sortedActivities = [...activities].sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

  return (
    <Card>
      <CardHeader>
        <CardTitle>Productivity Analysis</CardTitle>
        <CardDescription>A detailed breakdown of your logged activities for the day.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Time</TableHead>
              <TableHead>Activity Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedActivities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell className="font-medium">
                  {format(activity.startTime, 'HH:mm')} - {format(activity.endTime, 'HH:mm')}
                </TableCell>
                <TableCell>
                  <p className="font-semibold">{activity.title}</p>
                  {activity.notes && <p className="text-sm text-muted-foreground">{activity.notes}</p>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
