'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ClipboardCheck, ArrowRight } from 'lucide-react';
import Header from '../header';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <section className="container mx-auto grid items-center gap-8 px-4 py-16 text-center md:grid-cols-2 md:py-24 md:text-left">
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-2 md:justify-start">
              <ClipboardCheck className="h-8 w-8 text-primary" />
              <h1 className="font-headline text-4xl font-bold md:text-5xl">
                Optima
              </h1>
            </div>
            <p className="mx-auto max-w-xl text-lg text-muted-foreground md:mx-0">
              An intelligent to-do app that helps you organize, prioritize, and
              optimize your tasks. Get more done with less stress.
            </p>
            <div className="flex justify-center gap-4 md:justify-start">
              <Button asChild size="lg">
                <Link href="/login">
                  Get Started <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative h-64 w-full md:h-96">
            <Image
              src="https://picsum.photos/800/600"
              alt="A person organizing tasks on a board"
              fill
              data-ai-hint="organizing tasks"
              className="rounded-lg object-cover shadow-lg"
            />
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
      <footer className="py-8 text-center text-sm text-muted-foreground">
        <p>Built for you by Optima</p>
      </footer>
    </div>
  );
}
