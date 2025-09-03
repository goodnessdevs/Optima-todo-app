'use server';

import { suggestSmartLists } from '@/ai/flows/smart-list-suggestions';
import { z } from 'zod';

const SuggestionInputSchema = z.array(z.string());

export async function getSmartListSuggestions(
  tasks: string[]
): Promise<string[]> {
  try {
    const validatedTasks = SuggestionInputSchema.parse(tasks);
    const response = await suggestSmartLists({ tasks: validatedTasks });
    return response.suggestedLists;
  } catch (error) {
    console.error('Error getting smart list suggestions:', error);
    // In a real app, you might want to handle different error types
    // or log them more robustly.
    throw new Error('Failed to generate smart list suggestions.');
  }
}
