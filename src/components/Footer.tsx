'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const navigation = {
  main: [
    { name: 'Accueil', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'À propos', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
  social: [
    {
      name: 'LinkedIn',
      href: '#',
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: '#',
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: '#',
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

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
              &copy; {new Date().getFullYear()} Amayara Solutions. Tous droits réservés.
            </p>
          </motion.div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>
    </footer>
  );
} 