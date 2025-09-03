'use client';

import { useTasks } from '@/contexts/task-context';
import TaskCard from './task-card';
import Image from 'next/image';

export default function TaskList() {
  const { tasks } = useTasks();

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });

  if (sortedTasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted bg-card p-12 text-center">
        <Image
          src="https://picsum.photos/400/300"
          alt="Empty state"
          width={400}
          height={300}
          data-ai-hint="meditation yoga"
          className="mb-4 rounded-lg"
        />
        <h3 className="text-xl font-semibold">All tasks completed!</h3>
        <p className="text-muted-foreground">
          Looks like you're all caught up. Add a new task to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {sortedTasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
