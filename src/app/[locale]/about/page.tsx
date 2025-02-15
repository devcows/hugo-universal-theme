'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import BookCall from '@/components/BookCall';
import Footer from '@/components/Footer';
import { useTranslations } from '@/hooks/useTranslations';

export default function AboutPage() {
  const { t } = useTranslations();

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navigation />
      <main>
        <div className="relative py-24 sm:py-32">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-white">
                {t('about.title')}
              </h1>
              <p className="mt-6 text-base text-zinc-400">
                {t('about.intro')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-16 space-y-12"
            >
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white">{t('about.mission.title')}</h2>
                <p className="mt-4 text-base text-zinc-400">
                  {t('about.mission.description')}
                </p>
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div className="card">
                    <h3 className="text-lg font-semibold text-white mb-3">{t('about.mission.pillars.quality.title')}</h3>
                    <p className="text-sm text-zinc-400">
                      {t('about.mission.pillars.quality.description')}
                    </p>
                  </div>
                  <div className="card">
                    <h3 className="text-lg font-semibold text-white mb-3">{t('about.mission.pillars.innovation.title')}</h3>
                    <p className="text-sm text-zinc-400">
                      {t('about.mission.pillars.innovation.description')}
                    </p>
                  </div>
                  <div className="card">
                    <h3 className="text-lg font-semibold text-white mb-3">{t('about.mission.pillars.success.title')}</h3>
                    <p className="text-sm text-zinc-400">
                      {t('about.mission.pillars.success.description')}
                    </p>
                  </div>
                  <div className="card">
                    <h3 className="text-lg font-semibold text-white mb-3">{t('about.mission.pillars.growth.title')}</h3>
                    <p className="text-sm text-zinc-400">
                      {t('about.mission.pillars.growth.description')}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white">{t('about.approach.title')}</h2>
                <p className="mt-4 text-base text-zinc-400">
                  {t('about.approach.description')}
                </p>
                <ul className="mt-6 space-y-4 text-zinc-400">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong className="text-white">{t('about.approach.pillars.planning.title')}:</strong> {t('about.approach.pillars.planning.description')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong className="text-white">{t('about.approach.pillars.execution.title')}:</strong> {t('about.approach.pillars.execution.description')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong className="text-white">{t('about.approach.pillars.improvement.title')}:</strong> {t('about.approach.pillars.improvement.description')}</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>

        <BookCall />
      </main>
      <Footer />
    </div>
  );
} 