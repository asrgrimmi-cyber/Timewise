"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { unproductivePeriodFlagging } from "@/ai/flows/unproductive-period-flagging"
import { useToast } from "@/hooks/use-toast"
import { activities, categories } from "@/lib/data"
import { Loader2, Wand2 } from "lucide-react"
import { Separator } from "../ui/separator"

export function FlaggingTool() {
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState("")
  const { toast } = useToast()

  const handleAnalyze = async () => {
    setIsLoading(true)
    setAnalysis("")

    try {
      const activityLogs = activities
        .map(activity => {
          const categoryName = categories.find(c => c.id === activity.categoryId)?.name || 'Uncategorized';
          return `Timestamp: ${format(activity.startTime, 'yyyy-MM-dd HH:mm')}, Category: ${categoryName}, Duration: ${activity.duration} minutes, Notes: ${activity.title} - ${activity.notes || 'No notes'}`;
        })
        .join('\n');

      const result = await unproductivePeriodFlagging({ activityLogs });
      setAnalysis(result.unproductivePeriods)

    } catch (error) {
      console.error("Analysis failed:", error)
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "There was an error analyzing your productivity.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
            <Wand2 className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl">Productivity Analysis</CardTitle>
        </div>
        <CardDescription>
          Let our AI analyze your logged activities for today to identify unproductive periods and provide actionable insights.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center text-center">
        <Button onClick={handleAnalyze} disabled={isLoading} size="lg">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Wand2 className="mr-2 h-4 w-4" />
          )}
          Analyze My Day
        </Button>
        
        {analysis && (
          <div className="mt-8 w-full text-left">
            <Separator className="my-4" />
            <h3 className="text-lg font-semibold mb-2">Analysis Results</h3>
            <div className="prose prose-sm dark:prose-invert max-w-none p-4 bg-muted/50 rounded-lg">
                <p>{analysis}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
