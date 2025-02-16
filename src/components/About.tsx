'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { RocketLaunchIcon, SparklesIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { fadeUpVariants, fadeInVariants, staggerContainer, cardHoverVariants, blurBackgroundVariants } from '@/utils/animations';

const features = [
  {
    name: 'Innovation Technologique',
    description: 'Nous restons à la pointe des dernières avancées technologiques pour offrir des solutions innovantes.',
    icon: SparklesIcon,
  },
  {
    name: 'Expertise Internationale',
    description: 'Notre équipe internationale apporte une perspective globale à chaque projet.',
    icon: GlobeAltIcon,
  },
  {
    name: 'Solutions Sur Mesure',
    description: 'Nous développons des solutions personnalisées adaptées à vos besoins spécifiques.',
    icon: RocketLaunchIcon,
  },
];

export default function About() {
  return (
    <div className="relative isolate overflow-hidden">
      {/* Background grid and effects */}
      <motion.div
        variants={blurBackgroundVariants}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]"
      >
        <motion.div
          variants={blurBackgroundVariants}
          className="absolute left-[10%] top-0 -z-10 h-[1000px] w-[1000px] rounded-full bg-primary-400/20 blur-[100px] opacity-20"
        />
        <motion.div
          variants={blurBackgroundVariants}
          className="absolute right-[10%] bottom-0 -z-10 h-[1000px] w-[1000px] rounded-full bg-primary-600/20 blur-[100px] opacity-20"
        />
      </motion.div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none"
        >
          <motion.div variants={fadeUpVariants} className="text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600">
              À propos d&apos;Amayara Solutions
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Nous sommes une entreprise technologique innovante spécialisée dans le développement de solutions numériques avancées.
              Notre mission est d&apos;aider les entreprises à réussir leur transformation digitale.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
          >
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <motion.div
                  key={feature.name}
                  variants={fadeUpVariants}
                  whileHover="hover"
                  initial="idle"
                  className="group relative pl-16"
                >
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                  
                  {/* Decorative elements */}
                  <motion.div
                    variants={fadeInVariants}
                    className="absolute -inset-x-4 -inset-y-2 z-0 scale-95 bg-primary-50/50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl"
                  />
                  <motion.div
                    variants={fadeInVariants}
                    className="absolute -left-4 -top-4 h-32 w-32 rounded-full bg-primary-100/30 opacity-0 blur-2xl transition-opacity group-hover:opacity-100"
                  />
                </motion.div>
              ))}
            </dl>
          </motion.div>

          <motion.div
            variants={fadeUpVariants}
            className="mt-16 sm:mt-20 lg:mt-24"
          >
            <div className="relative overflow-hidden rounded-3xl bg-white/80 shadow-sm ring-1 ring-gray-200/50 backdrop-blur-sm lg:flex lg:gap-x-20 lg:px-8">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="p-8 sm:p-10 lg:flex-auto"
              >
                <motion.h3 
                  variants={fadeUpVariants}
                  className="text-2xl font-bold tracking-tight text-gray-900"
                >
                  Notre Vision
                </motion.h3>
                <motion.p 
                  variants={fadeUpVariants}
                  className="mt-6 text-base leading-7 text-gray-600"
                >
                  Nous croyons en un monde où la technologie est un catalyseur de progrès et d&apos;innovation.
                  Notre vision est de rendre les solutions technologiques avancées accessibles à toutes les entreprises,
                  quelle que soit leur taille.
                </motion.p>
                
                <motion.div 
                  variants={fadeUpVariants}
                  className="mt-10 flex items-center gap-x-4"
                >
                  <h4 className="flex-none text-sm font-semibold leading-6 text-primary-600">Ce qui nous distingue</h4>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="h-px flex-auto bg-gray-200"
                  />
                </motion.div>
                
                <motion.ul
                  variants={staggerContainer}
                  className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
                >
                  {[
                    'Expertise technique approfondie',
                    'Approche centrée sur le client',
                    'Solutions innovantes et évolutives',
                    'Support continu et maintenance',
                  ].map((feature) => (
                    <motion.li
                      key={feature}
                      variants={fadeUpVariants}
                      className="flex gap-x-3"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="h-2 w-2 flex-none rounded-full bg-primary-500 mt-2"
                      />
                      {feature}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
              
              <div className="relative lg:mt-0 lg:w-96">
                <motion.div
                  variants={blurBackgroundVariants}
                  className="absolute -inset-x-4 -top-16 -bottom-16 opacity-20 bg-gradient-to-r from-primary-500/30 to-transparent"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="relative h-full"
                >
                  <Image
                    className="absolute inset-0 h-full w-full object-cover"
                    src="/img/about-image.jpg"
                    alt="About Amayara Solutions"
                    width={800}
                    height={600}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 