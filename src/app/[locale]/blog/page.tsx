'use client';

import Navigation from '@/components/Navigation';
import Blog from '@/components/Blog';
import Footer from '@/components/Footer';
import { useTranslations } from '@/hooks/useTranslations';

export default function BlogPage() {
  const { t } = useTranslations();

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navigation />
      <main className="pt-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              <span className="text-white">{t('blog.title')}</span>
            </h1>
            <p className="mt-6 text-lg text-zinc-400">
              {t('blog.description')}
            </p>
          </div>
        </div>
        <Blog showAll={true} />
      </main>
      <Footer />
    </div>
  );
} 