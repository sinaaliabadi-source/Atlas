import Navbar from './Navbar';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container py-10">{children}</main>
    </div>
  );
}
