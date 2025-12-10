'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '../components/Button';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1.2 }}
          className="absolute -left-20 -top-32 h-72 w-72 rounded-full bg-blue-200 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1.4, delay: 0.2 }}
          className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-cyan-200 blur-3xl"
        />
      </div>
      <div className="relative container flex-1 flex flex-col items-center justify-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-sm text-blue-600 font-semibold mb-4"
        >
          اطلس AI Caseهای صنعت
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-6"
        >
          اطلس هوشمندسازی صنعت
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-slate-700 max-w-2xl mb-10"
        >
          مرور کاربردهای هوش مصنوعی در صنایع نفت، گاز و پتروشیمی با مسیریابی چندمرحله‌ای، جستجو و انیمیشن‌های مدرن.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Link href="/atlas">
            <Button className="text-lg px-8 py-4 shadow-xl">شروع اطلس</Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
