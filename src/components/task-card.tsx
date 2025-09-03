'use client';

import type { Task } from '@/lib/types';
import { useTasks } from '@/contexts/task-context';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface TaskCardProps {
  task: Task;
}

const cardVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.98 },
};

export default function TaskCard({ task }: TaskCardProps) {
  const { updateTaskStatus, deleteTask } = useTasks();

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <Card
        className={cn(
          'flex h-full flex-col transition-all',
          task.completed ? 'bg-card/60' : 'bg-card'
        )}
      >
        <CardHeader>
          <div className="flex items-start gap-4">
            <Checkbox
              id={`task-${task.id}`}
              checked={task.completed}
              onCheckedChange={checked =>
                updateTaskStatus(task.id, Boolean(checked))
              }
              className="mt-1 h-5 w-5"
              aria-label={`Mark "${task.title}" as complete`}
            />
            <div className="grid gap-1">
              <CardTitle
                className={cn(
                  'text-lg',
                  task.completed && 'text-muted-foreground line-through'
                )}
              >
                {task.title}
              </CardTitle>
              <CardDescription
                className={cn(
                  task.completed && 'text-muted-foreground/80 line-through'
                )}
              >
                {task.description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <div className="flex-grow" />
        <CardFooter className="flex justify-end">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="icon" aria-label={`Delete task "${task.title}"`}>
                  <Trash2 className="h-4 w-4 text-muted-foreground transition-colors hover:text-destructive" />
                </Button>
              </motion.div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  task "{task.title}".
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteTask(task.id)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
