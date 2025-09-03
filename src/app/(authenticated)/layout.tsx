'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { TaskProvider } from '@/contexts/task-context';
import Header from '@/components/header';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <TaskProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="container mx-auto flex-grow p-4 py-8 md:p-8">
          {children}
        </main>
        <footer className="border-t">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Optima. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-primary hover:underline">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-primary hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
      </div>
    </TaskProvider>
  );
}
