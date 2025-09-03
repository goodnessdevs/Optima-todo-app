'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ClipboardCheck, ArrowRight } from 'lucide-react';
import Header from '../header';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <section className="container mx-auto flex min-h-[60vh] items-center px-4 py-16 text-center md:py-24">
          <div className="mx-auto max-w-2xl space-y-6">
            <div className="flex items-center justify-center gap-2">
              <ClipboardCheck className="h-10 w-10 text-primary" />
              <h1 className="font-headline text-5xl font-bold md:text-6xl">
                Optima
              </h1>
            </div>
            <p className="text-lg text-muted-foreground md:text-xl">
              An intelligent to-do app that helps you organize, prioritize, and
              optimize your tasks. Get more done with less stress.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/login">
                  Get Started <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-muted/50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="font-headline text-3xl font-bold md:text-4xl">
                Features
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
                Everything you need to be more productive.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-lg border bg-card p-6 text-center shadow-sm">
                <h3 className="mb-2 text-xl font-semibold">Smart Lists</h3>
                <p className="text-muted-foreground">
                  AI-powered suggestions to automatically group your tasks.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 text-center shadow-sm">
                <h3 className="mb-2 text-xl font-semibold">Easy to Use</h3>
                <p className="text-muted-foreground">
                  A clean and intuitive interface to manage your tasks.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 text-center shadow-sm">
                <h3 className="mb-2 text-xl font-semibold">Dark Mode</h3>
                <p className="text-muted-foreground">
                  Switch to dark mode for a better viewing experience at night.
                </p>
              </div>
            </div>
          </div>
        </section>
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
  );
}
