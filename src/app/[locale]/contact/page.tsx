'use client';

import Navigation from '@/components/Navigation';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { Locale } from '@/i18n/config';

export default function ContactPage({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
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