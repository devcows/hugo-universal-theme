'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations } from '@/hooks/useTranslations';
import { companyInfo } from '@/data/company';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.25, 0, 1]
    }
  }
};

export default function Footer() {
  const { t } = useTranslations();

  const navigation = {
    main: [
      { name: t('footer.links.home'), href: '/' },
      { name: t('footer.links.services'), href: '/services' },
      { name: t('footer.links.about'), href: '/about' },
      { name: t('footer.links.contact'), href: '/contact' },
    ],
    social: [
      {
        name: "LinkedIn",
        href: companyInfo.socialMedia.linkedin,
        icon: (props: React.SVGProps<SVGSVGElement>) => (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        ),
      }
    ]
  };

  return (
    <footer className="relative isolate overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]">
        <div className="absolute left-1/3 top-0 -z-10 h-[200px] w-[200px] rounded-full bg-primary-400/20 blur-[100px]" />
        <div className="absolute right-1/3 bottom-0 -z-10 h-[200px] w-[200px] rounded-full bg-primary-600/20 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        {/* Main Navigation */}
        <motion.nav
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-10 columns-2 sm:flex sm:justify-center sm:space-x-12"
        >
          {navigation.main.map((item) => (
            <motion.div
              key={item.name}
              variants={itemVariants}
              className="pb-6"
            >
              <Link 
                href={item.href} 
                className="relative text-sm leading-6 text-gray-600 transition-colors hover:text-primary-600 group"
              >
                <span>{item.name}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all group-hover:w-full" />
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        {/* Social Links */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 flex justify-center space-x-10"
        >
          {navigation.social.map((item) => (
            <motion.a
              key={item.name}
              variants={itemVariants}
              href={item.href}
              className="group relative"
            >
              <div className="absolute -inset-4 rounded-full bg-primary-50/0 transition-all duration-300 group-hover:bg-primary-50/80" />
              <div className="relative">
                <span className="sr-only">{item.name}</span>
                <item.icon 
                  className="h-6 w-6 text-gray-400 transition-colors duration-300 group-hover:text-primary-600" 
                  aria-hidden="true" 
                />
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <motion.div
            variants={itemVariants}
            className="relative inline-block"
          >
            <div className="absolute -inset-x-4 -inset-y-2 rounded-full bg-primary-50/0 transition-all duration-300 group-hover:bg-primary-50/80" />
            <p className="relative text-sm leading-5 text-gray-500">
              {t('footer.copyright')}
            </p>
          </motion.div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>
    </footer>
  );
} 