'use client';

import type { ReactNode } from 'react';
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  Timestamp,
  where,
} from 'firebase/firestore';
import { useAuth } from './auth-context';
import { db } from '@/lib/firebase';
import type { Task } from '@/lib/types';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'completed' | 'createdAt'>) => void;
  updateTaskStatus: (id: string, completed: boolean) => void;
  deleteTask: (id: string) => void;
  loadingTasks: boolean;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setLoadingTasks(true);
      const tasksCollection = collection(db, 'users', user.uid, 'tasks');
      const q = query(tasksCollection, orderBy('createdAt', 'desc'));

      const unsubscribe = onSnapshot(q, snapshot => {
        const userTasks = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            description: data.description,
            completed: data.completed,
            createdAt: data.createdAt,
          };
        });
        setTasks(userTasks as Task[]);
        setLoadingTasks(false);
      });

      return () => unsubscribe();
    } else {
      setTasks([]);
      setLoadingTasks(false);
    }
  }, [user]);

  const addTask = useCallback(
    async (task: Omit<Task, 'id' | 'completed' | 'createdAt'>) => {
      if (!user) return;
      const tasksCollection = collection(db, 'users', user.uid, 'tasks');
      await addDoc(tasksCollection, {
        ...task,
        completed: false,
        createdAt: Timestamp.now(),
      });
    },
    [user]
  );

  const updateTaskStatus = useCallback(
    async (id: string, completed: boolean) => {
      if (!user) return;
      const taskDoc = doc(db, 'users', user.uid, 'tasks', id);
      await updateDoc(taskDoc, { completed });
    },
    [user]
  );

  const deleteTask = useCallback(
    async (id: string) => {
      if (!user) return;
      const taskDoc = doc(db, 'users', user.uid, 'tasks', id);
      await deleteDoc(taskDoc);
    },
    [user]
  );

  const value = {
    tasks,
    addTask,
    updateTaskStatus,
    deleteTask,
    loadingTasks,
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
