'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import BookCall from '@/components/BookCall';
import Footer from '@/components/Footer';

export default function AboutPage() {
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
                About
              </h1>
              <p className="mt-6 text-base text-zinc-400">
                We are a team of passionate QA engineers and automation specialists dedicated to helping companies deliver high-quality software through effective testing and automation strategies.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-16 space-y-12"
            >
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white">Our Mission</h2>
                <p className="mt-4 text-base text-zinc-400">
                  Our mission is to revolutionize software quality assurance by making enterprise-grade testing solutions accessible to businesses of all sizes. We believe that quality should never be compromised, regardless of budget or timeline constraints.
                </p>
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div className="card">
                    <h3 className="text-lg font-semibold text-white mb-3">Quality First</h3>
                    <p className="text-sm text-zinc-400">
                      We're committed to maintaining the highest standards in software testing, ensuring your applications meet and exceed user expectations.
                    </p>
                  </div>
                  <div className="card">
                    <h3 className="text-lg font-semibold text-white mb-3">Innovation Driven</h3>
                    <p className="text-sm text-zinc-400">
                      We continuously explore and implement cutting-edge testing technologies and methodologies to stay ahead of industry trends.
                    </p>
                  </div>
                  <div className="card">
                    <h3 className="text-lg font-semibold text-white mb-3">Client Success</h3>
                    <p className="text-sm text-zinc-400">
                      Your success is our success. We work closely with each client to understand their unique needs and deliver tailored solutions.
                    </p>
                  </div>
                  <div className="card">
                    <h3 className="text-lg font-semibold text-white mb-3">Continuous Growth</h3>
                    <p className="text-sm text-zinc-400">
                      We invest in continuous learning and development to provide our clients with the most effective and innovative testing solutions.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white">Our Approach</h2>
                <p className="mt-4 text-base text-zinc-400">
                  We combine technical expertise with a deep understanding of quality engineering principles to deliver tailored solutions that meet your specific needs. Our approach is built on three core pillars:
                </p>
                <ul className="mt-6 space-y-4 text-zinc-400">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong className="text-white">Strategic Planning:</strong> We begin by understanding your business goals and challenges to create a customized testing strategy.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong className="text-white">Efficient Execution:</strong> We implement automated testing solutions that maximize coverage while minimizing time and resource investment.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong className="text-white">Continuous Improvement:</strong> We constantly monitor and optimize our testing processes to ensure the best possible results.</span>
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