
'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { ActivityProvider } from './activity-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <ActivityProvider>
        {children}
        <Toaster />
      </ActivityProvider>
    </TooltipProvider>
  );
}
