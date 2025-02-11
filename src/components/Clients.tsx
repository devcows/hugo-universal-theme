'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { clients } from '@/data/clients';

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
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.25, 0, 1]
    }
  }
};

export default function Clients() {
  return (
    <div className="relative isolate overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]">
        <div className="absolute right-1/4 top-0 -z-10 h-[200px] w-[200px] rounded-full bg-primary-400/20 blur-[100px]" />
        <div className="absolute left-1/4 bottom-0 -z-10 h-[200px] w-[200px] rounded-full bg-primary-600/20 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600">
            Ils nous font confiance
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mt-16 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-6"
        >
          {clients.map((client) => (
            <motion.div
              key={client.name}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                filter: 'grayscale(0)',
                transition: { duration: 0.2 }
              }}
              className="relative col-span-2 lg:col-span-1 group"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-white/50 p-4 backdrop-blur-sm ring-1 ring-gray-200/50 transition-all duration-300 group-hover:ring-primary-200/50 group-hover:shadow-lg">
                {/* Decorative gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <a href={client.url} target="_blank" rel="noopener noreferrer" className="relative block w-full h-full">
                  <div className="flex items-center justify-center h-full">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={120}
                      height={48}
                      className="w-auto max-h-12 object-contain transition-all duration-300 filter grayscale group-hover:grayscale-0"
                    />
                  </div>
                </a>

                {/* Hover effect */}
                <div className="absolute inset-0 ring-1 ring-inset ring-black/[0.03] group-hover:ring-primary-100/20 rounded-xl transition-colors duration-300" />
              </div>

              {/* Decorative elements */}
              <div className="absolute -inset-px bg-gradient-to-r from-primary-500/0 via-primary-500/10 to-primary-500/0 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300 rounded-xl" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
} 