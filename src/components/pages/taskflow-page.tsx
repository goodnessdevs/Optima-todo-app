'use client';

import AddTask from '@/components/add-task';
import TaskList from '@/components/task-list';
import SmartListSuggester from '@/components/smart-list-suggester';

export default function TaskFlowPage() {
  return (
    <>
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
    </>
  );
}
