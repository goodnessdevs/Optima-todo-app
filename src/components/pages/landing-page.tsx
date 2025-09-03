'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  ClipboardCheck,
  ArrowRight,
  Github,
  Linkedin,
  Instagram,
} from 'lucide-react';
import Header from '../header';

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <motion.section
          className="container mx-auto flex min-h-[60vh] items-center px-4 py-16 text-center md:py-24"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <div className="mx-auto max-w-2xl space-y-6">
            <motion.div
              className="flex items-center justify-center gap-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <ClipboardCheck className="h-10 w-10 text-primary" />
              <h1 className="font-headline text-5xl font-bold md:text-6xl">
                Optima
              </h1>
            </motion.div>
            <p className="text-lg text-muted-foreground md:text-xl">
              An intelligent to-do app that helps you organize, prioritize, and
              optimize your tasks. Get more done with less stress.
            </p>
            <motion.div
              className="flex justify-center gap-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild size="lg">
                <Link href="/login">
                  Get Started <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          className="bg-muted/50 py-16 md:py-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
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
              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.1 }}
                className="rounded-lg border bg-card p-6 text-center shadow-sm"
              >
                <h3 className="mb-2 text-xl font-semibold">Smart Lists</h3>
                <p className="text-muted-foreground">
                  AI-powered suggestions to automatically group your tasks.
                </p>
              </motion.div>
              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.2 }}
                className="rounded-lg border bg-card p-6 text-center shadow-sm"
              >
                <h3 className="mb-2 text-xl font-semibold">Easy to Use</h3>
                <p className="text-muted-foreground">
                  A clean and intuitive interface to manage your tasks.
                </p>
              </motion.div>
              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.3 }}
                className="rounded-lg border bg-card p-6 text-center shadow-sm"
              >
                <h3 className="mb-2 text-xl font-semibold">Dark Mode</h3>
                <p className="text-muted-foreground">
                  Switch to dark mode for a better viewing experience at night.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>
      <footer className="border-t">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Optima. All rights reserved.</p>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
