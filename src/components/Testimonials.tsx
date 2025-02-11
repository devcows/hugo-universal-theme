'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { testimonials } from '@/data/testimonials';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.25, 0, 1]
    }
  }
};

export default function Testimonials() {
  return (
    <div className="relative isolate overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]">
        <div className="absolute left-[5%] top-0 -z-10 h-[300px] w-[300px] rounded-full bg-primary-400/20 blur-[100px]" />
        <div className="absolute right-[5%] bottom-0 -z-10 h-[300px] w-[300px] rounded-full bg-primary-600/20 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600">
              Ce que nos clients disent
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Découvrez les expériences de nos clients et comment nous les aidons à réussir.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm p-10 shadow-sm ring-1 ring-gray-200/50 hover:shadow-lg transition-all duration-300"
            >
              {/* Decorative gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative">
                {/* Quote icon */}
                <div className="absolute -top-4 -left-4 text-primary-600/10">
                  <svg className="h-16 w-16 transform -rotate-6 transition-transform group-hover:rotate-0 duration-300" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                </div>

                <div className="relative">
                  <p className="text-lg leading-8 text-gray-600 mb-8">
                    "{testimonial.text}"
                  </p>

                  <div className="mt-auto flex items-center gap-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-primary-500/20 transition-all duration-300 group-hover:ring-primary-500/40">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="h-full w-full object-cover"
                        width={48}
                        height={48}
                      />
                      <div className="absolute inset-0 ring-1 ring-inset ring-black/10" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 leading-6">{testimonial.name}</div>
                      <div className="mt-1 text-sm text-gray-600">{testimonial.position}</div>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-primary-100/30 blur-2xl transition-all duration-300 group-hover:bg-primary-200/40" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
} 