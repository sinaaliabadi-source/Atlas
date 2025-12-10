'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface StepperProps {
  steps: string[];
  currentStep: number;
}

export default function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="flex flex-wrap gap-2 items-center mb-6">
      {steps.map((label, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        return (
          <AnimatePresence key={label}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex items-center gap-2 px-3 py-2 rounded-full border text-sm shadow-sm ${isActive ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-200'}`}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full border ${isActive ? 'bg-white text-blue-600' : isCompleted ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}
              >
                {isCompleted ? '✓' : index + 1}
              </span>
              {label}
            </motion.div>
          </AnimatePresence>
        );
      })}
    </div>
  );
}
