'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { pageVariants } from '@/utils/animations';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.main
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
} 