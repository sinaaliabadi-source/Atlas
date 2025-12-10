'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface CaseCardProps {
  id: string;
  label: string;
  process?: string;
  onClick?: () => void;
}

export default function CaseCard({ id, label, process, onClick }: CaseCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      className="group relative"
    >
      <Link
        href={`/atlas/${encodeURIComponent(id)}`}
        onClick={onClick}
        className="block rounded-2xl bg-white p-4 shadow-sm border border-slate-100 transition hover:shadow-lg"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-blue-500 font-semibold">AI Case</p>
            <h3 className="text-lg font-bold text-slate-900 mt-1">{label}</h3>
            {process && <p className="text-sm text-slate-600 mt-1">{process}</p>}
          </div>
          <div className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">{id}</div>
        </div>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 opacity-0 group-hover:opacity-100 transition" />
      </Link>
    </motion.div>
  );
}
