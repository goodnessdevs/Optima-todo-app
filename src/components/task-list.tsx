'use client';

import { useTasks } from '@/contexts/task-context';
import TaskCard from './task-card';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Skeleton } from './ui/skeleton';

export default function TaskList() {
  const { tasks, loadingTasks } = useTasks();

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed === b.completed) {
       return b.createdAt.toMillis() - a.createdAt.toMillis();
    }
    return a.completed ? 1 : -1;
  });

  if (loadingTasks) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

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
    <motion.div
      layout
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
    >
      <AnimatePresence>
        {sortedTasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
