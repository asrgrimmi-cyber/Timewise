
'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function AnalogClock({ className }: { className?: string }) {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  if (!time) {
    return <div className={cn("relative w-full h-full rounded-full", className)}></div>;
  }

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourDeg = (hours % 12) * 30 + minutes * 0.5;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const secondDeg = seconds * 6;

  return (
    <div className={cn("relative w-full h-full rounded-full border-2 border-primary-foreground", className)}>
      <div className="absolute top-1/2 left-1/2 w-0.5 h-[25%] bg-primary-foreground origin-bottom transform -translate-x-1/2 -translate-y-full" 
           style={{ transform: `translateX(-50%) rotate(${hourDeg}deg)` }}></div>
      <div className="absolute top-1/2 left-1/2 w-0.5 h-[35%] bg-primary-foreground origin-bottom transform -translate-x-1/2 -translate-y-full" 
           style={{ transform: `translateX(-50%) rotate(${minuteDeg}deg)` }}></div>
      <div className="absolute top-1/2 left-1/2 w-px h-[40%] bg-accent origin-bottom transform -translate-x-1/2 -translate-y-full" 
           style={{ transform: `translateX(-50%) rotate(${secondDeg}deg)` }}></div>
      <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-primary-foreground rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  );
}

// Helper component for a single 7-segment digit
const SevenSegmentDigit = ({ digit, className }: { digit: number; className?: string }) => {
  const segments = [
    // a  b  c  d  e  f  g
    [1, 1, 1, 1, 1, 1, 0], // 0
    [0, 1, 1, 0, 0, 0, 0], // 1
    [1, 1, 0, 1, 1, 0, 1], // 2
    [1, 1, 1, 1, 0, 0, 1], // 3
    [0, 1, 1, 0, 0, 1, 1], // 4
    [1, 0, 1, 1, 0, 1, 1], // 5
    [1, 0, 1, 1, 1, 1, 1], // 6
    [1, 1, 1, 0, 0, 0, 0], // 7
    [1, 1, 1, 1, 1, 1, 1], // 8
    [1, 1, 1, 1, 0, 1, 1], // 9
  ];

  const activeSegments = segments[digit] || segments[0];

  return (
    <div className={cn("relative w-4 h-7 grid grid-cols-3 grid-rows-7 gap-px", className)}>
      {/* Segment A */}
      <div className={cn("absolute top-0 left-1 w-2 h-0.5", activeSegments[0] ? 'bg-primary-foreground' : 'bg-primary/20')}></div>
      {/* Segment B */}
      <div className={cn("absolute top-1 right-0 w-0.5 h-2", activeSegments[1] ? 'bg-primary-foreground' : 'bg-primary/20')}></div>
      {/* Segment C */}
      <div className={cn("absolute bottom-1 right-0 w-0.5 h-2", activeSegments[2] ? 'bg-primary-foreground' : 'bg-primary/20')}></div>
      {/* Segment D */}
      <div className={cn("absolute bottom-0 left-1 w-2 h-0.5", activeSegments[3] ? 'bg-primary-foreground' : 'bg-primary/20')}></div>
      {/* Segment E */}
      <div className={cn("absolute bottom-1 left-0 w-0.5 h-2", activeSegments[4] ? 'bg-primary-foreground' : 'bg-primary/20')}></div>
      {/* Segment F */}
      <div className={cn("absolute top-1 left-0 w-0.5 h-2", activeSegments[5] ? 'bg-primary-foreground' : 'bg-primary/20')}></div>
      {/* Segment G */}
      <div className={cn("absolute top-1/2 left-1 w-2 h-0.5 -translate-y-1/2", activeSegments[6] ? 'bg-primary-foreground' : 'bg-primary/20')}></div>
    </div>
  );
};


export function DigitalClock({ className }: { className?: string }) {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  if (!time) {
    return <div className={cn("w-full h-full", className)}></div>;
  }

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  return (
    <div className={cn("flex items-center justify-center gap-1 p-1 rounded-md", className)}>
      <SevenSegmentDigit digit={parseInt(hours[0])} />
      <SevenSegmentDigit digit={parseInt(hours[1])} />
      <div className="flex flex-col gap-0.5 h-7 justify-center">
        <div className="w-1 h-1 rounded-full bg-primary-foreground"></div>
        <div className="w-1 h-1 rounded-full bg-primary-foreground"></div>
      </div>
      <SevenSegmentDigit digit={parseInt(minutes[0])} />
      <SevenSegmentDigit digit={parseInt(minutes[1])} />
      <div className="flex flex-col gap-0.5 h-7 justify-center">
        <div className="w-1 h-1 rounded-full bg-accent"></div>
        <div className="w-1 h-1 rounded-full bg-accent"></div>
      </div>
      <SevenSegmentDigit digit={parseInt(seconds[0])} className="opacity-70"/>
      <SevenSegmentDigit digit={parseInt(seconds[1])} className="opacity-70"/>
    </div>
  );
}
