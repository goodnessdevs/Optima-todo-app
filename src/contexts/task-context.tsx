'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useCallback } from 'react';
import type { Task } from '@/lib/types';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'completed'>) => void;
  updateTaskStatus: (id: string, completed: boolean) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Finalize Q3 report',
    description: 'Compile sales data and create presentation slides.',
    completed: false,
  },
  {
    id: '2',
    title: 'Book dentist appointment',
    description: 'Annual check-up and cleaning.',
    completed: false,
  },
  {
    id: '3',
    title: 'Buy groceries for the week',
    description: 'Milk, bread, eggs, and vegetables.',
    completed: true,
  },
  {
    id: '4',
    title: 'Plan team offsite event',
    description: 'Research venues and activities for the annual team building.',
    completed: false,
  },
];

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = useCallback((task: Omit<Task, 'id' | 'completed'>) => {
    setTasks(prevTasks => [
      { ...task, id: Date.now().toString(), completed: false },
      ...prevTasks,
    ]);
  }, []);

  const updateTaskStatus = useCallback((id: string, completed: boolean) => {
    setTasks(prevTasks =>
      prevTasks.map(task => (task.id === id ? { ...task, completed } : task))
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }, []);

  const value = {
    tasks,
    addTask,
    updateTaskStatus,
    deleteTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}
