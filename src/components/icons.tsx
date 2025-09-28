
'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function AnalogClock({ className }: { className?: string }) {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    // Set the initial time on the client
    setTime(new Date());
    
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => clearInterval(timerId);
  }, []);

  if (!time) {
    // Don't render on the server or during the initial client render
    return <div className={cn("relative w-full h-full rounded-full", className)}></div>;
  }

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourDeg = (hours % 12) * 30 + minutes * 0.5;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const secondDeg = seconds * 6;

  return (
    <div className={cn("relative w-full h-full rounded-full", className)}>
      <div className="absolute top-1/2 left-1/2 w-0.5 h-[calc(50%-8px)] bg-primary-foreground origin-bottom transform -translate-x-1/2" 
           style={{ transform: `translateX(-50%) rotate(${hourDeg}deg)`, height: 'calc(50% - 6px)' }}></div>
      <div className="absolute top-1/2 left-1/2 w-0.5 h-[calc(50%-4px)] bg-primary-foreground origin-bottom transform -translate-x-1/2" 
           style={{ transform: `translateX(-50%) rotate(${minuteDeg}deg)`, height: 'calc(50% - 4px)' }}></div>
      <div className="absolute top-1/2 left-1/2 w-px h-1/2 bg-destructive origin-bottom transform -translate-x-1/2" 
           style={{ transform: `translateX(-50%) rotate(${secondDeg}deg)` }}></div>
      <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-primary-foreground rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  );
}

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}
