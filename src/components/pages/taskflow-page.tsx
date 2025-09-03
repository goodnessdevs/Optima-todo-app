'use client';

import { TaskProvider } from '@/contexts/task-context';
import Header from '@/components/header';
import AddTask from '@/components/add-task';
import TaskList from '@/components/task-list';
import SmartListSuggester from '@/components/smart-list-suggester';

export default function TaskFlowPage() {
  return (
    <TaskProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="container mx-auto flex-grow p-4 py-8 md:p-8">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
              My Tasks
            </h1>
            <AddTask />
          </div>

          <div className="mb-8">
            <SmartListSuggester />
          </div>

          <TaskList />
        </main>
        <footer className="py-4 text-center text-sm text-muted-foreground">
          <p>Built for you by Optima</p>
        </footer>
      </div>
    </TaskProvider>
  );
}
