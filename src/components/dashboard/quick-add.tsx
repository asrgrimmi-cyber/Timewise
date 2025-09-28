'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { categories, quickAddTemplates } from '@/lib/data';
import { Plus } from 'lucide-react';

export function QuickAdd() {
  const { toast } = useToast();

  const handleQuickAdd = (template: typeof quickAddTemplates[0]) => {
    toast({
      title: 'Activity Quick-Added!',
      description: `"${template.title}" was logged for ${template.duration} minutes.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Add</CardTitle>
        <CardDescription>Log common activities with one click.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        {quickAddTemplates.map((template) => {
          const category = categories.find((c) => c.id === template.categoryId);
          const Icon = category?.icon;
          return (
            <Button
              key={template.id}
              variant="outline"
              className="flex flex-col h-auto items-start p-3 gap-1"
              onClick={() => handleQuickAdd(template)}
            >
              <div className="flex items-center gap-2">
                {Icon && <Icon className="w-4 h-4" style={{color: category?.color}}/>}
                <span className="font-semibold">{template.title}</span>
              </div>
              <span className="text-xs text-muted-foreground">{template.duration} min</span>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}
