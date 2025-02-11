'use client';

import Navigation from '@/components/Navigation';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Navigation />
      <main>
        <Contact />
      </main>
      <Footer />
    </div>
  );
} 