'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { heroContent } from '@/data/hero';

export default function Hero() {
  return (
    <div className="relative min-h-[90vh] flex items-center pt-24">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute left-[10%] top-0 -z-10 h-[1000px] w-[1000px] rounded-full bg-blue-500/5 blur-[100px]" />
        <div className="absolute right-[10%] bottom-0 -z-10 h-[1000px] w-[1000px] rounded-full bg-purple-500/5 blur-[100px]" />
      </div>

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="text-white">Quality Assurance</span>{' '}
              <span className="gradient-text">as a Service</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-zinc-400 leading-relaxed">
              Transform your software quality with our comprehensive QA solutions. From manual testing to full automation, we ensure your applications meet the highest standards.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link href="/contact" className="btn">
                <span>Get Started</span>
                <svg 
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" 
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
                <span>Our Services</span>
                <svg 
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" 
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="lg:ml-auto"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                {
                  title: "Manual Testing",
                  description: "Thorough testing by expert QA engineers for maximum precision and attention to detail.",
                  icon: "🎯"
                },
                {
                  title: "Test Automation",
                  description: "Automated testing solutions for consistent and efficient quality assurance.",
                  icon: "⚡"
                },
                {
                  title: "QA Consulting",
                  description: "Strategic guidance to optimize your testing processes and methodologies.",
                  icon: "💡"
                },
                {
                  title: "Workflow Automation",
                  description: "Streamline your processes with intelligent automation solutions powered by n8n.",
                  icon: "🔄"
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
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
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-24 flex justify-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 max-w-3xl mx-auto">
            {[
              { number: "7+", label: "Years Experience" },
              { number: "10+", label: "Projects Delivered" },
              { number: "99%", label: "Client Satisfaction" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
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