'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations } from '@/hooks/useTranslations';
import { 
  heroContainerVariants, 
  heroContentVariants, 
  blurBackgroundVariants,
  staggerContainer,
  cardHoverVariants,
  scaleUpVariants
} from '@/utils/animations';

export default function Hero() {
  const { t } = useTranslations();

  return (
    <div className="relative min-h-[90vh] flex items-center pt-24">
      {/* Background effects */}
      <div className="absolute inset-0">
        <motion.div
          variants={blurBackgroundVariants}
          initial="hidden"
          animate="visible"
          className="absolute left-[10%] top-0 -z-10 h-[1000px] w-[1000px] rounded-full bg-blue-500/5"
        />
        <motion.div
          variants={blurBackgroundVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="absolute right-[10%] bottom-0 -z-10 h-[1000px] w-[1000px] rounded-full bg-purple-500/5"
        />
      </div>

      <div className="container relative">
        <motion.div
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          <motion.div
            variants={heroContentVariants}
            className="max-w-2xl"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="text-white">{t('hero.title')}</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-zinc-400 leading-relaxed">
              {t('hero.subtitle')}
            </p>

            <motion.div
              variants={staggerContainer}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link href="/contact" className="btn">
                <span>{t('hero.cta.primary')}</span>
                <svg 
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" 
                  viewBox="0 0 16 16" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M6.75 3.25L10.25 8L6.75 12.75" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link href="/services" className="btn-secondary">
                <span>{t('hero.cta.secondary')}</span>
                <svg 
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" 
                  viewBox="0 0 16 16" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M6.75 3.25L10.25 8L6.75 12.75" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="lg:ml-auto"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                {
                  title: t('hero.features.manualTesting.title'),
                  description: t('hero.features.manualTesting.description'),
                  icon: "🎯"
                },
                {
                  title: t('hero.features.automation.title'),
                  description: t('hero.features.automation.description'),
                  icon: "⚡"
                },
                {
                  title: t('hero.features.consulting.title'),
                  description: t('hero.features.consulting.description'),
                  icon: "💡"
                },
                {
                  title: t('hero.features.workflow.title'),
                  description: t('hero.features.workflow.description'),
                  icon: "🔄"
                }
              ].map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={cardHoverVariants}
                  initial="idle"
                  whileHover="hover"
                  className="card group"
                >
                  <div className="flex flex-col gap-4">
                    <span className="text-2xl">{feature.icon}</span>
                    <h3 className="text-lg font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-zinc-400">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-24 flex justify-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 max-w-3xl mx-auto">
            {[
              { number: "7+", label: t('hero.stats.experience') },
              { number: "10+", label: t('hero.stats.projects') },
              { number: "99%", label: t('hero.stats.satisfaction') }
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={scaleUpVariants}
                className="text-center"
              >
                <div className="text-3xl sm:text-3xl font-bold gradient-text">
                  {stat.number}
                </div>
                <div className="mt-2 text-sm text-zinc-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 