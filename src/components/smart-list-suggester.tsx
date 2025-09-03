'use client';

import { useState } from 'react';
import { Wand2, Loader2 } from 'lucide-react';
import { useTasks } from '@/contexts/task-context';
import { getSmartListSuggestions } from '@/actions/task-actions';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export default function SmartListSuggester() {
  const { tasks } = useTasks();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSuggest = async () => {
    setIsLoading(true);
    setError(null);
    setSuggestions([]);

    const taskTitles = tasks
      .filter(t => !t.completed)
      .map(t => t.title);

    if (taskTitles.length < 2) {
        setError('Add at least two active tasks to get suggestions.');
        setIsLoading(false);
        return;
    }

    try {
      const result = await getSmartListSuggestions(taskTitles);
      setSuggestions(result);
    } catch (e) {
      setError('Could not get suggestions at this time. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-card/70">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">Smart Suggestions</CardTitle>
         <Button
            variant="ghost"
            size="sm"
            onClick={handleSuggest}
            disabled={isLoading}
        >
            {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
            <Wand2 className="mr-2 h-4 w-4" />
            )}
            Generate Lists
        </Button>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">
          {isLoading && <p>Analyzing your tasks to suggest smart lists...</p>}
          {error && <p className="text-destructive">{error}</p>}
          {!isLoading && !error && suggestions.length === 0 && (
            <p>Click "Generate Lists" to get AI-powered suggestions for organizing your tasks.</p>
          )}
          {suggestions.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {suggestions.map((suggestion, index) => (
                <Badge key={index} variant="secondary" className="cursor-pointer text-sm font-normal hover:bg-accent">
                  {suggestion}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
