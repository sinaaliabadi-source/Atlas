import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="backdrop-blur-xl bg-white/80 border-b border-slate-100 sticky top-0 z-20"
    >
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-bold text-blue-700">
          اطلس هوشمندسازی
        </Link>
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <Link href="/atlas" className="hover:text-blue-600">صفحه اطلس</Link>
          <a href="https://nextjs.org" className="hover:text-blue-600" target="_blank" rel="noreferrer">
            Next.js 14
          </a>
        </div>
      </div>
    </motion.header>
  );
}
