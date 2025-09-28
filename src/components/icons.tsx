
'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

export function DigitalClock({ className }: { className?: string }) {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  if (!time) {
    // Render a placeholder on the server and during the initial client render
    return <div className={cn("text-sm text-muted-foreground", className)}>--:--:--</div>;
  }

  return (
    <div className={cn("font-mono text-sm text-foreground", className)}>
      {format(time, 'HH:mm:ss')}
    </div>
  );
}
