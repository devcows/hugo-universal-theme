'use client';

import { motion } from 'framer-motion';
import { useTranslations } from '@/hooks/useTranslations';

export default function Services() {
  const { t } = useTranslations();

  const services = [
    {
      title: t('services.qa.title'),
      description: t('services.qa.description'),
      features: [
        t('services.qa.features.manual'),
        t('services.qa.features.regression'),
        t('services.qa.features.acceptance'),
        t('services.qa.features.compatibility'),
        t('services.qa.features.bugs'),
        t('services.qa.features.documentation')
      ],
      icon: "🎯"
    },
    {
      title: t('services.automation.title'),
      description: t('services.automation.description'),
      features: [
        t('services.automation.features.functional'),
        t('services.automation.features.performance'),
        t('services.automation.features.ci'),
        t('services.automation.features.api'),
        t('services.automation.features.cross'),
        t('services.automation.features.reporting')
      ],
      icon: "⚡"
    },
    {
      title: t('services.workflow.title'),
      description: t('services.workflow.description'),
      features: [
        t('services.workflow.features.integration'),
        t('services.workflow.features.automation'),
        t('services.workflow.features.custom'),
        t('services.workflow.features.triggers'),
        t('services.workflow.features.ai'),
        t('services.workflow.features.support')
      ],
      icon: "🔄"
    },
    {
      title: t('services.development.title'),
      description: t('services.development.description'),
      features: [
        t('services.development.features.frameworks'),
        t('services.development.features.tools'),
        t('services.development.features.ci'),
        t('services.development.features.scripts'),
        t('services.development.features.monitoring'),
        t('services.development.features.custom')
      ],
      icon: "💡"
    }
  ];

  return (
    <section className="py-24 relative">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute left-[10%] top-0 -z-10 h-[1000px] w-[1000px] rounded-full bg-blue-500/5 blur-[100px]" />
        <div className="absolute right-[10%] bottom-0 -z-10 h-[1000px] w-[1000px] rounded-full bg-purple-500/5 blur-[100px]" />
      </div>

      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            <span className="text-white">{t('services.title')}</span>
          </h2>
          <p className="mt-6 text-lg text-zinc-400">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 grid gap-8 md:grid-cols-2"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="card group"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-3xl">
                    {service.icon}
                  </span>
                  <h3 className="text-xl font-semibold text-white">
                    {service.title}
                  </h3>
                </div>
                <p className="text-zinc-400 mb-8">
                  {service.description}
                </p>
                <div className="mt-auto">
                  <h4 className="text-sm font-semibold text-white mb-4">
                    {t('services.features')}:
                  </h4>
                  <ul className="grid grid-cols-2 gap-3">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-2 text-sm text-zinc-400"
                      >
                        <svg
                          className="w-4 h-4 text-blue-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 