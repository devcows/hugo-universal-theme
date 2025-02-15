'use client';

import { motion } from 'framer-motion';
import { services } from '@/data/services';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useTranslations } from '@/hooks/useTranslations';
import { Locale } from '@/i18n/config';

export default function ServicesPage({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  const { t } = useTranslations();

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navigation />
      <main>
        {/* Hero Section */}
        <div className="relative isolate overflow-hidden bg-gradient-to-b from-zinc-900/20">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mx-auto max-w-2xl text-center"
            >
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                {t('services.title')}
              </h1>
              <p className="mt-6 text-lg leading-8 text-zinc-400">
                {t('services.subtitle')}
              </p>
            </motion.div>
          </div>
          <div className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-500/20 to-purple-500/20 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
          </div>
        </div>

        {/* Detailed Services Section */}
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-12">
              {services.map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex flex-col gap-10 bg-zinc-900/50 p-8 rounded-2xl shadow-sm ring-1 ring-zinc-800"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500">
                      <service.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">{t(service.name)}</h2>
                  </div>
                  
                  <div className="flex flex-col gap-6">
                    <p className="text-zinc-400">{t(service.description)}</p>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">
                        {t('services.features')}:
                      </h3>
                      <ul className="grid grid-cols-2 gap-3">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-start">
                            <svg className="h-6 w-6 text-blue-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span className="ml-3 text-zinc-400">{t(feature)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto pt-6">
                      <a
                        href="#contact"
                        className="inline-flex items-center text-blue-400 hover:text-blue-300"
                      >
                        {t('services.learnMore')}
                        <svg className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto max-w-2xl text-center"
            >
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {t('services.cta.title')}
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
                {t('services.cta.description')}
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="/contact"
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {t('services.cta.primary')}
                </a>
                <a href="/about" className="text-sm font-semibold leading-6 text-white">
                  {t('services.cta.secondary')} <span aria-hidden="true">→</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 